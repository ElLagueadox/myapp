import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { ConsomeAPIService } from 'src/app/services/consome-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userHome: any;
  tituloUno: any;

  constructor(private consomeApi:ConsomeAPIService,private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.userHome = this.router.getCurrentNavigation()?.extras.state?.['user'];
      }
    });
  }

  //Método para mostrar
  Mostrar(){
    //this.presentAlert();
    this.consomeApi.getPosts().subscribe((res)=>{
      this.tituloUno = '' + res[0].title;
      console.log(res[0].title + "++++" + this.tituloUno);
    }, (error)=>{
      console.log(error);
    });
  }

  ngOnInit(): void {
  }
}
