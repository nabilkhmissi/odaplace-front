import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products$ = this.productService.globalProducts$.pipe(
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
      this.productService.selectPage(this.currentPage + 1);
    } else {
      this.productService.selectPage(this.currentPage - 1);
    }
  }

  changeSize(size: number) {
    this.productService.selectsize(size);
  }
  selectPage(i: number) {
    this.productService.selectPage(i);
  }

  ngOnInit(): void {
  }
}
