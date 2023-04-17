import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { ProductService } from '../service/product.service';
import { Product } from '../models/product.model';
import { CartService } from '../service/cart.service';
import { CartItem } from '../models/cartItem.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  previousUrl!: string;
  constructor(private activatedRoute: ActivatedRoute,
    private productsService: ProductService,
    private cartService: CartService) { }
  product!: Product;
  cartItem!: CartItem;
  inCart: boolean = false;
  qty = 0;

  simularProducts$ = this.productsService.simularProducts$

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(params => {
        let id = params.get('id');
        return id;
      }),
      switchMap(id => this.productsService.getProduct(id!).pipe(
        tap(product => {
          let cartItem = this.cartService.cartItems.find(item => item.product.id === product.id);
          if (cartItem) {
            this.qty = cartItem.quantity;
            this.cartItem = cartItem;
            this.inCart = true
          } else {
            cartItem = { product: product, quantity: 1 }
          }
        })
      ))
    ).subscribe(data => {
      this.product = data;
    });
  }

  addToCart() {
    this.cartItem.quantity = this.qty;
    /* if (!this.inCart) {
      this.cartService.addToCart(cartItem, 'add');
    } else {
      this.cartService.addToCart(cartItem, 'remove');
    }
    this.inCart = !this.inCart; */
  }
}