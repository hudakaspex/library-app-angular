import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "book",
        pathMatch: "full"
      },
      {
        path: "book",
        loadComponent: async () => {
          try {
            const m = await import("../../../features/book-feature/pages/book-page/book-page.component");
            return m.BookPageComponent;
          } catch (err) {
            console.error('Error loading AdminComponent', err);
            throw err;
          }
        }
      },
      {
        path: "author",
        loadComponent: () => import("../../../features/author-feature/pages/author-page/author-page.component").then((x) => x.AuthorPageComponent),
      },
    ],
  },
];
