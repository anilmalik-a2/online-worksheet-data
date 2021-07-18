import { Component, OnInit } from '@angular/core';
import { WorksheetsService } from '../services/worksheets.service';

import { FormBuilder, FormControl, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  res = -1;
  msg = '';

  loginForm = this.fb.group({
    user: new FormControl(''),
    pwd: new FormControl('')
  },  { validators: [Validators.required] });

  constructor(private worksheetService: WorksheetsService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): any {
    const user = this.loginForm.get('user').value;
    const pwd = this.loginForm.get('pwd').value;
    this.worksheetService.getUser(user, pwd).subscribe((data: any) => {
      console.log(data);
      if (data.length > 0) {
        this.msg = 'Login Success!!!';
        this.res = 1;
        setTimeout(() => {
          sessionStorage.setItem('userDetails', user + ':' + pwd);
          this.router.navigateByUrl('').then(() => {
            window.location.reload();
          });
        }, 2000);
      } else {
        this.msg = 'Login Error.... Please try again.';
        this.res = 0;
      }
    });
  }

  reset(): any {
    // window.scroll(0, 0);
    this.loginForm.patchValue({
      user: '',
      pwd: '',
    });
  }

}
