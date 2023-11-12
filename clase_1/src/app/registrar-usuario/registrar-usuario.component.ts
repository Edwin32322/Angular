import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {
  correo : string = ''
  password : string = ''
  usuario : String = '';
  telefono: String = '' ;
  numDoc: String = '' ;
  tipoDoc: string= '';
  listaUsuarios  = JSON.parse(localStorage.getItem("usuario") || "[]")

  opcionesSelect = ["Cédula", "Tarjeta de Identidad", "PEP", "Cédula de Extranjería"]


 constructor(private router:Router){
 }
 ngOnInit(): void{
 }
 
 myForm: FormGroup = new FormGroup({
  usuarioCampo: new FormControl('', [Validators.required]),
  correoCampo: new FormControl('', [Validators.required, Validators.email]),
  passwordCampo: new FormControl('', [Validators.required, Validators.minLength(5)] ),
  telefonoCampo: new FormControl('', [Validators.required,Validators.minLength(5)]),
  numDocCampo: new FormControl('', [Validators.required, Validators.minLength(5)]),
  tipoDocCampo: new FormControl('', [Validators.required, (control) => this.validacionOpciones(control)])
});



validacionOpciones(control: AbstractControl): ValidationErrors | null {
  const opcionesSelect = ["Cédula", "Tarjeta de Identidad", "PEP", "Cédula de Extranjería"];
  
  if (!opcionesSelect.includes(control.value)) {
    return { validacionOpcion: true, mensaje: "La opción no es correcta" };
  }
  
  return null;
}


validarCampos(){
  const usuario = this.myForm.get("usuarioCampo")
  const correo = this.myForm.get("correoCampo")
  const password = this.myForm.get("passwordCampo")
  const telefono = this.myForm.get("telefonoCampo")
  const numDocCampo = this.myForm.get("numDocCampo")
  const tipoDocCampo = this.myForm.get("tipoDocCampo")

  if (usuario?.invalid || correo?.invalid || password?.invalid || telefono?.invalid ||
     numDocCampo?.invalid || tipoDocCampo?.invalid) {
    if (usuario?.hasError("required")|| correo?.hasError("required") || password?.hasError("required") || telefono?.hasError("required") ||
      numDocCampo?.hasError("required") || tipoDocCampo?.hasError("required")) {
      alert("No puede haber campos vacíos")
      return
    }
    if (correo?.hasError("email")) {
      alert("Ingrese un correo válido")
      return
    }
    if (password?.hasError("minlength")) {
      alert("La longitud de la contraseña debe ser de mínimo 5 cáracteres")
      return
    }
    if (telefono?.hasError("minlength")) {
      alert("La longitud del teléfono debe ser de mínimo 5 cáracteres")
      return
    }
    if (numDocCampo?.hasError("minlength")) {
      alert("La longitud de número de identificación debe ser de mínimo 5 cáracteres")
      return
    }
    if(tipoDocCampo?.hasError("validacionOpcion")){
      alert("La opciones no es válida")
      return
    }
  }

}


validarDatosExistentes(){
  for (let i = 0; i < this.listaUsuarios.length; i++) {
    if (this.listaUsuarios[i].usuario === this.usuario) {
      alert("El usuario ya se encuentra registrado")
      return false
    }
    if (this.listaUsuarios[i].correo === this.correo) {
      alert("El correo registrado ya esta siendo utilizado")
      return false
    }
    if (this.listaUsuarios[i].numDoc === this.numDoc) {
      alert("El número de documento ya esta registrado con un usuario")
      return false
    }
  }
  return true
}

onSubmit(){
  if (this.myForm.valid) {
    if (this.validarDatosExistentes()) {
      this.registrarUsuario()
    }
  }else{
    this.validarCampos()
  }
}
  registrarUsuario(){
    const localUsuarios = JSON.parse(localStorage.getItem("usuario") || "[]")
    const usuario =
      {
        usuario: this.usuario,
        correo: this.correo,
        password: this.password,
        telefono : this.telefono,
        numDoc: this.numDoc,
        tipoDoc: this.tipoDoc
      }
    localUsuarios.push(usuario)
    localStorage.setItem("usuario", JSON.stringify(localUsuarios))

    alert('Ha registrado al usuario Exitosamente')

    this.correo = ""
    this.password = ""
    this.telefono = ""
    this.numDoc = ""
    this.tipoDoc = ""
  }


}
