import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BookFeatureComponent } from "./book-feature.component";
import { RouterModule, Routes } from "@angular/router";
import { BookListComponent } from "./book-list/book-list.component";

const routes: Routes = [
  {
    path: "",
    component: BookFeatureComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "list" },
      { path: "list", component: BookListComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [BookFeatureComponent, BookListComponent],
})
export class BookFeatureModule {}
