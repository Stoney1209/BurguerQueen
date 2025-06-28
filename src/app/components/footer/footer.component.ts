import { Component, OnInit } from '@angular/core';
import {
  IonFooter,
  IonToolbar,
  IonTitle
} from '@ionic/angular/standalone'
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    IonFooter,
    IonToolbar,
    IonTitle,
    TranslatePipe
  ]
})
export class FooterComponent {

}
