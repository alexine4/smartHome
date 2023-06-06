import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, Sypply } from '../interfaces';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SypplyService {

  delay = 2000
  constructor(
    private httpClient: HttpClient
  ) { }

  public create(sypply: Sypply): Observable<Message> {
    return this.httpClient.post<Message>('/api/sypplies/addNew', sypply).pipe(delay(this.delay));
  }
  public update(sypply: Sypply): Observable<Message> {
    return this.httpClient.patch<Message>(`/api/sypplies/update/${sypply.sypplyId}`, sypply).pipe(delay(this.delay));
  }
  public delete(sypplyId: number): Observable<Message> {
    return this.httpClient.delete<Message>(`/api/sypplies/delete/${sypplyId}`).pipe(delay(this.delay));
  }
  public fetchAll(): Observable<Sypply[]> {
    return this.httpClient.get<Sypply[]>('/api/sypplies/getAll').pipe(delay(this.delay));
  }
}
