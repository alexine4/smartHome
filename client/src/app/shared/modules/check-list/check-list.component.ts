import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Calculation, Sypply } from '../../interfaces';
import { SypplyService } from '../../services/sypply.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit {

  calculations$!:Observable<Calculation[]>
constructor(
  public dialogRef: MatDialogRef<CheckListComponent>,
  private sypplyService: SypplyService,
    @Inject(MAT_DIALOG_DATA) public data: Sypply
){}
  public ngOnInit(): void {
    this.calculations$ = this.sypplyService.fetchCounts(this.data.sypplyId)
  }
}
