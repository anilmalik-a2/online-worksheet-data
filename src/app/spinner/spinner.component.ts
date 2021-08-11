import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() enabled: boolean; // decorate the property with @Input()

  constructor() { }

  ngOnInit(): void {
  }

}
