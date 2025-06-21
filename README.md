# cosmosdb-cost-optimization
Optimize Azure Cosmos DB costs by archiving cold data to Blob Storage

Problem Statement:
our Azure serverless architecture stores billing records in Cosmos DB. These records grow rapidly (2M+ records, ~300 KB each) and are read-heavy. However, records older than 3 months are rarely accessed.

Challenges:
Increasing Cosmos DB costs
Read latency must be within seconds even for archived records
No API contract changes allowed
Zero downtime and no data loss during transition

Goal:
Design a simple, cost-effective archival solution that:
Reduces Cosmos DB storage and RU costs
Keeps old data available on demand
Requires no changes to client-side APIs

Architecture overview:
 [Client or API]
               |
        [Azure Function Proxy]
           /            \
     Cosmos DB        Blob Storage (archive)
      (0–3 mo)         (older than 3 mo)

Implementation Steps:
1. Setup Blob Storage
2. Archival Function (Node.js)
3. Read Layer (Fallback Logic)


