import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import * as L from 'leaflet';
import {icon, Marker} from 'leaflet';
import $ from 'jquery';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    const map = L.map('map').setView([43.1608, 13.7182], 13);
    const iconUrl = 'assets/images/marker.png';
    const shadowUrl = 'assets/images/shadow.png';
    Marker.prototype.options.icon = icon({
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

    $.getJSON('/assets/data/borders.geojson', function (data) {
      L.geoJson(data, {
        style: {
          color: 'red',
          weight: 2,
          fillOpacity: 0.1
        }
      }).addTo(map);
    });

    this.http.get('api/POI/getAllPOI').subscribe(
      (data: any) => {
        data.forEach((dataItem: any) => {
          L.marker([dataItem.latitude, dataItem.longitude]).addTo(map);
        });
      },
      (error) => {
        console.error('Errore nella richiesta HTTP:', error);
      }
    );
  }
}
