import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registerlogin',
  templateUrl: './registerlogin.component.html',
  styleUrls: ['./registerlogin.component.scss']
})
export class RegisterloginComponent implements OnInit {
  public regForm: FormGroup;
  public loginForm: FormGroup;
  public formShow: string;
  constructor(private location: Location, private route: Router) {
    // form validation 1
    this.formShow = 'register';
    this.regForm = new FormGroup({
      fname: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      lname: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      mobile: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      cpassword: new FormControl('', [Validators.required, Validators.maxLength(6)])
    });

    this.loginForm = new FormGroup({
      accountid: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      lpassword: new FormControl('', [Validators.required, Validators.maxLength(6)])
    });
  }

  ngOnInit() {
    localStorage.setItem('ok', 'ok');
  }

  // form validation 2
  public hasError = (controlName: string, errorName: string) => {
    return this.regForm.controls[controlName].hasError(errorName);
  }
  public hasLoginError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    // this.location.back();
    this.route.navigateByUrl('/nav');
  }

  public newRegsiteration = (ownerFormValue) => {
    if (this.regForm.valid) {
      console.log(ownerFormValue);
    }
  }
  public login = (loginForm) => {
    if (this.loginForm.valid) {
      console.log(loginForm);
    }
  }

}
