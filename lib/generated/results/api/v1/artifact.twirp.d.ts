/// <reference types="node" />
import { TwirpContext, TwirpServer } from 'twirp-ts';
import { CreateArtifactRequest, CreateArtifactResponse, FinalizeArtifactRequest, FinalizeArtifactResponse } from './artifact';
interface Rpc {
    request(service: string, method: string, contentType: 'application/json' | 'application/protobuf', data: object | Uint8Array): Promise<object | Uint8Array>;
}
export interface ArtifactServiceClient {
    CreateArtifact(request: CreateArtifactRequest): Promise<CreateArtifactResponse>;
    FinalizeArtifact(request: FinalizeArtifactRequest): Promise<FinalizeArtifactResponse>;
}
export declare class ArtifactServiceClientJSON implements ArtifactServiceClient {
    private readonly rpc;
    constructor(rpc: Rpc);
    CreateArtifact(request: CreateArtifactRequest): Promise<CreateArtifactResponse>;
    FinalizeArtifact(request: FinalizeArtifactRequest): Promise<FinalizeArtifactResponse>;
}
export declare class ArtifactServiceClientProtobuf implements ArtifactServiceClient {
    private readonly rpc;
    constructor(rpc: Rpc);
    CreateArtifact(request: CreateArtifactRequest): Promise<CreateArtifactResponse>;
    FinalizeArtifact(request: FinalizeArtifactRequest): Promise<FinalizeArtifactResponse>;
}
export interface ArtifactServiceTwirp<T extends TwirpContext = TwirpContext> {
    CreateArtifact(ctx: T, request: CreateArtifactRequest): Promise<CreateArtifactResponse>;
    FinalizeArtifact(ctx: T, request: FinalizeArtifactRequest): Promise<FinalizeArtifactResponse>;
}
export declare enum ArtifactServiceMethod {
    CreateArtifact = "CreateArtifact",
    FinalizeArtifact = "FinalizeArtifact"
}
export declare const ArtifactServiceMethodList: ArtifactServiceMethod[];
export declare function createArtifactServiceServer<T extends TwirpContext = TwirpContext>(service: ArtifactServiceTwirp<T>): TwirpServer<ArtifactServiceTwirp<TwirpContext<import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>>>, T>;
export {};
