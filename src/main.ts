interface Observer {
  /**
   * 모든 기상 구성요소에서 Observer 인터페이스를 구현한다. 이 인터페이스는 주제 객체에서 옵저버한테 갱신된 정보를
   * 전달할 수 있는 방법을 제공한다.
   */
  update(temp: number, humidity: number, pressure: number): void;
}

interface Subject {
  /**
   * 옵저버를 등록하고, 옵저버를 삭제하고, 옵저버들에게 알릴 사항이 있을때 알리는 메서드들을 가지고 있다.
   * 주제는 옵저버들의 리스트(Observer[])에만 의존적이다. 따라서 옵저버들이 어떻게 구현되는지는 상관없고 옵저버들이
   * Observer 인터페이스를 구현되면 된다.
   */
  registerObserver(o: Observer): void;
  removeObserver(o: Observer): void;
  notifyObservers(): void; // 주제 객체의 상태가 변경됐을때 모든 옵저버들에게 알리기 위해 호출되는 메서드다.
}

interface DisplayElement {
  /**
   * 모든 디스플레이 항목에서 구현하는 인터페이스다. 디스플레이 항목에서는 display() 메서드만 구현하면 된다.
   */
  display(): void;
}

class WeatherData implements Subject {
  private observers: Observer[];
  private temperature: number;
  private humidity: number;
  private pressure: number;

  constructor() {
    this.observers = [];
  }

  registerObserver(o: Observer): void {
    this.observers.push(o);
  }

  removeObserver(o: Observer): void {
    this.observers = this.observers.filter((observer) => observer !== o);
  }

  notifyObservers() {
    /**
     * 상태에 대해서 모든 옵저버들에게 알려준다. 모두 Observer 인터페이스를 구현하는 옵저버들이다.
     * 따라서 update() 메서드가 있는 객체들이므로 쉽게 옵저버들에게 알려줄 수 있다.
     */
    this.observers.forEach((observer) => {
      observer.update(this.temperature, this.humidity, this.pressure);
    });
  }

  measurementsChanged() {
    /**
     * WeatherStation으로부터 오는 갱신된 측정치를 받으면 옵저버들에게 알린다.
     */
    this.notifyObservers();
  }

  setMeasurements(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notifyObservers();
  }
}

class CurrentConditionsDisplay implements Observer, DisplayElement {
  /**
   * WeatherData(Subject) 객체로부터 변경 사항을 받기 위해서 Observer을 구현한다.
   * 모든 화면에서 display() 메서드를 공통적으로 구현하기 위해 DisplayElement 인터페이스를 구현한다.
   */
  private temperature: number;
  private humidity: number;
  private pressure: number;
  private weatherData: Subject;

  constructor(weatherData: Subject) {
    /**
     * 생성자에 weatherData라는 주제 객체가 전달되며, 그 객체를 써서 디스플레이를 옵저버로 등록한다.
     * 주제에 대한 레퍼런스를 저장하는 이유는 옵저버 목록에서 탈퇴하고 싶을떄 removeObserver을 사용하기 위함이다.
     */
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  update(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.display();
  }

  display() {
    console.log(`Current conditions: ${this.temperature} temperature, ${this.humidity}% humidity, ${this.pressure} pressure.`);
  }
}

class WeatherStation {
  static main() {
    // WeatherData 객체를 생성한다.
    const weatherData: WeatherData = new WeatherData();

    // 디스플레이를 생성하면서 WeatherData 객체를 인자로 전달한다. 생성되면서 주제에 대해서 옵저버로 등록된다.
    const currentDisplay: CurrentConditionsDisplay = new CurrentConditionsDisplay(weatherData);

    weatherData.setMeasurements(100, 12, 30.4);
  }
}

// 실행
WeatherStation.main();
