import {
  ChangeDetectionStrategy,
  Component,
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
import { DeadlineService } from '../../services/deadline.service';

interface TimerState {
  status: 'loading' | 'running' | 'timeout';
  secondsLeft: number;
}

@Component({
  selector: 'app-deadline-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (timerState$ | async; as state) {
    <div class="deadline-timer" [class]="state.status">
      @switch (state.status) { @case ('loading') {
      <p class="message">Loading deadline...</p>
      } @case ('running') {
      <p class="message">Seconds left to deadline: {{ state.secondsLeft }}</p>
      } @case ('timeout') {
      <p class="message">Time's up!</p>
      } }
    </div>
    }
  `,
  styles: [
    `
      .deadline-timer {
        padding: 1.5rem;
        border-radius: 8px;
        text-align: center;
        font-family: system-ui, sans-serif;

        &.loading {
          background-color: #f0f0f0;
          color: #666;
        }

        &.running {
          background-color: #e3f2fd;
          color: #1565c0;
        }

        &.timeout {
          background-color: #ffebee;
          color: #c62828;
        }

        .message {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 500;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeadlineTimerComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  timerState$!: Observable<TimerState>;

  constructor(private readonly deadlineService: DeadlineService) {}

  ngOnInit(): void {
    this.timerState$ = this.deadlineService.getDeadline().pipe(
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
