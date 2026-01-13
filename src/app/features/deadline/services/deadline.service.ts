import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

interface DeadlineResponse {
  secondsLeft: number;
}

// Custom time and delay response setting
const MOCK_SECONDS_LEFT = 30;
const MOCK_NETWORK_DELAY_MS = 500;

@Injectable({ providedIn: 'root' })
export class DeadlineService {
  /**
   * Fetches deadline data from API
   * Currently returns mock data - replace with HTTP call for real usage:
   * return this.http.get<DeadlineResponse>('/api/deadline');
   */
  getDeadline(): Observable<DeadlineResponse> {
    return of({ secondsLeft: MOCK_SECONDS_LEFT }).pipe(
      delay(MOCK_NETWORK_DELAY_MS)
    );
  }
}
