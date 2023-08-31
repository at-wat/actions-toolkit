import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { StringValue } from "../../../google/protobuf/wrappers";
import { Timestamp } from "../../../google/protobuf/timestamp";
/**
 * @generated from protobuf message github.actions.results.api.v1.CreateArtifactRequest
 */
export interface CreateArtifactRequest {
    /**
     * @generated from protobuf field: string workflow_run_backend_id = 1;
     */
    workflowRunBackendId: string;
    /**
     * @generated from protobuf field: string workflow_job_run_backend_id = 2;
     */
    workflowJobRunBackendId: string;
    /**
     * @generated from protobuf field: string name = 3;
     */
    name: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp expires_at = 4;
     */
    expiresAt?: Timestamp;
    /**
     * @generated from protobuf field: int32 version = 5;
     */
    version: number;
}
/**
 * @generated from protobuf message github.actions.results.api.v1.CreateArtifactResponse
 */
export interface CreateArtifactResponse {
    /**
     * @generated from protobuf field: bool ok = 1;
     */
    ok: boolean;
    /**
     * @generated from protobuf field: string signed_upload_url = 2;
     */
    signedUploadUrl: string;
}
/**
 * @generated from protobuf message github.actions.results.api.v1.FinalizeArtifactRequest
 */
export interface FinalizeArtifactRequest {
    /**
     * @generated from protobuf field: string workflow_run_backend_id = 1;
     */
    workflowRunBackendId: string;
    /**
     * @generated from protobuf field: string workflow_job_run_backend_id = 2;
     */
    workflowJobRunBackendId: string;
    /**
     * @generated from protobuf field: string name = 3;
     */
    name: string;
    /**
     * @generated from protobuf field: int64 size = 4;
     */
    size: string;
    /**
     * @generated from protobuf field: google.protobuf.StringValue hash = 5;
     */
    hash?: StringValue;
}
/**
 * @generated from protobuf message github.actions.results.api.v1.FinalizeArtifactResponse
 */
export interface FinalizeArtifactResponse {
    /**
     * @generated from protobuf field: bool ok = 1;
     */
    ok: boolean;
    /**
     * @generated from protobuf field: int64 artifact_id = 2;
     */
    artifactId: string;
}
declare class CreateArtifactRequest$Type extends MessageType<CreateArtifactRequest> {
    constructor();
    create(value?: PartialMessage<CreateArtifactRequest>): CreateArtifactRequest;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateArtifactRequest): CreateArtifactRequest;
    internalBinaryWrite(message: CreateArtifactRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.CreateArtifactRequest
 */
export declare const CreateArtifactRequest: CreateArtifactRequest$Type;
declare class CreateArtifactResponse$Type extends MessageType<CreateArtifactResponse> {
    constructor();
    create(value?: PartialMessage<CreateArtifactResponse>): CreateArtifactResponse;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateArtifactResponse): CreateArtifactResponse;
    internalBinaryWrite(message: CreateArtifactResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.CreateArtifactResponse
 */
export declare const CreateArtifactResponse: CreateArtifactResponse$Type;
declare class FinalizeArtifactRequest$Type extends MessageType<FinalizeArtifactRequest> {
    constructor();
    create(value?: PartialMessage<FinalizeArtifactRequest>): FinalizeArtifactRequest;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FinalizeArtifactRequest): FinalizeArtifactRequest;
    internalBinaryWrite(message: FinalizeArtifactRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.FinalizeArtifactRequest
 */
export declare const FinalizeArtifactRequest: FinalizeArtifactRequest$Type;
declare class FinalizeArtifactResponse$Type extends MessageType<FinalizeArtifactResponse> {
    constructor();
    create(value?: PartialMessage<FinalizeArtifactResponse>): FinalizeArtifactResponse;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FinalizeArtifactResponse): FinalizeArtifactResponse;
    internalBinaryWrite(message: FinalizeArtifactResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.FinalizeArtifactResponse
 */
export declare const FinalizeArtifactResponse: FinalizeArtifactResponse$Type;
/**
 * @generated ServiceType for protobuf service github.actions.results.api.v1.ArtifactService
 */
export declare const ArtifactService: ServiceType;
export {};
