/// <reference types="node" />
import * as stream from 'stream';
import { UploadZipSpecification } from './upload-zip-specification';
export declare class ZipUploadStream extends stream.Transform {
    constructor(bufferSize: number);
    _transform(chunk: any, enc: any, cb: any): void;
}
export declare function createZipUploadStream(uploadSpecification: UploadZipSpecification[]): Promise<ZipUploadStream>;
