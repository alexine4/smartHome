import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Message, Type } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  delay = 5000
  constructor(private httpClient: HttpClient) { }

  public fetchAll(): Observable<Type[]> {
    return this.httpClient.get<Type[]>('/api/types/getTypes').pipe(delay(this.delay))
  }
  public create(type: Type): Observable<Message> {
    return this.httpClient.post<Message>(`/api/types/addNew`, type).pipe(delay(this.delay))
  }
  public update(type: Type): Observable<Message> {
    return this.httpClient.patch<Message>(`/api/types/update/${type.typeName}`, type).pipe(delay(this.delay))
  }
  public delete(typeName: string): Observable<Message> {
    return this.httpClient.delete<Message>(`/api/types/delete/${typeName}`).pipe(delay(this.delay))
  }
}
