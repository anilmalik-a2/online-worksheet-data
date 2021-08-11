import { OnlineClassModel } from './../models/online-class-model';
import { WorksheetModel } from './../models/worksheets-model';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WorksheetsService {

  collectionName = 'worksheet-data';
  collectionName2 = 'online-class-data';

  constructor(private firestore: AngularFirestore) { }

  getUser(usr: string, pwd: string): any {
    return this.firestore.collection('auth', ref => ref.where('user', '==', usr).where('pwd', '==', pwd)).snapshotChanges();
  }
  getWeeks(): any {
    return this.firestore.collection('weeks').snapshotChanges();
  }
  addUpdateWeek(wData: any): any {
    const data = {id: wData.id, isEnabled: wData.isEnabled, name: wData.name};
    if (wData.docId) {
      const docId = wData.docId;
      return this.firestore.doc('weeks' + '/' + docId).update(data);
    }
    else {
      return this.firestore.collection('weeks').add(data);
    }
  }

  addUpdateClassSections(data: any): any {
    this.firestore.firestore.collection('class-sections').get().then(res => {
      res.forEach(element => {
        element.ref.delete();
      });
      const batch = this.firestore.firestore.batch();
      data.forEach((doc: any) => {
        const docRef = this.firestore.firestore.collection('class-sections').doc(); // automatically generate unique id
        batch.set(docRef, doc);
      });
      return batch.commit();
    });
  }

  getClassSections(): any {
    return this.firestore.collection('class-sections').snapshotChanges();
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

  getOnlineClassData(week: string): any {
    return this.firestore.collection(this.collectionName2, ref => ref.where('week', '==', week)).snapshotChanges();
  }

  saveOnlineClassData(classData: OnlineClassModel): any {
    return this.firestore.collection(this.collectionName2).add(classData);
  }

  updateOnlineClassData(classData: OnlineClassModel): any {
    const docId = classData.id;
    delete classData.id;
    // console.log(docId);
    return this.firestore.doc(this.collectionName2 + '/' + docId).update(classData);
  }

  getSingleOnlineClassData(week: string, cls: string, section: string, subject: string): any {
    return this.firestore.collection(this.collectionName2, ref => ref.where('week', '==', week)
      .where('class', '==', cls).where('section', '==', section).where('subject', '==', subject)).snapshotChanges();
  }

  deleteWorksheetData(docId: string): any {
    return this.firestore.doc(this.collectionName + '/' + docId).delete();
  }
  deleteOnlineClassData(docId: string): any {
    return this.firestore.doc(this.collectionName2 + '/' + docId).delete();
  }
}
