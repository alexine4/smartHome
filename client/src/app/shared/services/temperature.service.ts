import { Message, Temperature } from './../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  delay = 2000
  constructor(private httpClient: HttpClient) { }

  public fetchByRoom(roomId: number): Observable<Temperature> {
    return this.httpClient.get<Temperature>(`/api/temps/getTemp/${roomId}`).pipe(delay(this.delay));
  }

  public create(temp:Temperature): Observable<Message>{
  return this.httpClient.post<Message>(`/api/temps/addNew`,temp).pipe(delay(this.delay))
  }
  public update(temp:Temperature): Observable<Message>{
  return this.httpClient.patch<Message>(`/api/temps/update/${temp.roomId}`,temp).pipe(delay(this.delay))
  }
  public delete(roomId:number): Observable<Message>{
  return this.httpClient.delete<Message>(`/api/temps/update/${roomId}`).pipe(delay(this.delay))
  }


}
