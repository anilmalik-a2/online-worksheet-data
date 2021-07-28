import { OnlineClassModel } from './../models/online-class-model';
import { WorksheetModel } from './../models/worksheets-model';
import { WorksheetsService } from '../services/worksheets.service';
import { Component, OnInit } from '@angular/core';
import { CLASSES } from '../models/CONSTANTS';

@Component({
  selector: 'app-worksheets-details',
  templateUrl: './worksheets-details.component.html',
  styleUrls: ['./worksheets-details.component.scss']
})
export class WorksheetsDetailsComponent implements OnInit {

  data: WorksheetModel[];
  onlineClassData: OnlineClassModel[];
  weeks: any;
  week = '';
  details = '';
  constructor(private worksheetService: WorksheetsService) { }

  ngOnInit(): void {
    this.worksheetService.getWeeks().subscribe((data: any) => {
      const d = data.map((e: any) => {
        return {
          docId: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        };
      });
      this.weeks = d.sort((n1: any, n2: any) => {
        if (n1.id === n2.id) {
          return 0;
        }
        return n1.id > n2.id ? 1 : -1;
      });
    });
  }

  onSubmit(): void {
    if (this.week === '' && this.details === '') {
      return;
    }
    this.data = [];
    this.onlineClassData = [];
    if (this.details === '1') {
      // fetch worksheets data for particular week
      this.getWorksheetData();
    } else if (this.details === '2') {
      // fetch online classes data
      this.getOnlineClassData();
    }
  }

  getWorksheetData(): any {
    this.worksheetService.getWorksheetsData(this.week).subscribe((data: any) => {
      const d: WorksheetModel[] = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as WorksheetModel;
      });
      this.data = d.sort((a: WorksheetModel, b: WorksheetModel) => {
        const cls1 = CLASSES.indexOf(a.class);
        const cls2 = CLASSES.indexOf(b.class);
        if (cls1 === cls2) {
          if (a.section === b.section) {
            return 0;
          }
          return a.section > b.section ? 1 : -1;
        }
        return cls1 > cls2 ? 1 : -1;
      });
      this.insertTotalsWorkSheets();
    });
  }

  insertTotalsWorkSheets(): any {
    for (const cls of CLASSES) {
      if (cls === 'KG') {
        continue;
      }
      const indexes = this.getSameGroupStartEnd(cls);
      if (indexes.start !== -1 && indexes.end !== -1) {
        const newTotal = new WorksheetModel();
        for (let i = indexes.start; i <= indexes.end; i++) {
          // total
          newTotal.enroll += this.data[i].enroll;
          newTotal.onlineSent += this.data[i].onlineSent;
          newTotal.onlineReverted += this.data[i].onlineReverted;
          newTotal.hardSent += this.data[i].hardSent;
          newTotal.hardReverted += this.data[i].hardReverted;
          newTotal.notContactable += this.data[i].notContactable;
          newTotal.migrated += this.data[i].migrated;
          newTotal.unreachableNo += this.data[i].unreachableNo;
          newTotal.addressChanged += this.data[i].addressChanged;
          newTotal.other += this.data[i].other;
        }
        newTotal.class = 'Total --> ' + cls;
        this.data.splice(indexes.end + 1, 0, newTotal);
      }
    }
  }

  getSameGroupStartEnd(classToFind: string): any {
    const start = this.data.findIndex(d => d.class === classToFind);
    const end = this.lastIndexOf(classToFind);
    return { start, end };
  }

  lastIndexOf(key: string): number {
    for (let i = this.data.length - 1; i >= 0; i--) {
      if (this.data[i].class === key) {
        return i;
      }
    }
    return -1;
  }

  getOnlineClassData(): any {
    this.worksheetService.getOnlineClassData(this.week).subscribe((data: any) => {
      const d: OnlineClassModel[] = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as OnlineClassModel;
      });
      this.onlineClassData = d.sort((a: OnlineClassModel, b: OnlineClassModel) => {
        const cls1 = CLASSES.indexOf(a.class);
        const cls2 = CLASSES.indexOf(b.class);
        if (cls1 === cls2) {
          if (a.section === b.section) {
            return 0;
          }
          return a.section > b.section ? 1 : -1;
        }
        return cls1 > cls2 ? 1 : -1;
      });
      this.insertTotalsSubjectWiseForClass('XI');
      this.insertTotalsSubjectWiseForClass('XII');
    });
  }
  insertTotalsSubjectWiseForClass(cls: string): any {
    // total
    const clsData = this.onlineClassData.filter((d: OnlineClassModel) => d.class === cls);
    const uniqueSub = [];
    for (const d of clsData) {
      if (uniqueSub.indexOf(d.subject) === -1) {
        uniqueSub.push(d.subject);
      }
    }
    const totalAdded: OnlineClassModel[] = [];
    for (const s of uniqueSub) {
      const added = new OnlineClassModel();
      added.class = cls;
      added.section = 'Total for ' + s;
      for (const d of clsData) {
        if (d.subject === s) {
          added.enroll += d.enroll;
          added.onlineAttended += d.onlineAttended;
          added.dontHaveDevice += d.dontHaveDevice;
          added.reachedThroughPhone += d.reachedThroughPhone;
          added.notContacted += d.notContacted;
        }
      }
      totalAdded.push(added);
    }
    if (totalAdded.length > 0) {
      this.onlineClassData.push(...totalAdded);
    }
  }
}
