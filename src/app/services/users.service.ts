import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';
import { KEY_TOKEN } from '../constants';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URL_BASE = `${environment.urlServer}/users`;

  async getUser(email: string){

    const token = await Preferences.get({
      key: KEY_TOKEN
    });

    return CapacitorHttp.get({
      url: this.URL_BASE,
      params: {
        email
      },
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      }
    }).then( (response: HttpResponse) => {
      return response.data as IUser
    })

  }

  createUser(user: IUser){
    return CapacitorHttp.post({
      url: this.URL_BASE,
      params: {},
      data: {
        ...user
      },
      headers: {
        'Content-type': 'application/json'
      }
    }).then( (response: HttpResponse) => {
      return response.data as IUser
    })
  }

}
