import { ArtifactClient } from './internal/client';
/**
 * Exported functionality that we want to expose for any users of @actions/artifact
 */
export * from './internal/shared/interfaces';
export { ArtifactClient };
export declare function create(): ArtifactClient;
