import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NgHttpLoaderModule } from "ng-http-loader";
import { InterceptorService } from "./core/services/interceptor.service";
import { ToastrModule } from "ngx-toastr";
import { provideNativeDateAdapter } from "@angular/material/core";

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserAnimationsModule,
        RouterModule,
        AppRoutingModule,
        NgHttpLoaderModule.forRoot(),
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right'
        })], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true,
        },
        provideNativeDateAdapter(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}
