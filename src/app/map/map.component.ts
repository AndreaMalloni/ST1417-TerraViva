import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PoiInfoModalComponent} from "../modal/poi-info-modal/poi-info-modal.component";
import * as L from 'leaflet';
import {PoiCreationModalComponent} from "../modal/poi-creation-modal/poi-creation-modal.component";
import {PoiServices} from "../services/poi.services";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {

  map!: L.Map;

  constructor(private http: HttpClient, private modalService: NgbModal, private poiServices: PoiServices, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.map = this.initializeMap();
    this.loadBordersGeoJson(this.map);
    this.loadPoiMarkers(this.map);
    this.setMapClickEvent(this.map);
  }

  private initializeMap(): L.Map {
    const map = L.map('map').setView([43.1608, 13.7182], 13);
    const iconUrl = 'assets/images/marker.png';
    const shadowUrl = 'assets/images/shadow.png';
    L.Marker.prototype.options.icon = L.icon({
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    return map;
  }

  private loadBordersGeoJson(map: L.Map): void {
    this.http.get('/assets/data/borders.geojson').subscribe(
      (data: any) => {
        L.geoJson(data, {
          style: {
            color: 'red',
            weight: 2,
            fillOpacity: 0.1
          }
        }).addTo(map);
      },
      (error) => {
        console.error('Errore nel caricamento del GeoJSON:', error);
      }
    );
  }

  private loadPoiMarkers(map: L.Map): void {
    this.poiServices.getPOI().subscribe(
      response => {
        response.forEach((poi: any) => {
          const marker = L.marker([poi.latitude, poi.longitude]).addTo(map);
          this.setupMarkerClickEvent(marker, poi);
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  private setupMarkerClickEvent(marker: L.Marker, dataItem: any): void {
    marker.on('click', () => {
      const modalRef = this.modalService.open(PoiInfoModalComponent);
      modalRef.componentInstance.poiData = dataItem;
    });
  }

  private setMapClickEvent(map: L.Map) {
    map.on('click', (e) => {
      if (this.authService.checkLogin()) {
        this.openPOICreationModal(e);
      }
    });
  }

  private openPOICreationModal(e: L.LeafletMouseEvent) {
    const modalRef = this.modalService.open(PoiCreationModalComponent);
    modalRef.componentInstance.formData.latitude = e.latlng.lat;
    modalRef.componentInstance.formData.longitude = e.latlng.lng;
    modalRef.result.then(() => {
      this.loadPoiMarkers(this.map);
    })
  }
}
