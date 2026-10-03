import { Component, input, InputSignal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'mv-rating-badge',
  templateUrl: './rating-badge.component.html',
  imports: [DecimalPipe],
})
export class RatingBadgeComponent {
  rating: InputSignal<number | undefined> = input<number | undefined>(0);
}
