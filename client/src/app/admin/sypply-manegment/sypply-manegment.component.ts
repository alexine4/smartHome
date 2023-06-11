import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Sypply } from 'src/app/shared/interfaces';
import { MenuService } from 'src/app/shared/services/menu.service';
import { SypplyService } from 'src/app/shared/services/sypply.service';

@Component({
  selector: 'app-sypply-manegment',
  templateUrl: './sypply-manegment.component.html',
  styleUrls: ['./sypply-manegment.component.scss']
})
export class SypplyManegmentComponent {

  loading = false
  loadType = false
  sypplyId: number = 0
  houseId: number = 0
  sypplies: Sypply[] = []

  typeSub$!: Subscription
  createSub$!: Subscription
  updateSub$!: Subscription
  deleteSub$!: Subscription
  sypplyForm!: FormGroup

  constructor(
    private sypplyService: SypplyService,
    private menuService: MenuService,
    private toast: ToastrService
  ) { }
  ngOnInit(): void {
    // room from init
    this.sypplyForm = new FormGroup({
      sypplyName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sypplyType: new FormControl('', [Validators.required, Validators.minLength(1)]),
      status: new FormControl('Enabled', [Validators.required]),
      tarif: new FormControl(null, [Validators.required, Validators.min(0)]),
      sypplyAccount: new FormControl(null, [Validators.required, Validators.pattern(/^\d{10}$/)])
    })


    //fetch all sypplies
    this.fetchSypplies()


  }




  // function fetch rooms with type
  private fetchSypplies(): void {
    this.sypplyService.fetchAll().subscribe(
      sypplies => {
        this.sypplies = sypplies
        this.loading = true
      },
      error => {
        this.toast.error(error.error.massege)
        this.menuService.create(error.error.massege)
      }
    )
  }
  // function take rooms and type from list 
  public takeSypply(sypply: Sypply): void {
    this.sypplyId = sypply.sypplyId
    this.houseId = sypply.houseId
    this.sypplyForm.setValue({
      sypplyName: sypply.sypplyName,
      sypplyType: sypply.sypplyType,
      status: sypply.status ? 'Enabled' : 'Disabled',
      tarif: sypply.tarif,
      sypplyAccount: sypply.sypplyAccount
    })

  }
  // function create new room
  public createSypply(): void {


    //disable form
    this.sypplyForm.disable()
    const newSypply = this.sypplyForm.value
    newSypply.status = this.sypplyForm.value === 'Enabled' ? true : false
    // create new sub on creating new room
    this.createSub$ = this.sypplyService.create(newSypply).subscribe(
      answer => {
        this.sypplies.push(newSypply)
        this.toast.success(answer.message)
        this.menuService.create(answer.message)
      },
      error => {
        this.sypplyForm.enable()
        this.toast.error(error.error.message)
        this.menuService.create(error.error.massege)
      },
      () => {
        this.sypplyForm.enable()
      }
    )
  }

  // update sypply
  public updateSypply(): void {
    // form disable
    this.sypplyForm.disable()
    
    const newSypply: Sypply ={
      sypplyId:this.sypplyId,
      sypplyName: this.sypplyForm.value.sypplyName,
      sypplyType: this.sypplyForm.value.sypplyType,
      status: this.sypplyForm.value.status=== 'Enabled' ? true : false,
      tarif: this.sypplyForm.value.tarif,
      sypplyAccount: this.sypplyForm.value.sypplyAccount,
      houseId: this.houseId
    }
    if (this.sypplyId===0) {
      this.toast.error("Update error please take sypply from list")
    }else{
  // update on subsrubing   
  this.updateSub$ = this.sypplyService.update(newSypply).subscribe(
    message => {
      //update element into array
      this.sypplies = []
      this.fetchSypplies()
      this.toast.success(message.message)
      this.menuService.create(message.message)
    },
    error => {
      this.sypplyForm.enable()
      this.toast.error(error.error.message)
      this.menuService.create(error.error.massege)
    },
    () => {
      this.sypplyForm.enable()
    }
  )
    }
  
  }
  
  //delete sypply
  public deleteSypply(): void {
    if (this.sypplyId===0) {
      this.toast.error("Delete error please take sypply from list")
    }else{
      this.deleteSub$ = this.sypplyService.delete(this.sypplyId).subscribe(
      message=>{
        //delete element from array
      this.sypplies = this.sypplies.filter(item => item['sypplyId'] !== this.sypplyId);
      this.toast.success(message.message)
      this.menuService.create(message.message)
      },
      error=>{
      this.sypplyForm.enable()
      this.toast.error(error.error.message)
      this.menuService.create(error.error.massege)
      },
      ()=>{
      this.sypplyForm.enable()
      }
      )
    }
  
    
  } 

  //unsubscribing all 
  ngOnDestroy(): void {
    if (this.createSub$) {
      this.createSub$.unsubscribe()
    }
    if (this.typeSub$) {
      this.typeSub$.unsubscribe()
    }
    if (this.deleteSub$) {
      this.deleteSub$.unsubscribe()
    }
  }
}
