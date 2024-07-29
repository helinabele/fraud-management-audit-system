import { Route } from '@angular/router';
import { StatusComponent } from './status.component';

export const statusRoute: Route = {
  path: '',
  component: StatusComponent,
  data: {
    pageTitle: 'fraudMgtApp.status.home.title',
  },
};
