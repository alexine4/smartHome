import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Room[]> {
    return this.http.get<Room[]>(`/api/rooms/getRooms`)
  }

}
