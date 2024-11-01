import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(private toastr: ToastrService) {}

  showError(message: string): void {
    this.toastr.error(message, 'Error', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Success', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }
  
  showWarning(message: string): void {
    this.toastr.warning(message, 'Warning', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }

  showInfo(message: string): void {
    this.toastr.info(message, 'Info', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }
}