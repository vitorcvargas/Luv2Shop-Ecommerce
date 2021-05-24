import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];
  sessionStorage: Storage = sessionStorage;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 1;

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {

    this.handleOrderHistory();
  }

  handleOrderHistory(){

    const userEmail = JSON.parse(this.sessionStorage.getItem("userEmail"));

    this.orderHistoryService.gerOrderHistory(userEmail, this.pageNumber - 1, this.pageSize)
                                            .subscribe(this.processResult());
  }

  updatePageSize(pageSize: Event){

    this.pageSize = +(pageSize.currentTarget as HTMLInputElement).value;
    this.pageNumber = 1;
    this.handleOrderHistory();
  }
  
  processResult(){

    return (data:any) => {

      this.orderHistoryList = data.orderList;
      this.pageNumber = data.pagination.pageNumber + 1;
      this.pageSize = data.pagination.pageSize;
      this.totalElements = data.pagination.totalElements;

      console.log("Processing data... Order History List = " + `${this.orderHistoryList}`)
    };
  }

}
