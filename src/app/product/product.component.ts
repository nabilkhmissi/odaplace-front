import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../service/cart.service';
import { CartItem } from '../models/cartItem.model';
import { BookmarkService } from '../service/bookmarks.service';
import { Router } from '@angular/router';
import { PopupService } from '../service/popup.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private cartService: CartService,
    private bookmarkService: BookmarkService,
    private router: Router,
    private authService: AuthService) { }

  @Input() product!: Product;

  isFavoris: boolean = false;
  inCart = false;

  ngOnInit(): void {
  }

  addToFavorite() {
    this.bookmarkService.addBookmark(this.product);
    this.isFavoris = !this.isFavoris;
  }
  authUSer = this.authService.authUser$.subscribe();
  addToCart() {
    let cartItem: CartItem = { product: this.product, quantity: 1 }
    if (!this.inCart) {
      this.cartService.addToCart(cartItem, 'add');
    } else {
      this.cartService.addToCart(cartItem, 'remove');
    }
    this.inCart = !this.inCart;
  }
  goToDetails(event: any) {
    event.preventDefault()
    if (this.product.category === 'smatphones') {
      this.router.navigate(['/products', this.product.id]);
    } else {
      this.router.navigate(['/headphones', this.product.id]);
    }
  }
}
