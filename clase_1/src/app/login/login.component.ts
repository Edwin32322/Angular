import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  
  constructor(private router:Router){
  }
  ngOnInit(): void{
    
  }
  
  user = JSON.parse(localStorage.getItem("usuario") || "[]")
  correo: String = '';
  password: String = '';
  
  myForm: FormGroup = new FormGroup({
    correoCampo: new FormControl('', [Validators.required, Validators.email]),
    passwordCampo: new FormControl('', [Validators.required, Validators.minLength(5)] ),
  });
  
    
    onSubmit(){
      if (this.myForm.valid) {
        this.iniciarSesion()
      } else {
        this.validarCampos()
      }
    }
    
    
    validarCampos(){
      const password = this.myForm.get("passwordCampo")
      const correo = this.myForm.get("correoCampo")
      if (correo?.invalid || password?.invalid) {
        if (correo?.hasError("required") || password?.hasError("required")) {
          alert("Los campos no deben estar vacíos")
        }
        if (correo?.hasError("email")) {
          alert("Ingrese un correo válido")
        }
        if(password?.hasError("minlength")){
          alert("La contraseña debe contener más de 5 carácteres")
        }
      }
    }
    
    comprobarUsuarioExistente(){
      const usuario = this.user.find((usuario: { correo: String; password: String; }) => usuario.correo === this.correo && usuario.password === this.password);
      if (usuario) {
        return true
      }else{
        return false
      }
    }
    
    
    iniciarSesion(){
      if (this.comprobarUsuarioExistente()) {
        alert('Crendeciales Correctas')
        this.router.navigate(['dashboard']);
      }else{
        alert('Credenciales Incorrectas')
      }
      
      
    }
    
  }
