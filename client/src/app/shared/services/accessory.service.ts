import { Observable, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accessory, Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {

  delay = 2000
  constructor(private httpClient: HttpClient) { }

  public create(accesory: Accessory):Observable<Message>{
    return this.httpClient.post<Message>(`/api/accesories/addNew`,accesory).pipe(delay(this.delay))
  }
  public update(accesory: Accessory):Observable<Message>{
    return this.httpClient.patch<Message>(`/api/accesories/update/${accesory.accessoryId}`,accesory).pipe(delay(this.delay))
  }
  public delete(accessoryId: number):Observable<Message>{
    return this.httpClient.delete<Message>(`/api/accesories/delete/${accessoryId}`).pipe(delay(this.delay))
  }
  public fetchAllByRoom(roomId: number):Observable<Accessory[]>{
    return this.httpClient.get<Accessory[]>(`/api/accesories/getAccessory/${roomId}`).pipe(delay(this.delay))
  }
}
