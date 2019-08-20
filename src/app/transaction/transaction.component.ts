import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataserviceService} from '../service/dataservice.service';
import {CommunicationService} from '../communicationservice/communication.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'action','position'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: any;
  tabledata: any;
  message: any;

  constructor(private data: DataserviceService, private communication: CommunicationService) {
  }

  ngOnInit() {
    this.getAllTransaction('123')
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getAllTransaction(userId){
    this.tabledata = await this.communication.getTransaction(userId);

    this.data.currentMessage.subscribe(message => this.message = message);
    /*this.tabledata = [
      {position: 1, name: 'Prasath', weight: 10079, symbol: 'Success'},
      {position: 2, name: 'Helium', weight: 40026, symbol: 'Failed'},
      {position: 3, name: 'Lithium', weight: 6941, symbol: 'Success'},
      {position: 4, name: 'Beryllium', weight: 90122, symbol: 'Success'},
      {position: 5, name: 'Boron', weight: 10811, symbol: 'Success'},
      {position: 6, name: 'Carbon', weight: 120107, symbol: 'Success'},
      {position: 7, name: 'Nitrogen', weight: 140067, symbol: 'Success'},
      {position: 8, name: 'Oxygen', weight: 159994, symbol: 'Success'},
      {position: 9, name: 'Fluorine', weight: 189984, symbol: 'Success'},
      {position: 10, name: 'Neon', weight: 201797, symbol: 'Success'},
      {position: 11, name: 'Sodium', weight: 229897, symbol: 'Success'},
      {position: 12, name: 'Magnesium', weight: 24305, symbol: 'Success'},
      {position: 13, name: 'Aluminum', weight: 269815, symbol: 'Success'},
      {position: 14, name: 'Silicon', weight: 280855, symbol: 'Success'},
      {position: 15, name: 'Phosphorus', weight: 309738, symbol: 'Success'},
      {position: 16, name: 'Sulfur', weight: 32065, symbol: 'Success'},
      {position: 17, name: 'Chlorine', weight: 35453, symbol: 'Success'},
      {position: 18, name: 'Argon', weight: 39948, symbol: 'Success'},
      {position: 19, name: 'Potassium', weight: 390983, symbol: 'Success'},
      {position: 20, name: 'Calcium', weight: 40078, symbol: 'Success'},
    ];*/
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.tabledata);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  open(event) {

  }


}
