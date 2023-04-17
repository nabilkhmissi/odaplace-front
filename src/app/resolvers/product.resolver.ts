import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../service/product.service';
import { LoadingService } from '../service/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Observable<Product>> {

  constructor(private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private loadingService: LoadingService) {
  }
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Product> {
    return of(route.paramMap.get('id')).pipe(
      tap(() => { this.loadingService.showLoading() }),
      switchMap(id => {
        return this.productService.getProduct(id!)
      })
    )
  }
}
