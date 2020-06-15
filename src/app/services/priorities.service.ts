import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IPriority {
  _id: string,
  name: string,
  color: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class PrioritiesService {

  constructor(private http: HttpClient) { }

  public getPriorities(): Observable<IPriority[]> {
    return this.http.get<IPriority[]>(`${environment.apiUrl}/priorities`);
  }
}
