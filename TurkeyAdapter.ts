interface Duck {
  quack(): void;
  fly(): void;
}

class FlyDuck implements Duck {
  quack() {
    console.log("Duck quack");
  }

  fly() {
    console.log("Duck fly");
  }
}

interface Turkey {
  gobble(): void;
  fly(): void;
}

class FlyTurkey implements Turkey {
  gobble() {
    console.log("Turkey gobble");
  }

  fly() {
    console.log("Turkey fly");
  }
}

/**
 * Duck 객체가 모자라 Turkey 객체로 Duck을 만들어야 한다. 그럼 Turkey를 Duck으로 만들어야 한다. Duck 인터페이스를 구현하게 함으로써 Turkey 객체가 Duck 타입이 되도록 한다.
 * TurkeyAdapter을 거치게 되면 turkey는 Duck이 되게 된다.
 */
class TurkeyAdapter implements Duck {
  turkey: Turkey;

  constructor(turkey: Turkey) {
    this.turkey = turkey;
  }

  quack() {
    console.log("From turkey adapter...");
    this.turkey.gobble();
  }

  /**
   * turkey가 duck처럼 날게 하기 위해 약간 손봤다.
   */
  fly() {
    console.log("From turkey adapter...");
    for (let i = 0; i < 5; i++) {
      this.turkey.fly();
    }
  }
}

// test
const flyDuck: Duck = new FlyDuck();
flyDuck.fly();
flyDuck.quack();

const flyTurkey: Turkey = new FlyTurkey();
flyTurkey.fly();
flyTurkey.gobble();

const simpleTureky: Turkey = new FlyTurkey();
const turkeyAdapter: Duck = new TurkeyAdapter(simpleTureky);
turkeyAdapter.fly();
turkeyAdapter.quack();
