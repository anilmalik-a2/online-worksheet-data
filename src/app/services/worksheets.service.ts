import { WorksheetModel } from './../models/worksheets-model';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class WorksheetsService {

  collectionName = 'worksheet-data';

  constructor(private firestore: AngularFirestore) { }

  getWeeks(): any {
    return this.firestore.collection('weeks').snapshotChanges();
  }

  getWorksheetsData(week: string): any {
    return this.firestore.collection(this.collectionName, ref => ref.where('week', '==', week)).snapshotChanges();
  }

  saveWorksheetData(wsData: WorksheetModel): any {
    return this.firestore.collection(this.collectionName).add(wsData);
  }

  // updatePolicy(policy: Policy): any {
  //   delete policy.id;
  //   this.firestore.doc('policies/' + policy.id).update(policy);
  // }

  // deletePolicy(policyId: string): any {
  //   this.firestore.doc('policies/' + policyId).delete();
  // }
}
