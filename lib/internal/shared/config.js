"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitHubWorkspaceDir = exports.isGhes = exports.getResultsServiceUrl = exports.getRuntimeToken = exports.getUploadChunkSize = void 0;
// Used for controlling the highWaterMark value of the zip that is being streamed
// The same value is used as the chunk size that is use during upload to blob storage
function getUploadChunkSize() {
    return 8 * 1024 * 1024; // 8 MB Chunks
}
exports.getUploadChunkSize = getUploadChunkSize;
function getRuntimeToken() {
    const token = process.env['ACTIONS_RUNTIME_TOKEN'];
    if (!token) {
        throw new Error('Unable to get the ACTIONS_RUNTIME_TOKEN env variable');
    }
    return token;
}
exports.getRuntimeToken = getRuntimeToken;
function getResultsServiceUrl() {
    const resultsUrl = process.env['ACTIONS_RESULTS_URL'];
    if (!resultsUrl) {
        throw new Error('Unable to get the ACTIONS_RESULTS_URL env variable');
    }
    return resultsUrl;
}
exports.getResultsServiceUrl = getResultsServiceUrl;
function isGhes() {
    const ghUrl = new URL(process.env['GITHUB_SERVER_URL'] || 'https://github.com');
    return ghUrl.hostname.toUpperCase() !== 'GITHUB.COM';
}
exports.isGhes = isGhes;
function getGitHubWorkspaceDir() {
    const ghWorkspaceDir = process.env['GITHUB_WORKSPACE'];
    if (!ghWorkspaceDir) {
        throw new Error('Unable to get the GITHUB_WORKSPACE env variable');
    }
    return ghWorkspaceDir;
}
exports.getGitHubWorkspaceDir = getGitHubWorkspaceDir;
//# sourceMappingURL=config.js.map