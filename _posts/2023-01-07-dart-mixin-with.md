---
title: "[Dart] mixin, with란?"
categories:
- Dart
tags:
- Tip
---

## mixin, with란 무엇일까?

Dart에서 상속을 할 때는 보통 `extends`를 사용한다. 하지만 `extends`는 다중 상속이 불가능하다는 단점이 있다. 이때 다중 상속을 하기 위해 필요한 것이 바로 `mixin`, `with`다.

## mixin, with가 필요한 상황

아래와 같은 코드가 있다고 생각해보자.

``` dart
abstract class Animal {
  void breathe() {
    print('breathe');
  }
}

abstract class Fish extends Animal {
  void hasGill() {
    print('hasGill');
  }
}

abstract class Mammal extends Animal {
  void suckle() {
    print('suckle');
  }
}
```

동물은 전부 숨을 쉬기 때문에 `Animal` 클래스에 `breathe()` 메소드를 넣었다.

그리고 `Animal` 클래스를 상속 받는 `Fish`와 `Mammal` 클래스를 만들었다. 물고기는 전부 아가미를 가지고 있기 때문에 `Fish` 클래스에는 `hasGill()` 메소드를 넣었고, 포유류는 전부 새끼에게 젖을 먹이기 때문에 `Mammal` 클래스에는 `suckle()` 메소드를 넣었다.

그렇다면 여기서 물고기 두가지와 포유류 두가지를 추가해보자.

``` dart
class Salmon extends Fish {
}

class FlyingFish extends Fish {
}

class Seal extends Mammal {
}

class Bat extends Mammal {
}
```

`Salmon`(연어)와 `FlyingFish`(날치)는 물고기이기 때문에 `Fish`를 상속받았고, `Seal`(물개)와 `Bat`(박쥐)는 포유류이기 때문에 `Mammal`를 상속받았다.

이제 각 동물이 할 수 있는 행동들을 수영, 비행, 걷기 3종류로 정리해보자.

* 연어: 수영
* 날치: 수영, 비행
* 물개: 수영, 걷기
* 박쥐: 비행, 걷기

이 행동들을 각 클래스 안에 메소드로 구현하면 다음과 같아진다.

``` dart
class Salmon extends Fish {
  void swim() {
    print('swim');
  }
}

class FlyingFish extends Fish {
  void swim() {
    print('swim');
  }

  void fly() {
    print('fly');
  }
}

class Seal extends Mammal {
  void swim() {
    print('swim');
  }

  void walk() {
    print('walk');
  }
}

class Bat extends Mammal {
  void fly() {
    print('fly');
  }

  void walk() {
    print('walk');
  }
}
```

이렇게 해보니 중복되는 코드가 너무 많다. 그러면 중복을 줄이기 위해서는 어떻게 해야할까? `swim()` 메소드를 상위 클래스인 `Fish`에 넣고, `walk()` 메소드도 상위 클래스인 `Mammal`에 넣으면 될까?

아니다. 물고기들만 수영을 할 수 있는 것도 아니고, 포유류들만 걷을 수 있는 것도 아니다.

이럴 때는 각 행동에 해당하는 별도의 클래스를 만들어서 `Salmon`, `FlyingFish`, `Seal`, `Bat`가 이것들을 상속받게 해야한다. 하지만 현재 `Salmon`, `FlyingFish`, `Seal`, `Bat`는 이미 하나의 클래스를 상속 받고 있기 때문에 추가로 다른 클래스를 `extends`할 수 없다.

## mixin, with 사용 예시

이런 상황에 필요한 것이 `mixin`, `with`이다. `mixin`, `with`는 `extends`와 다르게 다중 상속이 가능하기 때문이다.

`mixin`을 사용해서 `Flyer`, `Swimmer`, `Walker` 클래스를 아래처럼 만들었다.

``` dart
mixin Flyer {
  void fly() {
    print('fly');
  }
}

mixin Swimmer {
  void swim() {
    print('swim');
  }
}

mixin Walker {
  void walk() {
    print('walk');
  }
}
```

이제 이 클래스들을 `Salmon`, `FlyingFish`, `Seal`, `Bat`에서 `with`를 통해  상속 받아보자.

``` dart
class Salmon extends Fish with Swimmer {
  
}

class FlyingFish extends Fish with Swimmer, Flyer {
  
}

class Seal extends Mammal with Swimmer, Walker {
  
}

class Bat extends Mammal with Flyer, Walker {
  
}
```

이렇게 `mixin`, `with`를 사용하면 여러개의 클래스를 상속받을 수 있게 된다.

이제 마지막으로 잘 상속되었는지를 확인해보자.

``` dart
void main() {
  FlyingFish flyingFish = FlyingFish();
  flyingFish.breathe();
  flyingFish.hasGill();
  flyingFish.swim();
  flyingFish.fly();
  
  Bat bat = Bat();
  bat.breathe();
  bat.suckle();
  bat.fly();
  bat.walk();
}
```

`FlyingFish` 객체에서 `swim()`와 `fly()`가 잘 호출되고, `Bat` 객체에서 `fly()`와 `walk()`가 잘 호출되는 것을 볼 수 있다.

## Dart pad

<iframe style="width:100%;height:700px;" src="https://dartpad.dev/embed-inline.html?id=f5cd872b8a184e6165b7cb22f108a25d&theme=dark"></iframe>
