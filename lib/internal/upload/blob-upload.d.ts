import { ZipUploadStream } from './zip';
export interface BlobUploadResponse {
    /**
     * If the upload was successful or not
     */
    isSuccess: boolean;
    /**
     * The total reported upload size in bytes. Empty if the upload failed
     */
    uploadSize?: number;
    /**
     * The MD5 hash of the uploaded file. Empty if the upload failed
     */
    md5Hash?: string;
}
export declare function uploadZipToBlobStorage(authenticatedUploadURL: string, zipUploadStream: ZipUploadStream): Promise<BlobUploadResponse>;
