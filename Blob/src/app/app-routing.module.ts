import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDashboardComponent } from './product/product-dashboard/product-dashboard.component'
import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';


const routes: Routes = [
/*   {
    path: '',
    component: AppComponent
  }, */
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'product',
    canLoad: [AuthGuard],
    loadChildren: () => import("./product/product.module").then((m) => m.ProductModule),
  },
  {
    path: 'customer',
    canLoad: [AuthGuard],
    loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'order',
    canLoad: [AuthGuard],
    loadChildren: () => import('./order/order.module').then((m) => m.OrderModule),
  },
  {
    path: 'manage',
    canLoad: [AuthGuard],
    loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule),
  },
  {
    path: 'statistic',
    canLoad: [AuthGuard],
    loadChildren: () => import('./statistic/statistic.module').then((m) => m.StatisticModule),
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
