import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { map, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { BookmarkService } from '../service/bookmarks.service';
import { HeadphonesService } from '../service/headphones.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cartSercice: CartService,
    private router: Router,
    private productService: ProductService,
    private bookmarksService: BookmarkService,
    private headphonesService: HeadphonesService,
    private authService: AuthService) { }


  authUser$ = this.authService.authUser$;
  bookmarks$ = this.bookmarksService.bookmarkSubject$.pipe(
    map(bookmarks => {
      if (bookmarks) {
        return bookmarks.length
      }
      return 0;
    })
  );
  searchInput = new FormControl('');
  favoriteProducts$ = this.cartSercice.favouriteProducts$.pipe(
    map(products => {
      if (products.length == 0) {
        return 0
      }
      return products.length
    })
  )
  cartItems$ = this.cartSercice.cartItems$.pipe(
    map(products => products.length)
  );

  ngOnInit(): void {
  }
  
  logout() {
    this.authService.deleteLoginFromLocalStorage();
    this.authService.setAuthenticatedUser(false);
  }

  doSearch() {
    let category: string;
    this.searchInput.valueChanges.pipe(
      tap(() => {
        category = this.router.url.split('/')[2];
        category === 'headphones' ? this.router.navigate(['/products/headphones']) : this.router.navigate(['/products/smartphones'])
      }),
      map(key => key ? key : ''),
      map((searchWord) => {
        if (category === 'smartphones') {
          return this.productService.filterByProduct(searchWord)
        }
        return this.headphonesService.filterByProduct(searchWord)
      })
    ).subscribe();
  }
}
