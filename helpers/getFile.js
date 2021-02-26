const AWS = require("aws-sdk");

const S3 = new AWS.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  endpoint: process.env.S3_ENDPOINT,
  s3ForcePathStyle: true,
  region: process.env.S3_REGION,
  signatureVersion: "v4",
});

module.exports = async (name) => {
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: name,
  };
  return await S3.getSignedUrlPromise("getObject", s3Params);
};
