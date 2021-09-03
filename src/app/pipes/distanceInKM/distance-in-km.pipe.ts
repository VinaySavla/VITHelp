import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "distanceInKM"
})
export class DistanceInKMPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return (value / 1000).toFixed(2);
  }
}
