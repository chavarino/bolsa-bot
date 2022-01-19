import { Injectable } from '@angular/core';
import { InfoLog, TipoLog } from '../interfaces/datos';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor() { }

  lista : Array<InfoLog> = [
 

  ]

  insertNewErrorLog(title:string, text:string)
  {

    this.insertNewlog(TipoLog.ERROR, title, text)
  }
  insertNewInfoLog(title:string, text:string)
  {

    this.insertNewlog(TipoLog.INFO, title, text)
  }
  insertNewlog(tipo: TipoLog, title:string, text:string)
  {
      this.lista.unshift({
        tipo,
        title,
        text,
        fecha : new Date()
      })
  }
}
