import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators   } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  txtbtn = "INGRESAR";
  txtuser = "Usuario";
  txtpass = "Contraseña";
  placeuser = "Ingrese su usuario";
  placepass = "Ingrese contraseña";

  userprofe = 'diego'
  passprofe = '1234'
  useralumno = 'tahir'
  passalumno = '4321'

    usuario = new FormGroup({
    user: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]),
  });

  public vhome() {
    if (this.userprofe == this.usuario.value.user && this.passprofe == this.usuario.value.pass){
      let navigationExtras: NavigationExtras = {
        state: {user: this.usuario.value.user}
        };
        this.router.navigate(['/home'],navigationExtras);
    }
    if (this.useralumno == this.usuario.value.user && this.passalumno == this.usuario.value.pass){
      let navigationExtras: NavigationExtras = {
        state: {user: this.usuario.value.user}
        };
        this.router.navigate(['/home2'],navigationExtras);
    }
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
