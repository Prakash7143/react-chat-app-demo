import React from 'react';
import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const Uploads = () => {
// let isConfigUpdate = false;
// let reader = new FileReader();

async function uploadToS3Bucket(stream, credential, cd) {
    try {
        // if (!window.AWS) {
        //     return
        // }
        // if (!isConfigUpdate) {
        //     window.AWS.config.update(({ region: credential.region }));
        //     isConfigUpdate = true;
        // }

        let s3 = new AWS.S3({
            credentials: new AWS.Credentials({
                apiVersion: 'latest',
                accessKeyId: credential.accressKeyId,
                secretAccessKey: credential.secretAccessKey,
                signatureVersion: credential.signatureVersion,
                region: credential.region,
                Bucket: credential.Bucket
            })
        });
        let uploadItem = await s3.upload({
            Bucket: credential.Bucket,
            Key: uuid(),// name for the bucket file
            ContentType: document.getElementById("fileToUpload").files[0].type,
            Body: stream
        }).on("httpUploadProgress", function (progress) {
            console.log("progress=>", progress)
            cd(getUploadingProgress(progress.loaded, progress.total));
        }).promise();
        console.log("uploadItem=>", uploadItem)
        return uploadItem;
    }
    catch (error) {
        console.log(error)
    }

}

function getUploadingProgress(uploadSize, totalSize) {
    let uploadProgress = (uploadSize / totalSize) * 100;
    return Number(uploadProgress.toFixed(0));
}

async function uploadMedia() {
    let credentialRequest = {
        accressKeyId: 'AKIAX6REZPYQEKSZ3NN2',
        secretAccessKey: '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',
        signatureVersion: 'v4',
        region: 'us-east-1',
        Bucket: 'file-storage-for-demo'
    };
    let mediaStreamRequest = getFile(document.getElementById("fileToUpload").files[0])
    const [mediaStream] = await Promise.all([
        mediaStreamRequest
    ])
    await uploadToS3Bucket(mediaStream, credentialRequest, (progress) => {
        console.log(progress)
    })
}

async function getFile(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        };
        reader.onerror = (err) => {
            reject(false);
        };
        reader.readAsArrayBuffer(file);
    });
};


  return (
    <div>
        <h1>Uploads</h1>
        <div>
        <input type="file" id="fileToUpload" />
        <button onClick={uploadMedia}> upload</button>
    </div>
    </div>
  )
}

export default Uploads