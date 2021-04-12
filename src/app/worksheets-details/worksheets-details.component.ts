import { WorksheetModel } from './../models/worksheets-model';
import { WorksheetsService } from '../services/worksheets.service';
import { Component, OnInit } from '@angular/core';

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
        if (n1.id > n2.id) {
          return 1;
        }
        if (n1.id < n2.id) {
            return -1;
        }
        return 0;
      });
    });
  }

  onChange(val: any): void {
    this.data = [];
    if (val === '') {
      return;
    }
    this.worksheetService.getWorksheetsData(val).subscribe((data: any) => {
      this.data = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as WorksheetModel;
      });
    });
  }
}
