import {Component, OnInit} from '@angular/core';
import {ValidateComponent} from '../validate/validate.component';
import {MatDialog} from '@angular/material';
import {PaymentComponent} from '../payment/payment.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  products: any;
  productPay: any = 0;
  productArray: any;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.productArray = [];
    this.products = [{'productName': 'Television','image':'television.jpg', 'productId': '1', 'productType': 'Electronics', 'productAmount': 1000},
      {'productName': 'Trimmer','image':'trimmer.jpg', 'productId': '2', 'productType': 'Electronics', 'productAmount': 1500},
      {'productName': 'Laptop', 'image':'laptop.jpg','productId': '3', 'productType': 'Electronics', 'productAmount': 40000},
      {'productName': 'Mobile', 'image':'mobile.jpg','productId': '4', 'productType': 'Electronics', 'productAmount': 1200},
      {'productName': 'Remote', 'image':'remote.jpg','productId': '5', 'productType': 'Electronics', 'productAmount': 500},
      {'productName': 'HeadPhone', 'image':'headphone.jpg','productId': '6', 'productType': 'Electronics', 'productAmount': 2800}
    ];
  }


  addremoveProduct(productamount) {
    if (this.productArray.indexOf(productamount) > -1) {
      if (this.productPay === -0) {
        this.productPay = 0;
      }
      this.productArray.splice(this.productArray.indexOf(productamount), 1);
      this.productPay = this.productPay - productamount;
    } else {
      this.productArray.push(productamount);
      this.productArray.push(productamount);
      this.productPay = this.productPay + productamount;
    }
  }

  buyProducts() {
    this.openDialog(this.productPay);
  }

  openDialog(otp): void {
    const dialogRef = this.dialog.open(PaymentComponent, {
      height: '500px',
      width: '500px',
      data: {creditAmount: otp}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.productPay = 0;
      this.productArray = [];

    });
  }

}
