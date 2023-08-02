import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calculation, Limit, Message, Sypply, Using } from '../interfaces';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SypplyService {

  delay = 1500
  constructor(
    private httpClient: HttpClient
  ) { }
  // sypplies
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
  public fetchById(sypplyId: number): Observable<Sypply> {
    return this.httpClient.get<Sypply>(`/api/sypplies/getOne/${sypplyId}`).pipe(delay(this.delay));
  }
  //limits
  public fetchLimit(sypplyId: number): Observable<Limit> {
    return this.httpClient.get<Limit>(`/api/sypplies/getLimit/${sypplyId}`).pipe(delay(this.delay));
  }
  public changeLimit(limit:Limit): Observable<Message> {
    return this.httpClient.post<Message>(`/api/sypplies/addNewLimit/${limit.sypplyId}`,limit).pipe(delay(this.delay));
  }
  //usings
  public fetchUsing(sypplyId:number): Observable<Using[]> {
    return this.httpClient.get<Using[]>(`/api/sypplies/getUsing/${sypplyId}`).pipe(delay(this.delay));
  }
  // calculations
  public fetchCounts(sypplyId:number): Observable<Calculation[]> {
    return this.httpClient.get<Calculation[]>(`/api/sypplies/getCalc/${sypplyId}`).pipe(delay(this.delay));
  }
  public createCalc(calc: Calculation): Observable<Message> {
    return this.httpClient.post<Message>('/api/sypplies/addNewCalc', calc).pipe(delay(this.delay));
  }
}
