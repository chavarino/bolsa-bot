import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { ElectronService } from '../core/services';
import { PosicionInfo, TipoPosicion, UserCustom, UserStockIndexPosition, TipoVenta } from '../interfaces/datos';
import { Observable, Subscriber } from 'rxjs';
import { isUndefined } from 'util';
import { LogsService } from './logs.service';
import { ComprobadorUmbral } from '../clases/comprobadorUmbral';

@Injectable({
  providedIn: 'root'
})
export class DeGiroService {
  private idTimeOut: any;
  
  private suscribers : Array<Subscriber<PosicionInfo>>= [];
  private readonly msgErrorLogin = "Error al realizar login (user y contraseña incorrectas)";

  private readonly titleLogin = "Login";

  constructor(private electServ:ElectronService, private logServ: LogsService) {



   }

   consoleLog(title: string, msg: string, isError ?: boolean)
   {

    console.log(`[${new Date().toLocaleString() }][${title}]${isError ? "[ERROR]" : ""}: ${msg}`)

   }

   getStreamDegiro()
   {
      return new Observable((s : Subscriber<PosicionInfo>) =>{

        this.suscribers.push(s);
  
  
      });

   }

  private _isLogged : boolean  = false;
  private time : number = 20000
  private cooldown :number = 1;
  private readonly MAX_COOLDOWN :number = 30 * 60000 / this.time;//90;
  private deGiroId :string= "";

  setDeGiroId(id:string)
  {
    this.deGiroId = id;


    this.empezarRecolectorInformacion();
    
  }

  timeOutRecolectorInfo()
  {

    let time =  this.time + Math.random() * 10000; //humanizar bot
    let fn = ()=>{

      
      this.consoleLog("timeOutRecolectorInfo", "Recolector ini" )
      this.getPosicionAbierta();

      
    }
    this.idTimeOut = this.timeOutGeneric(this.time, 5000, fn)


  }

  
  timeOutGeneric(baseTime :number, maxRandomOffsetTime : number, fn : ()=>void)
  {

    let time =  baseTime+ Math.random() * maxRandomOffsetTime; //humanizar bot
 
    return setTimeout(fn, time)


  }

  tiempoEspera(tiempo ?: number)
  {

        return new Promise<void>((resolve, reject)=>{

          this.idTimeOut = this.timeOutGeneric(tiempo || 1000, 0, ()=>resolve())
        })
  

  }

  empezarRecolectorInformacion()
  {

    if(this.isLogged())
    { 
        

        this.getPosicionAbierta();
    }
  }
  private clearTimeOut() {
    if (this.idTimeOut) {
      clearTimeout(this.idTimeOut);
      this.idTimeOut = undefined;
    }
  }

  private async getPosicionAbierta()
  {
    this.clearTimeOut();
    if(this.cooldown===0) //coldown de comprobacion de login
    { 
       
      this.consoleLog("getPosicionAbierta", "Comprobacion de sesión." )
      let isLogin = await  this.electServ.ipcRenderer.invoke('isLogin');

      if(!isLogin)
      {
          await this.tiempoEspera()
          let resultadoRelogin  = await  this.electServ.ipcRenderer.invoke('reLogin');
          if(resultadoRelogin===-1)
          {

   
            this.consoleLog("getPosicionAbierta", "relogin, cerrando recolector", true )
            this._isLogged=false;
            return;
          }
          
          this.consoleLog("getPosicionAbierta", "Relogueado"  )
      }
      await this.tiempoEspera()
      this.consoleLog("getPosicionAbierta", "Login correcto"  )

    }
    
    let v = await  this.electServ.ipcRenderer.invoke('getPosicionAbierta', this.deGiroId);
    let res : PosicionInfo;
    this.consoleLog("getPosicionAbierta", "Posiciones activas" )
    if(v===undefined)
    {
        //ha habido algun error 
        this.consoleLog("getPosicionAbierta", "Error al intentar obtener Posicioones", true )
    }
    else if(v.length>0 && v[0])
    {
      this.consoleLog("getPosicionAbierta", "devolviendo posiciones activas"  )
      res = {
        
        nAcciones : v[0].size,
        pCompra : v[0].breakEvenPrice,
        tipo: TipoPosicion.ACTIVA
      }
      
      
    }
    else{
      // ver si hay ordenes
      await this.tiempoEspera();
      this.consoleLog("getPosicionAbierta", "Sin posiciones activas, obteniendo ordenes pendientes"  )
      //TODO
      res = {
        
        nAcciones : 0,
        pCompra : 0,
        tipo: TipoPosicion.NS
      }
      
    }
    this.consoleLog("getPosicionAbierta", "devolviendo resultado: "+ JSON.stringify(res)  )
 
    this.suscribers.forEach(s=>s.next(res));

    if(this.isLogged())
    {
      this.consoleLog("getPosicionAbierta", "Relanzando Recolector"  )
      this.timeOutRecolectorInfo();

    }
  
 
    this.cooldown  = (++this.cooldown) % this.MAX_COOLDOWN;
  }


  async login(cred : UserCustom)
  {

    this._isLogged = false;

    let v = await this.electServ.ipcRenderer.invoke('login', cred.user, cred.pass)
    
    if(v===-1)
    {

          alert(this.msgErrorLogin);
          this.logServ.insertNewErrorLog(this.titleLogin, this.msgErrorLogin)
          return;

    }
    this._isLogged= v===1;
    console.log("login devuelve", v)
    this.logServ.insertNewInfoLog(this.titleLogin, "Logueado correctamente con el usuario:" + cred.user)
    await this.tiempoEspera()
    this.empezarRecolectorInformacion()
  }



  logOut()
  {

    this.clearTimeOut();
 
    if(!this._isLogged)
    {
        return;
    }
    this._isLogged=  false ;
    const title = "Logout";
    this.logServ.insertNewInfoLog(title, "Desconectando...");
    this.electServ.ipcRenderer.invoke('logout' ).then((v)=>{

 
      if(v===-1)
      {

        this.logServ.insertNewInfoLog(title, "no fue posible desconectar con éxito");
      }
      else{

        this.logServ.insertNewInfoLog(title, "Usuario Desconectado con éxito");
      }
      
    
       console.log(title, v)
  })
 
  }

  isLogged()
  {

      return this._isLogged;
  }

  async venderAPrecMercado(numAcciones : number, compUmbral:ComprobadorUmbral, isMock ?: boolean)
  {

    let title = (isMock ? "(MODO_PRUEBA)" : "" ) + "Venta:" + compUmbral.getDesTipo();
    this.logServ.insertNewInfoLog(title, `Iniciando Orden a precio de mercado [${compUmbral.getDesTipo()}][Umbral: ${compUmbral.getUmbral()}]` )

    let v;
    if(!isMock)
    {
      //v = await this.electServ.ipcRenderer.invoke('ventaPrecioMercado', this.deGiroId, numAcciones);
    
      
      this.consoleLog("venderAPrecMercado", "Modo real");

    }
    else{
      v =1;
      this.consoleLog("venderAPrecMercado", "Modo prueba");
    }

    if(v===-1)
    {
      this.consoleLog("venderAPrecMercado", "Error al realizar venta", true )
      //alert("Error al realizar la venta")
      this.logServ.insertNewErrorLog(title, `Error al intentar realizar la venta.` )
    }
    else{

      this.consoleLog("venderAPrecMercado", "Operacion realizada, order:"+ v)
      alert("Orden realizada con éxito")
      this.logServ.insertNewInfoLog(title, `Orden a precio de mercado realizado con éxito` )
    }
    

    return v;

  }
}
