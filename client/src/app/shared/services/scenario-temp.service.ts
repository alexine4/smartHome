import { Observable, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, ScenarionTemp } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class ScenarioTempService {
  delay = 4000
  constructor(
    private httpClient: HttpClient
  ) { }

  public fetchByRoom(roomId:number):Observable<ScenarionTemp[]>{
    return this.httpClient.get<ScenarionTemp[]>(`/api/scenarioTemp/getScenarios/${roomId}`).pipe(delay(this.delay))
  }
  public fetchById(scenarioId:number):Observable<ScenarionTemp>{
    return this.httpClient.get<ScenarionTemp>(`/api/scenarioTemp/getScenario/${scenarioId}`).pipe(delay(this.delay))
  }
  public create(scenarioTemp:ScenarionTemp):Observable<Message>{
    return this.httpClient.post<Message>(`/api/scenarioTemp/addNew`,scenarioTemp).pipe(delay(this.delay))
  }
  public update(scenarioTemp:ScenarionTemp):Observable<Message>{
    return this.httpClient.patch<Message>(`/api/scenarioTemp/update/${scenarioTemp.scenarioId}`,scenarioTemp).pipe(delay(this.delay))
  }
  public delete(scenarioId:number):Observable<Message>{
    return this.httpClient.delete<Message>(`/api/scenarioTemp/delete/${scenarioId}`).pipe(delay(this.delay))
  }

}
