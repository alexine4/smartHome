import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, Room, Type, roomAndType } from '../interfaces';
import { Observable, delay, iif, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  delay = 1500;
  constructor(private httpClient: HttpClient) { }

  public fetchWithType(): Observable<roomAndType> {
    const rooms$: Observable<Room[]> =
      this.httpClient.get<Room[]>(`/api/rooms/getRooms`);
    const types$: Observable<Type[]> =
      this.httpClient.get<Type[]>(`/api/types/getTypes`);

    const result$: Observable<roomAndType> = types$.pipe(
      mergeMap((types) =>
        rooms$.pipe(
          mergeMap((rooms) =>
            iif(
              () => rooms[0] !== undefined,
              of(
                ...rooms.map((room) => (
                  {
                    ...room,
                    typeId:
                      types[
                        types.findIndex((type) => room.typeId === type.typeId) !==
                          undefined
                          ? types.findIndex((type) => room.typeId === type.typeId)
                          : 0
                      ].typeId,
                    typeName:
                      types[
                        types.findIndex((type) => room.typeId === type.typeId) !==
                          undefined
                          ? types.findIndex((type) => room.typeId === type.typeId)
                          : 0
                      ].typeName
                  }
                ))
              ),
              of(
                {
                  roomId: 0,
                  roomName: 'No rooms have been added',
                  typeId: 0,
                  typeName: 'none'
                }
              )
            )
          ),
          delay(this.delay)
        )
      )
    );

    return result$;
  }

  public fetchAllRooms(): Observable<Room[]> {
    return this.httpClient
      .get<Room[]>(`/api/rooms/getRooms`)
      .pipe(delay(this.delay));
  }

  public create(room: Room): Observable<Message> {
    return this.httpClient
      .post<Message>(`/api/rooms/addNew`, room)
      .pipe(delay(this.delay));
  }
  public update(room: Room): Observable<Message> {
    return this.httpClient
      .patch<Message>(`/api/rooms/update/${room.roomId}`, room)
      .pipe(delay(this.delay));
  }
  public delete(roomId: number): Observable<Message> {
    return this.httpClient
      .delete<Message>(`/api/rooms/delete/${roomId}`)
      .pipe(delay(this.delay));
  }
}
