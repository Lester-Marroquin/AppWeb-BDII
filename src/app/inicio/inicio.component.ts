import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@Angular/common/http';
import { DashboardService } from '../services/dashboard_services/dashboard.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dashboardService: DashboardService) {}

  objeto: any = {};
  host: String = 'localhost';
  response: any = {};
  data: any = [];

  static selectableTextArea: NodeListOf<Element>;

  ngOnInit(): void {
  }

  limpiarScript() {
    let limpiaTexto = ((<HTMLInputElement>(
      document.getElementById('ingresoScript')
    )).value = '');
  }

  limpiarResultado() {
    let limpiaTexto = ((<HTMLInputElement>(
      document.getElementById('resultadosScript')
    )).value = '');
  }

  llamarMetodo() {
    this.objeto.host = this.host;
    this.objeto.user = 'root';
    this.objeto.password = '1234';
    this.objeto.database = 'projectbd2';

    this.dashboardService
      .getTables(this.objeto)
      .subscribe((res: any) => this.finalizarGuardar(res));

      // this.dashboardService
      // .cualquiercosa(this.objeto)
      // .subscribe((res: any) => this.finalizarGuardar(res));
  }




}
