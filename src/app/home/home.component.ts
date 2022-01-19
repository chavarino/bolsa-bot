import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { ObjectCustom } from '../interfaces/datos';
import { DeGiroService } from '../services/de-giro.service';
import { RealDataService } from '../services/real-data.service';
//import soundfile from '../senial_venta.mp3')
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  
  constructor(private router: Router, private realDataServ : RealDataService,private deGiroServ : DeGiroService) { }


  disabledModel : ObjectCustom<boolean> = {
    selectValores : false,
    compLogin : false
  }


  ngOnInit(): void { }

  
  canMostrar()
  {
    return this.isStockIndexSet() && this.deGiroServ.isLogged();
  }


    isStockIndexSet() {
    return this.realDataServ.isStockIndexIdSet();
  }
}
