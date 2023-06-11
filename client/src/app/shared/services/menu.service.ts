import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logs, Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menuStatus!: boolean
  public currentURL!: string
  public activeLog!: number
  constructor(private httpClient: HttpClient) { }

  public fetchCountUnCheckedLog():Observable<number>{
  return this.httpClient.get<number>('/api/logs/getActive');
  }
  public fetchAll():Observable<Logs>{
   return this.httpClient.get<Logs>('/api/logs/getAll');
  }
  public create(message:string) :void{
      const newLog : Logs={
        aLogId:0,
        message:message,
        checked:false,
        createdAt:''
      }
     this.httpClient.post('/api/logs/addNew',newLog).subscribe(
      ()=>{
        this.activeLog++
      }
     )
  }
  public update(aLogId:number, message:string):void{
    this.httpClient.patch(`/api/logs/update/${aLogId}`,message).subscribe(
      ()=>{ 
        this.activeLog --
            }
     )
  }
  public updateAll():void{
    const newLog={}
   this.httpClient.patch(`/api/logs/updateAll`,newLog).subscribe(
    ()=>{ 
      this.activeLog = 0
    }
   )
  }
  
}
