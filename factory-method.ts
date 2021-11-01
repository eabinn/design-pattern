abstract class PizzaStore {
  orderPizza(type: string): Pizza {
    const pizza = this.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }

  abstract createPizza(type: string): Pizza;
}

class NYPizzaStore extends PizzaStore {
  createPizza(type: string): Pizza {
    return type === "cheese" ? new NYStyleCheesePizza() : new NYStyleClamPizza();
  }
}

abstract class Pizza {
  name!: string;
  dough!: string;
  sauce!: string;
  toppings!: string[];

  prepare() {
    console.log(`Preparing ${this.name}`);
    console.log(`Tossing dough...`);
    console.log(`Adding sauce...`);
    console.log(`Adding toppings...`);
    this.toppings.forEach((topping) => {
      console.log(` ${topping}`);
    });
  }

  bake() {
    console.log(`Bake for 25 minutes at 350`);
  }

  cut() {
    console.log(`Cutting the pizza into diagonal slices`);
  }

  box() {
    console.log(`Place pizza in official Pizzastore box`);
  }

  getName(): string {
    return this.name;
  }
}

// 구상 클래스를 만들자.
class NYStyleCheesePizza extends Pizza {
  constructor() {
    super();
    this.name = `NY Style Sauce and Cheese Pizza`;
    this.dough = `Thin Crust Dough`;
    this.sauce = `Marinara Sauce`;
    this.toppings = ["Grated", "Reggiano", "Cheese"];
  }
}

class NYStyleClamPizza extends Pizza {
  constructor() {
    super();
    this.name = `NY Style Sauce and Clam Pizza`;
    this.dough = `Thin Crust Dough`;
    this.sauce = `Marinara Sauce`;
    this.toppings = ["Grated", "Reggiano", "Cheese"];
  }
}

// 구상 클래스를 만들자.
class ChicagoStyleCheesePizza extends Pizza {
  constructor() {
    super();
    this.name = `Chicago Style Sauce and Cheese Pizza`;
    this.dough = `Extra Thick Crust Dough`;
    this.sauce = `Plum Tomato Sauce`;
    this.toppings = ["Grated", "Reggiano", "Cheese"];
  }

  // ChicagoStyleCheesePizza에서 cut 메서드를 오버라이드 한다.
  cut() {
    console.log(`Cutting the pizza into squre slices`);
  }
}

const nyStore = new NYPizzaStore();
const pizza = nyStore.orderPizza("cheese");
console.log(`Ordered Pizza Name: ${pizza.getName()}`);
