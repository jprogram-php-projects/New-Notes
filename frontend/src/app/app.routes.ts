import { Routes } from '@angular/router';
import { Login } from './pages/login';
import { Home } from './pages/home/home';
import { NewNote } from './pages/new-note/new-note';
import { EditNote } from './pages/edit-note/edit-note';
import { DeleteNote } from './pages/delete-note/delete-note';
import { AuthGuard } from './guards/auth-guard';
import { GuestGuard } from './guards/guest-guard';


export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [GuestGuard] },
  { path: 'logout', component: Login, canActivate: [AuthGuard] },
  { path: '', component: Home, canActivate: [AuthGuard] },
  { path: 'new', component: NewNote, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditNote, canActivate: [AuthGuard] },
  { path: 'delete/:id', component: DeleteNote, canActivate: [AuthGuard] }
];
