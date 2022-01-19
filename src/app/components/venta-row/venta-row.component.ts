import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
 
import {  VentaRowModel } from '../../interfaces/datos';

@Component({
  selector: 'app-venta-row',
  templateUrl: './venta-row.component.html',
  styleUrls: ['./venta-row.component.scss']
})
export class VentaRowComponent implements OnInit {




  @ViewChild('formulario') formulario;

  modelo  : VentaRowModel = {

    isManual : true,
    pCompra : 1.5,
    nAcciones : 300,
    pVenta : 0,
    ganancia : 0,
    isActivo: false
  }


  
  @Input() get pCompra(): number { return this.modelo.pCompra }

  set pCompra(value: number) {
    this.modelo.pCompra = value;
  }

  @Input() get nAcciones(): number { return this.modelo.nAcciones }

  set nAcciones(value: number) {
    this.modelo.nAcciones = value;
  }


  @Input() get pVenta(): number { return this.modelo.pVenta }

  set pVenta(value: number) {
    this.modelo.pVenta = value;
  }

  @Output() umbralChange = new EventEmitter<VentaRowModel>();

 
  constructor() { }

  ngOnInit(): void {
  }



  ngAfterViewInit() {
    
    this.formulario.form.valueChanges.subscribe((change : VentaRowModel) => {

      this.modelChanged(change);
    });

    
  }


  modelChanged(change : VentaRowModel)
  {
    /*if(!this.isLoaded)
    {
        return;
    }*/
    Object.assign(this.modelo, change);
    console.log(change, this.modelo);
 
    this.calcular();

   
    this.emitirUmbral()
  }

  emitirUmbral()
  {

    
    this.umbralChange.emit({
      isActivo : this.modelo.isActivo,
      pVenta : this.modelo.pVenta
    });
  }
 


  calcular()
  {

    if(this.modelo.isManual)
    {
        //this.modelo.ganancia = this.modelo.pVenta/this.modelo

        this.modelo.ganancia = parseFloat (((this.modelo.pVenta-this.modelo.pCompra) * this.modelo.nAcciones).toFixed(2))
    }
    else{
      this.modelo.pVenta = parseFloat ((this.modelo.ganancia / this.modelo.nAcciones + this.modelo.pCompra).toFixed(3))

    }

  }


}
