import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ErrorHandler, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NgHttpLoaderModule } from "ng-http-loader";
import { InterceptorService } from "./core/services/interceptor.service";
import { ToastrModule } from "ngx-toastr";
import { ErrorHandlerService } from "./core/services/error-handler.service";
import { BookDialogComponent } from "./features/book-feature/components/book-dialog/book-dialog.component";
import { DatepickerFieldModule } from "./shared/datepicker-field/datepicker-field.module";
import { provideNativeDateAdapter } from "@angular/material/core";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    NgHttpLoaderModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
