import { fn } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ObjectCustom, IndiceValor, PosicionInfo, TipoPosicion } from '../../interfaces/datos';
import { DeGiroService } from '../../services/de-giro.service';
import { RealDataService } from '../../services/real-data.service';


interface Columna  {
    titulo : string,
    getValor : ()=> number | string,
    clases :  string | Function
}

interface ModeloFicha {

  indiceValor : IndiceValor,
  posicionValor: PosicionInfo,
  ganancias : number
}
@Component({
  selector: 'app-ficha-valor',
  templateUrl: './ficha-valor.component.html',
  styleUrls: ['./ficha-valor.component.scss']
})
export class FichaValorComponent implements OnInit {

  @Input()
  disabled : boolean;


  modelo : ModeloFicha = {

    indiceValor : {

    } as IndiceValor,
    posicionValor : {
      pCompra : 0,
      nAcciones : 0,
      tipo : TipoPosicion.NS
    },


    ganancias : 0

  }


  getDesTipoPosicion()
  {
    return this.modelo.posicionValor.tipo === TipoPosicion.ACTIVA ? "POSICION ACTIVA" : "SIN TODAVÍA O EN CURSO"
  }
  columnas : Array<Columna> = [{
      titulo : "Prec. Máximo",
      getValor: () =>  this.modelo.indiceValor.high,
      clases : "text-success"
  },{
    titulo : "Prec. Actual",
    getValor: () =>   this.modelo.indiceValor.last_numeric,
    clases : "text-warning"
  },{
    titulo : "Prec. Mínimo",
    getValor: () =>   this.modelo.indiceValor.low,
    clases : "text-danger"
  },{
    titulo : "Prec. Compra",
    getValor: () => this.modelo.posicionValor.pCompra,
    clases : "text-primary"
  },{
    titulo : "N. Acciones",
    getValor: () =>  this.modelo.posicionValor.nAcciones,
    clases : "text-primary"
  },{
    titulo : "Ganancias",
    getValor: () =>  {

      this.modelo.ganancias = (this.modelo.indiceValor.last_numeric-this.modelo.posicionValor.pCompra)*this.modelo.posicionValor.nAcciones;

      return this.modelo.ganancias.toFixed(2);
    },
    clases : ()=>{
      return this.modelo.ganancias>=0 ? "text-success" : "text-danger"
    }
  }]


  isString(valor) :boolean
  {
      return typeof valor === "string";
  }
  constructor(private realDataServ : RealDataService, private deGiroServ : DeGiroService) { }

  ngOnInit(): void {


    this.realDataServ.getStream().subscribe( (valor : IndiceValor)=>{
        this.modelo.indiceValor = valor;

    })

    this.deGiroServ.getStreamDegiro().subscribe(valor=>{

        this.modelo.posicionValor = valor;
    })
  }

}
