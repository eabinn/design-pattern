interface FlyBehavior {
  fly(): void;
}

class FlyWithWings implements FlyBehavior {
  fly() {
    console.log("fly with wings");
  }
}

class FlyNoWay implements FlyBehavior {
  fly() {}
}

interface QuackBehavior {
  quack(): void;
}

class Quack implements QuackBehavior {
  quack() {
    console.log("quack");
  }
}

class Squeak implements QuackBehavior {
  quack() {
    console.log("squeak");
  }
}

class MuteQuack implements QuackBehavior {
  quack() {}
}

class Duck {
  flyBehavior: FlyBehavior;
  quackBehavior: QuackBehavior;

  swim() {}
  display() {}
  performFly() {
    this.flyBehavior.fly();
  }
  performQuack() {
    this.quackBehavior.quack();
  }
  setFlyBehavior(fb: FlyBehavior) {
    this.flyBehavior = fb;
  }
  setQuackBehavior(qb: QuackBehavior) {
    this.quackBehavior = qb;
  }
}

class ModelDuck extends Duck {
  constructor() {
    super();
    this.flyBehavior = new FlyNoWay();
    this.quackBehavior = new Quack();
  }

  // override display method
  display() {
    console.log(`hello, i'm model duck`);
  }
}

const modelDuck = new ModelDuck();
modelDuck.setFlyBehavior(new FlyWithWings()); // dynamically set fly behavior
