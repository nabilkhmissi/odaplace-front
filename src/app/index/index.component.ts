import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { HeadphonesService } from '../service/headphones.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private productsService: ProductService,
    private HeadphonesService: HeadphonesService) { }
  simularProducts$ = this.productsService.simularProducts$;
  simularHeadphones$ = this.HeadphonesService.simularProducts$;
  ngOnInit(): void {
  }

}
