import { Message, Temperature } from './../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private httpClient: HttpClient) { }

  public fetchById(tempId: number): Observable<Temperature> {
    return this.httpClient.get<Temperature>(`/api/temps/getTemp/${tempId}`).pipe(delay(1000));
  }

  public create(temp:Temperature): Observable<Message>{
  return this.httpClient.post<Message>(`/api/temps/addNew`,temp).pipe(delay(1000))
  }
  public update(temp:Temperature): Observable<Message>{
  return this.httpClient.patch<Message>(`/api/temps/update/${temp.tempId}`,temp).pipe(delay(1000))
  }
  public delete(tempId:number): Observable<Message>{
  return this.httpClient.delete<Message>(`/api/temps/update/${tempId}`).pipe(delay(1000))
  }


}
