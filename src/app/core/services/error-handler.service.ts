import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, NgZone, Injector, Inject } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(
    private zone: NgZone,
    @Inject(Injector) private readonly injector: Injector
  ) { }

  private get toastService() {
    return this.injector.get(ToastrService);
  }

  handleError(error: any): void {
    console.error(JSON.stringify(error));
   // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      this.showToastr(`Javascript error: ${JSON.stringify(error)}`);
      return;
    }
    this.showToastr((error as HttpErrorResponse).error.message);
  }

  private showToastr(message: string, header = "Error") {
    this.zone.run(() =>
      this.toastService.error(message, header)
    );
  } 
}
