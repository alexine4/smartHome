import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, of, switchMap } from 'rxjs';
import { Limit, Sypply } from '../shared/interfaces';
import { Title } from '@angular/platform-browser';
import { SypplyService } from '../shared/services/sypply.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sypply',
  templateUrl: './sypply.component.html',
  styleUrls: ['./sypply.component.scss']
})
export class SypplyComponent implements OnInit {
  //for disabled button
  disabled: boolean = false
  // for syncronizaded loaders
  loading: boolean = false
  limitLoading: boolean = false

  // for take period button
  activeButton: string = ''
  unitOfMeasurement: string = ''

  // by sypply
  sypplyId: number = 0
  sypplySub$!: Subscription
  sypply!: Sypply | null
  // by limit
  limitInput: number | null = null
  limitSub$!: Subscription
  limit!: Limit | null

  constructor(
    private route: ActivatedRoute,
    private sypplyService: SypplyService,
    private title: Title,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    //take sypply
    this.sypplySub$ = this.takeSypply().subscribe(
      Sypply => {
        this.loading = true
        if (Sypply !== null) {
          this.activeTitle(Sypply.sypplyName)
          this.takeActiveUnits(Sypply.sypplyType)
        }
        this.sypply = Sypply
         //take limit
         this.takeSypplyLimit()
        
      },
      error => {
        this.loading = true
        this.toast.error(error.error.message)
      }
    )
  }
  // get sypply by router parametr
  private takeSypply(): Observable<Sypply | null> {
    return this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['sypplyId']) {
            this.loading = false
            this.sypplyId = params['sypplyId']
            return this.sypplyService.fetchById(params['sypplyId'])
          }
          return of(null)
        })
      )
  }
  //get limit for sypply
  private takeSypplyLimit(): void {
    this.limitLoading = false
    this.limitSub$ = this.sypplyService.fetchLimit(this.sypplyId).subscribe(
      Limit => {
        this.limit = null
        this.activeButton  = ''
        this.limitLoading = true
        if (Limit.perDay !== null) { this.activeButton = 'Per day' }
        if (Limit.perMonth !== null) { this.activeButton = 'Per month' }
        this.limit = Limit
        
      },
      error => {
        this.limitLoading = true
        this.toast.error(error.error.message)
      },

    )
  }
  // dinamic change title
  public activeTitle(title: string) {
    this.title.setTitle(title)
  }
  // take unit of manegment
  private takeActiveUnits(type: string) {
    switch (type) {
      case 'Gas':
        this.unitOfMeasurement = 'm3'
        break;
      case 'Electricity':
        this.unitOfMeasurement = 'kW'
        break;
      case 'Heat':
        this.unitOfMeasurement = 'kW'
        break;
      case 'Water':
        this.unitOfMeasurement = 'm3'
        break;
      case 'Internet':
        this.unitOfMeasurement = 'Mb'
        break;
    
      default:
        this.unitOfMeasurement = 'unit'
        break;
    }
  }
  // change status sypply
  public changeStatus(sypply: Sypply): void {
    this.disabled = true
    sypply.status = !sypply.status
    this.sypplySub$ = this.sypplyService.update(sypply).subscribe(
      answer => {
        this.toast.success(answer.message)
      },
      error => {
        this.disabled = false
        this.toast.error(error.error.message)
      },
      () => {
        this.disabled = false
      }
    )
  }

  //change limit 

  public limitChange(): void {
    this.disabled = true
    switch (this.activeButton) {
      case 'Per day':

        const newLimit = {
          sypplyId: this.sypplyId,
          perDay: this.limitInput,
          perMonth: null
        }

        this.limitSub$ = this.sypplyService.changeLimit(newLimit).subscribe(
          answer => {
            this.takeSypplyLimit()
            this.toast.success(answer.message)
            this.disabled = false
          },
          error => {
            this.disabled = false
            this.toast.error(error.error.message)
          }
        )
        break;
      case 'Per month':
        const newLimit1 = {
          sypplyId: this.sypplyId,
          perDay: null,
          perMonth: this.limitInput
        }

        this.limitSub$ = this.sypplyService.changeLimit(newLimit1).subscribe(
          answer => {
            this.takeSypplyLimit()
            this.toast.success(answer.message)
            this.disabled = false
          },
          error => {
            this.disabled = false
            this.toast.error(error.error.message)
          }
        )
        break;
      default:
        this.disabled = false
        this.toast.error('Input error. Please take period of limit')
        break;

    }

  }
}
