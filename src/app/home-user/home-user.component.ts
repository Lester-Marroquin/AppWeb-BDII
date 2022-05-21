import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@Angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  usuario: any = {};
  perfil: boolean = false;
  modificarPer: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!this.usuario) {
      location.href = "/";
    } else {
      if (this.usuario.idRol != 2) {
        location.href = "/";
      }
    }
  }

  logout() {
    localStorage.removeItem("usuario");
    location.href = "/";
  }

  mostrarPerfil() {
    this.activosDespachados = false;
    this.activosDespachadosDetalles = false;
    this.pedidosEntregados = false;
    this.entregadosDetalles = false;
    this.pedidosCancelados = false;
    this.canceladosDetalles = false;
    this.modificarPer = false;
    this.perfil = !this.perfil;
  }

  modificarPerfil() {
    this.activosDespachados = false;
    this.activosDespachadosDetalles = false;
    this.pedidosEntregados = false;
    this.entregadosDetalles = false;
    this.pedidosCancelados = false;
    this.canceladosDetalles = false;
    this.perfil = false;
    this.modificarPer = !this.modificarPer;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////

  loading: boolean = false;

  modificarMiPerfil() {
    let formulario: any = document.getElementById("crear");
    let formularioValido: boolean = formulario.reportValidity();
    if (formularioValido) {
      this.loading = true;
      this.createService().subscribe(data => this.confirmar(data)
      )
    }
  }

  confirmar(resultado: any) {
    this.loading = false;
    if (resultado) {
      alert("Datos guardados exitosamente");
    } else {
      alert("Error al guardar los datos");
    }
  }

  createService() {
    this.usuario.idRol = 2;
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>("http://localhost:2020/usuario/guardar", this.usuario, httpOptions);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////Funciones para ver los pedidos y modificarlos////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  pedidos: any = {};
  datosPedido: any = {};

  activosDespachados: boolean = false;
  activosDespachadosDetalles: boolean = false;

  pedidosEntregados: boolean = false;
  entregadosDetalles: boolean = false;

  pedidosCancelados: boolean = false;
  canceladosDetalles: boolean = false;

  verPedidosActivos() {
    this.modificarPer = false;
    this.perfil = false;
    this.pedidosEntregados = false;
    this.entregadosDetalles = false;
    this.canceladosDetalles = false;
    this.pedidosCancelados = false;
    var estadoA = "A";
    var estadoB = "D";
    this.buscarPedidosAB(estadoA, estadoB);
    this.activosDespachados = !this.activosDespachados;
  }

  verDetallesPedActDesp(datos: any) {
    this.modificarPer = false;
    this.activosDespachadosDetalles = !this.activosDespachadosDetalles;
    this.datosPedido = datos;
  }

  verPedidosEntregado() {
    this.modificarPer = false;
    this.perfil = false;
    this.activosDespachados = false;
    this.activosDespachadosDetalles = false;
    this.canceladosDetalles = false;
    this.pedidosCancelados = false;
    var estado = "E";
    this.buscarPedidos(estado);
    this.pedidosEntregados = !this.pedidosEntregados;
  }

  verDetallesPedEntregados(datos: any) {
    this.modificarPer = false;
    this.entregadosDetalles = !this.entregadosDetalles;
    this.datosPedido = datos;
  }

  verPedidosCancelados() {
    this.modificarPer = false;
    this.perfil = false;
    this.activosDespachados = false;
    this.activosDespachadosDetalles = false;
    this.pedidosEntregados = false;
    var estado = "C";
    this.buscarPedidos(estado);
    this.pedidosCancelados = !this.pedidosCancelados;
  }

  verDetallesPedCancelados(datos: any) {
    this.modificarPer = false;
    this.canceladosDetalles = !this.canceladosDetalles;
    this.datosPedido = datos;
  }

  buscarPedidos(estado: any) {
    this.loading = true;
    this.buscarPedidosServicio(estado).subscribe(
      (response: any) => this.llenarPedidos(response)
    );
  }

  buscarPedidosServicio(estado: any): Observable<any> {
    return this.http.get<any>("http://localhost:2020/pedido/buscar/" + estado).pipe(
      catchError(e => "error")
    )
  }

  buscarPedidosAB(estadoA: any, estadoB: any) {
    this.loading = true;
    this.buscarPedidosABServicio(estadoA, estadoB).subscribe(
      (response: any) => this.llenarPedidos(response)
    );
  }

  buscarPedidosABServicio(estadoA: any, estadoB: any): Observable<any> {
    return this.http.get<any>("http://localhost:2020/pedido/buscar/" + estadoA + "/" + estadoB).pipe(
      catchError(e => "error")
    )
  }

  llenarPedidos(produ: any) {
    var p = produ[0];
    if (p) {
      this.pedidos = produ;
      this.loading = false;
    } else {
      alert("Actualmente no hay pedidos en el estado seleccionado")
      this.activosDespachados = false;
      this.activosDespachadosDetalles = false;

      this.pedidosEntregados = false;
      this.entregadosDetalles = false;

      this.pedidosCancelados = false;
      this.canceladosDetalles = false;
      this.loading = false;
      this.pedidos = {};
    }
  }

  guardarCambiosPedido() {
    this.createServicePedido().subscribe(
      data => this.confirmarCreacionPedido(data));
  }

  createServicePedido() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>("http://localhost:2020/pedido/guardar", this.datosPedido, httpOptions);
  }

  confirmarCreacionPedido(resultado: any) {
    this.loading = false;
    if (resultado) {
      alert("Los cambios han sido guardado exitosamente en el pedido");
    } else {
      alert("Error al gardar el pedido");
    }
  }

  //////////////////Cancelacion de un pedido y actualización en Stock//////////////////////////////////////////////

  productoActualizado: any = {};

  cancelarPedido() {

    var pedidoACancelar = this.datosPedido;
    var detallesAux = this.datosPedido.detallesList;

    for (let i = 0; i < this.datosPedido.detallesList.length; i++) {
      var id = detallesAux[i].idProducto;

      this.buscarProductoStock(id);
    }

    this.guardarCambiosPedido();
    this.activosDespachados = false;
    this.activosDespachadosDetalles = false;
  }


  //////////Llama el producto a modificar//////////////////

  buscarProductoStock(id: any) {
    this.loading = true;
    this.aStockServicio(id).subscribe(
      (response: any) => this.llenarProd(response)
    );

  }

  aStockServicio(id: any): Observable<any> {
    return this.http.get<any>("http://localhost:2020/producto/buscarproducto/" + id).pipe(
      catchError(e => "error")
    )
  }

  llenarProd(producto: any) {
    if (producto != (undefined)) {

      var c = 0;

      for (let i = 0; i < this.datosPedido.detallesList.length; i++) {
        var p = this.datosPedido.detallesList[i];
        if (producto.idProducto == p.idProducto) {
          c = producto.cantidadDisponible + p.cantidad;
          break;
        }
      }

      this.productoActualizado = {
        idProducto: producto.idProducto, nombreProducto: producto.nombreProducto, descripcionProducto: producto.descripcionProducto,
        precioProducto: producto.precioProducto, imagen: producto.imagen, cantidadDisponible: c
      };

      this.loading = false;
      this.addServiceProducto().subscribe(data => this.confirmarAddProducto(data));
    } else {
      alert("Error al actualizar Stocks");
      this.loading = false;
    }
  }

  /////////////Guarda el pedido a modificarse en Stock///////////////////////

  addServiceProducto() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>("http://localhost:2020/producto/guardar", this.productoActualizado, httpOptions);
  }

  confirmarAddProducto(resultado: any) {
    this.loading = false;
    if (resultado) {
    } else {
      alert("Error al guardar el producto");
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
