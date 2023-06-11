import { Component, Inject, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Logs } from '../../interfaces';


@Component({
  selector: 'app-check-logs',
  templateUrl: './check-logs.component.html',
  styleUrls: ['./check-logs.component.scss']
})
export class CheckLogsComponent implements OnInit {

  loading: boolean = false
constructor(
  public dialogRef: MatDialogRef<CheckLogsComponent>,
  private menuService: MenuService,
    @Inject(MAT_DIALOG_DATA) public data: Logs[]
){}
  public ngOnInit(): void {
    setTimeout(() => {
      this.loading = true
    }, 4000);
    console.log(this.data);
    
  }
  public checked(aLogId:number):void{
    this.menuService.update(aLogId,'')
    this.data[this.data.findIndex(item=>item.aLogId === aLogId )].checked = true 
  }
  public checkAll():void{
    this.menuService.updateAll()

    for (let index = 0; index < this.data.length; index++) {
     this.data[index].checked = true
    }
  }
}
