import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { ConsomeAPIService } from 'src/app/services/consome-api.service';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-home2',
  templateUrl: 'home2.page.html',
  styleUrls: ['home2.page.scss'],
})
export class Home2Page implements OnInit {

  public mensaje: string = "";
  public entrada = {
    numero1: 0,
    numero2: 0
  };

  userHome: any;
  pass: any;
  value = "dcaresg";
  idProfesor : any;

  cursos: any[] = [];

  constructor(private activeroute: ActivatedRoute, private router: Router, private apiService : ConsomeAPIService, private service: TestService) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.userHome = this.router.getCurrentNavigation()?.extras.state?.['user'];
        this.idProfesor = this.router.getCurrentNavigation()?.extras.state?.['id'];
      }
    });

  }

  verDetalleCurso(cursoId: number) {
    let setData: NavigationExtras = {
      state: {
        idProfesor: this.idProfesor,
        cursoId : cursoId
      }
    };
    this.router.navigate(['/detallecurso'],setData);
}


  ngOnInit() {
    this.apiService.obtenerCursosPorProfesor(this.idProfesor).subscribe(data => {
      this.cursos = data;
      console.log(this.cursos);
    });
  }

  doSumar(){
    this.mensaje= "La suma es: " + 
      this.service.sumar(
        Number(this.entrada.numero1),
        Number(this.entrada.numero2));
  }
}
