import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-app-skeleton',
  templateUrl: './app-skeleton.component.html',
  styleUrls: ['./app-skeleton.component.scss'],
})
export class AppSkeletonComponent implements OnInit {
  @Input() skeletonId: number;
  constructor() { }

  ngOnInit() { }

}
