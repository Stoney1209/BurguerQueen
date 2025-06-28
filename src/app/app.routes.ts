import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.page').then( m => m.CategoriesPage)
  },
  {
    path: 'products/:idCategory',
    loadComponent: () => import('./pages/products/products.page').then( m => m.ProductsPage)
  },
  {
    path: 'product/:idProduct',
    loadComponent: () => import('./pages/product/product.page').then( m => m.ProductPage)
  },
  {
    path: 'pay',
    loadComponent: () => import('./pages/pay/pay.page').then( m => m.PayPage)
  },
  {
    path: 'not-network',
    loadComponent: () => import('./pages/not-network/not-network.page').then( m => m.NotNetworkPage)
  },
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
];
