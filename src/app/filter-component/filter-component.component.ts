import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css']
})
export class FilterComponentComponent implements OnInit {

  constructor(private productService: ProductService) { }

  filter$ = this.productService.filterSubject$.pipe(
    map(filters => filters.length === 0 ? null : filters)
  );

  resetFilters() {
    this.productService.resetAllFilters();
  }

ngOnInit(): void {
}

}
