import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about-page.component').then((m) => m.AboutPageComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects-page.component').then((m) => m.ProjectsPageComponent),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./pages/skills/skills-page.component').then((m) => m.SkillsPageComponent),
  },
  {
    path: 'education',
    loadComponent: () =>
      import('./pages/education/education-page.component').then((m) => m.EducationPageComponent),
  },
  {
    path: 'experiences',
    loadComponent: () =>
      import('./pages/experiences/experiences-page.component').then((m) => m.ExperiencesPageComponent),
  },
  {
    path: 'stats',
    loadComponent: () =>
      import('./pages/stats/stats-page.component').then((m) => m.StatsPageComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact-page.component').then((m) => m.ContactPageComponent),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./pages/privacy/privacy.component').then((m) => m.PrivacyComponent),
  },
  { path: '**', redirectTo: '' },
];
