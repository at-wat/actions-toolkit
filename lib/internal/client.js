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
exports.Client = void 0;
const core_1 = require("@actions/core");
const config_1 = require("./shared/config");
const upload_artifact_1 = require("./upload/upload-artifact");
const download_artifact_1 = require("./download/download-artifact");
const get_artifact_1 = require("./find/get-artifact");
const list_artifacts_1 = require("./find/list-artifacts");
class Client {
    /**
     * Constructs a Client
     */
    static create() {
        return new Client();
    }
    /**
     * Upload Artifact
     */
    uploadArtifact(name, files, rootDirectory, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, config_1.isGhes)()) {
                (0, core_1.warning)(`@actions/artifact v2.0.0+ and upload-artifact@v4+ are not currently supported on GHES.`);
                return {
                    success: false
                };
            }
            try {
                return (0, upload_artifact_1.uploadArtifact)(name, files, rootDirectory, options);
            }
            catch (error) {
                (0, core_1.warning)(`Artifact upload failed with error: ${error}.

Errors can be temporary, so please try again and optionally run the action with debug mode enabled for more information.

If the error persists, please check whether Actions is operating normally at [https://githubstatus.com](https://www.githubstatus.com).`);
                return {
                    success: false
                };
            }
        });
    }
    /**
     * Download Artifact
     */
    downloadArtifact(artifactId, repositoryOwner, repositoryName, token, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, config_1.isGhes)()) {
                (0, core_1.warning)(`@actions/artifact v2.0.0+ and download-artifact@v4+ are not currently supported on GHES.`);
                return {
                    success: false
                };
            }
            try {
                return (0, download_artifact_1.downloadArtifact)(artifactId, repositoryOwner, repositoryName, token, options);
            }
            catch (error) {
                (0, core_1.warning)(`Artifact download failed with error: ${error}.

Errors can be temporary, so please try again and optionally run the action with debug mode enabled for more information.

If the error persists, please check whether Actions and API requests are operating normally at [https://githubstatus.com](https://www.githubstatus.com).`);
                return {
                    success: false
                };
            }
        });
    }
    /**
     * List Artifacts
     */
    listArtifacts(workflowRunId, repositoryOwner, repositoryName, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, config_1.isGhes)()) {
                (0, core_1.warning)(`@actions/artifact v2.0.0+ and download-artifact@v4+ are not currently supported on GHES.`);
                return {
                    artifacts: []
                };
            }
            try {
                return (0, list_artifacts_1.listArtifacts)(workflowRunId, repositoryOwner, repositoryName, token);
            }
            catch (error) {
                (0, core_1.warning)(`Listing Artifacts failed with error: ${error}.

Errors can be temporary, so please try again and optionally run the action with debug mode enabled for more information.

If the error persists, please check whether Actions and API requests are operating normally at [https://githubstatus.com](https://www.githubstatus.com).`);
                return {
                    artifacts: []
                };
            }
        });
    }
    /**
     * Get Artifact
     */
    getArtifact(artifactName, workflowRunId, repositoryOwner, repositoryName, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, config_1.isGhes)()) {
                (0, core_1.warning)(`@actions/artifact v2.0.0+ and download-artifact@v4+ are not currently supported on GHES.`);
                return {
                    success: false
                };
            }
            try {
                return (0, get_artifact_1.getArtifact)(artifactName, workflowRunId, repositoryOwner, repositoryName, token);
            }
            catch (error) {
                (0, core_1.warning)(`Fetching Artifact failed with error: ${error}.

Errors can be temporary, so please try again and optionally run the action with debug mode enabled for more information.

If the error persists, please check whether Actions and API requests are operating normally at [https://githubstatus.com](https://www.githubstatus.com).`);
                return {
                    success: false
                };
            }
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map