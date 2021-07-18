import { WorksheetModel } from './../models/worksheets-model';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WorksheetsService {

  collectionName = 'worksheet-data';

  constructor(private firestore: AngularFirestore) { }

  getUser(usr: string, pwd: string): any {
    return this.firestore.collection('auth', ref => ref.where('user', '==', usr).where('pwd', '==', pwd)).snapshotChanges();
  }
  getWeeks(): any {
    return this.firestore.collection('weeks').snapshotChanges();
  }

  getWorksheetsData(week: string): any {
    return this.firestore.collection(this.collectionName, ref => ref.where('week', '==', week)).snapshotChanges();
  }

  saveWorksheetData(wsData: WorksheetModel): any {
    return this.firestore.collection(this.collectionName).add(wsData);
  }

  updateWorksheetData(wsData: WorksheetModel): any {
    const docId = wsData.id;
    delete wsData.id;
    // console.log(docId);
    return this.firestore.doc(this.collectionName + '/' + docId).update(wsData);
  }

  getSingleWorksheetData(week: string, cls: string, section: string): any {
    return this.firestore.collection(this.collectionName,
      ref => ref.where('week', '==', week).where('class', '==', cls).where('section', '==', section)).snapshotChanges();
  }

  // deletePolicy(policyId: string): any {
  //   this.firestore.doc('policies/' + policyId).delete();
  // }
}
