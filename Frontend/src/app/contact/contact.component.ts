import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  send(form: NgForm) {
    this.contactService.sendMail(form.value.fullName, form.value.email, form.value.subject, form.value.message);
  }

}
