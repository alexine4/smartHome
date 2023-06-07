import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Sypply } from '../shared/interfaces';
import { MenuService } from '../shared/services/menu.service';
import { SypplyService } from '../shared/services/sypply.service';

@Component({
  selector: 'app-sypply-menu',
  templateUrl: './sypply-menu.component.html',
  styleUrls: ['./sypply-menu.component.scss']
})
export class SypplyMenuComponent implements OnInit {
  currentUrl!: string
  sypplySub$!: Subscription
  sypplies: Sypply[] = []
  loading = false

  constructor (
    private sypplyService: SypplyService,
    private menuService:MenuService,
    private title: Title,
  ){

  }
  ngOnInit(): void {
    this.sypplySub$ = this.sypplyService.fetchAll().subscribe(
      Sypplies=>{
        this.sypplies = Sypplies
        this.loading = true
      }
    )
  }
  public newcurrentUrl( newcurrentUrl: string, title: string) {
    this.menuService.currentURL = newcurrentUrl;
    this.title.setTitle(title)
  }
}
