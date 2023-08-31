"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArtifactTwirpClient = void 0;
const http_client_1 = require("@actions/http-client");
const auth_1 = require("@actions/http-client/lib/auth");
const core_1 = require("@actions/core");
const generated_1 = require("../../generated");
const config_1 = require("./config");
class ArtifactHttpClient {
    constructor(userAgent, maxAttempts, baseRetryIntervalMilliseconds, retryMultiplier) {
        this.maxAttempts = 5;
        this.baseRetryIntervalMilliseconds = 3000;
        this.retryMultiplier = 1.5;
        const token = (0, config_1.getRuntimeToken)();
        this.baseUrl = (0, config_1.getResultsServiceUrl)();
        if (maxAttempts) {
            this.maxAttempts = maxAttempts;
        }
        if (baseRetryIntervalMilliseconds) {
            this.baseRetryIntervalMilliseconds = baseRetryIntervalMilliseconds;
        }
        if (retryMultiplier) {
            this.retryMultiplier = retryMultiplier;
        }
        this.httpClient = new http_client_1.HttpClient(userAgent, [
            new auth_1.BearerCredentialHandler(token)
        ]);
    }
    // This function satisfies the Rpc interface. It is compatible with the JSON
    // JSON generated client.
    request(service, method, contentType, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}/twirp/${service}/${method}`;
            (0, core_1.debug)(`Requesting ${url}`);
            const headers = {
                'Content-Type': contentType
            };
            try {
                const response = yield this.retryableRequest(() => __awaiter(this, void 0, void 0, function* () { return this.httpClient.post(url, JSON.stringify(data), headers); }));
                const body = yield response.readBody();
                return JSON.parse(body);
            }
            catch (error) {
                throw new Error(`Failed to ${method}: ${error.message}`);
            }
        });
    }
    retryableRequest(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            let attempt = 0;
            let errorMessage = '';
            while (attempt < this.maxAttempts) {
                let isRetryable = false;
                try {
                    const response = yield operation();
                    const statusCode = response.message.statusCode;
                    if (this.isSuccessStatusCode(statusCode)) {
                        return response;
                    }
                    isRetryable = this.isRetryableHttpStatusCode(statusCode);
                    errorMessage = `Failed request: (${statusCode}) ${response.message.statusMessage}`;
                }
                catch (error) {
                    isRetryable = true;
                    errorMessage = error.message;
                }
                if (!isRetryable) {
                    throw new Error(`Received non-retryable error: ${errorMessage}`);
                }
                if (attempt + 1 === this.maxAttempts) {
                    throw new Error(`Failed to make request after ${this.maxAttempts} attempts: ${errorMessage}`);
                }
                const retryTimeMilliseconds = this.getExponentialRetryTimeMilliseconds(attempt);
                (0, core_1.info)(`Attempt ${attempt + 1} of ${this.maxAttempts} failed with error: ${errorMessage}. Retrying request in ${retryTimeMilliseconds} ms...`);
                yield this.sleep(retryTimeMilliseconds);
                attempt++;
            }
            throw new Error(`Request failed`);
        });
    }
    isSuccessStatusCode(statusCode) {
        if (!statusCode)
            return false;
        return statusCode >= 200 && statusCode < 300;
    }
    isRetryableHttpStatusCode(statusCode) {
        if (!statusCode)
            return false;
        const retryableStatusCodes = [
            http_client_1.HttpCodes.BadGateway,
            http_client_1.HttpCodes.GatewayTimeout,
            http_client_1.HttpCodes.InternalServerError,
            http_client_1.HttpCodes.ServiceUnavailable,
            http_client_1.HttpCodes.TooManyRequests,
            413 // Payload Too Large
        ];
        return retryableStatusCodes.includes(statusCode);
    }
    sleep(milliseconds) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        });
    }
    getExponentialRetryTimeMilliseconds(attempt) {
        if (attempt < 0) {
            throw new Error('attempt should be a positive integer');
        }
        if (attempt === 0) {
            return this.baseRetryIntervalMilliseconds;
        }
        const minTime = this.baseRetryIntervalMilliseconds * Math.pow(this.retryMultiplier, attempt);
        const maxTime = minTime * this.retryMultiplier;
        // returns a random number between minTime and maxTime (exclusive)
        return Math.trunc(Math.random() * (maxTime - minTime) + minTime);
    }
}
function createArtifactTwirpClient(type, maxAttempts, baseRetryIntervalMilliseconds, retryMultiplier) {
    const client = new ArtifactHttpClient(`@actions/artifact-${type}`, maxAttempts, baseRetryIntervalMilliseconds, retryMultiplier);
    return new generated_1.ArtifactServiceClientJSON(client);
}
exports.createArtifactTwirpClient = createArtifactTwirpClient;
//# sourceMappingURL=artifact-twirp-client.js.map