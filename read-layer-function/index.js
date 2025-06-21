const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = async function (context, req) {
  const cosmos = context.bindings.billingRecord;
  if (cosmos) {
    context.res = { body: cosmos };
    return;
  }

  const id = req.query.id || (req.body && req.body.id);
  const year = req.query.year;
  const month = req.query.month;

  const blobPath = `archive/${year}/${month}/${id}.json`;

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AzureWebJobsStorage);
    const containerClient = blobServiceClient.getContainerClient('billingarchive');
    const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
    const downloadBlockBlobResponse = await blockBlobClient.downloadToBuffer();

    context.res = {
      body: JSON.parse(downloadBlockBlobResponse.toString())
    };
  } catch (err) {
    context.res = {
      status: 404,
      body: "Record not found in archive."
    };
  }
};
