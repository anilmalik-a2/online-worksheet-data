import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Online Worksheets Data';
  isLoggedIn = false;

  ngOnInit(): void {
    const logItem = sessionStorage.getItem('userDetails');
    this.isLoggedIn = logItem ? true : false;
  }

  onLogout(): any {
    this.isLoggedIn = false;
    sessionStorage.removeItem('userDetails');
  }
}
