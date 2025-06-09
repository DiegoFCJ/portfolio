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
    title: 'Mettiti in contatto',
    name: 'Nome',
    nameReq: 'Il nome è obbligatorio',
    email: 'Email',
    emailReq: 'È richiesta una email valida',
    message: 'Messaggio',
    messageReq: 'Il messaggio è obbligatorio',
    sendBtn: 'Invia',
    emailMessages: [
      { keyMess: 'form-miss', valueMess: 'I dati del modulo mancano' },
      { keyMess: 'all-field-req', valueMess: 'Tutti i campi sono obbligatori.' },
      { keyMess: 'email-valid', valueMess: 'Inserisci un indirizzo email valido.' },
      { keyMess: 'ten-char-mess', valueMess: 'Il messaggio deve contenere almeno 10 caratteri.' },
      { keyMess: 'success', valueMess: 'Messaggio inviato con successo!' },
      { keyMess: 'fail-retry', valueMess: 'Impossibile inviare il messaggio. Riprova più tardi.' },
      { keyMess: 'err', valueMess: 'Errore:' },
      { keyMess: 'err-sending', valueMess: 'Si è verificato un errore durante l\'invio del messaggio.' },
      { keyMess: 'one-each-two', valueMess: 'Puoi inviare un messaggio ogni 2 ore. Riprova più tardi.' }
    ]
  },
  de: {
    title: 'Kontakt aufnehmen',
    name: 'Name',
    nameReq: 'Name ist erforderlich',
    email: 'E-Mail',
    emailReq: 'Eine gültige E-Mail ist erforderlich',
    message: 'Nachricht',
    messageReq: 'Nachricht ist erforderlich',
    sendBtn: 'Senden',
    emailMessages: [
      { keyMess: 'form-miss', valueMess: 'Formulardaten fehlen' },
      { keyMess: 'all-field-req', valueMess: 'Alle Felder sind erforderlich.' },
      { keyMess: 'email-valid', valueMess: 'Bitte eine gültige E-Mail eingeben.' },
      { keyMess: 'ten-char-mess', valueMess: 'Die Nachricht muss mindestens 10 Zeichen lang sein.' },
      { keyMess: 'success', valueMess: 'Nachricht erfolgreich gesendet!' },
      { keyMess: 'fail-retry', valueMess: 'Nachricht konnte nicht gesendet werden. Bitte erneut versuchen.' },
      { keyMess: 'err', valueMess: 'Fehler:' },
      { keyMess: 'err-sending', valueMess: 'Beim Senden der Nachricht ist ein Fehler aufgetreten.' },
      { keyMess: 'one-each-two', valueMess: 'Nur eine Nachricht alle 2 Stunden erlaubt. Bitte später erneut versuchen.' }
    ]
  },
  es: {
    title: 'Ponte en contacto',
    name: 'Nombre',
    nameReq: 'El nombre es obligatorio',
    email: 'Correo',
    emailReq: 'Se requiere un correo válido',
    message: 'Mensaje',
    messageReq: 'El mensaje es obligatorio',
    sendBtn: 'Enviar',
    emailMessages: [
      { keyMess: 'form-miss', valueMess: 'Faltan datos del formulario' },
      { keyMess: 'all-field-req', valueMess: 'Todos los campos son obligatorios.' },
      { keyMess: 'email-valid', valueMess: 'Por favor introduce un correo válido.' },
      { keyMess: 'ten-char-mess', valueMess: 'El mensaje debe tener al menos 10 caracteres.' },
      { keyMess: 'success', valueMess: '¡Mensaje enviado con éxito!' },
      { keyMess: 'fail-retry', valueMess: 'No se pudo enviar el mensaje. Inténtalo de nuevo.' },
      { keyMess: 'err', valueMess: 'Error:' },
      { keyMess: 'err-sending', valueMess: 'Se produjo un error al enviar el mensaje.' },
      { keyMess: 'one-each-two', valueMess: 'Solo puedes enviar un mensaje cada 2 horas. Inténtalo más tarde.' }
    ]
  }
};
