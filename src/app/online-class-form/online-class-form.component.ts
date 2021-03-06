import { OnlineClassModel } from './../models/online-class-model';
import { Component, OnInit } from '@angular/core';
import { WorksheetsService } from '../services/worksheets.service';

import { FormBuilder, FormControl, Validators  } from '@angular/forms';

import { CLASSES, SECTIONS, SUBJECTS, SUBJECTS_IX_X } from './../models/CONSTANTS';
import { rule5Validator, rule6Validator } from '../models/validators';


@Component({
  selector: 'app-online-class-form',
  templateUrl: './online-class-form.component.html',
  styleUrls: ['./online-class-form.component.scss']
})

export class OnlineClassFormComponent implements OnInit {

  CLASSES = CLASSES.slice(-4);
  SECTIONS = SECTIONS;
  subjects = [];
  weeks: any;
  res = -1;
  msg = '';
  docId = null;
  progress: boolean;

  onlineClassForm = this.fb.group({
    empId: new FormControl(''),
    empName: new FormControl(''),
    class: new FormControl(''),
    section: new FormControl(''),
    week: new FormControl(''),
    subject: new FormControl(''),
    enroll: new FormControl(''),
    onlineAttended: new FormControl(''),
    dontHaveDevice: new FormControl(0),
    reachedThroughPhone: new FormControl(''),
    notContacted: new FormControl('')
  },  { validators: [Validators.required, rule5Validator/*, rule6Validator*/] });

  constructor(private worksheetService: WorksheetsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.progress = true;
    this.worksheetService.getWeeks().subscribe((data: any) => {
      const d = data.map((e: any) => {
        return {
          docId: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        };
      });
      this.weeks = d.filter((e: any) => e.isEnabled).sort((n1: any, n2: any) => {
        if (n1.id === n2.id) {
          return 0;
        }
        return n1.id > n2.id ? 1 : -1;
      });
      this.progress = false;
    });
  }

  onSubmit(): any {
    this.progress = true;
    const classData = this.onlineClassForm.value as OnlineClassModel;
    classData.entryDate = new Date();
    let result: any;
    if (this.docId !== null) {
      classData.id = this.docId;
      result = this.worksheetService.updateOnlineClassData(classData);
    } else {
      result = this.worksheetService.saveOnlineClassData(classData);
    }

    result.then((docRef: any) => {
      console.log('Document written with doc: ', docRef);
      this.res = 1;
      this.msg = 'Data submitted successfully!!!';
      this.reset();
      this.progress = false;
    })
    .catch((error: any) => {
        console.error('Error adding document: ', error);
        this.res = 0;
        this.msg = 'Error submitting details!!! Please contact administrator...';
        this.reset();
        this.progress = false;
    });
  }

  reset(): any {
    window.scroll(0, 0);
    this.onlineClassForm.patchValue({
      class: '',
      section: '',
      week: '',
      empId: '',
      empName: '',
      subject: '',
      enroll: '',
      onlineAttended: '',
      dontHaveDevice: 0,
      reachedThroughPhone: '',
      notContacted: ''
    });
    this.docId = null;
    // setTimeout(() => {
    //   this.res = -1;
    //   this.msg = '';
    // }, 5000);
  }

  changeClass(): any {
    const cls = this.onlineClassForm.controls.class.value;
    if (cls !== '') {
      if (cls === 'IX' || cls === 'X'){
        this.subjects = SUBJECTS_IX_X;
      }else {
        this.subjects = SUBJECTS;
      }
    } else {
      this.subjects = [];
    }
    this.onlineClassForm.patchValue({
        subject: ''
      });
    this.checkDetails();
  }

  checkDetails(): any {
    const cls = this.onlineClassForm.controls.class.value;
    const week = this.onlineClassForm.controls.week.value;
    const section = this.onlineClassForm.controls.section.value;
    const subject = this.onlineClassForm.controls.subject.value;
    // console.log('check details', cls, week, section);
    if (cls && week && section && subject) {
      this.progress = true;
      const subs = this.worksheetService.getSingleOnlineClassData(week, cls, section, subject).subscribe((data: any) => {
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
          this.onlineClassForm.patchValue({
            empId: d.empId,
            empName: d.empName,
            enroll: d.enroll,
            onlineAttended: d.onlineAttended,
            dontHaveDevice: d.dontHaveDevice,
            reachedThroughPhone: d.reachedThroughPhone,
            notContacted: d.notContacted
         });
        } else {
          this.resetSomeFields();
        }
        subs.unsubscribe();
        this.progress = false;
      });
    } else {
      this.resetSomeFields();
    }
  }

  resetSomeFields(): any {
    this.docId = null;
    this.onlineClassForm.patchValue({
      empId: '',
      empName: '',
      enroll: '',
      onlineAttended: '',
      dontHaveDevice: 0,
      reachedThroughPhone: '',
      notContacted: ''
    });
  }

}
