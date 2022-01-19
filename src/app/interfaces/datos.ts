import { Observable } from 'rxjs';
import { ComprobadorUmbral } from '../clases/comprobadorUmbral';
export interface UserCustom {


    user : string,
    pass : string,
    date ?: Date,


}


export interface SelectValores {


    valor : string,
    cod_inv : string,
    cod_dgi : string
}


export interface ObjectCustom<T> {
    [key: string] : T
  }



  export enum TipoVenta{
    
    VENTA_NORMAL =1,
    STOPLOSE = 2
  }


  export interface VentaRowModel {
    isManual ?: boolean,
    pCompra ?: number,
    nAcciones ?: number,
    pVenta ?: number,
    ganancia ?: number,
    isActivo ?: boolean
  }

  export interface InputActionTable {
      tipoPosicion: TipoPosicion;
      pCompra : number,
      pActual : number,
      nAcciones: number,
      tipoDato : TipoDatoInvesting
  }

  export interface ModeloActionTable {

      activo : boolean,
    ventaRowsModel : ObjectCustom<ComprobadorUmbral>,
    inputActionTable : InputActionTable,
  }


  export interface IndiceValor {
    pid: string;
    last_dir: string;
    last_numeric: number;
    last: string;
    bid: string;
    ask: string;
    high: string;
    low: string;
    pc: string;
    pcp: string;
    pc_col: string;
    time: string;
    timestamp: number;
    tipoDato : TipoDatoInvesting;
  }


  export enum TipoDatoInvesting {

      NS = 1,
      REAL = 2,
      MOCK = 3

  }




  export interface StockDataStream {

        
    setStockIndexId : (id : string) =>void;
    getStream : ()=> Observable<IndiceValor>
    close : () => void
    
}



export interface UserStockIndexPosition {
    id: string;
    positionType: string;
    size: number;
    price: number;
    value: number;
    plBase: PlBase;
    todayPlBase: PlBase;
    breakEvenPrice: number;
    averageFxRate: number;
    realizedProductPl: number;
    todayRealizedProductPl: number;
    productData: ProductData;
  }
  
  export interface ProductData {
    id: string;
    name: string;
    isin: string;
    symbol: string;
    contractSize: number;
    productType: string;
    productTypeId: number;
    tradable: boolean;
    category: string;
    currency: string;
    exchangeId: string;
    onlyEodPrices: boolean;
    orderTimeTypes: any[];
    buyOrderTypes: any;
    sellOrderTypes: any;
    productBitTypes: any[];
    closePrice: number;
    closePriceDate: string;
    feedQuality: string;
    orderBookDepth: number;
    vwdIdentifierType: string;
    vwdId: string;
    qualitySwitchable: boolean;
    qualitySwitchFree: boolean;
    vwdModuleId: number;
    feedQualitySecondary: string;
    orderBookDepthSecondary: number;
    vwdIdentifierTypeSecondary: string;
    vwdIdSecondary: string;
    qualitySwitchableSecondary: boolean;
    qualitySwitchFreeSecondary: boolean;
    vwdModuleIdSecondary: number;
  }
  
  export interface PlBase {
    EUR: number;
  }


  export interface PosicionInfo {

    nAcciones : number,

    pCompra :number,




    tipo : TipoPosicion


  }

  export enum TipoPosicion {
    PRE_COMPRA =1,
    ACTIVA = 2,
    NS = -1
  }
  

  export enum TipoLog {

      ERROR = 1,
      INFO = 2
  }
  export interface InfoLog {
    tipo : TipoLog,

    title : string,

    text : string,
    
    fecha : Date

  }

