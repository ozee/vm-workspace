import { Route } from "@vaadin/router";

export const views: Route[] = [
  { path: '', component: 'vm-about' },
  { path: 'login', component: 'vm-login' },
  { path: 'listings', component: 'vm-listing-list' },
  { path: 'listings/create', component: 'vm-listing-create' },
  { path: 'listings/:id', component: 'vm-listing-view' },
  { path: 'listings/:userid/:id', component: 'vm-listing-public-view' },
  { path: '(.*)', redirect: '/' }
];

export const routes: Route[] = [
  {
    path: '',
    component: 'vm-app',
    children: [...views],
  },
];
