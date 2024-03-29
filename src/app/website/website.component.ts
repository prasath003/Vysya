import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {

  constructor(private route: Router) {}
  openRegisteration() {
    this.route.navigate(['/sign']);
    // this.route.navigateByUrl('/sign');
  }
  openLogin() {
    this.route.navigate(['/sign']);
    // this.route.navigateByUrl('/sign');
  }

  ngOnInit() {
  }

}
