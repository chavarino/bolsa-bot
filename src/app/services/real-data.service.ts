import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { MockStockDataStream, RealStockDataStream } from '../clases/StockDataStream';

import { IndiceValor, StockDataStream, TipoDatoInvesting } from '../interfaces/datos';
 

@Injectable({
  providedIn: 'root'
})
export class RealDataService {

  private _isMock : boolean = false;
  private stockIndexId: string ="";
  constructor(private httpclient : HttpClient) { }


  stockDataStream : StockDataStream;

  isMock()
  {
    return this._isMock;
  }
  
  isStockIndexIdSet()
  {
    return this.stockIndexId && this.stockIndexId!=="";
  }
  
  private createMockStockDataStream() : StockDataStream
  {

    
    let dataMock: IndiceValor[]  = []
    this.httpclient.get<IndiceValor[]>("/assets/data/IntradayHistdata-13809-2021-03-19.json").toPromise().then((res)=>{
      dataMock.push(...res)

  })


  
  return new MockStockDataStream(dataMock)




  }


  createRealStockDataStream(id:string) :StockDataStream {


    return new RealStockDataStream(id);
  }


  setStockIndexId(id :string)
  {
      this.stockIndexId = id;
      if(this.stockDataStream)
      {
        this.stockDataStream.setStockIndexId(this.stockIndexId);
      }
  }
  
  private suscribers : Array<Subscriber<IndiceValor>>= [];


  getStream() : Observable<IndiceValor>{
  

    this.crearStream();


      return new Observable<IndiceValor>((s)=>{


            this.suscribers.push(s);
            s.next({
                tipoDato: TipoDatoInvesting.NS
            }as IndiceValor)
      });

  }


  

  private crearStream() {
    if (!this.stockDataStream) {
      if (this._isMock) {
        this.stockDataStream = this.createMockStockDataStream();

      }
      else {

        this.stockDataStream = this.createRealStockDataStream(this.stockIndexId);
      }


      this.stockDataStream.getStream().subscribe((v)=>{


        this.suscribers.forEach((s)=>{

          s.next(v)
        })
      })

    }
  }
}
  

