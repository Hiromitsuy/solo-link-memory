import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

// const serviceAccount = {
//   type: 'service_account',
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key:
//     process.env.FIREBASE_PRIVATE_KEY &&
//     process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
// };

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
  }
} catch (error) {
  console.error('Firebase admin initialization error:', error);
  throw error;
}

export const auth = admin.auth();
export const db = admin.firestore();
