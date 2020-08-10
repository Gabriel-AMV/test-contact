import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactPageRoutingModule } from './contact-routing.module';

import { ContactPage } from './contact.page';
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    ContactPage,
    ContactFormComponent,
    ]
})
export class ContactPageModule {}
