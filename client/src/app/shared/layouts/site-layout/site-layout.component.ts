import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckLogsComponent } from '../../modules/check-logs/check-logs.component';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent extends TitleStrategy implements OnInit  {


  constructor(
    public readonly title: Title,
    private dialog: MatDialog,
    public menuService: MenuService
  ) {
    super();

  }
  ngOnInit(): void {
    this.menuService.menuStatus = false
    this.menuService.fetchCountUnCheckedLog().subscribe(
      logs=>{
        this.menuService.activeLog = logs
        
      }
    )
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState)
    if (title !== undefined) {
      this.title.setTitle(`${title}`)
    }
  }
  public getLog():void{
    this.menuService.fetchAll().subscribe(
      logs=>{
        const dialogRef = this.dialog.open(CheckLogsComponent, {
          data: logs,
          enterAnimationDuration: '1.5s',
          exitAnimationDuration: '1.5s',
        });
        
      }
    )
  }
}
