import { Component, OnInit } from '@angular/core';
import { CartService } from './service/cart.service';
import { BookmarkService } from './service/bookmarks.service';
import { PopupService } from './service/popup.service';
import { AuthService } from './service/auth.service';
import { LoadingService } from './service/loading.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'odaplace';

  constructor(private cartService: CartService,
    private bookmarkService: BookmarkService,
    private popupService: PopupService,
    private authService: AuthService,
    private loadingService: LoadingService) { }

  popup$ = this.popupService.notificationSubject$;

  loading$ = this.loadingService.loadingSubject$;

  ngOnInit() {
    this.authService.getAuthUSerFromLocalstorage();
    this.cartService.getCartItemsFronLocalStorage();
    this.bookmarkService.getBookmarksFronLocalStorage();
  }
  hidePopup() {
    this.popupService.hideNotification();
  }
}
