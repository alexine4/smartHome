import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room, Type, roomAndType,  } from '../interfaces';
import { Observable, mergeMap, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }


  fetch(): Observable<roomAndType> {
    const rooms$: Observable<Room[]> = this.http.get<Room[]>(`/api/rooms/getRooms`)
    const types$: Observable<Type[]> = this.http.get<Type[]>(`/api/types/getTypes`)
    const result$: Observable<roomAndType> = types$.pipe(
      mergeMap(types => rooms$.pipe(
          mergeMap(rooms => of(
          ...rooms.map(room => ({
            ...room,
            typeId: types[types.findIndex(type => room.typeId === type.typeId)!==undefined?types.findIndex(type => room.typeId === type.typeId):0].typeId,
            typeName: types[types.findIndex(type => room.typeId === type.typeId)!==undefined?types.findIndex(type => room.typeId === type.typeId):0].typeName
          }))
        ))
      ))
    )
    return result$

  }

}
