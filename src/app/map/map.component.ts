import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PoiInfoModalComponent} from "../modal/poi-info-modal/poi-info-modal.component";
import * as L from 'leaflet';
import {PoiCreationModalComponent} from "../modal/poi-creation-modal/poi-creation-modal.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    const map = this.initializeMap();
    this.loadBordersGeoJson(map);
    this.loadPoiMarkers(map);
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

    this.setMapClickEvent(map);

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
    this.http.get('api/POI/getAllPOI').subscribe(
      (data: any) => {
        data.forEach((dataItem: any) => {
          const marker = L.marker([dataItem.latitude, dataItem.longitude]).addTo(map);
          this.setupMarkerClickEvent(marker, dataItem);
        });
      },
      (error) => {
        console.error('Errore nella richiesta HTTP:', error);
      }
    );
  }

  private setupMarkerClickEvent(marker: L.Marker, dataItem: any): void {
    marker.on('click', () => {
      const modalRef = this.modalService.open(PoiInfoModalComponent);
      modalRef.componentInstance.modalTitle = dataItem.name;
      modalRef.componentInstance.description = dataItem.description;
    });
  }

  private setMapClickEvent(map: L.Map) {
    map.on('click', (e) => {
      const modalRef = this.modalService.open(PoiCreationModalComponent);
    });
  }
}
