import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonInput
} from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CreateAccountComponent } from 'src/app/components/create-account/create-account.component';
import { ListProductsComponent } from 'src/app/components/list-products/list-products.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { UserOrderService } from 'src/app/services/user-order.service';
import { PaymentSheetEventsEnum, PaymentSheetResultInterface, Stripe } from '@capacitor-community/stripe'
import { environment } from 'src/environments/environment';
import { ICreatePaymentIntent } from 'src/app/models/create-payment-intent.model';
import { StripeService } from 'src/app/services/stripe.service';
import { IPayment } from 'src/app/models/payment.model';
import { ToastService } from 'src/app/services/toast.service';
import { OrdersService } from 'src/app/services/orders.service';
import { IOrder } from 'src/app/models/order.model';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    LoginComponent,
    CreateAccountComponent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    TranslatePipe,
    IonCardContent,
    IonButton,
    IonItem,
    ListProductsComponent,
    IonRadioGroup,
    IonRadio,
    FormsModule,
    IonInput
  ]
})
export class PayPage {

  private userOrderService: UserOrderService = inject(UserOrderService);
  private router: Router = inject(Router);
  private stripeService: StripeService = inject(StripeService);
  private toastService: ToastService = inject(ToastService);
  private translateService: TranslateService = inject(TranslateService);
  private ordersService: OrdersService = inject(OrdersService);

  public userSignal = this.userOrderService.userSignal;
  public numProductsSignal = this.userOrderService.numProductsSignal;
  public totalOrderSignal = this.userOrderService.totalOrderSignal;

  public showCreateAccount: boolean = false;
  public step: number = 1;
  public address: string = '';
  public showNewAddress: boolean = false;

  ionViewWillEnter() {
    this.step = 1;
    this.setAddressDefault();
    Stripe.initialize({
      publishableKey: environment.stripe.publishKey
    })
  }

  /**
   * Vuelve a categorias
   */
  backHome() {
    this.router.navigateByUrl('categories')
  }

  /**
   * Mostramos la creación de la cuenta
   */
  newAccount() {
    this.showCreateAccount = true;
  }

  /**
   * Mostramos el login
   */
  seeLogin() {
    this.showCreateAccount = false;
  }

  /**
   * Vamos al siguiente paso
   */
  nextStep() {
    this.step += 1;
  }

  /**
   * Vamos al paso previo
   */
  previousStep() {
    this.step -= 1;
  }

  /**
   * Seteamos la direccion por defecto del usuario
   */
  setAddressDefault() {
    this.address = this.userSignal() ? this.userSignal()!.address! : '';
    this.showNewAddress = false;
  }

  /**
   * Evento al cambiar de opcion de direccion
   * @param event 
   */
  changeOptionAddress(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
    // Opcion elegida
    switch (target.value) {
      case 'address-default':
        this.setAddressDefault();
        break;
      case 'choose-address':
        this.address = '';
        this.showNewAddress = true;
        break;
    }
  }

  payWithStripe() {

    // Obtenemos el total de la orden
    const total = this.totalOrderSignal() * 100;

    // Preparamos el pago
    const paymentIntent: ICreatePaymentIntent = {
      secretKey: environment.stripe.secretKey,
      amount: +total.toFixed(0),
      currency: 'EUR',
      customer_id: environment.stripe.customerId
    }

    this.stripeService.createPaymentIntent(paymentIntent).then(async (payment: IPayment) => {

      // Creamos via stripe, el formulario de pago
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: payment.paymentIntentClientSecret,
        customerEphemeralKeySecret: payment.ephemeralKey,
        customerId: payment.customer,
        merchantDisplayName: 'Burguer Queen' // Sin este, no se mostrará el formulario
      })

      // Muestra el formulario de pago de stripe
      await Stripe.presentPaymentSheet().then((result: {
        paymentResult: PaymentSheetResultInterface
      }) => {
        console.log(result);
        // Si todo va bien crea la orden
        if (result.paymentResult == PaymentSheetEventsEnum.Completed) {
          this.createOrder();
        } else if (result.paymentResult == PaymentSheetEventsEnum.Failed) {
          this.toastService.showToast(this.translateService.instant('label.pay.fail'))
        }
      })


    })

  }

  createOrder() {

    // Seteamos la direccion en la orden
    this.userOrderService.setAddress(this.address);

    // Obtenemos la orden
    const order = this.userOrderService.getOrder();

    // Creamos la orden
    this.ordersService.createOrder(order).then((order: IOrder) => {
      console.log(order);
      this.toastService.showToast(this.translateService.instant('label.pay.success', { address: this.address }))

      // Reseteamos la orden
      this.userOrderService.resetOrder();
      this.router.navigateByUrl('categories')

    }).catch(err => {
      this.toastService.showToast(this.translateService.instant('label.pay.fail'))
    })

  }

}
