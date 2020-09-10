interface ISubject {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(): void;
}

interface IObserver {
  update(subject: ISubject): void;
}

class ConcreteSubject implements ISubject {
  public state: number = 0;
  private observers: IObserver[] = [];

  public attach(observer: IObserver): void {
    const exists = this.observers.includes(observer);
    if (exists) {
      console.log(
        `\nSubject: ${observer.constructor.name} has already been attached.`
      );
      return;
    }
    this.observers.push(observer);
    console.log(`Subject: ${observer.constructor.name} is attached`);
  }

  public detach(observer: IObserver): void {
    const obsIndex = this.observers.indexOf(observer);
    if (obsIndex === -1) {
      console.log("Subject: Observer not attached");
      return;
    }
    this.observers.splice(obsIndex, 1);
    console.log(`\nSubject: ${observer.constructor.name} was detached`);
  }

  public notify(): void {
    console.log("Subject: Notifying observers...");
    this.observers.forEach((observer) => observer.update(this));
  }

  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing business logic.");
    this.state = Math.floor(Math.random() * (10 + 1));
    this.notify();
  }
}

class ConcreteObserverA implements IObserver {
  public update(subject: ISubject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log(
        `ConcreteObserverA: Reacted to the event, subject state is: ${subject.state}`
      );
    }
  }
}

class ConcreteObserverB implements IObserver {
  public update(subject: ISubject): void {
    if (
      subject instanceof ConcreteSubject &&
      (subject.state === 0 || subject.state >= 2)
    ) {
      console.log(
        `ConcreteObserverB: Reacted to the event, subject state is: ${subject.state}`
      );
    }
  }
}

const subject = new ConcreteSubject();

const obs1 = new ConcreteObserverA();
subject.attach(obs1);

const obs2 = new ConcreteObserverB();
subject.attach(obs2);

subject.someBusinessLogic();
subject.someBusinessLogic();
subject.attach(obs1);
subject.someBusinessLogic();

subject.detach(obs1);
subject.detach(obs2);
