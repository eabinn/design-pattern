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

class DuckSimulator {
  run() {
    const mallardDuck = new MallardDuck() as Quackable;
    const redheadDuck = new RedHeadDuck() as Quackable;
    const duckCall = new DuckCall() as Quackable;
    const rubberDuck = new RubberDuck() as Quackable;
    const gooseDuck = new GooseAdapater(new Goose()) as Quackable;

    console.log("Duck Simulator");

    mallardDuck.quack();
    redheadDuck.quack();
    duckCall.quack();
    rubberDuck.quack();
    gooseDuck.quack();
  }

  simulate(duck: Quackable) {
    duck.quack();
  }
}

(function main() {
  const duckSimulator = new DuckSimulator();
  duckSimulator.run();
})();
