import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-poi-info-modal',
  standalone: true,
  imports: [
    NgIf,
    DatePipe
  ],
  templateUrl: './poi-info-modal.component.html',
  styleUrl: './poi-info-modal.component.css'
})
export class PoiInfoModalComponent {

  @Input() poiData: any = {}

  constructor(public activeModal: NgbActiveModal) {}

  protected readonly onformdata = onformdata;
}
