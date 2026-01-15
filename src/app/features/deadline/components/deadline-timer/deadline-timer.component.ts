import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Subject,
  Observable,
  timer,
  switchMap,
  scan,
  takeWhile,
  takeUntil,
  map,
  startWith,
} from 'rxjs';
import { DeadlineResponse } from '../../services/deadline.service';

interface TimerState {
  status: 'loading' | 'running' | 'timeout';
  secondsLeft: number;
}

@Component({
  selector: 'app-deadline-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deadline-timer.component.html',
  styleUrls: ['./deadline-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeadlineTimerComponent implements OnInit, OnDestroy {
  @Input() deadlineData$!: Observable<DeadlineResponse>;

  timerState$!: Observable<TimerState>;
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.timerState$ = this.deadlineData$.pipe(
      takeUntil(this.destroy$),
      switchMap(({ secondsLeft }) =>
        timer(0, 1000).pipe(
          scan((acc) => acc - 1, secondsLeft + 1),
          takeWhile((seconds) => seconds >= 0),
          map(
            (seconds): TimerState => ({
              status: seconds > 0 ? 'running' : 'timeout',
              secondsLeft: seconds,
            })
          )
        )
      ),
      startWith<TimerState>({ status: 'loading', secondsLeft: 0 })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
