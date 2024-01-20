import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { terminalOutline, trashOutline } from 'ionicons/icons';
import { airplaneOutline } from 'ionicons/icons';
import { cameraOutline } from 'ionicons/icons';
import { addCircleOutline } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { CommonModule  } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { Camera, Photo, CameraResultType } from '@capacitor/camera/';
import { OTMService } from '../servicios/otm.service';
import { Modal1Page } from '../modal1/modal1.page';
import { DataDestinoService } from '../servicios/data-destino.service';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.page.html',
  styleUrls: ['./destinos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DestinosPage implements OnInit {


  lugares: {imagenDestino: any; name: string, country: string, imagen: string}[] = []
  lugaresBuscados: string[] = []
  foto: Photo | null = null;
  imagenDestino: string | undefined
  lugaresEncontrados: any;

  

  constructor(
    private servicio: OTMService,
    private modalCtrl:ModalController,
    private servicioD: DataDestinoService

  ) { addIcons({addCircleOutline, cameraOutline, trashOutline, airplaneOutline }) }

  ngOnInit(): void {
    this.realizarBusquedaInicial();
    }
  

  async manejoInput($event: any) {
    //Busqueda del Destino
    const termino = $event.detail.value
    const resultado = await this.servicio.buscarDestino(termino)
    this.lugaresBuscados = []
    //Busqueda de Imagen
    this.lugares = [];
    for (const feature of resultado.features) {
      const destinoDetalle = await this.servicio.buscarImg(feature.properties.xid);
      this.lugares.push({
        name: feature.properties.name,
        country: destinoDetalle.address?.country, 
        imagen: destinoDetalle.preview?.source,
        imagenDestino: undefined
      });
    }
  }

  async gestionDestino(destino: any) {
    const modal = await this.modalCtrl.create({
      component: Modal1Page,
      componentProps: {
        destino: destino,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        const destinoActualizado = data.data;
        
        this.servicioD.agregarDestino(destinoActualizado);
      }
    });

    return await modal.present();
  }


  eliminarDestino(destino: any) {
    const confirmarEliminacion = window.confirm(`¿Seguro que deseas eliminar ${destino.name}?`);

    if (confirmarEliminacion) {
      const index = this.lugares.indexOf(destino);
      if (index !== -1) {
        this.lugares.splice(index, 1);
      }
    }
  }
  async agregarDestino(destino: any) {
    console.log('Agregando destino:', destino);
    
    const modal = await this.modalCtrl.create({
      component: Modal1Page,
      componentProps: {
        destino: destino,
      },
    });
  
    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        const destinoActualizado = data.data;
        this.servicioD.agregarDestino(destinoActualizado);
        console.log(this.servicioD.obtenerDestino(destinoActualizado));
      }
    });
      return await modal.present(); 
  }  

  //codigo captura de fotos
  async capturarFoto() {
    this.foto = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      correctOrientation: true,
    });
    if (this.lugares.length > 0) {
      this.lugares[0].imagenDestino = this.foto.webPath;
    }
  }

  //codigo para intentar cargar una busqueda inicial
  async realizarBusquedaInicial(): Promise<void> {
    try {
      const termino = 'serena'; 
      const resultado = await this.servicio.buscarDestino(termino);
      this.lugaresBuscados = resultado.destinos;
    } catch (error) {
      console.error('Error al realizar la búsqueda inicial', error);
    }
  }

}


