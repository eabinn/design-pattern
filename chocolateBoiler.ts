class ChocolateBoiler {
  private static uniqueInstance: ChocolateBoiler;
  private empty: boolean;
  private boiled: boolean;

  private constructor() {
    (this.empty = false), (this.boiled = false);
  }

  public static getInstance(): ChocolateBoiler {
    if (this.uniqueInstance == null) {
      this.uniqueInstance = new ChocolateBoiler();
    }
    return this.uniqueInstance;
  }

  public isEmpty(): boolean {
    return this.empty;
  }

  public isBoiled(): boolean {
    return this.boiled;
  }

  /**
   * 보일러가 비어있을때 재료를 집어넣는다. 원료 채우고 나면 empty와 boiled 플래그를 false로 셋한다.
   */
  public fill(): void {
    if (this.isEmpty()) {
      console.log("boiler fill");
      this.empty = false;
      this.boiled = false;
    }
  }

  /**
   * 보일러가 가득 차있고 다 끓어진 상태에서 다음 단계로 넘긴다. 보일러 다 비우고 나면 empty 플래그를 true 셋한다.
   */
  public drain(): void {
    if (!this.isEmpty() && this.isBoiled()) {
      console.log("boiler drain");
      this.empty = true;
    }
  }

  /**
   * 보일러가 가득 차있고 안 끓어진 상태면 끓인다. 보일러 다 비우고 나면 boiled 플래그를 false로 셋한다.
   */
  public boil(): void {
    if (!this.isEmpty() && !this.isBoiled()) {
      console.log("boiler boil");
      this.boiled = true;
    }
  }
}

const boiler1 = ChocolateBoiler.getInstance();
boiler1.boil();
boiler1.drain();
boiler1.fill();
