import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CommunicationService} from '../communicationservice/communication.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {

  otpForm: FormGroup;
  responseDetails: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<ValidateComponent>, private communicateService: CommunicationService) {
    console.log(this.data);
    this.otpForm = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
    });
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.dialogRef.close('NAN');
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.otpForm.controls[controlName].hasError(errorName);
  };

  otpVerify(otpform) {
    this.verifyOtp(otpform.otp);
  }

  async verifyOtp(otp) {

    this.responseDetails = await this.communicateService.authOTP(otp, this.data.otp);

    if (!this.responseDetails) {
      this.openSnackBar('Failed', 'Close');
    } else {
      if(this.responseDetails.message == 'Payment Successfull'){
        this.dialogRef.close('NAN');
        this.openSnackBar('Success', 'Close');
      }else{
        this.openSnackBar('Card Not Valid','Close');
      }

    }
  }

  /* if(this.data.otp == otpform.otp){
     this.openSnackBar('Payee is added successfully','close');
   }*/

}
