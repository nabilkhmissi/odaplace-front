import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { HeadphonesService } from '../service/headphones.service';

@Component({
  selector: 'app-headphones',
  templateUrl: './headphones.component.html',
  styleUrls: ['./headphones.component.css']
})
export class HeadphonesComponent implements OnInit {


  constructor(private headphonesService: HeadphonesService) { }

  products$ = this.headphonesService.globalProducts$.pipe(
    tap(response => {
      this.currentPage = +response.page;
      if (response.data.length == 0) {
        this.totalResults = 0;
      } else if (response.totalPages == 1) {
        this.totalResults = response.data.length;
      } else {
        this.totalResults = response.totalItems
      }
    })
  );
  totalResults = 0;
  currentPage!: number;

  changePage(action: 'next' | 'previous') {
    if (action === 'next') {
      this.headphonesService.selectPage(this.currentPage + 1);
    } else {
      this.headphonesService.selectPage(this.currentPage - 1);
    }
  }

  changeSize(size: number) {
    this.headphonesService.selectsize(size);
  }
  selectPage(i: number) {
    this.headphonesService.selectPage(i);
  }

  ngOnInit(): void {
  }

}
