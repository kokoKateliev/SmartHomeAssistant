import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent {
  currTime = new Date();

  
} 

