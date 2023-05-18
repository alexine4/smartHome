import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Type } from 'src/app/shared/interfaces';
import { TypeService } from 'src/app/shared/services/type.service';


@Component({
  selector: 'app-type-menegment',
  templateUrl: './type-menegment.component.html',
  styleUrls: ['./type-menegment.component.scss']
})
export class TypeMenegmentComponent implements OnInit, OnDestroy {
  loading = false

  types$!: Observable<Type[]>

  createSub$!: Subscription
  updateSub$!: Subscription
  deleteSub$!: Subscription
  typeForm!: FormGroup
  constructor(
    private typeService: TypeService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    // type form init
    this.typeForm = new FormGroup({
      typeName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      newTypeName: new FormControl('', [Validators.required, Validators.minLength(4)])
    })

  // fetch all types
  this.fetchTypes()
 this.types$.subscribe(()=>{this.loading= true})
  }
  //function fetch all types
  private fetchTypes():void{
    this.types$ = this.typeService.fetchAll()
  }

//function transmit data about type, when need creating to type service 
  public createType(): void {
    const newType: Type = {
      typeId: 0,
      typeName: this.typeForm.value.typeName
    }
    this.typeForm.disable()
    this.createSub$ = this.typeService.create(newType).subscribe(
      result => {
        this.fetchTypes()
        this.toast.success(result.message)
      },
      error => {
        this.typeForm.enable()
        this.toast.error(error.error.message)
      },
      () => {
        this.typeForm.enable()
      }
    )
  }
//function transmit data about type, when need updating to type service 
  public updateType(): void {
    const newType: Type = {
      typeId: 0,
      typeName: this.typeForm.value.typeName,
      newTypeName: this.typeForm.value.newTypeName
    }
    this.typeForm.disable()
    this.createSub$ = this.typeService.update(newType).subscribe(
      result => {
        this.fetchTypes()
        this.toast.success(result.message)
      },
      error => {
        this.typeForm.enable()
        this.toast.error(error.error.message)
      },
      () => {
        this.typeForm.enable()
      }
    )
  }

  //function transmit data about type, when need deleting to type service 
  public deleteType(): void {
    this.typeForm.disable()
    this.deleteSub$ = this.typeService.delete(this.typeForm.value.typeName).subscribe(
      result => {
        this.fetchTypes()
        this.toast.success(result.message)
      },
      error => {
        this.typeForm.enable()
        this.toast.error(error.error.message)
      },
      () => {
        this.typeForm.enable()
      }
    )
  }
// function take name type from list
  public takeName(typeName: string):void{
    this.typeForm.setValue({typeName, newTypeName: this.typeForm.value.newTypeName})
  }
  //unsubscribe when component destroy
  ngOnDestroy(): void {
    if (this.createSub$) {
      this.createSub$.unsubscribe()
    }
    if (this.updateSub$) {
      this.updateSub$.unsubscribe()
    }
    if (this.deleteSub$) {
      this.deleteSub$.unsubscribe()
    }
  }
}
