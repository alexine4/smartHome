import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, Type } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  create(type: Type): Observable<Message>{
    return this.http.post<Message>(`/api/types/addNew`,type)
  }
  delete(typeName: string): Observable<Message>{
    return this.http.delete<Message>(`/api/types/addNew/${typeName}`)
  }
}
