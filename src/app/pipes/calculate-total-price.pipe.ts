import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';
import { calculateTotalPrice } from '../utils/calculate-total.util';

@Pipe({
  name: 'calculateTotalPrice',
  pure: false
})
export class CalculateTotalPricePipe implements PipeTransform {

  transform(product: IProduct, quantity: number): number {
    return calculateTotalPrice(product, quantity);
  }

}
