import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    private notificationSubject = new BehaviorSubject<string | null>(null)
    notificationSubject$ = this.notificationSubject.asObservable();

    showNotification(message: string) {
        this.notificationSubject.next(message)
    }

    hideNotification() {
        this.notificationSubject.next(null)
    }

}