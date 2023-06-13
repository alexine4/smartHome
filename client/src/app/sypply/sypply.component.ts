import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, of, switchMap, using } from 'rxjs';
import { Calculation, Limit, Sypply, Using } from '../shared/interfaces';
import { Title } from '@angular/platform-browser';
import { SypplyService } from '../shared/services/sypply.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DataGetSupportComponent } from '../shared/modules/data-get-support/data-get-support.component';
import { CheckListComponent } from '../shared/modules/check-list/check-list.component';
import { MenuService } from '../shared/services/menu.service';

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

  //by add new calculation on last month
  calcSub$!: Subscription

  // by dialog
  dialogSub$!: Subscription

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
    private dialog: MatDialog,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private sypplyService: SypplyService,
    private title: Title,
    private toast: ToastrService,
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
        this.menuService.create(error.error.message)
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
        this.menuService.create(error.error.message)
      },

    )
  }
  //get limit for sypply
  private takeDayUsing(): void {
    this.usingLoader = false
    this.usingSub$ = this.sypplyService.fetchUsing(this.sypplyId).subscribe(
      using => {
        this.usingLoader = true
        // nulling function
        this.usingByDay = 0
        this.usingByCurrentMonth = 0
        this.usingByPastMonth = 0
        this.usingAverageByDayInPastMonth = 0
        if (using[0] !== undefined) {
          this.currentDate = new Date();
          // take using by day
          let previousDate = new Date();      
          previousDate.setDate(this.currentDate.getDate() -1 )
          this.usingByDay = this.takeUsingByPeriod(using, this.currentDate, previousDate)[0].amount
          // take using by current month
          previousDate.setDate(0o1);

          this.usings = this.takeUsingByPeriod(using, this.currentDate, previousDate)
          for (let index = 0; index < this.usings.length; index++) {
            this.usingByCurrentMonth = this.usingByCurrentMonth + this.usings[index].amount;
          }
          // take by past month
          this.currentDate.setMonth(previousDate.getMonth() - 1)
          this.currentDate.setDate(this.getLastDayOfMonth(this.currentDate))
          previousDate.setMonth(previousDate.getMonth() - 1);
          this.usings = this.takeUsingByPeriod(using, this.currentDate, previousDate)
          for (let index = 0; index < this.usings.length; index++) {
            this.usingByPastMonth = this.usingByPastMonth + this.usings[index].amount;
          }
          this.usingAverageByDayInPastMonth = this.usingByPastMonth / this.getLastDayOfMonth(this.currentDate)
        }

      },
      error => {
        this.limitLoading = true
        this.toast.error(error.error.message)
        this.menuService.create(error.error.message)
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
  private getLastDayOfMonth(currentDate: Date): number {
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
        this.menuService.create(answer.message)

      },
      error => {
        this.disabled = false
        this.toast.error(error.error.message)
        this.menuService.create(error.error.message)
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
            this.menuService.create(answer.message)
            this.disabled = false
          },
          error => {
            this.disabled = false
            this.toast.error(error.error.message)
            this.menuService.create(error.error.message)
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
            this.menuService.create(answer.message)
            this.disabled = false
          },
          error => {
            this.disabled = false
            this.toast.error(error.error.message)
            this.menuService.create(error.error.message)
          }
        )
        break;
      default:
        this.disabled = false
        this.toast.error('Input error. Please take period of limit')
        break;

    }

  }
  // change tarif
  public onChange(tarif: number | null, sypplyAccount: number | null): void {
    this.disabled = true
    const dialogRef = this.dialog.open(DataGetSupportComponent, {
      data: {
        tarif: tarif,
        sypplyAccount: sypplyAccount
      },
      enterAnimationDuration: '1.5s',
      exitAnimationDuration: '1.5s',
    })
    this.dialogSub$ = dialogRef.afterClosed().subscribe(
      result => {
        if (result !== false && result !== undefined && this.sypply !== null) {
          if (result.tarif !== null) {
            this.sypply.tarif = result.tarif
          }
          if (result.sypplyAccount !== null) {
            this.sypply.sypplyAccount = result.sypplyAccount
          }

          this.sypplySub$ = this.sypplyService.update(this.sypply).subscribe(
            answer => {
              this.toast.success(answer.message)
              this.menuService.create(answer.message)
              this.disabled = false
            },
            error => {
              this.disabled = false
              this.toast.error(error.error.message)
              this.menuService.create(error.error.message)
            }
          )
        }
        if (!result || result === undefined) {
          this.disabled = false
        }

      },
      error => {
        this.disabled = false
        this.toast.error(error.error.message)
        this.menuService.create(error.error.message)
      }
    )
  }

  public viewRecord(): void {

    const dialogRef = this.dialog.open(CheckListComponent, {
      data: {
        sypplyId: this.sypplyId,
        sypplyName: this.sypply?.sypplyName
      },
      enterAnimationDuration: '1.5s',
      exitAnimationDuration: '1.5s',
    })
  }

  public onAddNewRecord(): void {
    this.disabled = true
    const newCalc: Calculation = {
      sypplyId: this.sypplyId,
      amount: this.usingByPastMonth,
      cost: this.usingByPastMonth * (this.sypply !== null ? this.sypply.tarif : 0),
      createdAt: new Date()
    }
    this.calcSub$ = this.sypplyService.createCalc(newCalc).subscribe(
      answer => {
        this.toast.success(answer.message)
        this.menuService.create(answer.message)
        this.disabled = false
      },
      error => {
        this.disabled = false
        this.toast.error(error.error.message)
        this.menuService.create(error.error.message)
      }
    )
  }

}
