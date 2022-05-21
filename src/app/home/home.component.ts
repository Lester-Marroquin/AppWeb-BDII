import { HttpHeaders, HttpClient } from '@Angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading: boolean = false;
  usuario: any = {};
  perfil: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!this.usuario) {
      location.href = "/";
    } else {
      if (this.usuario.idRol != 1) {
        location.href = "/";
      }
    }
  }

  logout() {
    localStorage.removeItem("usuario");
    location.href = "/";
  }

  mostrarPerfil() {
    this.mostrarUser = false;
    this.crearUser = false;
    this.ingresarProducto = false;
    this.mostrarProduct = false;
    this.ingresarAnuncio = false;
    this.mostrarAnuncio = false;
    this.activosDespachados = false;
    this.pedidosEntregados = false;
    this.activosDespachadosDetalles = false;
    this.entregadosDetalles = false;
    this.canceladosDetalles = false;
    this.pedidosCancelados = false;
    this.perfil = !this.perfil;
  }

  //////////////////////Funciones para la creación de un usuario///////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  usuarioN: any = { idRol: 2 };
  crearUser: boolean = false;

  crearUsuario() {
    this.ingresarProducto = false;
    this.mostrarUser = false;
    this.perfil = false;
    this.mostrarProduct = false;
    this.ingresarAnuncio = false;
    this.mostrarAnuncio = false;
    this.activosDespachados = false;
    this.pedidosEntregados = false;
    this.activosDespachadosDetalles = false;
    this.entregadosDetalles = false;
    this.canceladosDetalles = false;
    this.pedidosCancelados = false;
    this.usuarioN = {};
    this.crearUser = !this.crearUser;
  }

  crear() {
    console.log(this.usuarioN);
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
      alert("Usuario guardado exitosamente");
      this.usuarioN = { idRol: 2 };
    } else {
      alert("Error al guardar los datos de usuario");
    }
  }


  createService() {
    this.usuarioN.idRol = 2;
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>("http://localhost:2020/usuario/guardar", this.usuarioN, httpOptions);
  }

  modificarUser(u: any) {
    this.usuarioN = u;
    this.usuarioN.idRol = 2;
    this.mostrarUser = !this.mostrarUser;
    this.crearUser = !this.crearUser;
  }

  eliminarUser(u: any) {
    this.usuarioN = u;
    this.deleteService().subscribe(
      (response: any) => this.deleteConfirmar(response)
    );
  }

  deleteService(): Observable<any> {
    return this.http.delete<any>("http://localhost:2020/usuario/eliminar/" + this.usuarioN.idUsuario).pipe(
      catchError(e => "Error al eliminar")
    )
  }

  deleteConfirmar(respuesta: any) {
    if (respuesta) {
      alert("Error al eliminar datos");
    } else {
      this.buscarUsuario();
      alert("Usuario eliminado correctamente");
    }
  }

  ////////////Funciones para modificar un Usuario//////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  usuarios: any = {};
  mostrarUser: boolean = false;

  mostrarUsuario() {
    this.ingresarProducto = false;
    this.perfil = false;
    this.crearUser = false;
    this.mostrarProduct = false;
    this.ingresarAnuncio = false;
    this.mostrarAnuncio = false;
    this.activosDespachados = false;
    this.pedidosEntregados = false;
    this.activosDespachadosDetalles = false;
    this.entregadosDetalles = false;
    this.canceladosDetalles = false;
    this.pedidosCancelados = false;
    this.buscarUsuario();
    this.mostrarUser = !this.mostrarUser;

  }

  buscarUsuario() {
    this.loading = true;
    this.buscarUsuarioServicio().subscribe(
      (response: any) => this.llenarUsuarios(response)
    );
  }

  llenarUsuarios(usuarios: any) {
    this.usuarios = usuarios;
    this.loading = false;
  }

  buscarUsuarioServicio(): Observable<any> {
    return this.http.get<any>("http://localhost:2020/usuario/buscar").pipe(
      catchError(e => "error")
    )
  }


  ///////////////Funciones para crear un Producto//////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ingresarProducto: boolean = false;
  producto: any = {};

  ingresarProd() {
    this.crearUser = false;
    this.mostrarUser = false;
    this.perfil = false;
    this.mostrarProduct = false;
    this.ingresarAnuncio = false;
    this.mostrarAnuncio = false;
    this.activosDespachados = false;
    this.pedidosEntregados = false;
    this.activosDespachadosDetalles = false;
    this.entregadosDetalles = false;
    this.canceladosDetalles = false;
    this.pedidosCancelados = false;
    this.ingresarProducto = !this.ingresarProducto;
  }

  crearProducto() {
    let formulario: any = document.getElementById("ingresarProducto");
    let formularioValido: boolean = formulario.reportValidity();
    if (formularioValido) {
      this.loading = true;
      this.createServiceProducto().subscribe(data => this.confirmarCrearProducto(data)
      )
    }
  }

  confirmarCrearProducto(resultado: any) {
    this.loading = false;
    if (resultado) {
      alert("Producto guardado exitosamente");
      this.producto = {};
    } else {
      alert("Error al guardar producto");
    }
  }


  createServiceProducto() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>("http://localhost:2020/producto/guardar", this.producto, httpOptions);
  }

  modificarStock(u: any) {
    this.producto = u;
    this.ingresarProducto = !this.ingresarProducto;
    this.mostrarProduct = !this.mostrarProduct;
  }

  x = {};

  consultaEliminarStock(p: any) {
    this.producto = p;
    this.deleteServiceStock().subscribe(data => this.deleteStockConfirmar(data)
    );
  }

  consultaDeteleProd(): Observable<any> {
    return this.http.get<any>("http://localhost:2020/detalles/buscarproducto/" + this.x).pipe(
      catchError(e => "Error al eliminar")
    )
  }

  deleteStockConsulta(respuesta: any) {
    if (respuesta == null) {
      this.deleteServiceStock().subscribe(
        (response: any) => this.deleteStockConfirmar(response)
      );
    } else {
      console.log(respuesta);
      this.listarStock();
      this.producto = {};
      alert("No se puede eliminar este producto, esta actualmente agregado en un pedido del cliente");
    }
  }

  ///////////

  deleteServiceStock(): Observable<any> {
    return this.http.delete<any>("http://localhost:2020/producto/eliminar/" + this.producto.idProducto).pipe(
      catchError(e => "Error al eliminar")
    )
  }

  deleteStockConfirmar(respuesta: any) {
    if (respuesta) {
      alert("Error al eliminar datos");
    } else {
      this.listarStock();
      alert("Producto eliminado correctamente");
    }
  }


  ////////////Funciones para Listar los productos//////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  product: any = {};
  mostrarProduct: boolean = false;

  listarStock() {
    this.ingresarProducto = false;
    this.perfil = false;
    this.crearUser = false;
    this.mostrarUser = false;
    this.ingresarAnuncio = false;
    this.mostrarAnuncio = false;
    this.activosDespachados = false;
    this.pedidosEntregados = false;
    this.activosDespachadosDetalles = false;
    this.entregadosDetalles = false;
    this.canceladosDetalles = false;
    this.pedidosCancelados = false;
    this.buscarProducto();
    this.mostrarProduct = !this.mostrarProduct;

  }

  buscarProducto() {
    this.loading = true;
    this.buscarProductoServicio().subscribe(
      (response: any) => this.llenarStock(response)
    );
  }

  llenarStock(product: any) {
    this.product = product;
    this.loading = false;
  }

  buscarProductoServicio(): Observable<any> {
    return this.http.get<any>("http://localhost:2020/producto/buscar").pipe(
      catchError(e => "error")
    )
  }

  /////////Funciones para crear un anuncio/////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ingresarAnuncio: boolean = false;
  anuncio: any = {};

  mostrarCrearAnuncio() {
    this.crearUser = false;
    this.mostrarUser = false;
    this.perfil = false;
    this.mostrarProduct = false;
    this.ingresarProducto = false;
    this.mostrarAnuncio = false;
    this.activosDespachados = false;
    this.pedidosEntregados = false;
    this.activosDespachadosDetalles = false;
    this.entregadosDetalles = false;
    this.canceladosDetalles = false;
    this.pedidosCancelados = false;
    this.ingresarAnuncio = !this.ingresarAnuncio;
  }

  crearAnuncio() {
    let formulario: any = document.getElementById("ingresarAnuncio");
    let formularioValido: boolean = formulario.reportValidity();
    if (formularioValido) {
      this.loading = true;
      this.createServiceAnuncio().subscribe(data => this.confirmarCrearAnuncio(data)
      )
    }
  }

  confirmarCrearAnuncio(resultado: any) {
    this.loading = false;
    if (resultado) {
      alert("Anuncio guardado exitosamente");
      this.anuncio = {};
    } else {
      alert("Error al guardar el anuncio");
    }
  }


  createServiceAnuncio() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>("http://localhost:2020/anuncio/guardar", this.anuncio, httpOptions);
  }

  modificarAnuncio(u: any) {
    this.anuncio = u;
    console.log(this.anuncio.fechaInicio);
    this.mostrarAnuncio = !this.mostrarAnuncio;
    this.ingresarAnuncio = !this.ingresarAnuncio;
  }

  eliminarAnuncio(u: any) {
    this.anuncio = u;
    this.deleteServiceAnuncio().subscribe(
      (response: any) => this.deleteAnuncioConfirmar(response)
    );
  }

  deleteServiceAnuncio(): Observable<any> {
    return this.http.delete<any>("http://localhost:2020/anuncio/eliminar/" + this.anuncio.idAnuncio).pipe(
      catchError(e => "Error al eliminar")
    )
  }

  deleteAnuncioConfirmar(respuesta: any) {
    if (respuesta) {
      alert("Error al eliminar datos");
    } else {
      this.listarStock();
      alert("Anuncio eliminado correctamente");
    }
  }

  ////////////Funiones para listar los anuncios////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  anuncios: any = {};
  mostrarAnuncio: boolean = false;

  listarAnuncios() {
    this.ingresarProducto = false;
    this.perfil = false;
    this.crearUser = false;
    this.mostrarUser = false;
    this.ingresarAnuncio = false;
    this.mostrarProduct = false;
    this.activosDespachados = false;
    this.pedidosEntregados = false;
    this.activosDespachadosDetalles = false;
    this.entregadosDetalles = false;
    this.canceladosDetalles = false;
    this.pedidosCancelados = false;
    this.buscarAnuncio();
    this.mostrarAnuncio = !this.mostrarAnuncio;
  }

  buscarAnuncio() {
    this.loading = true;
    this.buscarAnuncioServicio().subscribe(
      (response: any) => this.llenarAnuncios(response)
    );
  }

  llenarAnuncios(anuncios: any) {
    this.anuncios = anuncios;
    this.loading = false;
  }

  buscarAnuncioServicio(): Observable<any> {
    return this.http.get<any>("http://localhost:2020/anuncio/buscar").pipe(
      catchError(e => "error")
    )
  }


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
    this.crearUser = false;
    this.mostrarUser = false;
    this.perfil = false;
    this.mostrarProduct = false;
    this.ingresarProducto = false;
    this.mostrarAnuncio = false;
    this.ingresarAnuncio = false;
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
    this.activosDespachadosDetalles = !this.activosDespachadosDetalles;
    this.datosPedido = datos;
  }

  verPedidosEntregado() {
    this.crearUser = false;
    this.mostrarUser = false;
    this.perfil = false;
    this.mostrarProduct = false;
    this.ingresarProducto = false;
    this.mostrarAnuncio = false;
    this.ingresarAnuncio = false;
    this.activosDespachados = false;
    this.activosDespachadosDetalles = false;
    this.canceladosDetalles = false;
    this.pedidosCancelados = false;
    var estado = "E";
    this.buscarPedidos(estado);
    this.pedidosEntregados = !this.pedidosEntregados;
  }

  verDetallesPedEntregados(datos: any) {
    this.entregadosDetalles = !this.entregadosDetalles;
    this.datosPedido = datos;
  }

  verPedidosCancelados() {
    this.crearUser = false;
    this.mostrarUser = false;
    this.perfil = false;
    this.mostrarProduct = false;
    this.ingresarProducto = false;
    this.mostrarAnuncio = false;
    this.ingresarAnuncio = false;
    this.activosDespachados = false;
    this.activosDespachadosDetalles = false;
    this.pedidosEntregados = false;
    var estado = "C";
    this.buscarPedidos(estado);
    this.pedidosCancelados = !this.pedidosCancelados;
  }

  verDetallesPedCancelados(datos: any) {
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
