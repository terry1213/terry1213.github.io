---
title: "[Dart/Document]A tour of the Dart language - 10. Classes"
categories:
- Dart
tags:
- Document
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)
# Classes
Dart는 클래스와 혼합 기반 상속(Mixin-Based Inheritance)을 포함하는 객체 지향 언어(Object-Oriented Language)이다. 모든 오브젝트는 클래스의 인스턴스이고, 모든 클래스는 Object(모든 Dart 오브젝트의 기본 클래스)로부터 내려온다. 혼합 기반 상속은 모든 클래스(Object를 제외하고)가 정확히 하나의 상위 클래스만 가지지만 클래스 본문(body)는 여러 클래스 계층에서 재사용될 수 있다는 것을 의미한다. 확장 메소드(Extension Method)는 클래스를 변경하거나 하위 클래스를 만들지 않고 클래스에 기능을 추가하는 방법이다.

## Using class members
오브젝트는 함수와 데이터(메소드와 인스턴스 변수)로 이루어진 멤버들을 가지고 있다. 메소드는 오브젝트를 통해 호출한다. 호출된 메소드를 통해 해당 오브젝트의 함수와 데이터에 접근할 수 있다.

인스턴스 변수나 메소드를 참조하기 위해 점 (`.`)을 사용한다.

{% highlight dart %}
var p = Point(2, 2);

// y의 값을 가져온다.
assert(p.y == 2);

// p에서 distanceTo()를 호출한다.
double distance = p.distanceTo(Point(4, 4));
{% endhighlight %}

왼쪽 오브젝트가 null인 예외 상황을 피하기 위해선 `.` 대신에 `?.`을 사용한다.

{% highlight dart %}
// 만약에 p가 null이 아니면, 변수에 y의 값을 할당한다.
var a = p?.y;
{% endhighlight %}

## Using constructors
생성자(constructor)를 사용해서 새로운 오브젝트를 만들 수 있다. 생성자 이름은 `ClassName` 혹은 `ClassName.identifier` 가 될 수 있다. 예를 들어 아래의 코드는 `Point()`, `Point.fromJson()` 생성자를 통해 `Point` 오브젝트를 만든다.

{% highlight dart %}
var p1 = Point(2, 2);
var p2 = Point.fromJson({'x': 1, 'y': 2});
{% endhighlight %}

아래의 코드는 위의 코드와 결과가 동일하지만 생성자 이름 앞에 `new`라는 선택적 키워드를 사용한다.

{% highlight dart %}
var p1 = new Point(2, 2);
var p2 = new Point.fromJson({'x': 1, 'y': 2});
{% endhighlight %}

>  **Version note**: Dart 2에서부터 `new` 키워드 사용은 선택 사항이다.

어떤 클래스는 상수 생성자(constant constructor)를 제공한다. 상수 생성자를 통해 컴파일 타임 상수(compile-time constant)를 만들기 위해선 생성자 이름 앞에 const 키워드를 넣는다.

{% highlight dart %}
var p = const ImmutablePoint(2, 2);
{% endhighlight %}

동일한 두 개의 컴파일 타임 상수를 생성하면 이 둘은 같은 인스턴스가 된다.

{% highlight dart %}
var a = const ImmutablePoint(1, 1);
var b = const ImmutablePoint(1, 1);

assert(identical(a, b)); // a랑 b는 동일한 인스턴스이다.
{% endhighlight %}

상수 문맥 내에서는 생성자나 literal 앞에 `const`를 생략할 수 있다. 예를 들어 const map을 생성하는 아래의 코드를 보자.

{% highlight dart %}
// const 키워드가 굉장히 많다.
const pointAndLine = const {
  'point': const [const ImmutablePoint(0, 0)],
  'line': const [const ImmutablePoint(1, 10), const ImmutablePoint(-2, 11)],
};
{% endhighlight %}

모든 `const` 키워드를 뺄 수 있지만 맨 처음 것은 남겨야한다.

{% highlight dart %}
// 상수 문맥을 만들어주는 const 하나만 남겨둔다.
const pointAndLine = {
  'point': [ImmutablePoint(0, 0)],
  'line': [ImmutablePoint(1, 10), ImmutablePoint(-2, 11)],
};
{% endhighlight %}

만약 상수 생성자가 상수 문맥 밖에 존재하고 `const` 없이 호출된다면 이는 **상수가 아닌 오브젝트**(non-constant object)를 생성한다.

{% highlight dart %}
var a = const ImmutablePoint(1, 1); // 상수를 생성한다.
var b = ImmutablePoint(1, 1); // 상수를 생성하지 않는다.

assert(!identical(a, b)); // a랑 b는 다른 인스턴스이다.
{% endhighlight %}

> **Version note**: Dart 2에서부터 상수 문맥 안에서의 `const` 키워드 사용은 선택 사항이다.

## Getting an object’s type
런타임에 오브젝트 타입을 가져오기 위해, Object의 `runtimeType` property를 사용할 수 있다. `runtimeType`는 Type 오브젝트를 리턴한다.

{% highlight dart %}
print('The type of a is ${a.runtimeType}');
{% endhighlight %}

---

<br><br>
여기까지, 클래스를 어떻게 사용하는지를 봤다. 이 섹션의 나머지 파트에선 클래스를 구현하는 방법을 보여줄 것이다.
<br><br>
## Instance variables
아래는 인스턴스 변수를 선언하는 방법을 보여준다.

{% highlight dart %}
class Point {
  double x; // 인스턴스 변수 x를 선언한다. 처음 값은 null이다.
  double y; // 인스턴스 변수 y를 선언한다. 처음 값은 null이다.
  double z = 0; // 인스턴스 변수 z를 선언한다. 처음 값은 0이다.
}
{% endhighlight %}

이니셜라이즈 되지 않은 모든 인스턴스 변수는 `null` 값을 가진다.

모든 인스턴스 변수는 암묵적으로 getter 메소드를 생성한다. 또한 final이 아닌 인스턴스 변수는 암묵적으로 setter 메소드를 생성한다.

{% highlight dart %}
class Point {
  double x;
  double y;
}

void main() {
  var point = Point();
  point.x = 4; // x에 대한 setter 메소드를 사용한다.
  assert(point.x == 4); // x에 대한 getter 메소드를 사용한다.
  assert(point.y == null); // 디폴트 값은 null이다.
}
{% endhighlight %}

만약 인스턴스 변수를 선언된 곳에서 이니셜라이즈하면, 인스턴스가 생성될 때 값이 설정된다. 이는 생성자와 이니셜라이저 리스트의  실행 시기보다 이전이다.

## Constructors
클래스와 같은 이름의 함수를 만들어서 생성자를 선언한다.(Named constructor에는 추가적으로 식별자가 더 붙는다.) 생성자의 가장 일반적인 형태인 generative 생성자는 클래스의 새로운 인스턴스를 생성한다.

{% highlight dart %}
class Point {
  double x, y;

  Point(double x, double y) {
    // 이것보다 더 좋은 방법이 있다. 이는 나중에 소개된다.
    this.x = x;
    this.y = y;
  }
}
{% endhighlight %}

`this` 키워드는 현재 인스턴스를 가르킨다.

> **Note**: 이름 충돌이 일어날 때만 `this`를 사용해라.

생성자의 argument를 인스턴스 변수에 할당하는 패턴은 매우 일반적이기 때문에 Dart에는 이를 쉽게 만들어주는 syntactic sugar가 있다.

{% highlight dart %}
class Point {
  double x, y;

  // 생성자의 body가 실행되기 전에
  // x와 y를 세팅하기 위한 syntactic sugar
  Point(this.x, this.y);
}
{% endhighlight %}

### Default constructors
만약 생성자를 따로 선언하지 않으면 디폴트 생성자가 제공된다. 디폴트 생성자에는 argument가 없고 상위 클래스의 argument가 없는 생성자를 호출한다.

### Constructors aren’t inherited
하위 클래스는 상위 클래스로부터 생성자를 상속받지 않는다. 그렇기 때문에 생성자가 없는 하위 클래스에는 바로 위에서 설명한 디폴트 생성자만 있다.

### Named constructors
클래스에 여러 생성자를 구현하거나 명확한 설명을 제공하기 위해서 named constructor 사용한다.

{% highlight dart %}
class Point {
  double x, y;

  Point(this.x, this.y);

  // Named constructor
  Point.origin() {
    x = 0;
    y = 0;
  }
}
{% endhighlight %}

생성자는 상속되지 않는다는 것을 기억해라. 이는 상위 클래스의 named constructor가 하위 클래스에게 상속되지 않는다는 것을 말한다.만약 상위 클래스에 정의되어 있는 named constructor를 통해 하위 클래스를 생성하고 싶다면 해당 생성자를 하위 클래스에 구현해야만 한다.

### Invoking a non-default superclass constructor
기본적으론, 하위 클래스의 생성자는 상위 클래스의 이름 없고 argument 없는 생성자를 호출한다. 상위 클래스의 생성자는 생성자 본문의 시작 부분에 불린다. 만약 이니셜라이저 리스트도 사용되었다면, 이를 상위 클래스가 호출되기 전에 실행한다. 요약하자면 실행의 순서는 아래와 같다.

1. 이니셜라이저 리스트
2. 상위 클래스의 argument 없는 생성자
3. 메인 클래스의 argument 없는 생성자

만약 상위 클래스에 이름 없고 argument 없는 생성자가 없다면 상위 클래스의 생성자 중 하나를 수동으로 불러야한다. `:`와 생성자 본문 사이에 상위 클래스 생성자를 명시해라.

아래의 예시에서 Employee 클래스를 위한 생성자가 상위 클래스인 Person의 이름 있는 생성자를 부른다.

{% highlight dart %}
class Person {
  String firstName;

  Person.fromJson(Map data) {
    print('in Person');
  }
}

class Employee extends Person {
  // Person에는 디폴트 생성자가 없다.
  // super.fromJson(data)를 호출해야한다.
  Employee.fromJson(Map data) : super.fromJson(data) {
    print('in Employee');
  }
}

main() {
  var emp = new Employee.fromJson({});

  // Prints:
  // in Person
  // in Employee
  if (emp is Person) {
    // 타입 확인
    emp.firstName = 'Bob';
  }
  (emp as Person).firstName = 'Bob';
}
{% endhighlight %}

이를 실행하면 아래와 같은 결과가 나온다.

{% highlight console %}
in Person
in Employee
{% endhighlight %}

상위 클래스 생성자로 보내는 argument는 생성자를 호출하기 전에 평가되기 때문에, argument에는 함수 호출과 같은 expression가 올 수 있다.

{% highlight dart %}
class Employee extends Person {
  Employee() : super.fromJson(defaultData);
  // ···
}
{% endhighlight %}

> **Warning**: 상위 클래스 생성자로 보내는 argument는 `this`에 접근할 수 없다. 예를 들어 argument가 정적 메소드(static method)는 호출 할 수 있지만 인스턴스 메소드는 호출할 수 없다.

### Initializer list
생성자 본문이 실행되기 전에 할 수 있는 건 상위 클래스 생성자를 호출만이 아니다. 인스턴스 변수를 이니셜라이즈하는 것도 가능하다. 이때 쉼표(`,`)로 이니셜라이저를 구분한다.

{% highlight dart %}
// 생성자 본문이 실행되기 전에
// 이니셜라이저 리스트가 인스턴스 변수를 설정한다.
Point.fromJson(Map<String, double> json)
    : x = json['x'],
      y = json['y'] {
  print('In Point.fromJson(): ($x, $y)');
}
{% endhighlight %}

> **Warning**: 이니셜라이저의 오른쪽 부분은 `this`에 접근할 수 없다.

개발 진행 중에는, 이니셜라이저 리스트에 `assert`를 넣어서 인풋이 유효한지 확인할 수 있다.

{% highlight dart %}
Point.withAssert(this.x, this.y) : assert(x >= 0) {
  print('In Point.withAssert(): ($x, $y)');
}
{% endhighlight %}

이니셜라이저 리스트는 final 필드를 설정할 때 편리하다. 아래의 예시는 이니셜라이저 리스트 내에서 세 개의 final 필드를 이니셜라이즈한다.

{% highlight dart %}
import 'dart:math';

class Point {
  final num x;
  final num y;
  final num distanceFromOrigin;

  Point(x, y)
      : x = x,
        y = y,
        distanceFromOrigin = sqrt(x * x + y * y);
}

main() {
  var p = new Point(2, 3);
  print(p.distanceFromOrigin);
}
{% endhighlight %}

이를 실행하면 아래와 같은 결과가 나온다.

{% highlight console %}
3.605551275463989
{% endhighlight %}

### Redirecting constructors
가끔 생성자의 목적이 단지 같은 클래스 내의 다른 생성자로 redirect하는 것일 때가 있다. redirect하는 생성자는 본문이 비어 있고 `:` 뒤에서 생성자를 호출한다.

{% highlight dart %}
class Point {
  double x, y;

  // 클래스의 메인 생성자.
  Point(this.x, this.y);

  // 메인 생성자에게 위임한다.
  Point.alongXAxis(double x) : this(x, 0);
}
{% endhighlight %}

### Constant constructors
만약 클래스가 변하지 않는 오브젝트를 생성하는 경우 이런 오브젝트를 컴파일 타임 상수로 만들 수 있다. 그러기 위해선 `const` 생성자를 정의하고 모든 인스턴스 변수가 `final`이어야 한다.

{% highlight dart %}
class ImmutablePoint {
  static final ImmutablePoint origin =
      const ImmutablePoint(0, 0);

  final double x, y;

  const ImmutablePoint(this.x, this.y);
}
{% endhighlight %}

상수 생성자가 항상 상수를 만드는 것은 아니다.

### Factory constructors
매번 새로운 인스턴스를 만들지 않는 생성자를 구현할 때 `factory` 키워드를 사용한다. 예를 들어, factory 생성자는 캐시(cash)로부터 인스턴스를 리턴하거나 하위 타입의 인스턴스를 리턴할 수 있다. 또한 factory 생성자는 이니셜라이저 리스트에서 다룰 수 없는 논리를 사용해서 final 변수를 이니셜라이즈할 수 있다.

아래의 예시에선 `Logger` factory 생성자가 캐시로부터 오브젝트를 리턴하고, `Logger.fromJson` factory 생성자는 JSON 오브젝트로부터 final 변수를 이니셜라이즈한다.

{% highlight dart %}
class Logger {
  final String name;
  bool mute = false;

  // _cache는 library-private이다.
  static final Map<String, Logger> _cache =
      <String, Logger>{};

  factory Logger(String name) {
    return _cache.putIfAbsent(
        name, () => Logger._internal(name));
  }

  factory Logger.fromJson(Map<String, Object> json) {
    return Logger(json['name'].toString());
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}
{% endhighlight %}

> **Note**: factory 생성자는 `this`에 접근할 수 없다.

factory 생성자는 다른 생성자들처럼 호출할 수 있다.

{% highlight dart %}
var logger = Logger('UI');
logger.log('Button clicked');

var logMap = {'name': 'UI'};
var loggerJson = Logger.fromJson(logMap);
{% endhighlight %}

## Methods
메소드는 오브젝트에 대한 행동을 제공하는 함수이다.

### Instance methods

오브젝트의 인스턴스 메소드는 인스턴스 변수와 `this`에 접근할 수 있다.  아래 코드의  `distanceTo()` 메소드는 인스턴스 메소드의 예시이다.

{% highlight dart %}
import 'dart:math';

class Point {
  double x, y;

  Point(this.x, this.y);

  double distanceTo(Point other) {
    var dx = x - other.x;
    var dy = y - other.y;
    return sqrt(dx * dx + dy * dy);
  }
}
{% endhighlight %}

### Operators

operator는 특별한 이름을 가진 인스턴스 메소드이다. Dart는 아래와 같은 operator들을 제공한다.

|:--:	|:--:	|:--:	|:---:	|
|  < 	|  + 	| \| 	|  [] 	|
|  > 	|  / 	|  ^ 	| []= 	|
| <= 	| ~/ 	|  & 	|  ~  	|
| >= 	|  * 	| << 	|  == 	|
|  – 	|  % 	| >> 	|     	|

> **Note**: `!=` 같은 몇몇 operator들이 위의 테이블에서 없다는 것을 알 수 있다. 이는 그것들은 단지 syntactic sugar이기 때문이다. 예를 들어, `e1 != e2`는 `!(e1 == e2)`를 위한 syntactic sugar 이다.

operator는 built-in identifier인 `operator`를 사용해서 선언할 수 있다. 아래의 예시는 vector의 더하기(`-`)와 빼기(`-`)를 정의하고 있다.

{% highlight dart %}
class Vector {
  final int x, y;

  Vector(this.x, this.y);

  Vector operator +(Vector v) => Vector(x + v.x, y + v.y);
  Vector operator -(Vector v) => Vector(x - v.x, y - v.y);

  // == operator와 hashCode가 표시되지 않는다.
  // ···
}

void main() {
  final v = Vector(2, 3);
  final w = Vector(2, 2);

  assert(v + w == Vector(4, 5));
  assert(v - w == Vector(0, 1));
}
{% endhighlight %}

### Getters and setters
getter와 setter는 오브젝트의 property를 읽고 쓰게 해주는 특별한 메소드이다. 모든 인스턴스 변수는 암묵적으로 getter와 setter를 가진다. `get`과 `set` 키워드를 사용하여 getter와 setter를 구현하면 추가적인 property를 만들 수 있다.

{% highlight dart %}
class Rectangle {
  double left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // right과 bottom, 두 개의 계산된 property를 정의한다.
  double get right => left + width;
  set right(double value) => left = value - width;
  double get bottom => top + height;
  set bottom(double value) => top = value - height;
}

void main() {
  var rect = Rectangle(3, 4, 20, 15);
  assert(rect.left == 3);
  rect.right = 12;
  assert(rect.left == -8);
}
{% endhighlight %}

> **Note**: `++`같은 operator는 getter가 명시적으로 정의되었는지 여부에 관계 없이 예상된 방법으로 작동한다. 예상치 못한 일이 생기지 않도록 operator는 getter를 한번만 부르고 그 값을 임시 변수에 저장해둔다.

### Abstract methods
인스턴스 메소드, getter 메소드, setter 메소드는 abstract이 될 수 있고, 인터페이스를 정의하면서 해당 인터페이스의 구현은 다른 클래스에 맡길 수 있다. abstract 메소드는 abstract 클래스 안에만 있을 수 있다.

abstract 메소드를 만들기 위해 메소드 본문 대신에 `;`를 사용하면 된다.

{% highlight dart %}
abstract class Doer {
  // 인스턴스 변수와 메소드를 정의한다...

  void doSomething(); // abstract 메소드를 정의한다.
}

class EffectiveDoer extends Doer {
  void doSomething() {
    // 구현을 제공한다. 여기서 이 메소드는 추상적이지 않다.
  }
}
{% endhighlight %}

## Abstract classes
인스턴스화할 수 없는 추상 클래스를 정의하기 위해 `abstract` modifier를 사용한다. 추상 클래스는 인터페이스를 정의하는 것에 유용하고 경우에 따라 어느정도의 구현도 가능하다. 추상 클래스를 인스턴스화할 수 있게 하려면 factory 생성자를 정의해야한다.

추상 클래스는 종종 추상 메소드를 가지고 있다. 아래는 추상 메소드를 가지고 있는 추상 클래스를 선언하는 예시이다.

{% highlight dart %}
// 이 클래스는 추상 클래스로 선언되어서 인스턴스화할 수 없다.
abstract class AbstractContainer {
  // 생성자, 필드, 메소드를 정의한다...

  void updateChildren(); // 추상 메소드.
}
{% endhighlight %}

## Implicit interfaces
모든 클래스는 해당 클래스의 모든 인스턴스 멤버와 해당 클래스가 구현하는 인터페이스들의 모든 인스턴스 맴버를 포함하는 인터페이스를 암묵적으로 정의한다. 만약 클래스 B의 구현을 상속하지 않으면서 클래스B의 API를 지원하는 클래스 A를 만들고 싶다면, 클래스 A는 B 인터페이스를 구현해야만 한다.

클래스는 하나 이상의 인터페이스를 `implements` 절에 선언하고 인터페이스에 필요한 API를 제공하여 해당 인터페이스를 구현한다. 아래는 이에 대한 예시이다.

{% highlight dart %}
// 암묵적 인터페이스가 greet()를 포함하고 있다.
class Person {
  // 인터페이스에 있지만 오직 이 라이브러리에서만 보인다.
  final _name;

  // 이것은 생성자이기 때문에 인터페이스에 없다.
  Person(this._name);

  // 인터페이스에 있다.
  String greet(String who) => 'Hello, $who. I am $_name.';
}

// Person 인터페이스의 구현.
class Impostor implements Person {
  get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}

String greetBob(Person person) => person.greet('Bob');

void main() {
  print(greetBob(Person('Kathy')));
  print(greetBob(Impostor()));
}
{% endhighlight %}

아래는 클래스가 여러 인터페이스를 구현하도록 지정하는 예시이다.

{% highlight dart %}
class Point implements Comparable, Location {...}
{% endhighlight %}

## Extending a class

하위 클래스를 생성하기 위해 `extends`를 사용하고 상위 클래스를 참조하기 위해 `super`를 사용한다.

{% highlight dart %}
class Television {
  void turnOn() {
    _illuminateDisplay();
    _activateIrSensor();
  }
  // ···
}

class SmartTelevision extends Television {
  void turnOn() {
    super.turnOn();
    _bootNetworkInterface();
    _initializeMemory();
    _upgradeApps();
  }
  // ···
}
{% endhighlight %}

### Overriding members
하위 클래스는 인스턴스 메소드(operator 포함), getter, setter를 override할 수 있다. `@override` 표기를 사용해서 override하고 있음을 의도적으로 보여줄 수 있다.

{% highlight dart %}
class SmartTelevision extends Television {
  @override
  void turnOn() {...}
  // ···
}
{% endhighlight %}

> `Warning`: `==`를 override하면 Object의 `hashCode` getter도 함께 override해야한다.

### noSuchMethod()
존재하지 않는 메소드나 인스턴스 변수를 사용하려고 할 때마다 이를 감지하기 위해 `noSuchMethod()`를 override할 수 있다.

{% highlight dart %}
class A {
  // noSuchMethod를 override하지 않고 존재하지 않는 맴버를 사용하면 NoSuchMethodError가 발생한다.
  @override
  void noSuchMethod(Invocation invocation) {
    print('You tried to use a non-existent member: ' +
        '${invocation.memberName}');
  }
}
{% endhighlight %}

아래 중 하나라도 만족하지 않으면 구현되지 않은 메소드를 호출할 수 없다.

* 수신자는 static type인 `dynamic`을 가진다.
* 수신자는 구현되지 않은 메소드(추상 메소드도 괜찮다.)를 정의하는 static 타입을 가지며 수신자의 dynamic 타입은 `Object` 클래스에서와 다른 `noSuchMethod()`의 구현을 가진다.

## Extension methods
extension method를 통해 라이브러리에 새로운 기능을 추가할 수 있다. 본인도 모르게 extension method를 사용하고 있을 수도 있다.

아래는 `string_apis.dart`에 정의된 `parseInt()`라는 `String`의 extension method를 사용하는 예시이다.

{% highlight dart %}
import 'string_apis.dart';
...
print('42'.padLeft(5)); // String 메소드를 사용한다.
print('42'.parseInt()); // extension method를 사용한다.
{% endhighlight %}

## Enumerated types
enumeration이나 enum로 불리는 enumerated type은 정해진 수의 상수 값을 나타내기 위해 사용되는 특별한 종류의 클래스이다.

### Using enums
`enum` 키워드를 사용해서 enumerated type를 선언한다.

{% highlight dart %}
enum Color { red, green, blue }
{% endhighlight %}

enumerated type을 선언할 때 마지막 아이템 뒤에 쉼표(`,`)를 사용할 수 있다.

enum 안에 있는 각 값은 `index` getter를 가진다. index는 0부터 시작한다. 예를 들어 첫번째 값은 index 0을 가지고 두번째 값은 index 1을 가진다.

{% highlight dart %}
assert(Color.red.index == 0);
assert(Color.green.index == 1);
assert(Color.blue.index == 2);
{% endhighlight %}

enum에 있는 모든 값을 가져오려면 enum의 `value` 상수를 사용한다.

{% highlight dart %}
List\<Color> colors = Color.values;
assert(colors[2] == Color.blue);
{% endhighlight %}

enum은 switch statement에서도 사용가능하다. 하지만 enum의 모든 값을 사용하지 않으면 경고가 뜰 것이다.

{% highlight dart %}
var aColor = Color.blue;

switch (aColor) {
  case Color.red:
    print('Red as roses!');
    break;
  case Color.green:
    print('Green as grass!');
    break;
  default: // 이 부분을 빼면 경고가 뜬다.
    print(aColor); // 'Color.blue'
}
{% endhighlight %}

enumerated type은 아래와 같은 한계가 있다.

* enum을 subclass,mix in, implement할 수 없다.
* 명시적으로 인스턴스화할 수 없다.

## Adding features to a class: mixins
mixin은 여러 클래스 계층에서 클래스의 코드를 재사용하는 방법이다.

mixin을 사용하기 위해서 `with` 키워드를 사용한다. 아래의 예시는 mixin을 사용하는 두개의 클래스를 보여준다.

{% highlight dart %}
class Musician extends Performer with Musical {
  // ···
}

class Maestro extends Person
    with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}
{% endhighlight %}

mixin을 구현하기 위해서는 Object를 extend하고 생성자를 선언하지 않는 클래스를 생성해야한다. mixin 클래스를 일반 클래스처럼 사용하려면 `class` 대신에 `mixin` 키워드를 사용하면 된다.

{% highlight dart %}
mixin Musical {
  bool canPlayPiano = false;
  bool canCompose = false;
  bool canConduct = false;

  void entertainMe() {
    if (canPlayPiano) {
      print('Playing piano');
    } else if (canConduct) {
      print('Waving hands');
    } else {
      print('Humming to self');
    }
  }
}
{% endhighlight %}

mixin을 사용할 수 있는 타입을 제한하고 싶을 때가 있을 수 있다. 예를 들어, mixin은 mixin이 정의하지 않는 메소드를 호출할 수 있는지에 달렸다. 아래의 예시에서 알 수 있듯이, 필요한 상위 클래스를 지정하기 위한 `on` 키워드를 사용해서 mixin의 사용을 제한할 수 있다.

{% highlight dart %}
class Musician {
  // ...
}
mixin MusicalPerformer on Musician {
  // ...
}
class SingerDancer extends Musician with MusicalPerformer {
  // ...
}
{% endhighlight %}

위의 코드에서 `Musician`를 extend하거나 implement하는 클래스만 mixin `MusicalPerformer`를 사용할 수 있다. `SingerDancer`가 `Musician`를 extend 하기 때문에 `SingerDancer`는 `MusicalPerformer`를 mixin할 수 있다.

## Class variables and methods
클래스 범위 내의 변수와 메소드를 구현하기 위해  `static` 키워드를 사용한다.

### Static variables
정적 변수(클래스 변수)는 클래스 범위 내의 상태(state)와 상수에 유용하다.

{% highlight dart %}
class Queue {
  static const initialCapacity = 16;
  // ···
}

void main() {
  assert(Queue.initialCapacity == 16);
}
{% endhighlight %}

정적 변수는 사용되기 전까지는 이니셜라이즈 되지 않는다.

> **Note**:이 문서는 상수 이름을 쓸 때 `lowerCamelCase`를 사용했다.

### Static methods
정적 메소드(클래스 메소드)는 인스턴스에서 작동하지 않으므로 `this`에 접근할 수 없다. 하지만 정적 변수에는 접근할 수 있다. 아래의 예시를 통해 알 수 있듯이 정적 메소드는 직접 클래스를 통해 호출한다.

{% highlight dart %}
import 'dart:math';

class Point {
  double x, y;
  Point(this.x, this.y);

  static double distanceBetween(Point a, Point b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
  }
}

void main() {
  var a = Point(2, 2);
  var b = Point(4, 4);
  var distance = Point.distanceBetween(a, b);
  assert(2.8 < distance && distance < 2.9);
  print(distance);
}
{% endhighlight %}

> **Note**: 많이 사용되는 기능에는 정적 메소드보단 최상위 함수를 사용하는 것을 고려해라.

정적 메소드를 컴파일 타임 상수처럼 사용할 수 있다. 예를 들어 상수 생성자에 마라미터로 정적 메소드를 보낼 수 있다.
