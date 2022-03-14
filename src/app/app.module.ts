import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/block/header/header.component';
import { HomeComponent } from './layout/page/home/home.component';
import { ProductComponent } from './layout/page/product/product.component';
import { FooterComponent } from './layout/block/footer/footer.component';
import { LoginComponent } from './layout/page/login/login.component';
import { CartComponent } from './layout/page/cart/cart.component';
import { CardComponent } from './layout/block/card/card.component';
import { ProductDetailComponent } from './layout/page/product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SliceStringPipe } from './pipe/slice-string.pipe';
import { FavoriteComponent } from './layout/page/favorite/favorite.component';
import { CartFavoriteComponent } from './layout/block/cart-favorite/cart-favorite.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductComponent,
    FooterComponent,
    LoginComponent,
    CartComponent,
    CardComponent,
    ProductDetailComponent,
    SliceStringPipe,
    FavoriteComponent,
    CartFavoriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
