// lib/appwrite.js
import { Account, Client, Databases, ID, Query, Storage } from "appwrite";
// No 'server-only' here if you might use the client setup in Server Actions called from client,
// although the actual DB operations usually happen server-side.

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

// Exporting relevant services and helpers
export { client, databases, ID, Query, account, storage };
