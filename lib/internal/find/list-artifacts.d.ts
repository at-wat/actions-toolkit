import { ListArtifactsResponse } from '../shared/interfaces';
export declare function listArtifacts(workflowRunId: number, repositoryOwner: string, repositoryName: string, token: string): Promise<ListArtifactsResponse>;
