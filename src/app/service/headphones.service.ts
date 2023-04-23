import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { BehaviorSubject, Observable, combineLatest, map, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Manufacturer } from "../models/manufacturer.model";
import { Response } from "../models/response.model";
import { LoadingService } from "./loading.service";

@Injectable({
    providedIn: 'root'
})
export class HeadphonesService {

    constructor(private http: HttpClient,
        private loadingService: LoadingService) { }

    // private baseUrl = 'https://odaplace.onrender.com/api';

    private baseUrl = 'http://localhost:3000/api';

    private searchByManufacturersSubject = new BehaviorSubject<string | null>(null);
    searchByManufacturersSubject$ = this.searchByManufacturersSubject.asObservable();


    private filterSubject = new BehaviorSubject<string[]>([]);
    filterSubject$ = this.filterSubject.asObservable();

    filters: string[] = [];
    getFilters(filter: string) {
        if (!this.filters.includes(filter)) {
            this.filters.push(filter)
        } else {
            this.filters = this.filters.filter(f => f !== filter)
        }
        this.filterSubject.next(this.filters);
    }

    resetFilter() {
        this.showLoading();
        this.filterSubject.next([])
    }

    filterByManufacturers(manufacturers: string[]) {
        this.showLoading();
        let ms: string = '';
        if (manufacturers.length > 0) {
            ms = manufacturers.join('+');
        }
        this.searchByManufacturersSubject.next(ms);
    }

    private searchByProductSubject = new BehaviorSubject<string | null>(null);
    searchByProductSubject$ = this.searchByProductSubject.asObservable();

    filterByProduct(product_title: string) {
        this.showLoading();
        this.searchByProductSubject.next(product_title);
    }

    private searchByMinPriceSubject = new BehaviorSubject<number | null>(null);
    searchByMinPriceSubject$ = this.searchByMinPriceSubject.asObservable();

    private searchByMaxPriceSubject = new BehaviorSubject<number | null>(null);
    searchByMaxPriceSubject$ = this.searchByMaxPriceSubject.asObservable();

    filterByMinPrice(price: number) {
        this.showLoading();
        this.searchByMinPriceSubject.next(price);
    }
    filterByMaxPrice(price: number) {
        this.showLoading();
        this.searchByMaxPriceSubject.next(price);
    }

    private selectPageSubject = new BehaviorSubject<number | null>(null);
    selectPageSubject$ = this.selectPageSubject.asObservable();

    selectPage(page: number) {
        this.showLoading();
        this.selectPageSubject.next(page);
    }
    private selectSizeSubject = new BehaviorSubject<number | null>(null);
    selectSizeSubject$ = this.selectSizeSubject.asObservable();

    selectsize(size: number) {
        this.showLoading();
        this.selectSizeSubject.next(size);
    }

    resetAllFilters() {
        this.showLoading();
        this.searchByManufacturersSubject.next(null);
        this.searchByMinPriceSubject.next(null);
        this.selectPageSubject.next(null);
        this.searchByProductSubject.next(null);
        this.searchByMaxPriceSubject.next(null)
        this.searchByManufacturersSubject.next(null);
        this.resetFilter();
    }

    products$ = this.getProducts();

    globalProducts$ = combineLatest([
        this.searchByProductSubject$,
        this.selectSizeSubject$,
        this.selectPageSubject$,
        this.searchByMinPriceSubject$,
        this.searchByMaxPriceSubject$,
        this.searchByManufacturersSubject$,
    ]).pipe(
        map(([product_title, size, page, minprice, maxprice, manufacturer]) => {
            return {
                product_title,
                size,
                page,
                minprice,
                maxprice,
                manufacturer
            }
        }),
        switchMap(filterObj => {
            return this.getProducts(
                filterObj.product_title!,
                filterObj.size!,
                filterObj.page!,
                filterObj.minprice!,
                filterObj.maxprice!,
                filterObj.manufacturer!).pipe(map(products => {
                    this.hideLoading();
                    return {
                        page: products.page,
                        totalItems: products.totalItems,
                        size: products.size,
                        totalPages: products.totalPages,
                        data: products.data.map((product: any) => {
                            return { ...product, id: product._id } as Product
                        })
                    }
                }))
        })
    )

    getProducts(title_search?: string, size?: number, page?: number, minprice?: number, maxprice?: number, manufacturer?: string) {
        return this.http.get<Response<Product>>(`${this.baseUrl}/products/headphones?page=${page}&size=${size}&minprice=${minprice}&maxprice=${maxprice}&product_title=${title_search}&manufacturer=${manufacturer}`);
    }

    getProduct(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/products/headphones/${id}`).pipe(
            map(product => product[0]),
            map((product: any) => {
                return {
                    id: product._id,
                    ...product
                }
            })
        );
    }

    simularProducts$ = this.globalProducts$.pipe(
        map(products => {
            let simular = [];
            for (let i = 0; i < 10; i++) {
                simular.push(products.data[i])
            }
            return simular;
        })
    )


    getHeadphonesManufacturer(): Observable<Manufacturer[]> {
        return this.http.get<Manufacturer[]>(`${this.baseUrl}/manufacturer/headphones`);
    }
    showLoading() {
        this.loadingService.showLoading()
    }

    hideLoading() {
        this.loadingService.hideLoading()
    }
}
