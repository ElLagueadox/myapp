import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { usuario } from '../modelo/usuario';
import { alumnos } from '../modelo/alumnos';
import { LoginPage } from 'src/app/pages/login/login.page';

@Injectable({
  providedIn: 'root'
})
export class ConsomeAPIService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) }

  url: string = 'https://apimocha.com/consomeapi1/';


  public obtenerCursosPorProfesor(profesorId: number): Observable<any> {
    return this.http.get<any>(this.url + 'profesores/' + profesorId + '/cursos', this.httpOptions);
  }

  public obtenerAlumnosPorCurso(profesorId: number, cursoId: number): Observable<alumnos[]> {
    return this.http.get<alumnos[]>(this.url + 'profesores/' + profesorId + '/cursos/' + cursoId + '/alumnos', this.httpOptions);
  }

  obtenerUsuarios():Observable<any>{
    return this.http.get(this.url+'users');
    }

  constructor(private http: HttpClient) {
  }
}
