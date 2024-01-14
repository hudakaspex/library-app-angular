import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "book",
        loadComponent: () => import("../../../features/book-feature/pages/book-page/book-page.component")
        .then((x) => x.BookPageComponent),
      },
    ],
  },
];
