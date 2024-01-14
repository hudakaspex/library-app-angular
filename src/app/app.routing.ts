import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: ""
  },
  {
    path: "",
    loadChildren: () =>
      import("./core/layouts/admin-layout/admin-layout.module").then(
        (m) => m.AdminLayoutModule
      ),
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule {}
