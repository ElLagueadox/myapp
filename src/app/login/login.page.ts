import { Component, OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators   } from '@angular/forms';
import { Router, NavigationExtras, mapToCanActivate} from '@angular/router';
import { AnimationController, IonCard } from '@ionic/angular';

import type { Animation } from '@ionic/angular';
import { AuthGuard } from '../guard/auth.guard';

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

  userprofe = 'diego'
  passprofe = '1234'
  useralumno = 'tahir'
  passalumno = '4321'

    usuario = new FormGroup({
    user: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]),
  });
  auth: any;

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

  private animation: Animation | undefined ;
  constructor(private router: Router, private animationCtrl: AnimationController) { }
  
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
