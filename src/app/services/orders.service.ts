import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrder } from '../models/order.model';
import { Preferences } from '@capacitor/preferences';
import { KEY_TOKEN } from '../constants';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private URL_BASE = `${environment.urlServer}/orders`;

  async createOrder(order: IOrder) {

    const token = await Preferences.get({ key: KEY_TOKEN });

    return CapacitorHttp.post({
      url: this.URL_BASE,
      data: {
        ...order
      },
      params: {},
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      }
    }).then( (response: HttpResponse) => {
      return response.data as IOrder;
    })

  }
}
