import { HttpClient, HttpClientResponse, HttpCodes } from "@actions/http-client"
import { BearerCredentialHandler } from "@actions/http-client/lib/auth"
import { info } from "@actions/core"
import { ArtifactServiceClientJSON } from "../../generated"
import { getResultsServiceUrl, getRuntimeToken } from "./config"

// The twirp http client must implement this interface
interface Rpc {
  request(
    service: string,
    method: string,
    contentType: "application/json" | "application/protobuf",
    data: object | Uint8Array
  ): Promise<object | Uint8Array>
}

class ArtifactHttpClient implements Rpc {
  private httpClient: HttpClient
  private baseUrl: string
  private maxAttempts: number = 5
  private baseRetryIntervalMilliseconds: number = 3000
  private retryMultiplier: number = 1.5

  constructor(userAgent: string) {
    const token = getRuntimeToken()
    this.baseUrl = getResultsServiceUrl()
    this.httpClient = new HttpClient(
      userAgent,
      [new BearerCredentialHandler(token)],
    )
  }

  // This function satisfies the Rpc interface. It is compatible with the JSON
  // JSON generated client.
  async request(
    service: string,
    method: string,
    contentType: "application/json" | "application/protobuf",
    data: object | Uint8Array
  ): Promise<object | Uint8Array> {
    let url = `${this.baseUrl}/twirp/${service}/${method}`
    let headers = {
      "Content-Type": contentType,
    }

    const response = await this.retryableRequest(this.httpClient.post(url, JSON.stringify(data), headers))
    const body = await response.readBody()
    return JSON.parse(body)
  }

  async retryableRequest(
    operation: Promise<HttpClientResponse>
  ): Promise<HttpClientResponse> {
    let attempt = 0
    while (attempt < this.maxAttempts) {
      let isRetryable = false
      let errorMessage = ""

      try {
        const response = await operation
        const statusCode = response.message.statusCode

        if (this.isSuccessStatusCode(statusCode)) {
          return response
        }

        isRetryable = this.isRetryableHttpStatusCode(statusCode)
        errorMessage = `Failed request: (${statusCode}) ${response.message.statusMessage}`
      } catch (error) {
        isRetryable = true
        errorMessage = error.message
      }

      if (!isRetryable) {
        throw new Error(errorMessage)
      }

      if (attempt + 1 === this.maxAttempts) {
        info(`Final attempt failed with error: ${errorMessage}`)
        break
      }

      const retryTimeMilliseconds = this.getExponentialRetryTimeMilliseconds(attempt)

      info(
        `Attempt ${attempt + 1} of ${this.maxAttempts} failed with error: ${errorMessage}. Retrying request in ${retryTimeMilliseconds} ms...`
      )

      await this.sleep(retryTimeMilliseconds)
      attempt++
    }

    throw new Error(`Failed to make request after ${this.maxAttempts} attempts`)
  }

  isSuccessStatusCode(statusCode?: number): boolean {
    if (!statusCode) return false
    return statusCode >= 200 && statusCode < 300
  }

  isRetryableHttpStatusCode(statusCode?: number): boolean {
    if (!statusCode) return false

    const retryableStatusCodes = [
      HttpCodes.BadGateway,
      HttpCodes.GatewayTimeout,
      HttpCodes.InternalServerError,
      HttpCodes.ServiceUnavailable,
      HttpCodes.TooManyRequests,
      413 // Payload Too Large
    ]

    return retryableStatusCodes.includes(statusCode)
  }

  async sleep(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  getExponentialRetryTimeMilliseconds(attempt: number): number {
    if (attempt < 0) {
      throw new Error("attempt should be a positive integer")
    }

    if (attempt === 0) {
      return this.baseRetryIntervalMilliseconds
    }

    const minTime = this.baseRetryIntervalMilliseconds * this.retryMultiplier ** (attempt)
    const maxTime = minTime * this.retryMultiplier

    // returns a random number between minTime and maxTime (exclusive)
    return Math.trunc(Math.random() * (maxTime - minTime) + minTime)
  }
}

export function createArtifactTwirpClient(type: "upload" | "download"): ArtifactServiceClientJSON {
  const client = new ArtifactHttpClient(`@actions/artifact-${type}`)
  return new ArtifactServiceClientJSON(client)
}
