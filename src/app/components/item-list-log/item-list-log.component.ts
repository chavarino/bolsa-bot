import { Component, Input, OnInit } from '@angular/core';
import { InfoLog, TipoLog } from '../../interfaces/datos';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-item-list-log',
  templateUrl: './item-list-log.component.html',
  styleUrls: ['./item-list-log.component.scss']
})
export class ItemListLogComponent implements OnInit {

  constructor() { }


  @Input()
  log : InfoLog;

  ngOnInit(): void {
  }

  getDesTipo()
  {

    return this.isTipoError() ? "Error" : "Info";
  }


  isTipoError()
  {
    return this.log.tipo === TipoLog.ERROR;
  }
}
