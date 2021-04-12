import { WorksheetModel } from './../models/worksheets-model';
import { Component, OnInit } from '@angular/core';
import { WorksheetsService } from '../services/worksheets.service';

import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators  } from '@angular/forms';

import { CLASSES, SECTIONS } from './../models/CONSTANTS';

const rule1Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const a = control.get('enroll');
  const b = control.get('onlineSent');
  const d = control.get('hardSent');
  const f = control.get('notContactable');
  const sum = parseInt(b.value + d.value + f.value, 10);
  return !Number.isNaN(sum) && a.value !== sum ? { rule1Failed: true } : null;
};
const rule2Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const b = control.get('onlineSent');
  const c = control.get('onlineReverted');
  return b.value < c.value ? { rule2Failed: true } : null;
};
const rule3Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const d = control.get('hardSent');
  const e = control.get('hardReverted');
  return d.value < e.value ? { rule3Failed: true } : null;
};
const rule4Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const f = control.get('notContactable');
  const g = control.get('migrated');
  const h = control.get('unreachableNo');
  const i = control.get('addressChanged');
  const j = control.get('other');
  const sum = parseInt(g.value + h.value + i.value + j.value, 10);
  return !Number.isNaN(sum) && f.value !== sum ? { rule4Failed: true } : null;
};

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

  onSubmit(): any {
    // console.warn(this.worksheetForm.value);
    const wsData = this.worksheetForm.value as WorksheetModel;
    wsData.entryDate = new Date();
    this.worksheetService.saveWorksheetData(wsData).then((docRef: any) => {
      console.log('Document written with ID: ', docRef.id);
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
    // setTimeout(() => {
    //   this.res = -1;
    //   this.msg = '';
    // }, 5000);
  }

}
