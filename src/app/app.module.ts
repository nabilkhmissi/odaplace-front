import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponentComponent } from './filter-component/filter-component.component';
import { FilterItemComponent } from './filter-component/filter-item/filter-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { BookmarkCardComponent } from './bookmarks/bookmark-card/bookmark-card.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { HeadphonesComponent } from './headphones/headphones.component';
import { HeadphonesFilterBarComponent } from './headphones-filter-bar/headphones-filter-bar.component';
import { HeadphonesDetailsComponent } from './headphones-details/headphones-details.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadphonesFilterBarComponent,
    HeaderComponent,
    ProductsComponent,
    ProductComponent,
    CartItemsComponent,
    CartItemComponent,
    FilterComponentComponent,
    FilterItemComponent,
    ProductDetailsComponent,
    BookmarksComponent,
    BookmarkCardComponent,
    FilterBarComponent,
    NewsletterComponent,
    FooterComponent,
    IndexComponent,
    HeadphonesComponent,
    HeadphonesDetailsComponent,
    SignupComponent,
    LoginComponent,
    LoadingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
