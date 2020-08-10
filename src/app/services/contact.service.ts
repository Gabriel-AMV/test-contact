import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { HttpClient } from '@angular/common/http';
import { LoadFrom } from '../models/LoadFrom.enum';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  constructor(private http: HttpClient) { }

  createContact( contact: Partial<Contact> ) {
    const newContact = new Contact(contact as Contact);
    this.contacts.push( newContact );
    this.saveInStorage();
    return newContact.id;
  }

  editContact( contact: Partial<Contact> ) {
    const index =  this.contacts.findIndex( c => c.id==contact.id)
    console.log(contact)
    console.log(index)
    this.contacts[index].email = contact.email
    this.contacts[index].name = contact.name
    this.contacts[index].numbers = contact.numbers
    this.contacts[index].jobInformation = contact.jobInformation
    this.saveInStorage();
  }

  deleteContact( contact: Contact ) {
    this.contacts = this.contacts.filter( contactData => contactData.id !== contact.id );
    this.saveInStorage();
  }


  getContact( id: string | number ) {
    id = Number(id);
    return this.contacts.find(  contactData => contactData.id === id );
  }

  saveInStorage(){
      localStorage.setItem('data', JSON.stringify(this.contacts) );
  }

  loadStorage(from: LoadFrom) {
    if (from == LoadFrom.FromJSON)
    this.getDummyData().then(x=> {
      this.contacts = x;
    })
    else
    if ( localStorage.getItem('data') ) {
      this.contacts = JSON.parse( localStorage.getItem('data') );
    } else {
      this.contacts = [];
    }
  }

  getDummyData(route: string = "./assets/exampleData/dummyData.json"): Promise<any> {
    return this.http.get(route)
     .toPromise()
     .then(response => response)
     .catch(console.log);
  }
}
