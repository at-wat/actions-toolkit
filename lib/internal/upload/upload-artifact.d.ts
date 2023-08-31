import { UploadOptions, UploadResponse } from '../shared/interfaces';
export declare function uploadArtifact(name: string, files: string[], rootDirectory: string, options?: UploadOptions | undefined): Promise<UploadResponse>;
