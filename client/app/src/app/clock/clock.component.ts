import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subscription, map, share, timer } from 'rxjs';

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

  rxTime = new Date();
  // intervalID;
  subscription!: Subscription;
  
  // ngAfterInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
  //   this.subscription = timer(0,1000).
  //   pipe(
  //     map(() => new Date()),
  //     share()
  //   )
  //   .subscribe(
  //     time => {
  //       this.rxTime = time;
  //     }
  //   )
  // }

  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   if(this.subscription){
  //     this.subscription.unsubscribe();
  //   }
  // }

} 

