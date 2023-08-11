import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  from,
  multicast,
  ConnectableObservable,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ObservableTypes';

  //Simple Observable
  myObservable = new Observable((observer) => {
    console.log('Observable Starts');
    observer.next('1');
    observer.next('2');
    observer.next('3');
    observer.next('4');
    observer.next('5');
  });

  sourceReplaySubject = new ReplaySubject(4);

  private sourceSubject = new Subject<string>();
  private sourceBehavior = new BehaviorSubject<string>('');

  ngOnInit() {
    this.myObservable.subscribe((val) => {
      console.log(val);
    });

    //Subject Observable
    // this.sourceSubject.next('Subject => 1');
    // this.sourceSubject.next('Subject => Carro');
    // this.sourceSubject.next('Subject => Prueba');
    // this.sourceSubject.subscribe((res) => console.log(res));
    // this.sourceSubject.next('Subject => Hola');

    //Replay Subject
    // this.sourceReplaySubject.next(1);
    // this.sourceReplaySubject.next(2);
    // this.sourceReplaySubject.next(3);
    // this.sourceReplaySubject.subscribe((val) => {
    //   console.log(val);
    // });
    // this.sourceReplaySubject.next(4);
    // this.sourceReplaySubject.next(5);
    // this.sourceReplaySubject.subscribe((val) => {
    //   console.log(val);
    // });

    //BehaviorSubject
    // this.sourceBehavior.next('Prueba de BehaviorSubject2');

    //MulticasSubject & ConnectTableObservable
    const source = from([1, 2, 3, 4]);
    const multi = source.pipe(
      multicast(() => new Subject())
    ) as ConnectableObservable<any>;

    multi.subscribe({
      next: (v) => console.log(`observerA: ${v}`),
    });
    multi.subscribe({
      next: (v) => console.log(`observerB: ${v}`),
    });

    multi.connect();
  }
}
