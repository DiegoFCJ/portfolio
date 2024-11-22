import { Component, ViewEncapsulation } from '@angular/core';
import { SocialComponent } from '../social/social.component';
import { contactMeData } from '../../data/contact-me.data';
import { ContactMe } from '../../dtos/ContactMeDTO';
import emailjs from 'emailjs-com';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

// Importing Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Component to display the "Contact Me" section with social links and additional details.
 */
@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [
    SocialComponent,
    CommonModule,
    FormsModule, 
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent {
  /**
   * Data for the "Contact Me" section.
   */
  contactMe: ContactMe = contactMeData;

  /**
   * Handles the form submission, sending the form data to the email service.
   * @param form The form data submitted by the user.
   */
  onSubmit(form: any): void {
    emailjs.send('service_id', 'template_id', {
      name: form.name,
      email: form.email,
      message: form.message
    }, 'your_public_key')
      .then((response) => {
        alert('Message sent successfully!');
        form.reset();
      })
      .catch((error) => {
        alert('Failed to send the message. Please try again later.');
        console.error(error);
      });
  }
}