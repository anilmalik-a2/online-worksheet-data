import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { CLASSES } from 'src/app/models/CONSTANTS';
import { WorksheetsService } from 'src/app/services/worksheets.service';

@Component({
  selector: 'app-class-sections',
  templateUrl: './class-sections.component.html',
  styleUrls: ['./class-sections.component.scss']
})
export class ClassSectionsComponent implements OnInit {

  editorOptions: JsonEditorOptions;
  form: any = this.fb.group({
    myinput: [[]]
  });

  constructor(private worksheetService: WorksheetsService, private fb: FormBuilder) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'tree']; // set all allowed modes 'text', 'view'
  }

  ngOnInit(): void {
    this.worksheetService.getClassSections().subscribe((data: any) => {
      let d = data.map((e: any) => {
        return {
          ...e.payload.doc.data() as {}
        };
      });
      if (d && d.length === 0) {
        d = [
          { KG: { A: 30, B: 40}},
          { I: { A: 30, B: 40}},
          { II: { A: 30, B: 40}},
        ];
      } else {
        d = d.sort((a: any, b: any) => {
          const cls1 = CLASSES.indexOf(Object.keys(a)[0]);
          const cls2 = CLASSES.indexOf(Object.keys(b)[0]);
          return cls1 > cls2 ? 1 : -1;
        });
      }
      d = this.sortKeysOfObject(d);
      this.form.patchValue({
        myinput: d
      });
    });
  }

  sortKeysOfObject(data: any): any {
    const d = [];
    data.forEach((da: any) => {
      const cls = Object.keys(da)[0];
      let keys = Object.keys(da[cls]);
      if (keys.length <= 1) {
        d.push(da);
      } else {
        keys = keys.sort();
        const obj = {};
        obj[cls] = {};
        for (const k of keys) {
          obj[cls][k] = da[cls][k];
        }
        d.push(obj);
      }
    });
    return d;
  }

  submit(): any {
    this.worksheetService.addUpdateClassSections(this.form.controls.myinput.value);
  }

}
