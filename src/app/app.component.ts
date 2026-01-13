import { Component } from '@angular/core';
import { DeadlineTimerComponent } from './features/deadline/components/deadline-timer/deadline-timer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DeadlineTimerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
