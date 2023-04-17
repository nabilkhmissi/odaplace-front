import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, catchError, of, tap, throwError } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { LoadingService } from "./loading.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient,
        private router: Router,
        private loadingService: LoadingService) { }

    private authUser = new BehaviorSubject<boolean>(false);
    authUser$ = this.authUser.asObservable();


    private baseUrl = environment.baseUrl;

    setAuthenticatedUser(user: any) {
        this.authUser.next(user)
    }


    register(user: User) {
        this.loadingService.showLoading();
        return this.httpClient.post(`${this.baseUrl}/auth/signup`, user).pipe(
            tap(() => {
                this.loadingService.hideLoading()
            })
        );
    }

    login(loginCredential: any) {
        this.loadingService.showLoading();
        return this.httpClient.post(`${this.baseUrl}/auth/login`, loginCredential).pipe(
            tap(user => {
                if (user) {
                    this.authUser.next(true);
                    this.saveLoginToLocalStorage(user)
                };
                this.loadingService.hideLoading();
                this.router.navigate([''])
            })
        )
    }

    saveLoginToLocalStorage(user: any) {
        localStorage.setItem('odaplaceLogin', JSON.stringify(user))
    }
    deleteLoginFromLocalStorage() {
        localStorage.removeItem('odaplaceLogin')
    }

    getAuthUSerFromLocalstorage() {
        let loginCredential = localStorage.getItem('odaplaceLogin');
        if (loginCredential) {
            this.authUser.next(true)
        } else {
            this.authUser.next(false)
        }
    }
}