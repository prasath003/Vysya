import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-fundtransfer',
  templateUrl: './fundtransfer.component.html',
  styleUrls: ['./fundtransfer.component.scss']
})
export class FundtransferComponent implements OnInit {
  fundForm: FormGroup;
  payees: any;
  payee: string;
  constructor() {
    this.payees = [{name:'121312312'},{name:'1213123123'}];

    this.fundForm = new FormGroup({
      accoundId: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      accoundname: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      remarks: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    });
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.fundForm.controls[controlName].hasError(errorName);
  };
  public fundTransfer = (loginForm) => {
    if (this.fundForm.valid) {
      console.log(loginForm);
    }
  };

}
