import { Component, Input, OnInit } from '@angular/core';
import { PopupService } from '../service/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(private popupService: PopupService) { }

  message$ = this.popupService.notificationSubject$;
  ngOnInit(): void {
  }

  hidePopup() {
    this.popupService.hideNotification();
  }
}
