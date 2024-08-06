import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './src/app.module';
import * as admin from 'firebase-admin';
import { getDatabase } from 'libfirebase/getDataBase';

import * as firebase from 'firebase-admin';
// admin.initializeApp({
//     credential: admin.credential.cert("firebasekey.json"),
//     databaseURL: 'https://us-central1-servfy-6acda.cloudfunctions.net/api',
// });

const defaultPath = 'lead';

export interface incrementParams {
    transaction: firebase.firestore.Transaction;
    counterName: string;
    path?: firebase.firestore.CollectionReference;
    startAt?: number;
    incrementValue?: number;
  }

const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressInstance),
    );
    await app.init();
};

export const api = functions.https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
});

export const createOrder = functions.firestore
  .document('lead/{id}')
  .onCreate(async (snapshot, context) => {

        var value =  await (await firebase.firestore().collection('lead').count().get()).data();

        await snapshot.ref.update(`lead/${snapshot.ref.id}`, {increment_id: value});
  });

