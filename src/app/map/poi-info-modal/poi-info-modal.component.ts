import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-poi-info-modal',
  standalone: true,
  imports: [],
  templateUrl: './poi-info-modal.component.html',
  styleUrl: './poi-info-modal.component.css'
})
export class PoiInfoModalComponent {

  @Input() modalTitle: string = '';
  @Input() description: string = '';

  constructor(public activeModal: NgbActiveModal) { }
}
