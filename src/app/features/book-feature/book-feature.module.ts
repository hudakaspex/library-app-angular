import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { BookListComponent } from "./components/book-list/book-list.component";
import { BookPageComponent } from "./pages/book-page/book-page.component";
import { InputFieldModule } from "app/shared/input-field/input-field.module";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { FormsModule } from "@angular/forms";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { DialogModule } from "app/shared/dialog/dialog.module";
import { BookDialogComponent } from "./components/book-dialog/book-dialog.component";
import { DatepickerFieldModule } from "app/shared/datepicker-field/datepicker-field.module";
import { SelectFieldModule } from "app/shared/select-field/select-field.module";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import {MatIconModule} from '@angular/material/icon';
import { MatLegacyPaginatorModule as MatPaginatorModule } from "@angular/material/legacy-paginator";

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
    SelectFieldModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  declarations: [
    BookListComponent, 
    BookPageComponent,
    BookDialogComponent
  ],
})
export class BookFeatureModule {}
