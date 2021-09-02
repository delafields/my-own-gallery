// import { AWSAccessKeyId, AWSSecretKey } from './art-palette-324214-3570184ea7b8.js'
const { AWSAccessKeyId, AWSSecretKey } = require('./art-palette-324214-3570184ea7b8.js')


// Enter copied or downloaded access ID and secret key here
const ID = AWSAccessKeyId;
const SECRET = AWSSecretKey;

// The name of the bucket that you have created
const BUCKET_NAME = 'art-palette';

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = JSON.stringify(fileName)

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'images2.json', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

// uploadFile('./src/assets/image_links.json')

const downloadFile = (bucketName, key) => {
    const params = {
      Bucket: bucketName,
      Key: key
    };
    s3.getObject(params, (err, data) => {
      if (err) console.error(err);
    //   fs.writeFileSync(filePath, data.Body.toString());
    //   console.log(`${filePath} has been created!`);
    console.log(JSON.parse(data.Body.toString('utf-8')))
    });
  };

  downloadFile(BUCKET_NAME, 'images2.json');