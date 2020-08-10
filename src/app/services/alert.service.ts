import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController, private router: Router) { }

  async presentAlert(title: string, message: string, route: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: [{
        text: 'Okay',
        handler: () => {
          this.router.navigate([route]);
        }
      }],
    });

    await alert.present();
  }

  async presentAlertConfirm(title: string, message: string, handler) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: handler
        }
      ]
    })
    await alert.present();
  };

  }
