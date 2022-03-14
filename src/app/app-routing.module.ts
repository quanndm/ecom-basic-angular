import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { CartComponent } from './layout/page/cart/cart.component';
import { FavoriteComponent } from './layout/page/favorite/favorite.component';
import { HomeComponent } from './layout/page/home/home.component';
import { LoginComponent } from './layout/page/login/login.component';
import { ProductDetailComponent } from './layout/page/product-detail/product-detail.component';
import { ProductComponent } from './layout/page/product/product.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }, {
    path: "product",
    component: ProductComponent,
  }, {
    path: "product/:id",
    component: ProductDetailComponent,
  }, {
    path: "login",
    component: LoginComponent
  }, {
    path: "cart",
    component: CartComponent
  },{
    path:"favorite",
    component: FavoriteComponent,
    canActivate : [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
