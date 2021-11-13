abstract class CaffeineBeverageWithHook {
  prepareRecipe() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) {
      this.addCondiments();
    }
  }

  abstract brew(): void;

  abstract addCondiments(): void;

  boilWater() {
    console.log("Boiling water.");
  }

  pourInCup() {
    console.log("Pouring in cup.");
  }

  customerWantsCondiments(): boolean {
    return true;
  }
}

class CoffeeWithHook extends CaffeineBeverageWithHook {
  brew() {
    console.log("Brewing coffee.");
  }

  addCondiments() {
    console.log("Adding coffee and milk.");
  }

  customerWantsCondiments() {
    return false;
  }
}
