import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    private notificationSubject = new BehaviorSubject<boolean>(false)
    notificationSubject$ = this.notificationSubject.asObservable();

    showNotification() {
        this.notificationSubject.next(true)
    }

    hideNotification() {
        this.notificationSubject.next(false)
    }

}