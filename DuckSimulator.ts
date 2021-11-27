interface Quackable {
  quack(): void;
}

class MallardDuck implements Quackable {
  quack() {
    console.log("Quack");
  }
}

class RedHeadDuck implements Quackable {
  quack() {
    console.log("Quack");
  }
}

class DuckCall implements Quackable {
  quack() {
    console.log("Kwak");
  }
}

class RubberDuck implements Quackable {
  quack() {
    console.log("Squeak");
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

  constructor(goose: Goose) {
    // 생성자에서는 적응시킬 Goose 객체를 인자로 받는다.
    this.goose = goose;
  }

  quack() {
    this.goose.honk();
  }
}

// 데코레이터 객체도 어댑터 객체와 마찬가지로 타겟 인터페이스를 구현해야 한다.
class QuackCounter implements Quackable {
  private duck: Quackable; // 감싸고자 하는 객체의 레퍼런스를 저장하기 위한 인스턴스 변수
  static numberOfQuacks: number = 0;

  constructor(duck: Quackable) {
    this.duck = duck;
  }

  quack() {
    // quack() 메서드가 호출되면 그 호출을 이 데코레이터 안의 Quackable 객체에게 위임한다.
    this.duck.quack();
    QuackCounter.numberOfQuacks++; // 이 데코레이터를 통해 추가된 행위
  }

  getQuacks() {
    return QuackCounter.numberOfQuacks;
  }
}

class DuckSimulator {
  run() {
    const mallardDuck = new QuackCounter(new MallardDuck()) as Quackable;
    const redheadDuck = new QuackCounter(new RedHeadDuck()) as Quackable;
    const duckCall = new QuackCounter(new DuckCall()) as Quackable;
    const rubberDuck = new QuackCounter(new RubberDuck()) as Quackable;
    const gooseDuck = new GooseAdapater(new Goose()) as Quackable;

    console.log("Duck Simulator");

    mallardDuck.quack();
    redheadDuck.quack();
    duckCall.quack();
    rubberDuck.quack();
    gooseDuck.quack();

    console.log(`The ducks quacked ${QuackCounter.numberOfQuacks} times.`);
  }

  simulate(duck: Quackable) {
    duck.quack();
  }
}

(function main() {
  const duckSimulator = new DuckSimulator();
  duckSimulator.run();
})();
