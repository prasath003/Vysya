import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WebsiteComponent} from './website/website.component';
import {RegisterloginComponent} from './registerlogin/registerlogin.component';
import {AccountdetailsComponent} from './accountdetails/accountdetails.component';
import {TransactionComponent} from './transaction/transaction.component';
import {FundtransferComponent} from './fundtransfer/fundtransfer.component';
import {BeneficiaryComponent} from './beneficiary/beneficiary.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ShoppingComponent} from './shopping/shopping.component';


const routes: Routes = [{
  path: '',
  component: WebsiteComponent,
  data: {admin: 'admin'}
}, {
  path: 'sign',
  component: RegisterloginComponent,
  data: {admin: 'admin'}
}, {
  path: 'nav',
  component: NavbarComponent,
  data: {admin: 'admin'},
  children: [
    {
      path: '',
      component: AccountdetailsComponent,
      data: {admin: 'admin'}
    }, {
      path: 'account',
      component: AccountdetailsComponent,
      data: {admin: 'admin'}
    }, {
      path: 'shop',
      component: ShoppingComponent,
      data: {admin: 'admin'}
    }, {
      path: 'history',
      component: TransactionComponent,
      data: {admin: 'admin'}
    }, {
      path: 'transfer',
      component: FundtransferComponent,
      data: {admin: 'admin'}
    }, {
      path: 'payee',
      component: BeneficiaryComponent,
      data: {admin: 'admin'}
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
