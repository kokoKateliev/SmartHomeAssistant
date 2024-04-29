import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'dashboard',
    // },
    {
    path: 'dashboard',
    // canActivate: [authGuard],
    component: DashboardComponent
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
    //     path: 'todos',
    //     // canActivate: [authGuard],
    //     children: [
    //         {
    //           path: '',
    //           pathMatch: 'full',
    //           component: TodosComponent,
    //         },
    //         {
    //           path: ':id',
    //           component: TodosUserComponent,
    //         },
    //       ],
    // },

    // {
    //     path: 'assistant',
    //     // canActivate: [authGuard],
    //     component: HomeAssistantComponent
    // },

    // {
    //     path: 'Schedular',
    //     // canActivate: [authGuard],
    //     component: SchedularComponent
    // },

    // {
    // path: '**',
    // component: NotFoundComponent,
    // },
];
