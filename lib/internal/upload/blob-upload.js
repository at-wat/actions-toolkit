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
exports.uploadZipToBlobStorage = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const config_1 = require("../shared/config");
const core = __importStar(require("@actions/core"));
const crypto = __importStar(require("crypto"));
const stream = __importStar(require("stream"));
function uploadZipToBlobStorage(authenticatedUploadURL, zipUploadStream) {
    return __awaiter(this, void 0, void 0, function* () {
        let uploadByteCount = 0;
        const maxBuffers = 5;
        const bufferSize = (0, config_1.getUploadChunkSize)();
        const blobClient = new storage_blob_1.BlobClient(authenticatedUploadURL);
        const blockBlobClient = blobClient.getBlockBlobClient();
        core.debug(`Uploading artifact zip to blob storage with maxBuffers: ${maxBuffers}, bufferSize: ${bufferSize}`);
        const uploadCallback = (progress) => {
            core.info(`Uploaded bytes ${progress.loadedBytes}`);
            uploadByteCount = progress.loadedBytes;
        };
        const options = {
            blobHTTPHeaders: { blobContentType: 'zip' },
            onProgress: uploadCallback
        };
        let md5Hash = undefined;
        const uploadStream = new stream.PassThrough();
        const hashStream = crypto.createHash('md5');
        zipUploadStream.pipe(uploadStream); // This stream is used for the upload
        zipUploadStream.pipe(hashStream).setEncoding('hex'); // This stream is used to compute a hash of the zip content that gets used. Integrity check
        try {
            core.info('Beginning upload of artifact content to blob storage');
            yield blockBlobClient.uploadStream(uploadStream, bufferSize, maxBuffers, options);
            core.info('Finished uploading artifact content to blob storage!');
            hashStream.end();
            md5Hash = hashStream.read();
            core.info(`MD5 hash of uploaded artifact zip is ${md5Hash}`);
        }
        catch (error) {
            core.warning(`Failed to upload artifact zip to blob storage, error: ${error}`);
            return {
                isSuccess: false
            };
        }
        if (uploadByteCount === 0) {
            core.warning(`No data was uploaded to blob storage. Reported upload byte count is 0`);
            return {
                isSuccess: false
            };
        }
        return {
            isSuccess: true,
            uploadSize: uploadByteCount,
            md5Hash
        };
    });
}
exports.uploadZipToBlobStorage = uploadZipToBlobStorage;
//# sourceMappingURL=blob-upload.js.map