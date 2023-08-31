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
exports.listArtifacts = void 0;
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const user_agent_1 = require("../shared/user-agent");
const retry_options_1 = require("./retry-options");
const utils_1 = require("@actions/github/lib/utils");
const plugin_request_log_1 = require("@octokit/plugin-request-log");
const plugin_retry_1 = require("@octokit/plugin-retry");
// Limiting to 1000 for perf reasons
const maximumArtifactCount = 1000;
const paginationCount = 100;
const maxNumberOfPages = maximumArtifactCount / paginationCount;
function listArtifacts(workflowRunId, repositoryOwner, repositoryName, token) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, core_1.info)(`Fetching artifact list for workflow run ${workflowRunId} in repository ${repositoryOwner}/${repositoryName}`);
        const artifacts = [];
        const [retryOpts, requestOpts] = (0, retry_options_1.getRetryOptions)(utils_1.defaults);
        const opts = {
            log: undefined,
            userAgent: (0, user_agent_1.getUserAgentString)(),
            previews: undefined,
            retry: retryOpts,
            request: requestOpts
        };
        const github = (0, github_1.getOctokit)(token, opts, plugin_retry_1.retry, plugin_request_log_1.requestLog);
        let currentPageNumber = 1;
        const { data: listArtifactResponse } = yield github.rest.actions.listWorkflowRunArtifacts({
            owner: repositoryOwner,
            repo: repositoryName,
            run_id: workflowRunId,
            per_page: paginationCount,
            page: currentPageNumber
        });
        let numberOfPages = Math.ceil(listArtifactResponse.total_count / paginationCount);
        const totalArtifactCount = listArtifactResponse.total_count;
        if (totalArtifactCount > maximumArtifactCount) {
            (0, core_1.warning)(`Workflow run ${workflowRunId} has more than 1000 artifacts. Results will be incomplete as only the first ${maximumArtifactCount} artifacts will be returned`);
            numberOfPages = maxNumberOfPages;
        }
        // Iterate over the first page
        for (const artifact of listArtifactResponse.artifacts) {
            artifacts.push({
                name: artifact.name,
                id: artifact.id,
                url: artifact.url,
                size: artifact.size_in_bytes
            });
        }
        // Iterate over any remaining pages
        for (currentPageNumber; currentPageNumber < numberOfPages; currentPageNumber++) {
            currentPageNumber++;
            (0, core_1.debug)(`Fetching page ${currentPageNumber} of artifact list`);
            const { data: listArtifactResponse } = yield github.rest.actions.listWorkflowRunArtifacts({
                owner: repositoryOwner,
                repo: repositoryName,
                run_id: workflowRunId,
                per_page: paginationCount,
                page: currentPageNumber
            });
            for (const artifact of listArtifactResponse.artifacts) {
                artifacts.push({
                    name: artifact.name,
                    id: artifact.id,
                    url: artifact.url,
                    size: artifact.size_in_bytes
                });
            }
        }
        (0, core_1.info)(`Finished fetching artifact list`);
        return {
            artifacts
        };
    });
}
exports.listArtifacts = listArtifacts;
//# sourceMappingURL=list-artifacts.js.map