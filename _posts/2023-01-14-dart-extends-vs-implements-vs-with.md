---
title: "[Dart] extends vs implements vs with"
categories:
- Dart
tags:
- Tip
---

상속이란 기존에 존재하는 클래스(슈퍼 클래스)를 재사용하거나 확장하는 새로운 클래스를 만드는 것을 말한다. 이러한 상속은 당연히 객체지향 언어인 Dart에도 존재한다.

그런데 Dart에서 상속을 받을 때 헷갈릴 수 있는 부분이 있다. 바로 `extends`, `implements`, `with`에 어떤 차이가 있냐는 것이다. 실제로 검색해보면 스택오버플로우에도 이 3가지의 차이를 물어보는 글들이 꽤 있다. 그래서 이번 글에서는 `extends`, `implements`, `with` 3가지를 비교해보려고 한다.

## Extends

`extends`는 슈퍼 클래스의 속성, 변수, 함수를 전부 가져와서 그대로 사용하거나 수정하여 사용할 수 있게 해준다. 또한 다중 상속은 불가능하다.

``` dart
abstract class Animal {
  void breathe(){
    print('breathe');
  }
  
  void move() {
    print('move');
  }
}

class Cat extends Animal {
}

void main() {
  Cat cat = Cat();
  cat.breathe();
  // 결과: 'breathe'
  cat.move();
  // 결과: 'move'
}
```

위의 코드에서 `Cat`은 `Animal`을 `extends`했다. 그래서 `Cat`에는 아무런 함수 구현을 안 했지만, `main` 함수에서 `breathe()`와 `move()`를 호출할 수 있는 것이다.

`extends`했다고 해서 꼭 속성, 변수, 함수를 꼭 그대로 사용해야하는 것은 아니다. `override`를 통해 수정하여 사용할 수도 있다.

``` dart
abstract class Animal {
  void breathe(){
    print('breathe');
  }
  
  void move() {
    print('move');
  }
}

class Cat extends Animal {
  @override
  void move() {
    print('cat moves');
  }
}

void main() {
  Cat cat = Cat();
  cat.breathe();
  // 결과: 'breathe'
  cat.move();
  // 결과: 'cat moves'
}
```

이전 코드와 똑같이 `Cat`은 `Animal`을 `extends`했다. 하지만 `move()`를 `override` 했다는 점이 다르다. `main` 함수를 실행한 결과를 보면 차이가 있다. `breathe()`는 `Animal`의 `breathe()`이 실행됐지만, `move()`는 `Cat`에서 수정한 `move()`가 실행되었다는 것을 알 수 있다.

## Implements

`implements`는 말 그대로 슈퍼 클래스를 구현한다는 것을 의미한다. 슈퍼 클래스에 정의되어 있는 모든 속성, 변수, 함수를 가져오지만 전부 `override`하여 구현해야한다.

``` dart
abstract class Animal {
  void breathe(){
    print('breathe');
  }
  
  void move() {
    print('move');
  }
}

class Cat implements Animal {
  @override
  void breathe(){
    print('cat breathes');
  }
  
  @override
  void move() {
    print('cat moves');
  }
}

void main() {
  Cat cat = Cat();
  cat.breathe();
  // 결과: 'cat breathes'
  cat.move();
  // 결과: 'cat moves'
}
```

`Cat`은 `Animal`을 `implements`했다. 따라서 `Cat`에서는 `Animal`에 정의된 `breathe()`과 `move()`를 전부 `override`하여 재구현해야만 한다. 하나라도 빼먹으면 오류가 뜬다.

그리고 `implements`는 `extends`와 다르게 다중 상속이 가능하다.

``` dart
abstract class Animal {
  void breathe(){
    print('breathe');
  }
  
  void move() {
    print('move');
  }
}

abstract class Runner {
  void run() {
    print('run');
  }
}

class Cat implements Animal, Runner {
  @override
  void breathe(){
    print('cat breathes');
  }
  
  @override
  void move() {
    print('cat moves');
  }
  
  @override
  void run() {
    print('cat runs');
  }
}

void main() {
  Cat cat = Cat();
  cat.breathe();
  // 결과: 'cat breathes'
  cat.move();
  // 결과: 'cat moves'
  cat.run();
  // 결과: 'cat runs'
}
```

위의 코드에서 `Cat`이 `Animal`와 `Runner`를 동시에 `implements`했다(다중상속). 따라서 `breathe()`, `move()`, `run()`를 모두 `override`한 것을 볼 수 있다.

## With

`with`는 `extends`처럼 슈퍼 클래스의 속성, 변수, 함수를 전부 가져와서 그대로 사용하거나 수정하여 사용할 수 있게 해주면서,  `implements`처럼 다중 상속도 가능하다.

``` dart
abstract class Animal {
  void breathe(){
    print('breathe');
  }
  
  void move() {
    print('move');
  }
}

mixin Walker {
  void walk() {
    print('walk');
  }
}

mixin Runner {
  void run() {
    print('run');
  }
}

class Cat extends Animal with Walker, Runner {
}

void main() {
  Cat cat = Cat();
  cat.breathe();
  // 결과: 'breathe'
  cat.move();
  // 결과: 'move'
  cat.walk();
  // 결과: 'walk'
  cat.run();
  // 결과: 'run'
}
```

`Cat`이 `Walker`와 `Runner`를 동시에 `with`했다(다중상속). 그리고 `extends`처럼 `Walker`와 `Runner`의 메소드인 `walk()`과 `run()`를 가져와 그대로 사용하는 것을 확인할 수 있다. 당연히 `override`를 통해 수정해서 사용하는 것도 가능하다.

참고로 위 코드에서는 `with`한 슈퍼 클래스에 `abstract class` 대신 `mixin`를 사용했지만, `abstract class` 를 사용해도 괜찮다.

## 정리

* extends: 슈퍼 클래스의 속성, 변수, 함수를 그대로 사용하거나 수정하여 사용할 수 있게 해준다. 다중 상속은 불가능하다.
* implements: 슈퍼 클래스에 정의되어 있는 모든 속성, 변수, 함수를 가져오지만 전부 `override`하여 구현해야한다. 다중 상속이 가능하다.
* with: 슈퍼 클래스의 속성, 변수, 함수를 그대로 사용하거나 수정하여 사용할 수 있게 해준다. 다중 상속이 가능하다.
