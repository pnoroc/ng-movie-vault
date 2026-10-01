import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AppLayoutComponent} from "@org/app-layout";

@Component({
  imports: [RouterModule, AppLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected title = 'movie-vault';
}
