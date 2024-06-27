import { Injectable } from '@nestjs/common';
import { IContact } from 'src/interfaces/contact.interface';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  contacts: IContact[];
  constructor() {
    this.contacts = [];
  }
  async getContacts(): Promise<IContact[]> {
    return this.contacts;
  }

  getContact(contactId): IContact {
    return this.contacts.find((contact) => contact.id === contactId);
  }

  async addContact(createContactDTO: CreateContactDto) {
    this.contacts.push(createContactDTO);
  }
}
