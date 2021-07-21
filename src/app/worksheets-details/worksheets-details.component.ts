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
  weeks: any;
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

  onChange(val: any): void {
    this.data = [];
    if (val === '') {
      return;
    }
    this.worksheetService.getWorksheetsData(val).subscribe((data: any) => {
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
    });
  }
}