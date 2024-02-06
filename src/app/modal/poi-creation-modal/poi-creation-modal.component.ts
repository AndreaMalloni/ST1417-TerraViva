import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-poi-creation-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './poi-creation-modal.component.html',
  styleUrl: './poi-creation-modal.component.css'
})
export class PoiCreationModalComponent {
  constructor(public activeModal: NgbActiveModal) { }

  selectedType: string = 'CULTURAL_POI';

  onTypeChange() {
    switch (this.selectedType) {
      case 'CULTURAL_POI':
        this.selectedType = 'CULTURAL_POI';
        break;
      case 'EVENT_POI':
        this.selectedType = 'EVENT_POI';
        break;
      case 'COMMERCIAL_POI':
        this.selectedType = 'COMMERCIAL_POI';
        break;
      case 'RECREATIONAL_POI':
        this.selectedType = 'RECREATIONAL_POI';
        break;
      default:
        break;
    }
  }
}
