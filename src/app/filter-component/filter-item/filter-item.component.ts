import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.css']
})
export class FilterItemComponent implements OnInit {

  constructor(private productService: ProductService) { }

  @Input() filter!: string;

  ngOnInit(): void {
  }

  deleteFilter() {
    this.productService.getFilters(this.filter);
  }
}
