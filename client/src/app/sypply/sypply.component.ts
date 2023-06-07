import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sypply } from '../shared/interfaces';
import { Title } from '@angular/platform-browser';
import { MenuService } from '../shared/services/menu.service';
import { SypplyService } from '../shared/services/sypply.service';

@Component({
  selector: 'app-sypply',
  templateUrl: './sypply.component.html',
  styleUrls: ['./sypply.component.scss']
})
export class SypplyComponent implements OnInit {
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
