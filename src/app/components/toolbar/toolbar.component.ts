import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg,
  IonMenu,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonBadge,
  IonButton,
  MenuController
} from '@ionic/angular/standalone'
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { arrowBackOutline, cartOutline, peopleOutline } from 'ionicons/icons';
import { UserOrderService } from 'src/app/services/user-order.service';
import { ListProductsComponent } from '../list-products/list-products.component';
import { LoginComponent } from '../login/login.component';
import { Preferences } from '@capacitor/preferences';
import { KEY_TOKEN } from 'src/app/constants';
import { ToastService } from 'src/app/services/toast.service';
import { CreateAccountComponent } from '../create-account/create-account.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonImg,
    RouterLink,
    IonMenu,
    IonContent,
    TranslatePipe,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonBadge,
    ListProductsComponent,
    IonButton,
    LoginComponent,
    CreateAccountComponent
  ]
})
export class ToolbarComponent {

  private userOrderService: UserOrderService = inject(UserOrderService);
  private menuController: MenuController = inject(MenuController);
  private router: Router = inject(Router);
  private toastService: ToastService = inject(ToastService);
  private translateService: TranslateService = inject(TranslateService);

  public numProductsSignal = this.userOrderService.numProductsSignal;
  public userSignal = this.userOrderService.userSignal;

  public showOrder: boolean = false;
  public showLogin: boolean = false;
  public showNewAccount: boolean = false;

  constructor() {
    addIcons({
      peopleOutline,
      cartOutline,
      arrowBackOutline
    })
  }

  /**
   * Muestra la orden
   */
  seeOrder(){
    this.showOrder = true;
  }

  /**
   * Vuelve al principio del menu
   */
  back(){
    this.showOrder = false;
    this.showLogin = false;
    this.showNewAccount = false;
  }

  /**
   * Vamos a la ventana de pago
   */
  goToPay(){
    this.back();
    // Cerramos el menu manualmente
    this.menuController.close('content');
    this.router.navigateByUrl('/pay')
  }

  /**
   * Muestra el login
   */
  seeLogin(){
    this.showNewAccount = false;
    this.showLogin = true;
  }

  /**
   * Nos deslogueamos
   */
  logout(){
    // Eliminamos el usuario
    this.userOrderService.setUser(null);

    // Eliminamos el token
    Preferences.remove({
      key: KEY_TOKEN
    })
    this.router.navigateByUrl('categories');

    this.toastService.showToast(this.translateService.instant('label.logout.success'))
  }

  /**
   * Muestra la nueva cuenta
   */
  seeNewAccount(){
    this.showLogin = false;
    this.showNewAccount = true;
  }

}
