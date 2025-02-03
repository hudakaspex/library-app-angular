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
        pathMatch: "full",
      },
      {
        path: "book",
        loadComponent: () =>
          import(
            "../../../features/book-feature/pages/book-page/book-page.component"
          ).then((x) => x.BookPageComponent),
      },
      {
        path: "placement",
        loadComponent: () =>
          import(
            "../../../features/placement-feature/pages/placement-page/placement-page.component"
          ).then((x) => x.PlacementPageComponent),
      },
      {
        path: "shelves",
        loadComponent: () =>
          import(
            "../../../features/shelves-feature/pages/shelves-page/shelves-page.component"
          ).then((x) => x.ShelvesPageComponent),
      },
      {
        path: "author",
        loadComponent: () =>
          import(
            "../../../features/author-feature/pages/author-page/author-page.component"
          ).then((x) => x.AuthorPageComponent),
      },
      {
        path: "member",
        loadComponent: () =>
          import(
            "../../../features/member-feature/pages/member-page/member-page.component"
          ).then((x) => x.MemberPageComponent),
      },
      {
        path: "loan",
        loadComponent: () =>
          import(
            "../../../features/loan-feature/pages/loan-page/loan-page.component"
          ).then((x) => x.LoanPageComponent),
      },
    ],
  },
];
