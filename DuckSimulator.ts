/**
 * 모든 Quackable 객체에서 QuackObservable 인터페이스를 구현하게 한다.
 */
interface Quackable extends QuackObservable {
  quack(): void;
}

class MallardDuck implements Quackable {
  private observable: Observable;

  constructor() {
    this.observable = new Observable(this);
  }

  quack() {
    console.log("Quack");
    this.notifyObservers();
  }

  registerObserver(observer: Observer): void {
    this.observable.registerObserver(observer);
  }

  notifyObservers(): void {
    this.observable.notifyObservers();
  }
}

class RedHeadDuck implements Quackable {
  private observable: Observable;

  constructor() {
    this.observable = new Observable(this);
  }

  quack() {
    console.log("Quack");
    this.notifyObservers();
  }

  registerObserver(observer: Observer): void {
    this.observable.registerObserver(observer);
  }

  notifyObservers(): void {
    this.observable.notifyObservers();
  }
}

class DuckCall implements Quackable {
  private observable: Observable;

  constructor() {
    this.observable = new Observable(this);
  }

  quack() {
    console.log("Kwak");
    this.notifyObservers();
  }

  registerObserver(observer: Observer): void {
    this.observable.registerObserver(observer);
  }

  notifyObservers(): void {
    this.observable.notifyObservers();
  }
}

class RubberDuck implements Quackable {
  private observable: Observable;

  constructor() {
    this.observable = new Observable(this);
  }

  quack() {
    console.log("Squaek");
    this.notifyObservers();
  }

  registerObserver(observer: Observer): void {
    this.observable.registerObserver(observer);
  }

  notifyObservers(): void {
    this.observable.notifyObservers();
  }
}

class Goose {
  honk() {
    console.log("Honk");
  }
}

// Goose를 Duck으로 변환해야 한다. 따라서 Duck으로 변하기 위해 목적 인터페이스인 Quackable을 구현해야 한다.
class GooseAdapater implements Quackable {
  private goose: Goose;
  private observable: Observable;

  constructor(goose: Goose) {
    // 생성자에서는 적응시킬 Goose 객체를 인자로 받는다.
    this.goose = goose;
    this.observable = new Observable(this);
  }

  quack() {
    this.goose.honk();
    this.notifyObservers();
  }

  registerObserver(observer: Observer): void {
    this.observable.registerObserver(observer);
  }

  notifyObservers(): void {
    this.observable.notifyObservers();
  }
}

// 데코레이터 객체도 어댑터 객체와 마찬가지로 타겟 인터페이스를 구현해야 한다.
class QuackCounter implements Quackable {
  private duck: Quackable; // 감싸고자 하는 객체의 레퍼런스를 저장하기 위한 인스턴스 변수
  static numberOfQuacks: number = 0;
  private observable: Observable;

  constructor(duck: Quackable) {
    this.duck = duck;
    this.observable = new Observable(this);
  }

  quack() {
    // quack() 메서드가 호출되면 그 호출을 이 데코레이터 안의 Quackable 객체에게 위임한다.
    this.duck.quack();
    this.notifyObservers();
    QuackCounter.numberOfQuacks++; // 이 데코레이터를 통해 추가된 행위
  }

  getQuacks() {
    return QuackCounter.numberOfQuacks;
  }

  registerObserver(observer: Observer): void {
    this.observable.registerObserver(observer);
  }

  notifyObservers(): void {
    this.observable.notifyObservers();
  }
}

/**
 * 모든 오리들이 QuackCounter 데코레이터로 감싸져 만들어지도록 하기 위해 팩토리를 사용한다.
 * 서브클래스들에서는 이 추상 팩토리를 구현하여 다양한 종류의 객체를 만들 수 있다.
 */
abstract class AbstractDuckFactory {
  abstract createMallardDuck(): Quackable;
  abstract createRedHeadDuck(): Quackable;
  abstract createDuckCall(): Quackable;
  abstract createRubberDuck(): Quackable;
}

class DuckFactory extends AbstractDuckFactory {
  /**
   * 각 메서드에서 객체를 만드는데 전부 Quackable 객체이다.
   * 시뮬레이터에서는 실제 어떤 제품이 만들어지는지 알 수 없다. 그냥 Quackable 객체가 리턴된다는 것만 안다.
   */

  createMallardDuck(): Quackable {
    return new MallardDuck();
  }

  createRedHeadDuck(): Quackable {
    return new RedHeadDuck();
  }

  createDuckCall(): Quackable {
    return new DuckCall();
  }

  createRubberDuck(): Quackable {
    return new RubberDuck();
  }
}

class CountingDuckFactory implements AbstractDuckFactory {
  createMallardDuck(): Quackable {
    return new QuackCounter(new MallardDuck());
  }

  createRedHeadDuck(): Quackable {
    return new QuackCounter(new RedHeadDuck());
  }

  createDuckCall(): Quackable {
    return new QuackCounter(new DuckCall());
  }

  createRubberDuck(): Quackable {
    return new QuackCounter(new RubberDuck());
  }
}

/**
 * 복합 객체(Composite)와 잎 원소에서 똑같은 인터페이스를 구현해야 한다.
 * 그래야지 복합객체를 개별객체와 동일하게 다룰수 있다.
 */
class Flock implements Quackable {
  private quackers: Array<Quackable> = [];

  add(quacker: Quackable) {
    this.quackers.push(quacker);
  }

  quack() {
    this.quackers.forEach((quacker) => {
      quacker.quack();
    });
  }

  registerObserver(observer: Observer): void {
    this.quackers.forEach((quacker) => {
      quacker.registerObserver(observer);
    });
  }

  notifyObservers(): void {}
}

/**
 * 관찰대상이 되는 것이 Observable이다. Quackable 객체를 다른 객체에서 관측하기 위해 만들었다.
 * Observable에는 옵저버를 등록하는 메서드와 옵저버에게 연락을 돌리는 메서드가 있어야 한다.
 */
interface QuackObservable {
  registerObserver(observer: Observer): void;
  notifyObservers(): void;
}

/**
 * 등록 및 연락용 코드를 Observable 한 클래스에 캠슐화해놓고 구성을 통해서 QuackObservable에 포함시킨다.
 * 이렇게 하면 실제 코드는 한 군데에만 작성해두고, QuackObservable에서는 필요한 작업을 Observable이라는 보조 클래스에 전부 위임하면 된다.
 */
class Observable implements QuackObservable {
  private observers: Array<Observer> = [];
  private duck: QuackObservable;

  constructor(duck: QuackObservable) {
    this.duck = duck;
  }

  registerObserver(observer: Observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => {
      observer.update(this.duck);
    });
  }
}

interface Observer {
  update(duck: QuackObservable): void;
}

class Quackologist implements Observer {
  update(duck: QuackObservable) {
    console.log(`Quacklogist: ${duck} just quacked`);
  }
}

class DuckSimulator {
  run(duckFactory: AbstractDuckFactory) {
    // 객체의 인스턴스를 직접 생성하지 않고, 팩토리의 메서드를 통해서 생성한다.
    const mallardDuck = duckFactory.createMallardDuck();
    const redheadDuck = duckFactory.createRedHeadDuck();
    const duckCall = duckFactory.createDuckCall();
    const rubberDuck = duckFactory.createRubberDuck();
    const gooseDuck = new GooseAdapater(new Goose()) as Quackable;

    console.log("Duck Simulator");

    const flockOfDucks = new Flock();

    flockOfDucks.add(mallardDuck);
    flockOfDucks.add(redheadDuck);
    flockOfDucks.add(duckCall);
    flockOfDucks.add(rubberDuck);
    flockOfDucks.add(gooseDuck);

    const flockOfMallards = new Flock();

    const mallardOne = duckFactory.createMallardDuck();
    const mallardTwo = duckFactory.createMallardDuck();
    const mallardThree = duckFactory.createMallardDuck();
    const mallardFour = duckFactory.createMallardDuck();

    flockOfMallards.add(mallardOne);
    flockOfMallards.add(mallardTwo);
    flockOfMallards.add(mallardThree);
    flockOfMallards.add(mallardFour);

    flockOfDucks.add(flockOfMallards);

    flockOfDucks.quack();

    console.log(`The ducks quacked ${QuackCounter.numberOfQuacks} times.`);

    const quackologist = new Quackologist();
    flockOfDucks.registerObserver(quackologist);
  }

  simulate(duck: Quackable) {
    duck.quack();
  }
}

(function main() {
  const duckSimulator = new DuckSimulator();
  const duckFactory: AbstractDuckFactory = new CountingDuckFactory();
  duckSimulator.run(duckFactory);
})();
