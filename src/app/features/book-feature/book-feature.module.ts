import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { BookListComponent } from "./components/book-list/book-list.component";
import { BookPageComponent } from "./pages/book-page/book-page.component";
import { InputFieldModule } from "app/shared/input-field/input-field.module";
import { MatDialogModule } from "@angular/material/dialog";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "list" },
  { path: "list", component: BookPageComponent },
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    InputFieldModule,
    MatDialogModule
  ],
  declarations: [
    BookListComponent, 
    BookPageComponent
  ],
})
export class BookFeatureModule {}
