import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform} from '@ionic/angular'
import { Device, GetLanguageCodeResult } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Network } from '@capacitor/network';
import { Router } from '@angular/router';
import config from 'capacitor.config';
import { UserOrderService } from './services/user-order.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp, 
    IonRouterOutlet,
    ToolbarComponent,
    FooterComponent
  ],
})
export class AppComponent implements OnInit {
 
  private platform = inject(Platform);
  private translateService = inject(TranslateService);
  private router: Router = inject(Router);
  private userOrderService: UserOrderService = inject(UserOrderService);
  public loadSignal: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
  
    this.platform.ready().then( async () => {

      // Obtenemos el codigo del lenguaje
      const language: GetLanguageCodeResult = await Device.getLanguageCode();

      if(language.value){
        this.translateService.use(language.value);
      }

      this.checkNetWork();

      // iniciamos la orden
      await this.userOrderService.initOrder();

      // habilitamos CapacitorHttp para evitar problemas con ngx-translate
      config.plugins!.CapacitorHttp!.enabled = true;

      // Indicamos que esta cargado
      this.loadSignal.set(true);
    })
  
  }

  checkNetWork(){
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      // Sino esta conectado, lo redirigiremos a la pagina de "not-network"
      if(!status.connected){
        this.router.navigateByUrl('/not-network')
      }else if(status.connected && this.router.url == '/not-network') { // solo si esta conectado y estao en "not-network"
        this.router.navigateByUrl('/categories')
      }
    });
  }

}
