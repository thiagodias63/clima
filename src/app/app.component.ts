import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styles: [
    `
      .container-wrapper {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class AppComponent {}
