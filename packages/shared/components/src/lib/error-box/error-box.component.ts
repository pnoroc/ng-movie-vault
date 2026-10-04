import { Component, input, output } from '@angular/core';

@Component({
  selector: 'mv-error-box',
  templateUrl: './error-box.component.html',
})
export class ErrorBoxComponent {
  error = input<string | undefined>();
  retryClick = output<void>();
}
