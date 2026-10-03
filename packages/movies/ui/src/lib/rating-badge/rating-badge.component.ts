import { Component, input, InputSignal, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'mv-rating-badge',
  templateUrl: './rating-badge.component.html',
  imports: [DecimalPipe],
  styleUrls: ['./rating-badge.component.scss'],
})
export class RatingBadgeComponent {
  rating: InputSignal<number | undefined> = input<number | undefined>(0);
}
