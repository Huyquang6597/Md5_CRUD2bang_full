import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductCreateComponent} from './product/product-create/product-create.component';
import {ProductEditComponent} from "./product/product-edit/product-edit.component";
import {ProductDeleteComponent} from "./product/product-delete/product-delete.component";
import {HomeComponent} from "./home/home.component";


const routes: Routes = [

//   {
//     path: 'products/list',
//     component: ProductListComponent,
//     children:[
//    {
//     path: 'create',
//     component: ProductCreateComponent
//   },
//   {
//     path: 'edit/:id',
//     component: ProductEditComponent
//   },
//   {
//     path: 'delete/:id',
//     component: ProductDeleteComponent
//   }
//   ]
// }
  {
  path: '',
  component: HomeComponent,
  loadChildren: () => import('./product/product.module').then(module => module.ProductModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
