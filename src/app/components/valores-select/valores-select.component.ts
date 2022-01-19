import { Component, Input, OnInit } from '@angular/core';
import { SelectValores } from '../../interfaces/datos';
import { RealDataService } from '../../services/real-data.service';
import { DeGiroService } from '../../services/de-giro.service';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-valores-select',
  templateUrl: './valores-select.component.html',
  styleUrls: ['./valores-select.component.scss']
})
export class ValoresSelectComponent implements OnInit {


   indices : Array<SelectValores> = [
    {
      cod_dgi : "1446558",
      cod_inv : "13809",
      valor : "IAG"
    },
    {
      cod_dgi : "4626943",
      cod_inv : "32180",
      valor : "Solaria"
    },
    {
      cod_dgi : "",
      cod_inv : "",
      valor : "Arcelor"
    }
  ];

  @Input()
  disabled : boolean;
  constructor(private realDataServ : RealDataService, private deGiroServ : DeGiroService, private logServ: LogsService) { }

  selectedValor :SelectValores | -1 =-1; 

  ngOnInit(): void {
  }

  onValorChange(valor:SelectValores)
  {


    this.logServ.insertNewInfoLog("Selección índice", "Indicie seleccionado:" + valor.valor);
    this.realDataServ.setStockIndexId(valor && valor.cod_inv ? valor.cod_inv : "");
    this.deGiroServ.setDeGiroId(valor.cod_dgi);
  }

}
