import { Routes } from '@angular/router';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { TodosComponent } from './todos/todos.component';
// import { TodoDialogComponent } from './todos/todo-dialog/todo-dialog.component';
// import { SchedularComponent } from './schedular/schedular.component';
import { RoomManagerComponent } from './components/room-manager/room-manager.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { DeviceControllerComponent } from './components/device-controller/device-controller.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './components/auth/auth.guard';

// import { authGuard } from './auth/auth.guard';
// import { ManagerComponent } from './manager/manager.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [authGuard],
    // data: {
    //     notAuthenticatedRequired: true,
    // },
  },

  {
  path: 'register',
  component: RegisterComponent,
  // canActivate: [authGuard],
  // data: {
  //     notAuthenticatedRequired: true,
  //  },
  },
  {
  path: 'rooms',
  // canActivate: [authGuard],
  component: RoomManagerComponent,
  children: [
              {
                path: ':_id',
                component: RoomDetailComponent,
                children: [
                  {
                    path: ':controller',
                    component: DeviceControllerComponent
                  }
                ]
              },
    ],
  },
    // {
    //     path: 'profile',
    //     canActivate: [authGuard]
    //     component: ProfileComponent
    // }

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
