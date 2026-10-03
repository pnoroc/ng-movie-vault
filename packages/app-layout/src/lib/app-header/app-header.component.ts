import {Component, input} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent {
  title = input.required<string>();
}
