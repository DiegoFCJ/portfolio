import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

/** A service class for notifications */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  timerInterval: any = '';

  constructor() { }

  /**
   * Displays a dynamic response alert using Swal (SweetAlert2) library.
   * @param icon The icon to display in the alert.
   * @param msg The message to display in the alert.
   * @param timer The duration (in milliseconds) for which the alert should be displayed.
   * @returns A Promise that resolves when the alert is closed.
   */
  showDynamicResponseAlert(icon: any, msg: string, timer:number){
    return Swal.fire({
      icon: icon,
      title: msg,
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  /** Displays an alert for saving changes before closing. */
  saveChangesBeforeClosing(){
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

}
