import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ValoresSelectComponent } from './valores-select/valores-select.component';
import { FichaValorComponent } from './ficha-valor/ficha-valor.component';
import { ActionsTableComponent } from './actions-table/actions-table.component';
import { VentaRowComponent } from './venta-row/venta-row.component';
import { ListaLogsComponent } from './lista-logs/lista-logs.component';
import { ItemListLogComponent } from './item-list-log/item-list-log.component';



@NgModule({
  declarations: [LoginComponent, ValoresSelectComponent, FichaValorComponent, ActionsTableComponent, VentaRowComponent, ListaLogsComponent, ItemListLogComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [LoginComponent,ValoresSelectComponent, FichaValorComponent, ActionsTableComponent, ListaLogsComponent
  ]
})
export class ComponentsModule { }
