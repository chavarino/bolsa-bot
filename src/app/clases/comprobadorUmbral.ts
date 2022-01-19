import { TipoVenta } from '../interfaces/datos';

  export abstract class ComprobadorUmbral {



    constructor(private umbral:number, private active : boolean )
    {

  
    }

    setActive(value:boolean)
    {
      this.active = value;
    }

    getActive()
    {
      return this.active;
    }

    getUmbral()
    {
        return this.umbral;
    }
    

    setUmbral(umbral:number)
    {
        this.umbral = umbral;
    }


    
    isUmbralSuperadoYActivo(valorActual : number)
    {
      return  this.getActive() && this.isUmbralSuperado(valorActual)
    }
     abstract isUmbralSuperado(valorActual : number);
     abstract getTipo() : TipoVenta;
     getDesTipo()
    {

      return this.getTipo() === TipoVenta.VENTA_NORMAL ? "Venta Normal" : "Stoplose"
    }
    

  }


  export class ComprobadorUmbralVentaNormal extends ComprobadorUmbral {
    
    
    constructor()
    {

      super(9999, false)
    }
      isUmbralSuperado(valorActual: number) :boolean {
      return valorActual >=this.getUmbral();
    }



    getTipo():TipoVenta
    {

      return TipoVenta.VENTA_NORMAL
    }
    
  }

  export class ComprobadorUmbralStopLose extends ComprobadorUmbral {
    
    constructor()
    {

      super(0, false)
    }
    
      isUmbralSuperado(valorActual: number) :boolean {
      return valorActual <=this.getUmbral();
    }



    
    getTipo():TipoVenta
    {

      return TipoVenta.STOPLOSE
    }
  }