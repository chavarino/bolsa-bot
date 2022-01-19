import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { InputActionTable, ModeloActionTable, ObjectCustom, VentaRowModel, IndiceValor, TipoPosicion, TipoDatoInvesting } from '../../interfaces/datos';
import { ComprobadorUmbralStopLose, ComprobadorUmbralVentaNormal, ComprobadorUmbral } from '../../clases/comprobadorUmbral';
import { RealDataService } from '../../services/real-data.service';
import { DeGiroService } from '../../services/de-giro.service';
import { SoundClass } from '../../clases/sound';

@Component({
  selector: 'app-actions-table',
  templateUrl: './actions-table.component.html',
  styleUrls: ['./actions-table.component.scss']
})
export class ActionsTableComponent implements OnInit {

  constructor(private realDataServ : RealDataService, private deGiroServ : DeGiroService) {



  }
  isConfirmacion=false;
  isModoPrueba = true;
 // @ViewChild('checkactive') input : ElementRef;

  modelo : ModeloActionTable = {
      activo : false,
     ventaRowsModel :  {
      ventaNormal : new ComprobadorUmbralVentaNormal(),
      stopLose : new ComprobadorUmbralStopLose()
    },
    inputActionTable : {
        nAcciones :  0,
        pActual : -1,
        pCompra : 0,
        tipoPosicion : TipoPosicion.NS,
        tipoDato : TipoDatoInvesting.REAL
    }
  
    


  }

  sonidVenta : SoundClass  =  SoundClass.crearBip("/assets/sounds/senial_venta.mp3");
  isTipoPosicionActiva () {

    return this.modelo.inputActionTable.tipoPosicion === TipoPosicion.ACTIVA;
  }

  onChangeVentaNormalRow(umbral :VentaRowModel)
  {
        console.log("onChangeNormalRow", umbral)
        this.modelo.ventaRowsModel.ventaNormal.setActive(umbral.isActivo);
        this.modelo.ventaRowsModel.ventaNormal.setUmbral(umbral.pVenta);
        this.comprobarUmbrales ();
  }

  

  onChangeStopLoseRow(umbral :VentaRowModel)
  {
    console.log("onChangeStopLoseRow", umbral)
     this.modelo.ventaRowsModel.stopLose.setUmbral(umbral.pVenta);
     this.modelo.ventaRowsModel.stopLose.setActive(umbral.isActivo);
     this.comprobarUmbrales ();
  }
  


  @Input()
  disabled : boolean;

  
  ngOnInit(): void {

    this.realDataServ.getStream().subscribe((valor:IndiceValor)=>{


          this.modelo.inputActionTable.pActual = valor.last_numeric;
          this.modelo.inputActionTable.tipoDato = valor.tipoDato;
          if(!this.isDataReal() && !this.isDataMock())
          {
                this.modelo.activo=false;
          }
        

                  this.comprobarUmbrales()

           
    });

    this.deGiroServ.getStreamDegiro().subscribe(valor=>{

      this.modelo.inputActionTable.nAcciones = valor.nAcciones;
      this.modelo.inputActionTable.pCompra = valor.pCompra;
      this.modelo.inputActionTable.tipoPosicion = valor.tipo;
  })

   
  }

  isDataReal()
  {

      return this.modelo.inputActionTable.tipoDato === TipoDatoInvesting.REAL;
  }
  isDataMock()
  {

      return this.modelo.inputActionTable.tipoDato === TipoDatoInvesting.MOCK;
  }
  modelActivoChanged()
  {
    this.modelo.activo = !this.modelo.activo;


    this.comprobarUmbrales();

    
  }
 
    comprobarUmbrales ()
    {
      if(!this.modelo.activo || !this.isTipoPosicionActiva () || this.modelo.inputActionTable.pActual===-1 || !this.isDataReal() && !this.isDataMock())
        return;

        Object.keys(this.modelo.ventaRowsModel).forEach((tag)=>{

          let comprobadorUmbral : ComprobadorUmbral = this.modelo.ventaRowsModel[tag];
          if(comprobadorUmbral.isUmbralSuperadoYActivo(this.modelo.inputActionTable.pActual))
          {

                this.modelo.activo =false;

                console.log("Umbral sobrepasado en", comprobadorUmbral.getTipo(), this.modelo.inputActionTable.pActual, comprobadorUmbral.getUmbral())
                
                let ejecutar =true;
                if(this.isConfirmacion)
                {
                  ejecutar = confirm(`Se ha sobrepasado el umbral [ ${comprobadorUmbral.getDesTipo()}], Quieres ejecutar la venta?`);
                  
                }
                
                if(ejecutar)
                {
                  
                  //this.input.nativeElement.click()
                  this.sonidVenta.play();

            
                  this.deGiroServ.venderAPrecMercado(this.modelo.inputActionTable.nAcciones, comprobadorUmbral, this.isModoPrueba || this.isDataMock() ).then((v)=>{

                    if(v===-1)
                    {
                        setTimeout(()=>this.modelo.activo=true, 2000)
                    }
                    else{
                      //setTimeout(()=>this.modelo.activo=false, 1000)
                    }



                  });

                }else{
                  this.modelo.activo=true;
                }
          }
        })

    }

}
