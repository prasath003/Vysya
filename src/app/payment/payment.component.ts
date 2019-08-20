import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreditCardValidator} from 'angular-cc-library';
import {ValidateComponent} from '../validate/validate.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {CommunicationService} from '../communicationservice/communication.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  panelOpenState = false;
  cardForm: FormGroup;
  submitted: boolean = false;
  responseResult: any;
  loading: boolean = false;
  otpId:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private payService: CommunicationService, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<PaymentComponent>) {
    this.cardForm = new FormGroup({
      creditCard: new FormControl('', [<any> CreditCardValidator.validateCCNumber, <any> Validators.minLength(16)]),
      expirationDate: new FormControl('', [<any> CreditCardValidator.validateExpDate]),
      cvc: new FormControl('', [<any> Validators.required, <any> Validators.minLength(3), <any> Validators.maxLength(4)])
    });
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.loading = true;
    this.submitted = true;
    this.payProduct(form.creditCard, form.cvc, form.expirationDate, this.data.creditAmount);
    console.log(form,this.data.creditAmount);
  }


  async payProduct(cardNumber, cardCvv, cardDate, cardAmount) {
    this.responseResult = await this.payService.payProduct(cardNumber, cardCvv, cardDate, cardAmount);

    if (!this.responseResult) {
      this.loading = false;
      this.openSnackBar('Failed', 'Close');
    } else {
      this.loading = false;
      //Call otp service
      this.otpId = await this.payService.getOTP('1');
      this.openDialog(this.otpId,'ok');
    }

  }

  openSnackBar(message: string, action: string) {
    // this.dialogRef.close('NAN');
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  openDialog(otp, payeeid): void {
    const dialogRef = this.dialog.open(ValidateComponent, {
      height: '200px',
      width: '500px',
      data: {otp: otp, payeeid: payeeid}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
