import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, of, switchMap, using } from 'rxjs';
import { Limit, Sypply, Using } from '../shared/interfaces';
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
  usingLoader: boolean = false
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

  //by using
  usingSub$!: Subscription
  usings!: Using[]
  // take actual date
  currentDate: Date = new Date();
  usingByDay!: number
  usingByCurrentMonth!: number
  usingByPastMonth!: number
  usingAverageByDayInPastMonth!: number

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
        // take using 
        this.takeDayUsing()

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
        this.activeButton = ''
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
  //get limit for sypply
  private takeDayUsing(): void {
    this.usingLoader = false
    this.usingSub$ = this.sypplyService.fetchUsing(this.sypplyId).subscribe(
      using => {
        this.usingLoader = true
        
        // take using by day
        const previousDate = new Date(this.currentDate);
        previousDate.setDate(previousDate.getDay() - 1)
        this.usingByDay = 0
        this.usingByDay = this.takeUsingByPeriod(using, this.currentDate,previousDate)[0].amount
        // take using by current month
        previousDate.setDate(0o1);
        this.usingByCurrentMonth = 0
        this.usings = this.takeUsingByPeriod(using, this.currentDate,previousDate)
        for (let index = 0; index < this.usings.length; index++) {
          this.usingByCurrentMonth  =  this.usingByCurrentMonth + this.usings[index].amount;
        }
        // take by past month
        this.currentDate.setMonth(previousDate.getMonth() - 1)
        this.currentDate.setDate(this.getLastDayOfMonth(this.currentDate))
        previousDate.setMonth(previousDate.getMonth() - 1);
        this.usingByPastMonth = 0
        this.usings = this.takeUsingByPeriod(using, this.currentDate,previousDate)
        for (let index = 0; index < this.usings.length; index++) {
          this.usingByPastMonth  =  this.usingByPastMonth + this.usings[index].amount;
        }
        this.usingAverageByDayInPastMonth = this.usingByPastMonth / this.getLastDayOfMonth(this.currentDate)
      },
      error => {
        this.limitLoading = true
        this.toast.error(error.error.message)
      },
    )
  }
  private takeUsingByPeriod(usings: Using[], currentDate: Date, previousDate: Date): Using[] {

    return usings.filter(item => {
      const itemDate = new Date(item.createdAt);

      return itemDate < currentDate && itemDate >= previousDate;
    });
  }

  // for take last day at month
  private getLastDayOfMonth(currentDate:Date):number {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const date = new Date(currentYear, currentMonth + 1, 0);
    return date.getDate();
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
