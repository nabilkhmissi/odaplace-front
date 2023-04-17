import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartItem } from '../models/cartItem.model';
import { switchMap, tap } from 'rxjs';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor(private cartService: CartService) { }

  quantity: FormControl = new FormControl();

  @Input() item!: CartItem;
  subTotal: number = 0;

  ngOnInit(): void {
    this.quantity.setValue(this.item.quantity);
    this.subTotal = this.item.quantity * this.item.product.price;
    this.quantity.valueChanges.pipe(
      tap(
        qty => {
          this.item.quantity = qty;
          this.subTotal = this.item.quantity * this.item.product.price;
          this.cartService.addToCart(this.item, 'update')
        }
      )
    ).subscribe();
  }

  deleteItemFromCart() {
    this.cartService.addToCart(this.item, 'remove');
  }

}
