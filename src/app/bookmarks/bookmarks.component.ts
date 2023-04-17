import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../service/bookmarks.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  constructor(private bookmarkService: BookmarkService) { }

  bookmarks$ = this.bookmarkService.bookmarkSubject$.pipe(
    tap(console.log),
    map(bookmarks => bookmarks.length > 0 ? bookmarks : null)
  );
  ngOnInit(): void {
  }

}
