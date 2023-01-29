import React, { useState } from 'react';
// import AWS from 'aws-sdk';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

import { v4 as uuid } from 'uuid';

const Uploads = () => {
    const [img, setImg] = useState(null);

    const uploadMedia = async () => {
        console.log(img);
        console.log(img[0].name);
        const DATA =  img[0];


        try {
            const parallelUploads3 = new Upload({
            client: new S3Client({
                region:"us-east-1",
                credentials: {
                    accessKeyId: 'AKIAX6REZPYQEKSZ3NN2',
                    secretAccessKey: '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'
                }
            }),
            params: { Bucket: "file-storage-for-demo", Key: uuid(), Body: DATA },
        
            // tags: [
            //     /*...*/
            // ], // optional tags
            // queueSize: 4, // optional concurrency configuration
            // partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
            leavePartsOnError: false, // optional manually handle dropped parts
            });
        
            parallelUploads3.on("httpUploadProgress", (progress) => {
            console.log(progress);
            });
        
            await parallelUploads3.done();
        } catch (e) {
            console.log(e);
        }
    }
    

  return (
    <div>
        <h1>Uploads</h1>
        <div>
        <input type="file" id="fileToUpload" onChange={e => setImg(e.target.files)}/>
        <button onClick={uploadMedia}> upload</button>
    </div>
    </div>
  )
}

export default Uploads