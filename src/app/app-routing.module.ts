import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { CartItemsComponent } from "./cart-items/cart-items.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { BookmarksComponent } from "./bookmarks/bookmarks.component";
import { IndexComponent } from "./index/index.component";
import { HeadphonesComponent } from "./headphones/headphones.component";
import { HeadphonesDetailsComponent } from "./headphones-details/headphones-details.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { ProductResolver } from "./resolvers/product.resolver";
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'products/smartphones', component: ProductsComponent },
    { path: 'products/headphones', component: HeadphonesComponent },
    { path: 'cart-items', component: CartItemsComponent, canActivate: [AuthGuard] },
    { path: 'products/:id', component: ProductDetailsComponent, resolve: { product: ProductResolver } },
    { path: 'headphones/:id', component: HeadphonesDetailsComponent },
    { path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
]


@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }