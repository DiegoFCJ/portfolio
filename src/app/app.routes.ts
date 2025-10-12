import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsComponent } from './pages/terms/terms.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'terms', component: TermsComponent},
    {path: '**', redirectTo: ''},
];
