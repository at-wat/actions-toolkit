"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadArtifact = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const github = __importStar(require("@actions/github"));
const core = __importStar(require("@actions/core"));
const httpClient = __importStar(require("@actions/http-client"));
const unzipper_1 = __importDefault(require("unzipper"));
const user_agent_1 = require("../shared/user-agent");
const config_1 = require("../shared/config");
const scrubQueryParameters = (url) => {
    const parsed = new URL(url);
    parsed.search = '';
    return parsed.toString();
};
function exists(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.access(path);
            return true;
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return false;
            }
            else {
                throw error;
            }
        }
    });
}
function streamExtract(url, directory) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new httpClient.HttpClient((0, user_agent_1.getUserAgentString)());
        const response = yield client.get(url);
        if (response.message.statusCode !== 200) {
            throw new Error(`Unexpected HTTP response from blob storage: ${response.message.statusCode} ${response.message.statusMessage}`);
        }
        return response.message.pipe(unzipper_1.default.Extract({ path: directory })).promise();
    });
}
function downloadArtifact(artifactId, repositoryOwner, repositoryName, token, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const downloadPath = (options === null || options === void 0 ? void 0 : options.path) || (0, config_1.getGitHubWorkspaceDir)();
        if (!(yield exists(downloadPath))) {
            core.debug(`Artifact destination folder does not exist, creating: ${downloadPath}`);
            yield promises_1.default.mkdir(downloadPath, { recursive: true });
        }
        else {
            core.debug(`Artifact destination folder already exists: ${downloadPath}`);
        }
        const api = github.getOctokit(token);
        core.info(`Downloading artifact '${artifactId}' from '${repositoryOwner}/${repositoryName}'`);
        const { headers, status } = yield api.rest.actions.downloadArtifact({
            owner: repositoryOwner,
            repo: repositoryName,
            artifact_id: artifactId,
            archive_format: 'zip',
            request: {
                redirect: 'manual'
            }
        });
        if (status !== 302) {
            throw new Error(`Unable to download artifact. Unexpected status: ${status}`);
        }
        const { location } = headers;
        if (!location) {
            throw new Error(`Unable to redirect to artifact download url`);
        }
        core.info(`Redirecting to blob download url: ${scrubQueryParameters(location)}`);
        try {
            core.info(`Starting download of artifact to: ${downloadPath}`);
            yield streamExtract(location, downloadPath);
            core.info(`Artifact download completed successfully.`);
        }
        catch (error) {
            throw new Error(`Unable to download and extract artifact: ${error.message}`);
        }
        return { success: true, downloadPath };
    });
}
exports.downloadArtifact = downloadArtifact;
//# sourceMappingURL=download-artifact.js.map