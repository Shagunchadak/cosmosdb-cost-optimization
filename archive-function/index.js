const azure = require('azure-storage');

module.exports = async function (context, inputDocuments) {
  const blobService = azure.createBlobService();

  for (const doc of inputDocuments) {
    const date = new Date(doc.timestamp);
    const blobPath = `archive/${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${doc.id}.json`;

    await new Promise((resolve, reject) => {
      blobService.createBlockBlobFromText(
        'billingarchive',
        blobPath,
        JSON.stringify(doc),
        err => (err ? reject(err) : resolve())
      );
    });

    // Optionally mark the document as archived or trigger deletion separately
  }

  context.log(`Archived ${inputDocuments.length} records to Blob Storage`);
};
