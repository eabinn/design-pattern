interface State {
  insertQuarter(): void;
  ejectQuarter(): void;
  turnCrank(): void;
  dispense(): void;
}

class NoQuarterState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    // 생성자를 통해서 뽐기기계에 대한 레퍼런스가 전달된다. 이 레퍼런스를 인스턴스 변수에 저장한다.
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("동전을 넣었습니다.");
    this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
  }

  /**
   * NoQuarterState에서는 동전이 없는 상태니 아래의 행동들에 대해서는 '동전을 넣어주세요'라는 행동을 해야 한다.
   */
  ejectQuarter() {
    console.log("동전을 넣어주세요");
  }

  turnCrank() {
    console.log("동전을 넣어주세요");
  }

  dispense() {
    console.log("동전을 넣어주세요");
  }
}

class HasQuarterState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    /**
     * HasQuarterState에서는 동전이 이미 들어간 상태니 해당 상태에서는 이 메서드는 부적절한 단계다.
     */
    console.log("동전은 한개만 넣어주세요.");
  }

  ejectQuarter() {
    console.log("동전이 반환됩니다.");
    this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
  }

  turnCrank() {
    console.log("손잡이를 돌렸습니다.");
    const LUCKY_NUMBER = 7;
    if (Math.floor(Math.random() * 10) === LUCKY_NUMBER && this.gumballMachine.getCount() > 1) {
      this.gumballMachine.setState(this.gumballMachine.getwinnerState());
    } else {
      this.gumballMachine.setState(this.gumballMachine.getSoldState());
    }
  }

  dispense() {
    console.log("알맹이가 나갈 수 없습니다.");
  }
}

class SoldState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("잠깐만 기다려 주세요. 알맹이가 나가고 있습니다.");
  }

  ejectQuarter() {
    console.log("이미 알맹이를 뽑았습니다.");
  }

  turnCrank() {
    console.log("손잡이는 한번만 돌려주세요.");
  }

  dispense() {
    this.gumballMachine.releaseBall();
    if (this.gumballMachine.getCount() > 0) {
      this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    } else {
      console.log("알맹이가 다 팔렸습니다.");
      this.gumballMachine.setState(this.gumballMachine.getSoldoutState());
    }
  }
}

class SoldoutState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("알맹이가 없습니다. 다음에 시도해주세요.");
  }

  ejectQuarter() {
    console.log("알맹이가 없습니다. 다음에 시도해주세요.");
  }

  turnCrank() {
    console.log("알맹이가 없습니다. 다음에 시도해주세요.");
  }

  dispense() {
    console.log("알맹이가 없습니다. 다음에 시도해주세요.");
  }
}

class WinnerState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }
  insertQuarter() {
    console.log("잠깐만 기다려 주세요. 알맹이가 나가고 있습니다.");
  }

  ejectQuarter() {
    console.log("이미 알맹이를 뽑았습니다.");
  }

  turnCrank() {
    console.log("손잡이는 한번만 돌려주세요.");
  }

  dispense() {
    console.log("축하해요. 알맹이 하나 더 가져가세요.");
    this.gumballMachine.releaseBall();
    if (this.gumballMachine.getCount() === 0) {
      this.gumballMachine.setState(this.gumballMachine.getSoldoutState());
    } else {
      this.gumballMachine.releaseBall();
      if (this.gumballMachine.getCount() === 0) {
        this.gumballMachine.setState(this.gumballMachine.getSoldoutState());
      } else {
        console.log("알맹이가 더 이상 없습니다.");
        this.gumballMachine.setState(this.gumballMachine.getSoldoutState());
      }
    }
  }
}

class GumballMachine {
  private soldoutState: State;
  private noQuarterState: State;
  private hasQuarterState: State;
  private soldState: State;
  private winnerState: State;

  private state: State;
  private count = 0;

  constructor(numberGumballs: number) {
    this.soldoutState = new SoldoutState(this);
    this.noQuarterState = new NoQuarterState(this);
    this.hasQuarterState = new HasQuarterState(this);
    this.soldState = new SoldState(this);
    this.winnerState = new WinnerState(this);
    this.count = numberGumballs;
    if (numberGumballs > 0) {
      this.state = this.noQuarterState;
    } else {
      this.state = this.soldoutState;
    }
  }

  getHasQuarterState() {
    return this.hasQuarterState;
  }

  getNoQuarterState() {
    return this.noQuarterState;
  }

  getSoldoutState() {
    return this.soldoutState;
  }

  getSoldState() {
    return this.soldState;
  }

  getwinnerState() {
    return this.winnerState;
  }

  getCount() {
    return this.count;
  }

  /**
   * 메서드 구현하는 부분들에서는 현재 상태로 하여금 작업을 처리하게 만든다.
   */

  insertQuarter() {
    this.state.insertQuarter();
  }

  ejectQuarter() {
    this.state.ejectQuarter();
  }

  turnCrank() {
    this.state.turnCrank();
    this.state.dispense();
  }

  setState(state: State) {
    /**
     * 이 메서드를 사용하여 상태를 바꾼다.
     */
    this.state = state;
  }

  releaseBall() {
    console.log("검볼이 나오고 있습니다...");
    if (this.count != 0) {
      this.count -= 1;
    }
  }
}

const gumballMachine = new GumballMachine(5);

gumballMachine.insertQuarter();
gumballMachine.turnCrank();

gumballMachine.insertQuarter();
gumballMachine.turnCrank();

gumballMachine.insertQuarter();
gumballMachine.turnCrank();

gumballMachine.insertQuarter();
gumballMachine.turnCrank();

gumballMachine.insertQuarter();
gumballMachine.turnCrank();

gumballMachine.insertQuarter();
gumballMachine.turnCrank();

gumballMachine.insertQuarter();
gumballMachine.turnCrank();

gumballMachine.insertQuarter();
gumballMachine.turnCrank();

gumballMachine.insertQuarter();
gumballMachine.turnCrank();
