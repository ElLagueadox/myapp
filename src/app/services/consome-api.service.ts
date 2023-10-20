import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class ConsomeAPIService {
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin' :'*'
  })
  }

  apiURL = 'https://jsonplaceholder.typicode.com'

  public login(usuario: string, pass: string): Observable<HttpResponse<usuario>> {
    const body = {
      user: usuario,
      password: pass
    };

    return this.http.post<usuario>(this.url + "login", body, { ...this.httpOptions, observe: 'response' });
  }

  constructor(private http:HttpClient) { }

  getPosts():Observable<any>{
    return this.http.get(this.apiURL+'/posts/').pipe(
    retry(3)
    );
    }
}
