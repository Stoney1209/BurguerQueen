import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';

import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonList,
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
  IonButton
} from '@ionic/angular/standalone'
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { IQuantityProduct } from 'src/app/models/quantity-product.model';
import { CalculateTotalPricePipe } from 'src/app/pipes/calculate-total-price.pipe';
import { ExtrasSelectedPipe } from 'src/app/pipes/extras-selected.pipe';
import { AlertService } from 'src/app/services/alert.service';
import { UserOrderService } from 'src/app/services/user-order.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    TranslatePipe,
    IonList,
    ExtrasSelectedPipe,
    IonCard,
    IonCardContent,
    IonIcon,
    IonText,
    CalculateTotalPricePipe,
    IonButton
  ]
})
export class ListProductsComponent {

  private userOrderService: UserOrderService = inject(UserOrderService);
  private alertService: AlertService = inject(AlertService);

  @Input() showButtonPay: boolean = true;

  @Output() pay: EventEmitter<void> = new EventEmitter<void>();

  public totalOrderSignal = this.userOrderService.totalOrderSignal;
  public productsSignal = this.userOrderService.productsSignal;

  constructor() {
    addIcons({
      removeCircleOutline,
      addCircleOutline
    })
  }

  /**
   * Restamos en uno el producto. Si queda 1, mostramos un mensaje de confirmacion para eliminarlo
   * @param quantityProduct 
   */
  oneLessProduct(quantityProduct: IQuantityProduct) {
    if (quantityProduct.quantity == 1) {
      this.alertService.alertConfirm(
        'Confirmación',
        '¿Quieres borrar el producto de la orden?',
        () => this.userOrderService.oneLessProduct(quantityProduct.product)
      )
    } else {
      this.userOrderService.oneLessProduct(quantityProduct.product);
    }
  }

  /**
  * Aumentamos en uno el producto.
  * @param quantityProduct 
  */
  oneMoreProduct(quantityProduct: IQuantityProduct) {
    this.userOrderService.oneMoreProduct(quantityProduct.product);
  }

  /**
   * Emite el evento de que hemos hecho click en pagar
   */
  clickPay() {
    this.pay.emit();
  }

}
