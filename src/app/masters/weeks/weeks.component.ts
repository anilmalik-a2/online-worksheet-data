import { Component, OnInit } from '@angular/core';
import { WorksheetsService } from 'src/app/services/worksheets.service';

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.scss']
})
export class WeeksComponent implements OnInit {

  weeks: Weeks[] = [];

  addEditWeek: Weeks = new Weeks();

  isAddEdit = false;

  constructor(private worksheetService: WorksheetsService) { }

  ngOnInit(): void {
    this.worksheetService.getWeeks().subscribe((data: any) => {
      const d = data.map((e: any) => {
        return {
          docId: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        };
      });
      this.weeks = d.sort((n1: Weeks, n2: Weeks) => {
        if (n1.id === n2.id) {
          return 0;
        }
        return n1.id > n2.id ? 1 : -1;
      });
    });
  }

  findNewId(): number {
    let n: number;
    for (n = 1; n < 500; n++) {
      if (this.weeks.find(week => week.id === n) === undefined) {
        return n;
      }
    }
    return n;
  }

  submit(): any {
    if (this.isAddEdit) {
      console.log(this.addEditWeek);
      if (this.addEditWeek.name.trim() === '') {
        alert('Week Name can\'t be empty');
        return;
      }
      if (!this.addEditWeek.id) {
        this.addEditWeek.id = this.findNewId();
      }
      this.worksheetService.addUpdateWeek(this.addEditWeek);
      this.isAddEdit = false;
      this.addEditWeek = new Weeks();
    }
  }

  onEdit(week: Weeks): any {
    if (this.isAddEdit) {
      alert('Already in Add/Edit mode. Please \'cancel\' above first.');
      return;
    }
    this.isAddEdit = true;
    const w = new Weeks();
    w.docId = week.docId;
    w.id = week.id;
    w.isEnabled = week.isEnabled;
    w.name = week.name;
    this.addEditWeek = w;
  }

  // delete(docId: string): any {
  //   console.log(docId);
  //   if (docId !== '') {
  //     if (confirm('Are you sure you want to delete this week')) {
  //       // TODO: Delete week
  //       console.log('Delete confirmed');
  //     }
  //   }
  // }

}

class Weeks
{
  docId: string;
  id: number;
  name: string;
  isEnabled: boolean;
  constructor() {
    this.name = '';
    this.isEnabled = false;
  }
}
