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

    LoginComponent.selectableTextArea =
        document.querySelectorAll('#ingresoScript');

        LoginComponent.selectableTextArea.forEach((element) => {
        element.addEventListener('mouseup', selectableTextAreaMouseUp);
      });

      function selectableTextAreaMouseUp() {
        let selectedText = window.getSelection()?.toString().trim();
        let addTextToResult: string = ((<HTMLInputElement>(
          document.getElementById('resultadosScript')
        )).value = selectedText || '');
        console.log(selectedText);
      }
      
  }

  limpiarScript() {
    let limpiaTexto = ((<HTMLInputElement>(
      document.getElementById('ingresoScript')
    )).value = '');
  }

  limpiarResultado() {
    let clasedb = document.querySelector('.db');
    const div = document.querySelector('#resultadosScript');
    clasedb?.remove();

  }

  llamarMetodo() {
    this.objeto.host = this.host;
    this.objeto.user = 'root';
    this.objeto.password = '1234';
    this.objeto.database = 'projectbd2';

    this.dashboardService
      .getTables(this.objeto)
      .subscribe((res: any) => this.finalizarGuardar(res));

  }

  finalizarGuardar(respuesta: any) {
    this.response = respuesta;

    this.data = this.response.data;

    console.log(this.data[1].table);
    console.log("muestra tablas");
  }

  mostrarResultado() {
    const selectedText = window.getSelection()?.toString().trim();
    console.log('texto: ' + selectedText);
    const regSelect = /select [a-zA-Z1-9*=<>+^(),.%/ ]+\;/gi;
  
    let queryObject: any = {};
    queryObject.host = this.host;
    queryObject.user = "root";
    queryObject.password = "1234";
    queryObject.database = "projectbd2";
    queryObject.query = selectedText

    if (selectedText?.match(regSelect)) {
      this.dashboardService
        .dScript(queryObject)
        .subscribe((res: any) => this.selectScript(res));
    }  else {
      this.dashboardService
        .dScript(queryObject)
        .subscribe((res: any) => this.rScript(res));
    }
  }

  selectScript(res: any){
    this.response = res;
    this.data = this.response.data;
    console.log(this.data);
    this.queryInfo(this.data);
  }

  queryInfo(info: any) {
    console.log(info);
    const div = document.querySelector('#resultadosScript');
    const tb = document.createElement('table');
    tb.className = 'db';
    const tr = document.createElement('tr');
    let objectProp = Object.keys(info[0]);

    objectProp.forEach((pr: any) => {
      let header = document.createElement('th');
      let headerText = document.createTextNode(pr);
      header.appendChild(headerText);
      tr.appendChild(header);
    });
    tb.appendChild(tr);

    info.forEach((arr: any, index: number) => {
      let objectValue = Object.values(info[index]);
      const tr2 = document.createElement('tr');
      objectValue.forEach((val: any) => {
        let header = document.createElement('td');
        let headerText = document.createTextNode(val);
        header.appendChild(headerText);
        tr2.appendChild(header);
      });
      tb.appendChild(tr2);
    });
    div?.appendChild(tb);
  }
  
  rScript(respuesta: any) {
    this.response = respuesta;
    this.data = this.response.data;

    console.log(this.response);
    this.queryInfo2(this.response);
  }

  queryInfo2(info: any) {
    console.log(info);
    const status = info.statusCode;
    const data = info.data;
    const div = document.querySelector('#resultadosScript');
    const p = document.createElement('p');
    let statusText = document.createTextNode(
      ` Sentencia ejecutada:`
    );
    p.appendChild(statusText);
    p.className = 'db';
    div?.appendChild(p);
  }


  

}
