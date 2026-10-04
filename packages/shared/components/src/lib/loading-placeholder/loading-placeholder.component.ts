import { Component, input } from '@angular/core';

@Component({
  selector: 'mv-loading-placeholder',
  templateUrl: './loading-placeholder.component.html',
})
export class LoadingPlaceholderComponent {
  text = input<string | undefined>('Loading movies…');
}
