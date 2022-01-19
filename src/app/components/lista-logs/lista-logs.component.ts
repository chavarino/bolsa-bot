import { Component, OnInit } from '@angular/core';
import { InfoLog, TipoLog } from '../../interfaces/datos';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-lista-logs',
  templateUrl: './lista-logs.component.html',
  styleUrls: ['./lista-logs.component.scss']
})
export class ListaLogsComponent implements OnInit {

  constructor(private logsServ : LogsService) { }


   


  getListaFromService()
  {
      return this.logsServ.lista
  }

  ngOnInit(): void {
  }

}
