import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@Angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

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

  ejecutarScript(){
    
  }

}
