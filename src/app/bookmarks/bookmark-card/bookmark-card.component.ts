import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { BookmarkService } from 'src/app/service/bookmarks.service';

@Component({
  selector: 'app-bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.css']
})
export class BookmarkCardComponent implements OnInit {

  constructor(private bookmarkServcie: BookmarkService) { }

  @Input() product!: Product;

  ngOnInit(): void {
  }

  removeFromBookmark() {
    this.bookmarkServcie.addBookmark(this.product)
  }

}
