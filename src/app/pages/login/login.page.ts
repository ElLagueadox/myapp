import { Component, OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators   } from '@angular/forms';
import { Router, NavigationExtras, mapToCanActivate, CanActivate} from '@angular/router';
import { AnimationController, IonCard } from '@ionic/angular';
import { ConsomeAPIService } from 'src/app/services/consome-api.service';

import type { Animation } from '@ionic/angular';
import { AuthGuard } from '../../guards/guard/auth.guard';
import { AuthGuard2 } from '../../guards/guard2/auth.guard2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement> | undefined;

  txtbtn = "INGRESAR";
  txtuser = "Usuario";
  txtpass = "Contraseña";
  placeuser = "Ingrese su usuario";
  placepass = "Ingrese contraseña";

  private typeuser!: usuario;

  userprofe = 'diego'
  passprofe = '1234'
  useralumno = 'tahir'
  passalumno = '4321'

    usuario = new FormGroup({
    user: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
  });

  public vhome() {
    if (this.userprofe == this.usuario.value.user && this.passprofe == this.usuario.value.pass){
      this.auth.setProfeAuthenticationStatus(true);
      let navigationExtras: NavigationExtras = {
        state: {user: this.usuario.value.user}
        };
        this.router.navigate(['/home'],navigationExtras);
    }
    if (this.useralumno == this.usuario.value.user && this.passalumno == this.usuario.value.pass){
      this.auth.setProfeAuthenticationStatus(true);
      let navigationExtras: NavigationExtras = {
        state: {user: this.usuario.value.user}
        };
        this.router.navigate(['/home2'],navigationExtras);
    }
  }

  apiLogin() {
    this.consomeApi.login(this.usuario.value.user!, this.usuario.value.pass!).subscribe(
      (response) => {
        this.typeuser = response.body as unknown as usuario;
        console.log("bbb" + response.status);
        if (response.status == 200) { 
          let setData: NavigationExtras = {
            state: {
              id: this.typeuser.id,
              user: this.typeuser.user,
              correo: this.typeuser.correo,
              nombre: this.typeuser.nombre,
              tipoPerfil: this.typeuser.tipoPerfil
            }
          };

          console.log("aaas"+this.typeuser.tipoPerfil);

          if (this.typeuser.tipoPerfil === 1) {
            this.auth.setProfeAuthenticationStatus(true);
            this.router.navigate(['/home'], setData);
          }

          if (this.typeuser.tipoPerfil === 2) {
            this.auth2.setAlumnoAuthenticationStatus(true);
            this.router.navigate(['/home2'], setData);
          }
        }

        if (response.status === 401) {
          this.presentAlert();

        }
      },
      (error) => {
        console.error('Error en inicio de sesión:', error);
      });
  }

  private animation: Animation | undefined ;
  constructor(private consomeApi:ConsomeAPIService, private router: Router, private animationCtrl: AnimationController, private auth:AuthGuard, private auth2:AuthGuard2) { }
  
  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card!.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
  }

  play() {
    this.animation!.play();
  }
  pause() {
    this.animation!.pause();
  }

  stop() {
    this.animation!.stop();
  }

  ngOnInit() {
  }
}
