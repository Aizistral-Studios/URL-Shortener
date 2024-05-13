import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LinkCreatorComponent } from '../components/link-creator/link-creator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LinkCreatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'URL-Shortener';
}
