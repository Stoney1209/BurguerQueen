import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL_BASE = `${environment.urlServer}/products`;

  getProductsByCategory(idCategory: string) {
    return CapacitorHttp.get({
      url: `${this.URL_BASE}/category/${idCategory}`,
      params: {},
      headers: {
        'Content-type': 'application/json'
      }
    }).then((response: HttpResponse) => {
      return response.data as IProduct[];
    })
  }

  getProduct(idProduct: string) {
    return CapacitorHttp.get({
      url: `${this.URL_BASE}/${idProduct}`,
      params: {},
      headers: {
        'Content-type': 'application/json'
      }
    }).then((response: HttpResponse) => {
      return response.data as IProduct;
    })
  }

}
