import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-form',
  templateUrl: './choose-form.component.html',
  styleUrls: ['./choose-form.component.scss']
})
export class ChooseFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  chooseForm(formId: number): any {
    if (formId === 1) {
      this.router.navigate(['worksheetform']);
    } else if (formId === 2) {
      this.router.navigate(['onlineclassform']);
    }
  }

}
