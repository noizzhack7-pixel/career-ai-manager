import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { RolesComponent } from './roles/roles.component';
import { MatchingComponent } from './matching/matching.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/employees', pathMatch: 'full' },
    { path: 'employees', component: EmployeesComponent, data: { animation: 'EmployeesPage' } },
    { path: 'roles', component: RolesComponent, data: { animation: 'RolesPage' } },
    { path: 'matching', component: MatchingComponent, data: { animation: 'MatchingPage' } },
    { path: 'dashboard', component: DashboardComponent, data: { animation: 'DashboardPage' } },
    { path: 'settings', component: SettingsComponent, data: { animation: 'SettingsPage' } },
    { path: 'profile', component: ProfileComponent, data: { animation: 'ProfilePage' } }
];
