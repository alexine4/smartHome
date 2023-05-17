import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Type } from 'src/app/shared/interfaces';
import { TypeService } from 'src/app/shared/services/type.service';


@Component({
  selector: 'app-type-menegment',
  templateUrl: './type-menegment.component.html',
  styleUrls: ['./type-menegment.component.scss']
})
export class TypeMenegmentComponent implements OnInit {
  loading = true

  createSub$!: Subscription

  typeForm!:FormGroup
  constructor(
    private typeService: TypeService,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = true
    }, 2500); 
    
    this.typeForm = new FormGroup({
      typeName: new FormControl('',[Validators.required, Validators.minLength(4)] ),
      newTypeName: new FormControl('',[Validators.required])      
    })

  }

  public createType():void{
    const newType :Type = {
      typeId: 0,
      typeName: this.typeForm.value.typeName
    }

    this.createSub$ = this.typeService.create(newType).subscribe(
    result=>{
    this.toast.success(result.message)
    },
    error=>{
    this.typeForm.enable()
     this.toast.error(error.error.message)
    },
    ()=>{
    this.typeForm.enable()
    }
    )
  }

  public deleteType():void{
    this.createSub$ = this.typeService.delete(this.typeForm.value.typeName).subscribe(
      result=>{
      this.toast.success(result.message)
      },
      error=>{
      this.typeForm.enable()
       this.toast.error(error.error.message)
      },
      ()=>{
      this.typeForm.enable()
      }
      )
  }
}
