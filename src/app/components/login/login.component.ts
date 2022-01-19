import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeGiroService } from '../../services/de-giro.service';
import { UserCustom } from '../../interfaces/datos';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private deGiroService : DeGiroService) { }

  cred : UserCustom = {
    user : "",
    pass : ""
  }
  
  @Input()
  disabled : boolean;

  ngOnInit(): void {
  }

  login()
  {

      this.deGiroService.login(this.cred);


  }

  logout()
  {

    this.deGiroService.logOut();
  }

  canLogin()
  {
    return this.cred.user && this.cred.user!=="" && this.cred.pass && this.cred.pass!=="";
  }
  isLogged()
  {
    return this.deGiroService.isLogged()
  }

  ngOnDestroy(): void {
    
    this.deGiroService.logOut();
    
  }
}
