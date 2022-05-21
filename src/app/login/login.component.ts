import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@Angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorInicio: boolean = false;
  errorInicioCliente: boolean = false;
  loading: boolean = false;
  loadingCliente: boolean = false;
  usuario: any = {};
  cliente: any = {};

  constructor(private http: HttpClient) { }

  homeUser(){
    location.href = "/home-user";
  }

  ngOnInit(): void {
  }

  // login() {
  //   let formulario: any = document.getElementById("login");
  //   let formularioValido: boolean = formulario.reportValidity();
  //   if (formularioValido) {
  //     this.loading = true;
  //     this.loginService().subscribe(
  //       data => this.iniciarSesion(data)
  //     )
  //   }
  // }

  login(){
    this.loading = false;
    location.href = "/home";
  }

  // iniciarSesion(resultado: any) {
  //   this.loading = false;
  //   if (resultado) {
  //     localStorage.setItem("usuario", JSON.stringify(resultado));

  //     if (resultado.idRol == 1) {
  //       location.href = "/home";
  //     } else {
  //       location.href = "/home-user";
  //     }
  //   } else {
  //     this.errorInicio = true;
  //   }
  // }

  loginService() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>("http://localhost:2020/usuario/login", this.usuario, httpOptions);
  }

}
