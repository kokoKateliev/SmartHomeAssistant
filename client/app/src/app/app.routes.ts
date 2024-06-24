import { Routes } from '@angular/router';
import { RoomManagerComponent } from './components/room-manager/room-manager.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { DeviceControllerComponent } from './components/device-controller/device-controller.component';
import { AuthGuard } from './components/auth/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/registration/registration.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'rooms',
    // canActivate: [AuthGuard],
    component: RoomManagerComponent,
    children: [
      {
        path: ':_id',
        component: RoomDetailComponent,
        children: [
          {
            path: ':controller',
            component: DeviceControllerComponent,
          },
        ],
      },
    ],
  },
  // {
  //     path: 'profile',
  //     canActivate: [authGuard]
  //     component: ProfileComponent
  // }

  {
    path: 'login',
    // canActivate: [AuthGuard],
    component: LoginComponent,
    data: {
      notAuthenticatedRequired: true,
    },
  },

  {
    path: 'register',
    // canActivate: [AuthGuard],
    component: RegisterComponent,
    data: {
      notAuthenticatedRequired: true,
    },
  },

  // {
  //     path: 'todos',
  //     // canActivate: [authGuard],
  //     component: TodosComponent,

  //     children: [
  //         {
  //           path: ':member',
  //           component: TodoDialogComponent,
  //         },
  //       ],
  // },

  // {
  //     path: 'assistant',
  //     // canActivate: [authGuard],
  //     component: HomeAssistantComponent
  // },

  // {
  //     path: 'manager',
  //     // canActivate: [authGuard],
  //     component: ManagerComponent,
  //     children: [
  //       {
  //         path: ':room',
  //         component: TodoDialogComponent,
  //       },
  //     ]
  // },

  // {
  //     path: 'schedular',
  //     // canActivate: [authGuard],
  //     component: SchedularComponent
  // },

  // {
  // path: '**',
  // component: NotFoundComponent,
  // },
];
