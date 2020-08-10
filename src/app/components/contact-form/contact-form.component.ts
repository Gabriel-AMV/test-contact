import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'
import { ContactService } from 'src/app/services/contact.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  id: number;
  justSee = false;
  contactForm: FormGroup;
  private sub: Subscription;
  constructor(private fb: FormBuilder, private contactService: ContactService,
    private alertService: AlertService, private router: Router, private ts: TranslateService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.justSee = !this.router.url.includes('edit')
    });
    if (!this.id) {
      this.contactForm = this.fb.group({
        id: 0, 
        name: ['' ,Validators.required],
        email: ['', Validators.email],
        jobInformation: '',
        numbers: this.fb.array([])
      } )
    } else {
      let contact = this.contactService.getContact(this.id);
      this.contactForm = this.fb.group({
        name: [contact.name, Validators.required],
        email: [contact.email, Validators.email],
        jobInformation: contact.jobInformation,
        numbers: this.fb.array(contact.numbers.map(cc => this.loadNumbers(cc)))
      })
    }

    if (this.justSee)
    this.contactForm.disable();
  }


  get email() {
    return this.contactForm.get('email');
  }

  get name() {
    return this.contactForm.get('name');
  }

  get numbersForms() {
    return this.contactForm.get('numbers') as FormArray
  }

  loadNumbers(cc: string) {
    return this.fb.group({
      number: [cc['number'], [Validators.required]]
    })
  }
  addNumber() {
    /*
    Validators.pattern('[0-9]{10}')
    Conforme a la validación de número, se puede cambiar completamente simplemente inyectando otro regular expression pero debido a tiempo
    y complejidad que puede tener ese tipo de expression (dependiendo de la lógica de negocio puede variar de números nacionales a internacionales)
    dejaré un mock con una validacion que solo acepte 10 numeros cuales quiera.
    */
    const number = this.fb.group({
      number: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    })
    this.numbersForms.push(number)
  }

  deleteNumber(i) {
    this.numbersForms.removeAt(i);
  }

  save() {
    console.log(this.numbersForms)
    console.log(this.numbersForms.controls.length)
    if (!this.id)
      this.contactService.createContact(this.contactForm.value)
    else
      this.contactService.editContact({ id: this.id, ...this.contactForm.value })

    this.alertService.presentAlert(this.ts.instant('goodJob'), this.ts.instant('savedContact'), 'home');
  }

}
