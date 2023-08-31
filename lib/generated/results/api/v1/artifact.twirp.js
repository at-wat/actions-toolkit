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
exports.createArtifactServiceServer = exports.ArtifactServiceMethodList = exports.ArtifactServiceMethod = exports.ArtifactServiceClientProtobuf = exports.ArtifactServiceClientJSON = void 0;
const twirp_ts_1 = require("twirp-ts");
const artifact_1 = require("./artifact");
class ArtifactServiceClientJSON {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateArtifact.bind(this);
        this.FinalizeArtifact.bind(this);
    }
    CreateArtifact(request) {
        const data = artifact_1.CreateArtifactRequest.toJson(request, {
            useProtoFieldName: true,
            emitDefaultValues: false
        });
        const promise = this.rpc.request('github.actions.results.api.v1.ArtifactService', 'CreateArtifact', 'application/json', data);
        return promise.then(data => artifact_1.CreateArtifactResponse.fromJson(data, { ignoreUnknownFields: true }));
    }
    FinalizeArtifact(request) {
        const data = artifact_1.FinalizeArtifactRequest.toJson(request, {
            useProtoFieldName: true,
            emitDefaultValues: false
        });
        const promise = this.rpc.request('github.actions.results.api.v1.ArtifactService', 'FinalizeArtifact', 'application/json', data);
        return promise.then(data => artifact_1.FinalizeArtifactResponse.fromJson(data, {
            ignoreUnknownFields: true
        }));
    }
}
exports.ArtifactServiceClientJSON = ArtifactServiceClientJSON;
class ArtifactServiceClientProtobuf {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateArtifact.bind(this);
        this.FinalizeArtifact.bind(this);
    }
    CreateArtifact(request) {
        const data = artifact_1.CreateArtifactRequest.toBinary(request);
        const promise = this.rpc.request('github.actions.results.api.v1.ArtifactService', 'CreateArtifact', 'application/protobuf', data);
        return promise.then(data => artifact_1.CreateArtifactResponse.fromBinary(data));
    }
    FinalizeArtifact(request) {
        const data = artifact_1.FinalizeArtifactRequest.toBinary(request);
        const promise = this.rpc.request('github.actions.results.api.v1.ArtifactService', 'FinalizeArtifact', 'application/protobuf', data);
        return promise.then(data => artifact_1.FinalizeArtifactResponse.fromBinary(data));
    }
}
exports.ArtifactServiceClientProtobuf = ArtifactServiceClientProtobuf;
var ArtifactServiceMethod;
(function (ArtifactServiceMethod) {
    ArtifactServiceMethod["CreateArtifact"] = "CreateArtifact";
    ArtifactServiceMethod["FinalizeArtifact"] = "FinalizeArtifact";
})(ArtifactServiceMethod = exports.ArtifactServiceMethod || (exports.ArtifactServiceMethod = {}));
exports.ArtifactServiceMethodList = [
    ArtifactServiceMethod.CreateArtifact,
    ArtifactServiceMethod.FinalizeArtifact
];
function createArtifactServiceServer(service) {
    return new twirp_ts_1.TwirpServer({
        service,
        packageName: 'github.actions.results.api.v1',
        serviceName: 'ArtifactService',
        methodList: exports.ArtifactServiceMethodList,
        matchRoute: matchArtifactServiceRoute
    });
}
exports.createArtifactServiceServer = createArtifactServiceServer;
function matchArtifactServiceRoute(method, events) {
    switch (method) {
        case 'CreateArtifact':
            return (ctx, service, data, interceptors) => __awaiter(this, void 0, void 0, function* () {
                ctx = Object.assign(Object.assign({}, ctx), { methodName: 'CreateArtifact' });
                yield events.onMatch(ctx);
                return handleArtifactServiceCreateArtifactRequest(ctx, service, data, interceptors);
            });
        case 'FinalizeArtifact':
            return (ctx, service, data, interceptors) => __awaiter(this, void 0, void 0, function* () {
                ctx = Object.assign(Object.assign({}, ctx), { methodName: 'FinalizeArtifact' });
                yield events.onMatch(ctx);
                return handleArtifactServiceFinalizeArtifactRequest(ctx, service, data, interceptors);
            });
        default:
            events.onNotFound();
            const msg = `no handler found`;
            throw new twirp_ts_1.TwirpError(twirp_ts_1.TwirpErrorCode.BadRoute, msg);
    }
}
function handleArtifactServiceCreateArtifactRequest(ctx, service, data, interceptors) {
    switch (ctx.contentType) {
        case twirp_ts_1.TwirpContentType.JSON:
            return handleArtifactServiceCreateArtifactJSON(ctx, service, data, interceptors);
        case twirp_ts_1.TwirpContentType.Protobuf:
            return handleArtifactServiceCreateArtifactProtobuf(ctx, service, data, interceptors);
        default:
            const msg = 'unexpected Content-Type';
            throw new twirp_ts_1.TwirpError(twirp_ts_1.TwirpErrorCode.BadRoute, msg);
    }
}
function handleArtifactServiceFinalizeArtifactRequest(ctx, service, data, interceptors) {
    switch (ctx.contentType) {
        case twirp_ts_1.TwirpContentType.JSON:
            return handleArtifactServiceFinalizeArtifactJSON(ctx, service, data, interceptors);
        case twirp_ts_1.TwirpContentType.Protobuf:
            return handleArtifactServiceFinalizeArtifactProtobuf(ctx, service, data, interceptors);
        default:
            const msg = 'unexpected Content-Type';
            throw new twirp_ts_1.TwirpError(twirp_ts_1.TwirpErrorCode.BadRoute, msg);
    }
}
function handleArtifactServiceCreateArtifactJSON(ctx, service, data, interceptors) {
    return __awaiter(this, void 0, void 0, function* () {
        let request;
        let response;
        try {
            const body = JSON.parse(data.toString() || '{}');
            request = artifact_1.CreateArtifactRequest.fromJson(body, { ignoreUnknownFields: true });
        }
        catch (e) {
            if (e instanceof Error) {
                const msg = 'the json request could not be decoded';
                throw new twirp_ts_1.TwirpError(twirp_ts_1.TwirpErrorCode.Malformed, msg).withCause(e, true);
            }
        }
        if (interceptors && interceptors.length > 0) {
            const interceptor = (0, twirp_ts_1.chainInterceptors)(...interceptors);
            response = yield interceptor(ctx, request, (ctx, inputReq) => {
                return service.CreateArtifact(ctx, inputReq);
            });
        }
        else {
            response = yield service.CreateArtifact(ctx, request);
        }
        return JSON.stringify(artifact_1.CreateArtifactResponse.toJson(response, {
            useProtoFieldName: true,
            emitDefaultValues: false
        }));
    });
}
function handleArtifactServiceFinalizeArtifactJSON(ctx, service, data, interceptors) {
    return __awaiter(this, void 0, void 0, function* () {
        let request;
        let response;
        try {
            const body = JSON.parse(data.toString() || '{}');
            request = artifact_1.FinalizeArtifactRequest.fromJson(body, {
                ignoreUnknownFields: true
            });
        }
        catch (e) {
            if (e instanceof Error) {
                const msg = 'the json request could not be decoded';
                throw new twirp_ts_1.TwirpError(twirp_ts_1.TwirpErrorCode.Malformed, msg).withCause(e, true);
            }
        }
        if (interceptors && interceptors.length > 0) {
            const interceptor = (0, twirp_ts_1.chainInterceptors)(...interceptors);
            response = yield interceptor(ctx, request, (ctx, inputReq) => {
                return service.FinalizeArtifact(ctx, inputReq);
            });
        }
        else {
            response = yield service.FinalizeArtifact(ctx, request);
        }
        return JSON.stringify(artifact_1.FinalizeArtifactResponse.toJson(response, {
            useProtoFieldName: true,
            emitDefaultValues: false
        }));
    });
}
function handleArtifactServiceCreateArtifactProtobuf(ctx, service, data, interceptors) {
    return __awaiter(this, void 0, void 0, function* () {
        let request;
        let response;
        try {
            request = artifact_1.CreateArtifactRequest.fromBinary(data);
        }
        catch (e) {
            if (e instanceof Error) {
                const msg = 'the protobuf request could not be decoded';
                throw new twirp_ts_1.TwirpError(twirp_ts_1.TwirpErrorCode.Malformed, msg).withCause(e, true);
            }
        }
        if (interceptors && interceptors.length > 0) {
            const interceptor = (0, twirp_ts_1.chainInterceptors)(...interceptors);
            response = yield interceptor(ctx, request, (ctx, inputReq) => {
                return service.CreateArtifact(ctx, inputReq);
            });
        }
        else {
            response = yield service.CreateArtifact(ctx, request);
        }
        return Buffer.from(artifact_1.CreateArtifactResponse.toBinary(response));
    });
}
function handleArtifactServiceFinalizeArtifactProtobuf(ctx, service, data, interceptors) {
    return __awaiter(this, void 0, void 0, function* () {
        let request;
        let response;
        try {
            request = artifact_1.FinalizeArtifactRequest.fromBinary(data);
        }
        catch (e) {
            if (e instanceof Error) {
                const msg = 'the protobuf request could not be decoded';
                throw new twirp_ts_1.TwirpError(twirp_ts_1.TwirpErrorCode.Malformed, msg).withCause(e, true);
            }
        }
        if (interceptors && interceptors.length > 0) {
            const interceptor = (0, twirp_ts_1.chainInterceptors)(...interceptors);
            response = yield interceptor(ctx, request, (ctx, inputReq) => {
                return service.FinalizeArtifact(ctx, inputReq);
            });
        }
        else {
            response = yield service.FinalizeArtifact(ctx, request);
        }
        return Buffer.from(artifact_1.FinalizeArtifactResponse.toBinary(response));
    });
}
//# sourceMappingURL=artifact.twirp.js.map