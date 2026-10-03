import {Component, input} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AppHeaderComponent} from "../app-header/app-header.component";

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    AppHeaderComponent
  ],
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent {
  headerTitle = input.required<string>();
}
