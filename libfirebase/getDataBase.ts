import * as admin from 'firebase-admin';

let hasInit = false;

export function initialiseDatabase(): void {
  if (!hasInit) {
    admin.initializeApp();
    hasInit = true;
  }
}

let _db: admin.firestore.Firestore;

export function getDatabase(): admin.firestore.Firestore {
  initialiseDatabase();
  return _db ?? (_db = admin.firestore());
}