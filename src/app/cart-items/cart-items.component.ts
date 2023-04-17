import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { FormControl } from '@angular/forms';
import { map, tap } from 'rxjs';
import { CartCheckout } from '../models/cartCheckout.model';
import { CartItem } from '../models/cartItem.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  constructor(private cartService: CartService,
    private router: Router) { }

  tax = 0.25;
  cartItems$ = this.cartService.cartItems$.pipe(
    map(items => {
      if (items.length === 0) {
        return null;
      }
      return {
        cart: [...items],
        total: this.getTotal(items)
      };
    })
  );


  getTotal(items: CartItem[]) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total = total + items[i].product.price * items[i].quantity;
    }
    return Math.round(total);
  }

  ngOnInit(): void {
  }
  goToProducts() {
    this.router.navigate(['products'])
  }

}
