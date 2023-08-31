import { DownloadArtifactOptions, DownloadArtifactResponse } from '../shared/interfaces';
export declare function downloadArtifact(artifactId: number, repositoryOwner: string, repositoryName: string, token: string, options?: DownloadArtifactOptions): Promise<DownloadArtifactResponse>;