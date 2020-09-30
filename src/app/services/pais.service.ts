import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  base_url = 'https://restcountries.eu/rest/v2/lang/es';

  constructor(
    private http: HttpClient
  ) { }


  getPaises() {
    return this.http.get<any>(this.base_url).pipe(
      map( (pais: any[]) => pais.map( pais => ({nombre: pais.name, codigo: pais.alpha3Code}))));
  }
}
