import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDashboardComponent } from './product/product-dashboard/product-dashboard.component'
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'product',
    canActivate: [AuthGuard],
    loadChildren: () => import("./product/product.module").then((m) => m.ProductModule),
  },
  {
    path: 'customer',
    canActivate: [AuthGuard],
    loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'order',
    canActivate: [AuthGuard],
    loadChildren: () => import('./order/order.module').then((m) => m.OrderModule),
  },
  {
    path: 'manage',
    canActivate: [AuthGuard],
    loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule),
  },
  {
    path: 'statistic',
    canActivate: [AuthGuard],
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
