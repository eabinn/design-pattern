abstract class Beverage {
  description = "제목 없음";

  getDescription(): string {
    return this.description;
  }

  abstract cost(): number; // 서브 클래스에서 구현해야 한다.
}

/**
 * 구성요소인 Beverage 객체가 들어갈 자리에 들어갈 수 있어야 하므로
 * Beverage 클래스를 확장한다.(동일한 형식을 유지하기 위해서다.)
 */
abstract class CondimentDecorator extends Beverage {
  abstract getDescription(): string; // 모든 첨가물 데코레이터에서 getDescription() 메서드를 구현하도록 하기 위해 추상 메서드로 선언했다.
}

/**
 * 음료 코드를 구현한다.
 */
class Espresso extends Beverage {
  constructor() {
    super();
    this.description = "에스프레소"; // description 인스턴스 변수는 Beverage로부터 상속받았다.
  }

  cost(): number {
    return 1000;
  }
}

class HouseBlend extends Beverage {
  constructor() {
    super();
    this.description = "하우스 블렌드 커피";
  }

  cost(): number {
    return 2000;
  }
}

class DarkRoast extends Beverage {
  constructor() {
    super();
    this.description = "다크 로스트 커피";
  }

  cost(): number {
    return 2000;
  }
}

class Decaf extends Beverage {
  constructor() {
    super();
    this.description = "디카페인 커피";
  }

  cost(): number {
    return 2000;
  }
}

/**
 * 첨가물용 코드를 구현한다. 추상 데코레이터인 CondimentDecorator을 구현해 구상 데코레이터를 만들자.
 */
class Mocha extends CondimentDecorator {
  beverage: Beverage; // 감싸고자 하는 음료를 저장하기 위한 인스턴스 변수다.

  constructor(beverage: Beverage) {
    // 인스턴스 변수를 감싸고자 하는 객체로 설정하기 위한 생성자다. 데코레이터의 생성자에 감싸고자 하는 음료 객체를 전달하는 방식을 사용했다.
    super();
    this.beverage = beverage;
  }

  getDescription(): string {
    return this.beverage.getDescription() + ", 모카"; // 데코레이터에서 추가적인 작업을 진행했다.
  }

  cost(): number {
    return 1000 + this.beverage.cost(); // 장식하고 있는 객체에 가격을 구하는 작업을 위임해서 음료 자체의 값을 구한 다음 거기에 모카에 대한 가격을 더했다.
  }
}

class Whip extends CondimentDecorator {
  beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription(): string {
    return this.beverage.getDescription() + ", 휘핑";
  }

  cost(): number {
    return 1000 + this.beverage.cost();
  }
}

class SteamMilk extends CondimentDecorator {
  beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription(): string {
    return this.beverage.getDescription() + ", 스팀 밀크";
  }

  cost(): number {
    return 1000 + this.beverage.cost();
  }
}

// 커피 생성
class StarbuzzCoffee {
  whipMochaDarkroastCost() {
    const beverage: Beverage = new Espresso();
    console.log(`${beverage.getDescription()}: \$ ${beverage.cost()}`);

    let beverage2: Beverage = new DarkRoast();
    beverage2 = new Mocha(beverage2); // 형식이 같으니 데체할 수 있다.
    beverage2 = new Mocha(beverage2); // 형식이 같으니 데체할 수 있다.
    beverage2 = new Whip(beverage2); // 형식이 같으니 데체할 수 있다.
    console.log(`${beverage2.getDescription()}: \$ ${beverage2.cost()}`);

    let beverage3: Beverage = new HouseBlend();
    beverage3 = new Mocha(beverage3); // 형식이 같으니 데체할 수 있다.
    beverage3 = new Whip(beverage3); // 형식이 같으니 데체할 수 있다.
    beverage3 = new SteamMilk(beverage3); // 형식이 같으니 데체할 수 있다.
    console.log(`${beverage3.getDescription()}: \$ ${beverage3.cost()}`);
  }
}

// 실행
const coffee = new StarbuzzCoffee();
console.log(coffee.whipMochaDarkroastCost());

// typescript playground: https://www.typescriptlang.org/play
