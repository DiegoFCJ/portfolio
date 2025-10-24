import { ContactMeLangs } from '../dtos/ContactMeDTO';

export const contactMeData: ContactMeLangs = {
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
      { keyMess: 'form-miss', valueMess: 'I dati del form sono mancanti.' },
      { keyMess: 'all-field-req', valueMess: 'Tutti i campi sono obbligatori.' },
      { keyMess: 'email-valid', valueMess: "Inserisci un indirizzo email valido." },
      { keyMess: 'ten-char-mess', valueMess: 'Il messaggio deve contenere almeno 10 caratteri.' },
      { keyMess: 'success', valueMess: 'Messaggio inviato con successo!' },
      { keyMess: 'fail-retry', valueMess: 'Invio non riuscito. Riprova, per favore.' },
      { keyMess: 'err', valueMess: 'Errore:' },
      { keyMess: 'err-sending', valueMess: "Si è verificato un errore durante l'invio del messaggio." },
      { keyMess: 'formspree-disabled', valueMess: 'Formspree non è configurato. Abilita il servizio prima di inviare.' },
      { keyMess: 'one-each-two', valueMess: 'Puoi inviare solo un messaggio ogni 2 ore. Riprova più tardi.' }
    ]
  },
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
      { keyMess: 'formspree-disabled', valueMess: 'Formspree is not configured. Enable the service before sending.' },
      { keyMess: 'one-each-two', valueMess: 'You can only send one message every 2 hours. Please try again later.' }
    ]
  },
  de: {
    title: 'Kontakt aufnehmen',
    name: 'Name',
    nameReq: 'Name ist erforderlich',
    email: 'E-Mail',
    emailReq: 'Eine gültige E-Mail-Adresse ist erforderlich',
    message: 'Nachricht',
    messageReq: 'Nachricht ist erforderlich',
    sendBtn: 'Senden',
    emailMessages: [
      { keyMess: 'form-miss', valueMess: 'Formulardaten fehlen.' },
      { keyMess: 'all-field-req', valueMess: 'Alle Felder sind erforderlich.' },
      { keyMess: 'email-valid', valueMess: 'Bitte gib eine gültige E-Mail-Adresse ein.' },
      { keyMess: 'ten-char-mess', valueMess: 'Die Nachricht muss mindestens 10 Zeichen enthalten.' },
      { keyMess: 'success', valueMess: 'Nachricht erfolgreich gesendet!' },
      { keyMess: 'fail-retry', valueMess: 'Senden fehlgeschlagen. Bitte versuche es erneut.' },
      { keyMess: 'err', valueMess: 'Fehler:' },
      { keyMess: 'err-sending', valueMess: 'Beim Senden der Nachricht ist ein Fehler aufgetreten.' },
      { keyMess: 'formspree-disabled', valueMess: 'Formspree ist nicht konfiguriert. Aktiviere den Dienst, bevor du sendest.' },
      { keyMess: 'one-each-two', valueMess: 'Du kannst nur alle 2 Stunden eine Nachricht senden. Bitte versuche es später noch einmal.' }
    ]
  },
  es: {
    title: 'Ponte en contacto',
    name: 'Nombre',
    nameReq: 'El nombre es obligatorio',
    email: 'Correo electrónico',
    emailReq: 'Se requiere un correo electrónico válido',
    message: 'Mensaje',
    messageReq: 'El mensaje es obligatorio',
    sendBtn: 'Enviar',
    emailMessages: [
      { keyMess: 'form-miss', valueMess: 'Faltan los datos del formulario.' },
      { keyMess: 'all-field-req', valueMess: 'Todos los campos son obligatorios.' },
      { keyMess: 'email-valid', valueMess: 'Introduce una dirección de correo válida.' },
      { keyMess: 'ten-char-mess', valueMess: 'El mensaje debe tener al menos 10 caracteres.' },
      { keyMess: 'success', valueMess: '¡Mensaje enviado con éxito!' },
      { keyMess: 'fail-retry', valueMess: 'No se pudo enviar el mensaje. Inténtalo de nuevo.' },
      { keyMess: 'err', valueMess: 'Error:' },
      { keyMess: 'err-sending', valueMess: 'Se produjo un error al enviar el mensaje.' },
      { keyMess: 'formspree-disabled', valueMess: 'Formspree no está configurado. Habilita el servicio antes de enviar.' },
      { keyMess: 'one-each-two', valueMess: 'Solo puedes enviar un mensaje cada 2 horas. Inténtalo más tarde.' }
    ]
  },
  no: {
    title: 'Ta kontakt',
    name: 'Navn',
    nameReq: 'Navn er obligatorisk',
    email: 'E-post',
    emailReq: 'En gyldig e-postadresse er påkrevd',
    message: 'Melding',
    messageReq: 'Melding er obligatorisk',
    sendBtn: 'Send',
    emailMessages: [
      { keyMess: 'form-miss', valueMess: 'Skjemadata mangler.' },
      { keyMess: 'all-field-req', valueMess: 'Alle felt er obligatoriske.' },
      { keyMess: 'email-valid', valueMess: 'Oppgi en gyldig e-postadresse.' },
      { keyMess: 'ten-char-mess', valueMess: 'Meldingen må inneholde minst 10 tegn.' },
      { keyMess: 'success', valueMess: 'Melding sendt!' },
      { keyMess: 'fail-retry', valueMess: 'Sending mislyktes. Prøv igjen.' },
      { keyMess: 'err', valueMess: 'Feil:' },
      { keyMess: 'err-sending', valueMess: 'Det oppstod en feil under sending av meldingen.' },
      { keyMess: 'formspree-disabled', valueMess: 'Formspree er ikke konfigurert. Aktiver tjenesten før du sender.' },
      { keyMess: 'one-each-two', valueMess: 'Du kan bare sende én melding hver 2. time. Prøv igjen senere.' }
    ]
  },
  ru: {
    title: 'Свяжитесь со мной',
    name: 'Имя',
    nameReq: 'Имя обязательно',
    email: 'Эл. почта',
    emailReq: 'Требуется действующий адрес эл. почты',
    message: 'Сообщение',
    messageReq: 'Сообщение обязательно',
    sendBtn: 'Отправить',
    emailMessages: [
      { keyMess: 'form-miss', valueMess: 'Данные формы отсутствуют.' },
      { keyMess: 'all-field-req', valueMess: 'Все поля обязательны.' },
      { keyMess: 'email-valid', valueMess: 'Введите действительный адрес электронной почты.' },
      { keyMess: 'ten-char-mess', valueMess: 'Сообщение должно содержать минимум 10 символов.' },
      { keyMess: 'success', valueMess: 'Сообщение успешно отправлено!' },
      { keyMess: 'fail-retry', valueMess: 'Не удалось отправить сообщение. Попробуйте ещё раз.' },
      { keyMess: 'err', valueMess: 'Ошибка:' },
      { keyMess: 'err-sending', valueMess: 'Произошла ошибка при отправке сообщения.' },
      { keyMess: 'formspree-disabled', valueMess: 'Formspree не настроен. Включите сервис перед отправкой.' },
      { keyMess: 'one-each-two', valueMess: 'Можно отправлять только одно сообщение каждые 2 часа. Попробуйте позже.' }
    ]
  }
};
