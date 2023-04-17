import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { BehaviorSubject, Subject, of } from "rxjs";
import { CartItem } from "../models/cartItem.model";
import { PopupService } from "./popup.service";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private popupService: PopupService,
        private authService: AuthService) { }
    authUser = this.authService.authUser$.subscribe();
    
    favouriteProductsSubject = new BehaviorSubject<Product[]>([]);
    favouriteProducts$ = this.favouriteProductsSubject.asObservable();

    favProduct: Product[] = []
    cartItems: CartItem[] = [];


    cartItemSubject = new BehaviorSubject<CartItem[]>([]);
    cartItems$ = this.cartItemSubject.asObservable();


    addToCart(product: CartItem, action: 'add' | 'remove' | 'update') {
        if (this.authUser) {
            this.popupService.showNotification();
            return;
        }
        if (action === 'add') {
            this.cartItems.push(product);
        } else if (action === 'remove') {
            this.cartItems = this.cartItems.filter(c => c.product.id !== product.product.id)
        } else {
            this.cartItems.find(c => c.product.id === product.product.id)!.quantity = product.quantity;
        }
        this.cartItemSubject.next(this.cartItems);
        this.saveCartInLocalStorage(this.cartItems)
    }

    getCartItems() {
        return this.cartItems$;
    }

    saveCartInLocalStorage(cartItems: CartItem[]) {
        localStorage.setItem('odaPlaceUserCart', JSON.stringify(cartItems!));
    }

    getCartItemsFronLocalStorage() {
        let existLocalItems = localStorage.getItem('odaPlaceUserCart');
        let items: CartItem[];
        if (!existLocalItems) {
            items = [];
        } else {
            let parsed = JSON.parse(existLocalItems)
            items = parsed
        }
        this.cartItems = items;
        this.cartItemSubject.next(items);
    }
}