import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./pages/projects/projects.page').then((m) => m.ProjectsPageComponent),
      },
      {
        path: 'skills',
        loadComponent: () =>
          import('./pages/skills/skills.page').then((m) => m.SkillsPageComponent),
      },
      {
        path: 'experiences',
        loadComponent: () =>
          import('./pages/experiences/experiences.page').then((m) => m.ExperiencesPageComponent),
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('./pages/contacts/contacts.page').then((m) => m.ContactsPageComponent),
      },
      {
        path: 'privacy',
        loadComponent: () =>
          import('./pages/privacy/privacy.component').then((m) => m.PrivacyComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
