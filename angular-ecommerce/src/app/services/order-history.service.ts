import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderBaseUrl: string = "http://localhost:8080/api/orders";

  constructor(private httpClient: HttpClient) { }

  gerOrderHistory(
    email: string,
    pageNumber: number,
    pageSize: number
    ): Observable<OrderHistoryPaginatedDTO>{

    const orderHistoryUrl = `${this.orderBaseUrl}/search/findByCustomerEmail/${email}/${pageNumber}/${pageSize}`;

    return this.httpClient.get<OrderHistoryPaginatedDTO>(orderHistoryUrl);
  }
}

interface OrderHistoryPaginatedDTO{

  orderHistory: OrderHistory[],
  pagination: {
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number
  }
}