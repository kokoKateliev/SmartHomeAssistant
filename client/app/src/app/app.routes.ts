import { Routes } from '@angular/router';
import { RoomManagerComponent } from './room-manager/room-manager.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'home',
    // },
    {
    path: 'rooms',
    // canActivate: [authGuard],
    component: RoomManagerComponent
    },
    // {
    //     path: 'profile',
    //     canActivate: [authGuard]
    //     component: ProfileComponent
    // }

    // {
    //     path: 'login',
    //     component: LoginComponent,
    //     canActivate: [authGuard],
    //     data: {
    //         notAuthenticatedRequired: true,
    //     },
    // },

    // {
    // path: 'register',
    // component: RegisterComponent,
    // canActivate: [authGuard],
    // data: {
    //     notAuthenticatedRequired: true,
    //  },
    // },

    // {
    // path: '**',
    // component: NotFoundComponent,
    // },
];
