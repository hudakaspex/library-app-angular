import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'book' },
            { path: 'book', loadChildren: () => import('../../pages/book-feature/book-feature.module').then(m => m.BookFeatureModule) },
        ]
    }
];
