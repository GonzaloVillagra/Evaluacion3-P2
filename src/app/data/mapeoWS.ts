export interface destinoInfoWS{
    xid: string
    name: string    
}

export interface destinoWS{
    type:string
    id:string
    properties: destinoInfoWS
}

export interface resultadoWS{
    destinos: any[]   
    type: String
    features: destinoWS[]
}

export interface direccionDestinoWS{
    city: string
    state:string
    country: string
}

export interface destinoImgWS{
    source: string
}

export interface destinodetalleWS{
    xid:string
    name: string
    address: direccionDestinoWS
    preview: destinoImgWS
}
export interface destino{
    xid: number;
    nombre: string;
    pais: string;
    imagen: string;
    montoViaje: number;
 }