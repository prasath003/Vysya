import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreditCardDirectivesModule } from 'angular-cc-library';

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatProgressBarModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatSelectModule, MatSnackBarModule, MatCheckboxModule, MatExpansionModule
} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebsiteComponent } from './website/website.component';
import { RegisterloginComponent } from './registerlogin/registerlogin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { FundtransferComponent } from './fundtransfer/fundtransfer.component';
import { TransactionComponent } from './transaction/transaction.component';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { ValidateComponent } from './validate/validate.component';
import {HttpClientModule} from '@angular/common/http';
import { ShoppingComponent } from './shopping/shopping.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    WebsiteComponent,
    RegisterloginComponent,
    NavbarComponent,
    AccountdetailsComponent,
    FundtransferComponent,
    TransactionComponent,
    BeneficiaryComponent,
    ValidateComponent,
    ShoppingComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatExpansionModule,
    CreditCardDirectivesModule
  ],
  entryComponents : [
    ValidateComponent,
    PaymentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
