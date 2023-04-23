import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { HeadphonesService } from '../service/headphones.service';

@Component({
  selector: 'app-headphones-filter-bar',
  templateUrl: './headphones-filter-bar.component.html',
  styleUrls: ['./headphones-filter-bar.component.css']
})
export class HeadphonesFilterBarComponent implements OnInit {

  constructor(private productService: HeadphonesService) { }

  smatphonesManufacturers$ = this.productService.getHeadphonesManufacturer();
  manufacturers: any[] = [];
  max_price = 10000;
  min_price = 0;
  filterClicked = true;
  filter!: HTMLElement;


  ngOnInit(): void {
    this.filter = document.querySelector('.filter-items-wrapper') as HTMLElement
  }
  selectManufacturer(event: any) {
    let manufacturer = event.target.value;
    this.productService.getFilters(manufacturer);
    if (!this.manufacturers.includes(manufacturer)) {
      this.manufacturers.push(manufacturer);
    } else {
      this.manufacturers = this.manufacturers.filter(m => m !== manufacturer)
    }
    this.productService.filterByManufacturers(this.manufacturers);
  }

  selectMaxPriceRange(event: any) {
    this.max_price = +event.target.value;
    this.productService.getFilters('max price: ' + this.max_price);
    this.productService.filterByMaxPrice(this.max_price);
  }


  selectMinPriceRange(event: any) {
    this.max_price = +event.target.value;
    this.productService.getFilters('min price: ' + this.min_price);
    this.productService.filterByMinPrice(this.min_price);
  }
  doShowFilter() {
    if (!this.filterClicked) {
      this.filter.style.display = 'block'
    } else {
      this.filter.style.display = 'none'
    }
    this.filterClicked = !this.filterClicked

  }

}
