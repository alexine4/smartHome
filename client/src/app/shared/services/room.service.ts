import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Room, Type } from '../interfaces';
import { Observable, mergeMap, reduce } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<any[]> {
    const rooms$ =  this.http.get<any[]>(`/api/rooms/getRooms`)
    const types$ =  this.http.get<any[]>(`/api/types/getTypes`)
   
    return rooms$.pipe(
      mergeMap(arr1 => types$.pipe(
        reduce((acc, arr2) => [...acc, ...arr2], arr1)
      ))
    )
    
  }

}
