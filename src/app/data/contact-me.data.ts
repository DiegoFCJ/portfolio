import { ContactMeLangs } from '../dtos/ContactMeDTO';

export const contactMeData: ContactMeLangs = {
  en: {
    title: 'Get in Touch',
    name: 'Name',
    nameReq: 'Name is required',
    email: 'Email',
    emailReq: 'A valid email is required',
    message: 'Message',
    messageReq: 'Message is required',
    sendBtn: 'Send',
    emailMessages: [
      { keyMess: 'form-miss', valueMess: 'Form data is missing' },
      { keyMess: 'all-field-req', valueMess: 'All fields are required.' },
      { keyMess: 'email-valid', valueMess: 'Please enter a valid email address.' },
      { keyMess: 'ten-char-mess', valueMess: 'Message should be at least 10 characters long.' },
      { keyMess: 'success', valueMess: 'Message sent successfully!' },
      { keyMess: 'fail-retry', valueMess: 'Failed to send the message. Please try again.' },
      { keyMess: 'err', valueMess: 'Error:' },
      { keyMess: 'err-sending', valueMess: 'An error occurred while sending the message.' },
      { keyMess: 'one-each-two', valueMess: 'You can only send one message every 2 hours. Please try again later.' }
    ]
  },
  it: {
    title: 'Contattami',
    name: 'Nome',
    nameReq: 'Il nome è obbligatorio',
    email: 'Email',
    emailReq: "È richiesta un'email valida",
    message: 'Messaggio',
    messageReq: 'Il messaggio è obbligatorio',
    sendBtn: 'Invia',
    emailMessages: [
      { keyMess: 'form-miss', valueMess: 'I dati del form sono mancanti' },
      { keyMess: 'all-field-req', valueMess: 'Tutti i campi sono obbligatori.' },
      { keyMess: 'email-valid', valueMess: "Inserisci un indirizzo email valido." },
      { keyMess: 'ten-char-mess', valueMess: 'Il messaggio deve contenere almeno 10 caratteri.' },
      { keyMess: 'success', valueMess: 'Messaggio inviato con successo!' },
      { keyMess: 'fail-retry', valueMess: 'Invio del messaggio non riuscito. Riprova.' },
      { keyMess: 'err', valueMess: 'Errore:' },
      { keyMess: 'err-sending', valueMess: "Si è verificato un errore durante l'invio del messaggio." },
      { keyMess: 'one-each-two', valueMess: 'Puoi inviare solo un messaggio ogni 2 ore. Riprova più tardi.' }
    ]
  }
};
