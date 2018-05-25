import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'



@Injectable()
export class FilmsService {

  constructor(private http: Http) {}

  getFilm(title: string) {
    let url = "https://34.216.71.119:8443/film/" + title;
    return this.http.get(url).pipe(map(response => response.json()));
  }
}
