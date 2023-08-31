import { GetArtifactResponse } from '../shared/interfaces';
export declare function getArtifact(artifactName: string, workflowRunId: number, repositoryOwner: string, repositoryName: string, token: string): Promise<GetArtifactResponse>;
