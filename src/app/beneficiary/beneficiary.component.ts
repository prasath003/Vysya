import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ValidateComponent} from '../validate/validate.component';
import {CommunicationService} from '../communicationservice/communication.service';

export interface PeriodicElement {
  payeeId: string;
  accountNo: string;
  ifsc: number;
  payeeName: string;
}

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss']
})
export class BeneficiaryComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: any;
  tabledata: any;
  result: any;
  loading : boolean = false;
  payeeForm: FormGroup;
  updateP:boolean = false;
  responseResult: any;
  constructor(private dialog: MatDialog, private payeeService: CommunicationService,private fb:FormBuilder, private _snackBar: MatSnackBar) {
    this.payeeForm = new FormGroup({
      accoundId: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      accoundname: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      accountifsc: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    });
  }

  ngOnInit() {
    this.getPayDetails();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  update(payeeId,accountNo,ifsc,payeeName) {
    this.updateP = true;
    this.payeeForm.value.accoundId = 'okok';
    this.payeeForm = this.fb.group(
      {
        accoundId: [accountNo],
        accoundname: [payeeName],
        accountifsc: [ifsc]
      }
    )
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  delete(event){

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.payeeForm.controls[controlName].hasError(errorName);
  }

  payee(payeeform) {
    if (this.payeeForm.valid) {
      console.log(payeeform);
      //this.openDialog();
      this.loading = true;
      this.sendPayeeDetails(payeeform.accoundname,payeeform.accoundId,'Banglore',payeeform.accountifsc,'prasath.muthaiyan@gmail.com','1')
    }
  }
  async sendPayeeDetails(payeeName, accountNo, branchName, ifsc, email, userId){
    this.responseResult = await this.payeeService.savePayeData(payeeName, accountNo, branchName, ifsc, email, userId);
    console.log(this.responseResult);
    if(this.responseResult.message == 'Success'){
    this.openDialog(this.responseResult.otpGen,this.responseResult.payeeId);
    }else{
      this.loading = false;
      this.openSnackBar('Connection Failed','Close');
    }
  }

  async getPayDetails(){
    this.tabledata = await this.payeeService.getPayeeList();
    console.log(this.tabledata);

    /*this.tabledata = [
      {position: 1, name: 'Hydrogen', weight: 10079, symbol: 'Name1'},
      {position: 2, name: 'Helium', weight: 40026, symbol: 'Name2'},
      {position: 3, name: 'Lithium', weight: 6941, symbol: 'Name3'},
      {position: 4, name: 'Beryllium', weight: 90122, symbol: 'Name14'},
      {position: 5, name: 'Boron', weight: 10811, symbol: 'Name5'},
      {position: 6, name: 'Carbon', weight: 120107, symbol: 'Name6'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'Name7'},
      {position: 8, name: 'Oxygen', weight: 159994, symbol: 'Name8'},
      {position: 9, name: 'Fluorine', weight: 189984, symbol: 'Name9'},
      {position: 10, name: 'Neon', weight: 201797, symbol: 'Name10'},
      {position: 11, name: 'Sodium', weight: 229897, symbol: 'Name11'},
      {position: 12, name: 'Magnesium', weight: 24305, symbol: 'Name12'},
      {position: 13, name: 'Aluminum', weight: 269815, symbol: 'Name13'},
      {position: 14, name: 'Silicon', weight: 280855, symbol: 'Name14'},
      {position: 15, name: 'Phosphorus', weight: 309738, symbol: 'Name15'},
      {position: 16, name: 'Sulfur', weight: 32065, symbol: 'S'},
      {position: 17, name: 'Chlorine', weight: 35453, symbol: 'Cl'},
      {position: 18, name: 'Argon', weight: 39948, symbol: 'Ar'},
      {position: 19, name: 'Potassium', weight: 390983, symbol: 'K'},
      {position: 20, name: 'Calcium', weight: 40078, symbol: 'Ca'},
    ];*/
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.tabledata);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openDialog(otp,payeeid): void {
    const dialogRef = this.dialog.open(ValidateComponent, {
      height: '200px',
      width: '500px',
      data: {otp: otp, payeeid: payeeid}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.result = result;
      if(this.result == 'NAN'){
        this.loading = false;
        this.payeeForm.reset();
        // this.formDirective.resetForm(this.payeeForm);
        Object.keys(this.payeeForm.controls).forEach(key => {
          this.payeeForm.get(key).setErrors(null) ;
        });
        this.getPayDetails();
      }else{
        this.loading = false;
      }
    });
  }
}
