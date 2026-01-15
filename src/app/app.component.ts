import { Component, OnInit } from '@angular/core';
import { DeadlineTimerComponent } from './features/deadline/components/deadline-timer/deadline-timer.component';
import {
  DeadlineResponse,
  DeadlineService,
} from './features/deadline/services/deadline.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DeadlineTimerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  deadlineServiceData$!: Observable<DeadlineResponse>;

  constructor(private deadlineService: DeadlineService) {}

  ngOnInit(): void {
    this.deadlineServiceData$ = this.deadlineService.getDeadline();
  }
}
