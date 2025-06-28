import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreatePaymentIntent } from '../models/create-payment-intent.model';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { IPayment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private URL_BASE = `${environment.urlServer}/stripe`;

  createPaymentIntent(paymentIntent: ICreatePaymentIntent){
    return CapacitorHttp.post({
      url: `${this.URL_BASE}/intent`,
      params: {},
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${paymentIntent.secretKey}`
      },
      data: {
        ...paymentIntent
      }
    }).then( (response: HttpResponse ) => {
      return response.data as IPayment;
    })

  }


}
