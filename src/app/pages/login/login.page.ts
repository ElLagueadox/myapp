import { FormControl,FormGroup,Validators   } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import { AnimationController, IonCard } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import type { QueryList } from '@angular/core';
import { Component,OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { ConsomeAPIService } from 'src/app/services/consome-api.service';
import { AlertController } from '@ionic/angular';
import { AuthGuard } from '../../guards/guard/auth.guard';
import { AuthGuard2 } from '../../guards/guard2/auth.guard2';
import { Request, Response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement> | undefined;

  textBtn = "INGRESAR";
  textUser = "Usuario";
  textPass = "Contraseña";
  desUser = "ingrese usuario";
  desPass = "ingrese contraseña";

  private typeuser!: [any, any, any, any, any, any, any, any, any, any, any, any];
  username: any;
  password: any;

    usuario = new FormGroup({
    user: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
  })

  /*Login(){
      this.consomeApi.obtenerUsuarios().subscribe((res)=>{
      console.log();
      this.typeuser = [res[0].id, res[0].user, res[0].password, res[0].nombre, res[0].perfil, res[0].correo,
      res[1].id, res[1].user, res[1].password, res[1].nombre, res[1].perfil, res[1].correo];
      
      if (this.usuario.value.user == res[0].user && this.usuario.value.pass == res[0].password) {
        this.auth.setProfeAuthenticationStatus(true);
        this.router.navigate(['/home2']);
      }

      if (this.usuario.value.user == res[1].user && this.usuario.value.pass == res[1].password) {
        this.auth2.setAlumnoAuthenticationStatus(true);
        this.router.navigate(['/home']);
      }
    },(error)=>{
      console.log('Error en inicio de sesión:', error);
    });
  }*/

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Error Login',
      subHeader: 'Infomación : ',
      message: 'Usuario o contraseña son incorrecto',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }


  constructor(private consomeApi:ConsomeAPIService, private router: Router, private animationCtrl: AnimationController, private auth:AuthGuard,
    private auth2:AuthGuard2, private alertController :AlertController) { }
  ngOnInit() {}
}
