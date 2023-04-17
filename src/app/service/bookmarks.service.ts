import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { BehaviorSubject } from "rxjs";
import { PopupService } from "./popup.service";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class BookmarkService {
    constructor(private popupService: PopupService,
        private authService: AuthService) { }
    authUser = this.authService.authUser$.subscribe();

    booksmarks: Product[] = []

    addBookmarkSubject = new BehaviorSubject<Product[] | null>(null);
    bookmarkSubject$ = this.addBookmarkSubject.asObservable();


    addBookmark(product: Product) {
        if (this.authUser) {
            this.popupService.showNotification();
            return;
        }
        let existBookmark = this.booksmarks.find(p => p.id === product.id);
        if (!existBookmark) {
            this.booksmarks.push(product);
        } else {
            this.booksmarks = this.booksmarks.filter(p => p.id !== product.id)
        }
        this.saveBookmarksInLocalStorage(this.booksmarks);
        this.addBookmarkSubject.next(this.booksmarks);
    }
    saveBookmarksInLocalStorage(products: Product[]) {
        localStorage.setItem('odaPlaceUserBookmark', JSON.stringify(products));
    }

    getBookmarksFronLocalStorage() {
        let existLocalBookmark = localStorage.getItem('odaPlaceUserBookmark');
        let products: Product[];
        if (!existLocalBookmark) {
            products = [];
        } else {
            let parsed = JSON.parse(existLocalBookmark)
            products = parsed
        }
        this.booksmarks = products;
        this.addBookmarkSubject.next(products)
    }
}