import {Component, Inject} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {TransactionComponent} from '../transaction/transaction.component';

@Component ({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  oK: any = {ok: 'prasath'};
  mobile: any;
  animal: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private dialog: MatDialog) {
    this.mobile = window.screen.width === 360;
    /*
        if (window.screen.width === 360) { // 768px portrait
          this.mobile = true;
        }*/
  }

  redirect() {
    // this.router.navigateByData({ url: ['main'], data: this.oK });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TransactionComponent, {
      height: '400px',
      width: '600px',
      data: {name: 'prasath', animal: 'lion'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
