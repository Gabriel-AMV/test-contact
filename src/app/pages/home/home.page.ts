import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { IonList } from '@ionic/angular';
import { LoadFrom } from 'src/app/models/LoadFrom.enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild( IonList ) lista: IonList;
  constructor(private router: Router, private contactService: ContactService, private alertService: AlertService, private ts: TranslateService) {}

  ngOnInit(){
    // Para cambiar de localStorage a JSON File se utiliza el enum LoadFrom (cambiar a propiedad FromJSON)
    // Si se desea cambiar el json por default, vaya a contact.service
    this.contactService.loadStorage(LoadFrom.FromJSON);
    console.log(this.contactService.contacts)
  }
  addContact(){
    this.router.navigate(['/contact'])
  }

  deleteContact(contact: Contact) {
    this.alertService.presentAlertConfirm(this.ts.instant('deleteContact'),this.ts.instant('sureDeleteContact'), ()=> this.contactService.deleteContact(contact))
  }

  editContact(contact: Contact) {
    this.router.navigate(['contact/edit/'+contact.id])
    this.lista.closeSlidingItems();
  }

}
