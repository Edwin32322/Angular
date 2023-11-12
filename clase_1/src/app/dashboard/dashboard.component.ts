import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  usuario = JSON.parse(localStorage.getItem("usuario") || "[]")
  buscar : string = '' 
  constructor(private router:Router){
    this.usuario
  }
  onChange() {
    this.usuario = JSON.parse(localStorage.getItem("usuario") || "[]")
    if (this.buscar) {
      const usuariosFiltrados = this.usuario.filter((usuario: { usuario: string }) =>
      usuario.usuario.toLowerCase().includes(this.buscar.toLowerCase())
    );
  
      if (usuariosFiltrados.length > 0) {
        this.usuario = usuariosFiltrados;
      } else {
        console.log("No se encontraron usuarios");
        this.usuario = []
      }
    } 
  
  }
  
  
  ngOnInit(): void{

  }

}
