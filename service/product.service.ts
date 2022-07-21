import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
// @ts-ignore
import {Product} from "../model/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API = 'http://localhost:8083/products'

  constructor(private httpClient : HttpClient) { }

  findAll(): Observable<Product[]>{
    // @ts-ignore
    return this.httpClient.get(this.API);
  }

  save(product:Product): Observable<any> {
    return this.httpClient.post(this.API,product)
  }

  getById(id: any): Observable<Product> {
    return this.httpClient.get<Product>(this.API + `/${id}`);
  }

  edit(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.API}/${id}`, product);
  }
  delete(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(this.API + `/${id}`);
  }

  searchByName(name:string) : Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.API + `/search-by-name?name=${name}`);
  }

  getByCategoryId(id: number): Observable<Product>{
    return this.httpClient.get<Product>(this.API + `/category/${id}`);
  }

  getByPriceBetween(from: any, to: any): Observable<Product>{
    return this.httpClient.get<Product>(this.API + `/by-price-between?from=${from}&&to=${to}`)
  }


}
