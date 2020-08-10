export class Contact {

    id: number;
    name: string;
    email: string;
    jobInformation: string;
    numbers: [];

    constructor( contact: Contact) {
        this.id = new Date().getTime();
        this.name = contact.name;
        this.email = contact.email,
        this.jobInformation = contact.jobInformation,
        this.numbers = contact.numbers;
    }
}

