import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { OTMService } from '../servicios/otm.service';
import { IonModal} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal1',
  templateUrl: './modal1.page.html',
  styleUrls: ['./modal1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Modal1Page implements OnInit{
  @ViewChild(IonModal) modal!:IonModal;


  valor:string ="";
  formatoMoneda:string ="";
  mensaje:string="";  
  destino: any;
  dismiss: any;
  destinoId: any; 

  constructor(
    private modalCtrl: ModalController,
    private servicio: OTMService,
    private route: ActivatedRoute


    ) { }

 

  confirmar() {
    this.destino.valor = this.valor;
    this.destino.formato = this.formatoMoneda;
    this.modalCtrl.dismiss();
  }

  onWillDismiss(event: Event){
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    console.dir({ev})
    if( ev.detail.role === 'confirmar'){
      this.mensaje = `se guardo el destino`
    }
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const destinoId = params.get('id');
    });
  }

  cerrarModal(destino: any) {
    this.modalCtrl.dismiss({
      data: destino,
    });
  }
}


