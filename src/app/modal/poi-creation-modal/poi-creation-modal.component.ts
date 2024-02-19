import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {PoiServices} from "../../services/poi.services";

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

  constructor(public activeModal: NgbActiveModal, private poiServices: PoiServices) { }

  formData: any = {
    type: 'CULTURAL_POI',
    latitude: 0.0,
    longitude : 0.0
  };

  onTypeChange() {
    switch (this.formData.type) {
      case 'CULTURAL_POI':
        this.formData.type = 'CULTURAL_POI';
        break;
      case 'EVENT_POI':
        this.formData.type = 'EVENT_POI';
        break;
      case 'COMMERCIAL_POI':
        this.formData.type = 'COMMERCIAL_POI';
        break;
      case 'RECREATIONAL_POI':
        this.formData.type = 'RECREATIONAL_POI';
        break;
      default:
        break;
    }
  }

  onSubmit() {
    this.poiServices.creation(this.formData).subscribe(
      response => {
        this.activeModal.close();
      },
      error => {
        console.error(error);
        this.activeModal.close();
      }
    );
  }
}
