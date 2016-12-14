import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { LoopBackFilter, StatFilter } from './index';

export class FireLoopRef<T> {

  private instance: any;
  private socket: any;
  private name: string;
  private current: { name: string };
  private parent: FireLoopRef<T>;
  private childs: any = {};
  private observables: any = {};

  constructor(name: string, socket: any, parent: FireLoopRef<any> = null, current = null) {
    this.name = name;
    this.current = current;
    this.parent = parent;
    this.socket = socket;
    return this;
  }

  private operation(event: string, data: any): Observable<T> {
    let id: number = Math.floor(Math.random() * 100800) *
      Math.floor(Math.random() * 100700) *
      Math.floor(Math.random() * 198500);
    let subject: Subject<T> = new Subject<T>();
    let config: {id: any, data: any, current: any, parent: any } = {
      id: id,
      data: data,
      current: this.current,
      parent: this.parent && this.parent.instance ? this.parent.instance : null
    };
    if (!this.parent || (this.parent && this.current)) {
      this.socket.emit(`${this.name}.${event}`, config);
    } else {
      let interval = setInterval(() => {
        if (this.current) {
          config.current = this.current;
          this.socket.emit(`${this.name}.${event}`, config);
          clearInterval(interval);
        }
      }, 500);
    }
    this.socket.on(`${this.name}.value.result.${id}`, (res: any) =>
      subject.next(res.error ? Observable.throw(res.error) : res)
    );
    return subject.asObservable();
  }

  public upsert(data: any): Observable<T> {
    return this.operation('upsert', data);
  }

  public create(data: any): Observable<T> {
    return this.operation('create', data);
  }

  public remove(data: any): Observable<T> {
    return this.operation('remove', data);
  }

  public on(event: string, filter: LoopBackFilter = { limit: 100, order: 'id DESC' }): Observable<T | T[]> {
    event = `${this.name}.${event}`;
    if (this.observables[event]) { return this.observables[event]; }
    let subject: Subject<T> = new Subject<T>();
    if (event.match(/(value|change|stats)/)) {
      this.pull(event, filter, subject);
    }
    // Listen for broadcast announces
    this.socket.on(
      // When there is a broadcast announce
      `${event}.broadcast.announce`,
      // We send a request containing the filtering options
      () => this.socket.emit(`${event}.broadcast.request`, filter)
    );
    // Once processed our request will return a unique result
    this.socket.on(`${event}.broadcast`, (res: any) => subject.next(res));
    this.observables[event] = subject.asObservable();
    return this.observables[event];
  }

  public stats(filter?: StatFilter): Observable<T | T[]> {
    let event = `${this.name}.stats`;
    if (this.observables[event]) { return this.observables[event]; }
    let subject: Subject<T> = new Subject<T>();
    this.pull(event, filter, subject);
    // Listen for broadcast announces
    this.socket.on(
      // When there is a broadcast announce
      `${event}.broadcast.announce`,
      // We send a request containing the filtering options
      () => this.socket.emit(`${event}.broadcast.request`, filter)
    );
    // Once processed our request will return a unique result
    this.socket.on(`${event}.broadcast`, (res: any) => subject.next(res));
    this.observables[event] = subject.asObservable();
    return this.observables[event];
  }

  private pull(event: string, filter: any, subject: Subject<T>): void {
    this.socket.emit(`${event}.pull.request`, filter);
    this.socket.on(`${event}.pull.requested`, (res: any) => subject.next(res));
  }

  public make(instance: any): FireLoopRef<T> {
    this.instance = instance;
    return this;
  }

  public child<T>(name: string): FireLoopRef<T> {
    if (!this.parent) {
      let childName = `${this.name}.${name}`;
      if (this.childs[childName]) { return this.childs[childName]; }
      this.socket.emit(`${this.name}.relation.request`, { relation: name });
      this.socket.on(`${this.name}.relation.request.result`, (Model: { name: string }) => {
          this.childs[childName].current = Model;
      });
      this.childs[childName] = new FireLoopRef<T>(childName, this.socket, this);
      return this.childs[childName];
    } else {
      console.warn('Only 1 child level is supported');
      // TODO ADD UNLIMITED LEVELS
    }
  }
}
