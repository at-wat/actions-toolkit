import { UploadOptions, UploadResponse, DownloadArtifactOptions, GetArtifactResponse, ListArtifactsResponse, DownloadArtifactResponse } from './shared/interfaces';
export interface ArtifactClient {
    /**
     * Uploads an artifact
     *
     * @param name The name of the artifact, required
     * @param files A list of absolute or relative paths that denote what files should be uploaded
     * @param rootDirectory An absolute or relative file path that denotes the root parent directory of the files being uploaded
     * @param options Extra options for customizing the upload behavior
     * @returns single UploadResponse object
     */
    uploadArtifact(name: string, files: string[], rootDirectory: string, options?: UploadOptions): Promise<UploadResponse>;
    /**
     * Lists all artifacts that are part of a workflow run.
     *
     * This calls the public List-Artifacts API https://docs.github.com/en/rest/actions/artifacts?apiVersion=2022-11-28#list-workflow-run-artifacts
     * Due to paginated responses from the public API. This function will return at most 1000 artifacts per workflow run (100 per page * maximum 10 calls)
     *
     * @param workflowRunId The workflow run id that the artifact belongs to
     * @param repositoryOwner The owner of the repository that the artifact belongs to
     * @param repositoryName The name of the repository that the artifact belongs to
     * @param token A token with the appropriate permission to the repository to list artifacts
     * @returns ListArtifactResponse object
     */
    listArtifacts(workflowRunId: number, repositoryOwner: string, repositoryName: string, token: string): Promise<ListArtifactsResponse>;
    /**
     * Finds an artifact by name given a repository and workflow run id.
     *
     * This calls the public List-Artifacts API with a name filter https://docs.github.com/en/rest/actions/artifacts?apiVersion=2022-11-28#list-workflow-run-artifacts
     * @actions/artifact > 2.0.0 does not allow for creating multiple artifacts with the same name in the same workflow run.
     * It is possible to have multiple artifacts with the same name in the same workflow run by using old versions of upload-artifact (v1,v2 and v3) or @actions/artifact < v2.0.0
     * If there are multiple artifacts with the same name in the same workflow run this function will return the first artifact that matches the name.
     *
     * @param artifactName The name of the artifact to find
     * @param workflowRunId The workflow run id that the artifact belongs to
     * @param repositoryOwner The owner of the repository that the artifact belongs to
     * @param repositoryName The name of the repository that the artifact belongs to
     * @param token A token with the appropriate permission to the repository to find the artifact
     */
    getArtifact(artifactName: string, workflowRunId: number, repositoryOwner: string, repositoryName: string, token: string): Promise<GetArtifactResponse>;
    /**
     * Downloads an artifact and unzips the content
     *
     * @param artifactId The name of the artifact to download
     * @param repositoryOwner The owner of the repository that the artifact belongs to
     * @param repositoryName The name of the repository that the artifact belongs to
     * @param token A token with the appropriate permission to the repository to download the artifact
     * @param options Extra options that allow for the customization of the download behavior
     * @returns single DownloadArtifactResponse object
     */
    downloadArtifact(artifactId: number, repositoryOwner: string, repositoryName: string, token: string, options?: DownloadArtifactOptions): Promise<DownloadArtifactResponse>;
}
export declare class Client implements ArtifactClient {
    /**
     * Constructs a Client
     */
    static create(): Client;
    /**
     * Upload Artifact
     */
    uploadArtifact(name: string, files: string[], rootDirectory: string, options?: UploadOptions | undefined): Promise<UploadResponse>;
    /**
     * Download Artifact
     */
    downloadArtifact(artifactId: number, repositoryOwner: string, repositoryName: string, token: string, options?: DownloadArtifactOptions): Promise<DownloadArtifactResponse>;
    /**
     * List Artifacts
     */
    listArtifacts(workflowRunId: number, repositoryOwner: string, repositoryName: string, token: string): Promise<ListArtifactsResponse>;
    /**
     * Get Artifact
     */
    getArtifact(artifactName: string, workflowRunId: number, repositoryOwner: string, repositoryName: string, token: string): Promise<GetArtifactResponse>;
}
