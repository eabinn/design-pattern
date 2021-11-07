# design-pattern

# Singleton Pattern

### 싱글턴 패턴은

- 인스턴스가 하나 뿐인 특별한 객체를 만들 수 있게 해주는 패턴이다.
- 싱글턴 패턴을 사용하면 전역 변수를 사용할 때와 마찬가지로 동일한 객체 인스턴스를 어디서든지 액세스 할 수 있게 해준다.
- 싱글턴 패턴을 쓰면 필요할 때만 객체를 생성할 수 있다(자원을 효과적으로 사용할 수 있다).

### 고전적인 싱글턴 패턴 구현법

```
class Singleton {
    private static uniqueInstance: Singleton // Singleton 클래스의 유일한 인스턴스를 저장하기 위한 정적 변수

    constructor() {} // 생성자를 private로 선언했기 떄문에 Singleton에서만 클래스의 인스턴스를 만들 수 있다.

    public static getInstance(): Singleton { // 정적 메서드를 통해 Singleton 클래스의 인스턴스를 받는다.
        if (this.uniqueInstance == null) {
            this.uniqueInstance = new Singleton()
        }
        return this.uniqueInstance
    }
}
```

- pivate으로 선언된 생성자를 이용해서 Singleton 객체를 맏든다음 uniqueInstance에 그 객체를 대입한다. 이렇게 하면 인스턴스가 필요한 상황 전까지는 인스턴스를 생성하지 않는다. 이런 방법을 "게으른 인스턴스 생성(lazy instantiation)"이라고 부른다.

### 싱글턴 패턴의 정의

- 싱글턴 패턴은 해당 클래스의 인스턴스가 하나만 만들어지고, 어디서든지 그 인스턴스에 접근할 수 있도록 하기 위한 패턴이다.
- 싱글턴 패턴은 클래스에서 자신의 단 하나뿐인 인스턴스를 관리하도록 만들면 된다. 그리고 다른 어떤 클래스에서도 자신의 인스턴스를 추가로 만들지 못하게 해야 한다. 인스턴스가 필요하면 반드시 클래스 자신을 거치도록(ex. getInstance()) 해야한다. 그리고 어디서든 그 인스턴스에 접근할 수 있도록 만들어야 한다.

### 싱글턴 패턴의 다이어그램

![Singleton-pattern-class-diagram](https://user-images.githubusercontent.com/48785060/140638949-f3a89487-73a2-4bdb-9146-be3496f851e3.png)

- uniqueInstance 클래스 변수에 싱글턴의 유일무이한 인스턴스가 저장된다.
- getInstance() 메서드는 정적 메서드(클래스 메서드)다. Singleton.getInstance()만 사용하면 언제 어디서든 이 메서드를 호출할 수 있고, 전역 변수에 접근하는 것만큼 쉬우면서도 게으른 인스턴스 생성을 활용할 수 있다는 장점이 있다.

### 싱글턴의 멀티 스레딩 문제 해결방법 (근데 자바스크립트는 런타임 싱글 스레드 환경이라 괜찮다.)

1. getInstance()의 속도가 그리 중요하지 않다면 그냥 둔다.
2. 인스턴스를 필요할때 생성하지 말고 처음부터 만들자.

```
class Singleton {
    private static uniqueInstance: Singleton = new Singleton()

    constructor() {}

    public static getInstance(): Singleton { // 정적 메서드를 통해 Singleton 클래스의 인스턴스를 받는다.
        return this.uniqueInstance
    }
}
```

3. Java의 경우에는 volatile, synchronized 쓰면 된다.

### 핵심 정리

- 어떤 클래스에 싱글턴 패턴을 적용하면 애플리케이션에 그 클래스의 인스턴스가 최대 한개까지만 있게 할 수 있다.
- 싱글턴 패턴을 이용하면 유일한 인스턴스를 어디서든지 접근할 수 있도록 할 수 있다.
