import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent extends TitleStrategy implements OnInit {

  

  constructor(
    public readonly title: Title,
    public menuService: MenuService
  ) {
    super();

  }
  ngOnInit(): void {
    this.menuService.menuStatus = false
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState)
    if (title !== undefined) {
      this.title.setTitle(`${title}`)
    }
  }
}
