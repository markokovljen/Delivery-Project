import { Component, HostListener, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { OrderResponseDto } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['../../../../node_modules/leaflet/dist/leaflet.scss']
})
export class MapComponent implements OnInit {

  map!: L.Map;
  innerHeight: any;
  containerHeight!:number;
  icon:any;
  orders! : OrderResponseDto [];
  @Input() onTakeOrder!: (orderId: number) => void;

  constructor(private orderService : OrderService) { }

  ngOnInit() {
    this.initMap();
    this.defineIcons();
    this.getPendingOrders();
  }

  getPendingOrders() {
    let userId = +localStorage.getItem('id')!
    this.orderService.getPendingDelivererOrders(userId).subscribe((data : any)=>{
       this.orders = data;
       console.log(this.orders);
       this.addOrderMarkers(this.orders);
    })
  }

  defineIcons() {
    let iconUrl = '../../../assets/images/icons8-google-maps-old.svg';
    this.icon = L.icon({
      iconUrl
    });
  }

  initMap() {
    this.map = L.map('map', {
      center: [ 45.2396, 19.8227],
      zoom: 14
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    tiles.addTo(this.map);
  }

  addOrderMarkers(orders:OrderResponseDto[]){
    console.log(orders);
    orders.forEach((element,index) => {

      let marker = L.marker([45.2396 + (index / 1000), 19.8227 + (index / 1000)], {icon:this.icon});
      marker.addTo(this.map);
      marker.on('click', (e) => {
        this.onTakeOrder(element.id)
      });
    });
  }
}
