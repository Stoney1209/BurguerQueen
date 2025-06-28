import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { ITokenUser } from '../models/token-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_BASE = `${environment.urlServer}/auth`;

  login(email: string, password: string){
    return CapacitorHttp.post({
      url: `${this.URL_BASE}/login`,
      data: {
        email,
        password
      },
      params: {},
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( (response: HttpResponse) => {
        return response.data as ITokenUser
    })

  }


}
