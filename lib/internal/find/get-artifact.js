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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtifact = void 0;
const github_1 = require("@actions/github");
const user_agent_1 = require("../shared/user-agent");
const utils_1 = require("@actions/github/lib/utils");
const retry_options_1 = require("./retry-options");
const plugin_request_log_1 = require("@octokit/plugin-request-log");
const plugin_retry_1 = require("@octokit/plugin-retry");
const core = __importStar(require("@actions/core"));
function getArtifact(artifactName, workflowRunId, repositoryOwner, repositoryName, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const [retryOpts, requestOpts] = (0, retry_options_1.getRetryOptions)(utils_1.defaults);
        const opts = {
            log: undefined,
            userAgent: (0, user_agent_1.getUserAgentString)(),
            previews: undefined,
            retry: retryOpts,
            request: requestOpts
        };
        const github = (0, github_1.getOctokit)(token, opts, plugin_retry_1.retry, plugin_request_log_1.requestLog);
        const getArtifactResp = yield github.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts{?name}', {
            owner: repositoryOwner,
            repo: repositoryName,
            run_id: workflowRunId,
            name: artifactName
        });
        if (getArtifactResp.status !== 200) {
            core.warning(`non-200 response from GitHub API: ${getArtifactResp.status}`);
            return {
                success: false
            };
        }
        if (getArtifactResp.data.artifacts.length === 0) {
            core.warning('no artifacts found');
            return {
                success: false
            };
        }
        if (getArtifactResp.data.artifacts.length > 1) {
            core.warning('more than one artifact found for a single name, returning first');
        }
        return {
            success: true,
            artifact: {
                name: getArtifactResp.data.artifacts[0].name,
                id: getArtifactResp.data.artifacts[0].id,
                url: getArtifactResp.data.artifacts[0].url,
                size: getArtifactResp.data.artifacts[0].size_in_bytes
            }
        };
    });
}
exports.getArtifact = getArtifact;
//# sourceMappingURL=get-artifact.js.map