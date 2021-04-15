import { WorksheetModel } from './../models/worksheets-model';
import { Component, OnInit } from '@angular/core';
import { WorksheetsService } from '../services/worksheets.service';

import { FormBuilder, FormControl, Validators  } from '@angular/forms';

import { CLASSES, SECTIONS } from './../models/CONSTANTS';
import { rule1Validator, rule2Validator, rule3Validator, rule4Validator } from '../models/validators';


@Component({
  selector: 'app-worksheets-form',
  templateUrl: './worksheets-form.component.html',
  styleUrls: ['./worksheets-form.component.scss']
})

export class WorksheetsFormComponent implements OnInit {

  CLASSES = CLASSES;
  SECTIONS = SECTIONS;
  weeks: any;
  res = -1;
  msg = '';
  docId = null;

  worksheetForm = this.fb.group({
    empId: new FormControl(''),
    empName: new FormControl(''),
    class: new FormControl(''),
    section: new FormControl(''),
    week: new FormControl(''),
    enroll: new FormControl(''),
    onlineSent: new FormControl(''),
    onlineReverted: new FormControl(''),
    hardSent: new FormControl(''),
    hardReverted: new FormControl(''),
    notContactable: new FormControl(''),
    migrated: new FormControl(''),
    unreachableNo: new FormControl(''),
    addressChanged: new FormControl(''),
    other: new FormControl('')
  },  { validators: [Validators.required, rule1Validator, rule2Validator, rule3Validator, rule4Validator] });

  constructor(private worksheetService: WorksheetsService, private fb: FormBuilder) { }

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

  onSubmit(): any {
    const wsData = this.worksheetForm.value as WorksheetModel;
    wsData.entryDate = new Date();
    let result: any;
    if (this.docId !== null) {
      wsData.id = this.docId;
      result = this.worksheetService.updateWorksheetData(wsData);
    } else {
      result = this.worksheetService.saveWorksheetData(wsData);
    }

    result.then((docRef: any) => {
      console.log('Document written with doc: ', docRef);
      this.res = 1;
      this.msg = 'Data submitted successfully!!!';
      this.reset();
    })
    .catch((error: any) => {
        console.error('Error adding document: ', error);
        this.res = 0;
        this.msg = 'Error submitting details!!! Please contact administrator...';
        this.reset();
    });
  }

  reset(): any {
    window.scroll(0, 0);
    this.worksheetForm.patchValue({
      class: '',
      section: '',
      week: '',
      empId: '',
      empName: '',
      enroll: '',
      onlineSent: '',
      onlineReverted: '',
      hardSent: '',
      hardReverted: '',
      notContactable: '',
      migrated: '',
      unreachableNo: '',
      addressChanged: '',
      other: ''
    });
    this.docId = null;
    // setTimeout(() => {
    //   this.res = -1;
    //   this.msg = '';
    // }, 5000);
  }

  checkDetails(): any {
    const cls = this.worksheetForm.controls.class.value;
    const week = this.worksheetForm.controls.week.value;
    const section = this.worksheetForm.controls.section.value;
    // console.log('check details', cls, week, section);
    if (cls && week && section) {
      const subs = this.worksheetService.getSingleWorksheetData(week, cls, section).subscribe((data: any) => {
        let d = data.map((e: any) => {
          return {
            docId: e.payload.doc.id,
            ...e.payload.doc.data() as {}
          };
        });
        // console.log(d);
        if (d.length > 0) {
          d = d[0];
          // hurrrah!!! we found earlier submitted data
          this.docId = d.docId;
          this.worksheetForm.patchValue({
            empId: d.empId,
            empName: d.empName,
            enroll: d.enroll,
            onlineSent: d.onlineSent,
            onlineReverted: d.onlineReverted,
            hardSent: d.hardSent,
            hardReverted: d.hardReverted,
            notContactable: d.notContactable,
            migrated: d.migrated,
            unreachableNo: d.unreachableNo,
            addressChanged: d.addressChanged,
            other: d.other
         });
        } else {
          this.resetSomeFields();
        }
        subs.unsubscribe();
      });
    } else {
      this.resetSomeFields();
    }
  }

  resetSomeFields(): any {
    this.docId = null;
    this.worksheetForm.patchValue({
      empId: '',
      empName: '',
      enroll: '',
      onlineSent: '',
      onlineReverted: '',
      hardSent: '',
      hardReverted: '',
      notContactable: '',
      migrated: '',
      unreachableNo: '',
      addressChanged: '',
      other: ''
    });
  }

}
