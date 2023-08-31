import { ArtifactServiceClientJSON } from '../../generated';
export declare function createArtifactTwirpClient(type: 'upload' | 'download', maxAttempts?: number, baseRetryIntervalMilliseconds?: number, retryMultiplier?: number): ArtifactServiceClientJSON;
