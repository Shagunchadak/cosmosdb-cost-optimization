resource storage 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'billingarcsa'
  location: 'eastus'
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}

resource container 'Microsoft.Storage/storageAccounts/blobServices/containers@2022-09-01' = {
  parent: storage::blobServices::default
  name: 'billingarchive'
}
