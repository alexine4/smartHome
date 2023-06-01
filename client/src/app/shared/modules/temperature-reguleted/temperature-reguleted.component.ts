import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-temperature-reguleted',
  templateUrl: './temperature-reguleted.component.html',
  styleUrls: ['./temperature-reguleted.component.scss']
})
export class TemperatureReguletedComponent implements OnInit {

  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };
  public ngOnInit(): void {
  }
    
}
