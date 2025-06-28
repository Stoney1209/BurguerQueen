import { inject, Injectable } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertController: AlertController = inject(AlertController)

  async alertMessage(
    header: string,
    message: string
  ) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    })
    await alert.present();
  }

  async alertConfirm(
    header: string,
    message: string,
    functionOk: Function,
    cancelText: string = 'Cancelar',
    confirmText: string = 'Confirmar',
  ) {

    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
          handler: () => { }
        },
        {
          text: confirmText,
          role: 'confirm',
          handler: () => {
            functionOk();
          }
        }
      ]
    })
    await alert.present();
  }

  async alertInput(
    header: string,
    message: string,
    inputs: AlertInput[],
    cancelText: string = 'Cancelar',
    acceptText: string = 'Aceptar'
  ) {

    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
          handler: () => { }
        },
        {
          text: acceptText,
          role: 'confirm',
          handler: (data) => {
            return data
          }
        }
      ],
      inputs
    })
    await alert.present();
    return alert;
  }
}
