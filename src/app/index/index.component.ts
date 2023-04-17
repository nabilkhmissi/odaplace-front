import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { HeadphonesService } from '../service/headphones.service';
import { LoadingService } from '../service/loading.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private productsService: ProductService,
    private HeadphonesService: HeadphonesService,
    private loadingService: LoadingService) {
    this.loadingService.showLoading();
  }
  simularProducts$ = this.productsService.simularProducts$;
  simularHeadphones$ = this.HeadphonesService.simularProducts$.pipe(
    tap(() => {
      this.loadingService.hideLoading()
    })
  );
  ngOnInit(): void {
  }

}
