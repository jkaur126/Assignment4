import admin from "firebase-admin";
import path from "path";

// Path to your Firebase service account key JSON file
const serviceAccountPath = path.join(__dirname, "backend-assignment-04-11053-firebase-adminsdk-fbsvc-1d27f4e7ca.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

export default admin;
