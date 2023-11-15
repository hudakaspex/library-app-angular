import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { BookListComponent } from "./components/book-list/book-list.component";
import { BookPageComponent } from "./pages/book-page/book-page.component";
import { InputFieldModule } from "app/shared/input-field/input-field.module";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { DialogModule } from "app/shared/dialog/dialog.module";
import { BookDialogComponent } from "./components/book-dialog/book-dialog.component";
import { DatepickerFieldModule } from "app/shared/datepicker-field/datepicker-field.module";
import { SelectFieldModule } from "app/shared/select-field/select-field.module";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "list" },
  { path: "list", component: BookPageComponent },
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    InputFieldModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    DialogModule,
    DatepickerFieldModule,
    SelectFieldModule
  ],
  declarations: [
    BookListComponent, 
    BookPageComponent,
    BookDialogComponent
  ],
})
export class BookFeatureModule {}
