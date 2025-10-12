import { ErrorHandler, Injectable } from '@angular/core';
import { captureException } from './monitoring';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    try {
      captureException(error);
    } catch (monitoringError) {
      // eslint-disable-next-line no-console
      console.warn('[Monitoring] Impossibile registrare l\'errore.', monitoringError);
    }

    // Mantiene il comportamento predefinito di Angular registrando l'errore in console.
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
