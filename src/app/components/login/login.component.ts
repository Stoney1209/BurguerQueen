import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone'
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { KEY_TOKEN } from 'src/app/constants';
import { ITokenUser } from 'src/app/models/token-user.model';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserOrderService } from 'src/app/services/user-order.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    TranslatePipe,
    IonButton
  ]
})
export class LoginComponent {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private toastService: ToastService = inject(ToastService);
  private translateService: TranslateService = inject(TranslateService);
  private usersService: UsersService = inject(UsersService);
  private userOrderService: UserOrderService = inject(UserOrderService);

  @Input() showButtonBack: boolean = false;

  @Output() doLogin: EventEmitter<void> = new EventEmitter<void>();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() newAccount: EventEmitter<void> = new EventEmitter<void>();

  // formulario
  public formLogin: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  /**
   * Hacemos login con un usuario/password
   */
  login() {

    // Obtenemos el usuario
    const user: IUser = this.formLogin.value;

    console.log(user);

    this.authService.login(user.email, user.password).then(async (token: ITokenUser) => {

      if (token) {
        this.toastService.showToast(this.translateService.instant('label.login.success'))

        // guardamos el token
        await Preferences.set({
          key: KEY_TOKEN,
          value: token.accessToken
        })

        // Obtenemos el usuario actual con toda la informacion
        const userDB = await this.usersService.getUser(user.email);
        console.log(userDB);

        // Seteamos el usuario en la orden
        this.userOrderService.setUser(userDB);

        this.doLogin.emit();

      } else {
        this.toastService.showToast(this.translateService.instant('label.login.error'))
      }

    }).catch(err => {
      this.toastService.showToast(this.translateService.instant('label.login.error'))
    })

  }

  /**
    * Emite el evento de que hemos hecho click en volver
    */
  exit() {
    this.back.emit();
  }

  /**
   * Emite el evento de que hemos hecho click en crear una nueva cuenta
   */
  createNewAccount() {
    this.newAccount.emit();
  }

}
