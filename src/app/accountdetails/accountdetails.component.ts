import {Component, OnInit} from '@angular/core';
import {CommunicationService} from '../communicationservice/communication.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.scss']
})
export class AccountdetailsComponent implements OnInit {

  account_number: string;
  account_email: string;
  account_balance: string;
  creditBalance: string;
  userName: string;
  responseResult: any;

  constructor(private communicate: CommunicationService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getAcccountDetails();
  }

  async getAcccountDetails() {
    this.responseResult = await this.communicate.getAccountDetails('1');
    if (!this.responseResult) {
      this.openSnackBar('Failure', 'Close');
    } else {
      this.account_number = this.responseResult.accountNo;
      this.account_email = this.responseResult.accountMail;
      this.account_balance = this.responseResult.accountbalance;
      this.creditBalance = this.responseResult.creditBalance;
      this.userName = this.responseResult.userName;
    }
  }

  openSnackBar(message: string, action: string) {
    // this.dialogRef.close('NAN');
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  add() {
    return 5;
  }

}
