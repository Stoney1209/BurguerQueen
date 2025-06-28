import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment.prod';
import { ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private URL_BASE = `${environment.urlServer}/categories`; 

  getCategories(){
    return CapacitorHttp.get({
      url: this.URL_BASE,
      params: {},
      headers: {
        'Content-type': 'application/json'
      }
    }).then( (response: HttpResponse) => {
      return response.data as ICategory[];
    })
  }


}
