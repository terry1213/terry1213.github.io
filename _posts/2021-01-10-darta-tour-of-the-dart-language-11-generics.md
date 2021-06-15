---
title: "[Dart] A tour of the Dart language - 11. Generics"
categories:
- Dart
tags:
- Document
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)

# Generics
기본 배열 타입인 리스트의 API 문서를 보면 리스트가 실제로는 `List<E>` 타입이라는 것을 알 수 있다. <...> 표기법을 통해 리스트를 generic 타입으로 표시한 것이다. 대부분의 타입 변수는 E, T, S, K, V 같은 한 글자 이름을 갖는다.

## Why use generics?
generic은 종종 타입 안정성(type safety)를 위해 필요하지만 그 이상의 이점이 있다.

* generic 타입을 알맞게 지정하여 더 좋은 코드를 만들 수 있다.
* generic을 제대로 사용해서 코드 중복을 줄일 수 있다.

만약 문자열만 담는 리스트를 만들고 싶으면 `List<String>`로 선언하면 된다. 이렇게 하면 해당 리스트에 문자열이 아닌 것을 할당하지 말아야한다는 걸 누구나 알 수 있다.

``` dart
var names = List<String>();
names.addAll(['Seth', 'Kathy', 'Lars']);
names.add(42); // 에러
``` 

generic을 사용하는 다른 이유는 코드 중복을 줄이기 위함이다. generic은 많은 타입들 간 하나의 인터페이스와 구현을 공유할 수 있게 한다. 예를 들어 오브젝트를 캐싱하는 인터페이스를 만들었다고 생각해보자.

``` dart
abstract class ObjectCache {
  Object getByKey(String key);
  void setByKey(String key, Object value);
}
```

문자열을 위한 버젼이 필요한 경우 인터페이스를 새로 만들어야 한다.

``` dart
abstract class StringCache {
  String getByKey(String key);
  void setByKey(String key, String value);
}
```

만약 숫자를 위한 버젼도 필요하다면 또 새로 만들어야 한다.

generic 타입은 이런 문제를 해결해준다. 단 하나의 인터페이스로 말이다.

``` dart
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}
```

위의 코드에는 T가 대역(stand-in) 타입이다. 나중에 개발자가 원하는대로 정의할 수 있는 타입으로 생각하면 된다.

## Using collection literals
list, set, map literal은 파라미터화될 수 있다. 파라미터화된 literal은 여는 괄호 앞에 `<type>`(list와 set에 사용)나 `<keyType, valueType>`(map에 사용)가 붙는다는 점만 빼면 이전에 봤던 literal들과 동일하다. 아래는 typed literal을 사용하는 예시이다.

``` dart
var names = <String>['Seth', 'Kathy', 'Lars'];
var uniqueNames = <String>{'Seth', 'Kathy', 'Lars'};
var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
};
```

## Using parameterized types with constructors
생성자를 사용할 때 타입을 정하기 위해서 클래스 이름 바로 뒤에 해당 타입(`<...>`)을 적어라.

``` dart
var nameSet = Set<String>.from(names);
```

아래의 코드는 integer 키와 View 타입 값을 갖는 map을 만든다.

``` dart
var views = Map<int, View>();
```

## Generic collections and the types they contain
Dart의 generic 타입은 런타임 동안 타입 정보를 가지고 있는다. 그렇기 때문에 아래와 같이 collection의 타입을 테스트할 수 있다.

``` dart
var names = List<String>();
names.addAll(['Seth', 'Kathy', 'Lars']);
print(names is List<String>); // true
```

> **Note**: Java의 generic 타입은 런타임에 타입 정보가 지워진다. 따라서 Java에서는 오브젝트가 List인지는 테스트할 수 있지만 `List<String>`인지는 테스트할 수 없다.

## Restricting the parameterized type
generic 타입을 구현할 때 `extends`를 사용해서 파라미터 타입에 제한을 둘 수 있다.

``` dart
class Foo<T extends SomeBaseClass> {
  // Implementation goes here...
  String toString() => "Instance of 'Foo<$T>'";
}

class Extender extends SomeBaseClass {...}
```

generic argument로 `SomeBaseClass`이나 `SomeBaseClass`의 하위 클래스를 사용하는 것은 가능하다.

``` dart
var someBaseClassFoo = Foo<SomeBaseClass>();
var extenderFoo = Foo<Extender>();
```

generic argument를 적지 않는 것도 가능하다.

``` dart
var foo = Foo();
print(foo); // 'Foo<SomeBaseClass>'의 인스턴스
```

하지만 `SomeBaseClass`가 아닌 타입을 적으면 에러가 발생한다.

``` dart
var foo = Foo<Object>();
```

## Using generic methods
처음에는 Dart의 generic 지원이 클래스로 한정되어 있었다. 하지만 나중에, 메소드와 함수에 대한 지원도 추가되었다.

``` dart
T first<T>(List<T> ts) {
  // 초기 작업이나 에러 검사...
  T tmp = ts[0];
  // 추가 검사나 처리...
  return tmp;
}
```

`first`의 generic 타입 파라미터(`<T>`)는 타입 argument `T`를 아래와 같은 장소에서 사용할 수 있게 해준다.

* 함수의 리턴 타입 (`T`)
* arguemt의 타입 (`List<T>`)
* 지역 변수의 타입 (`T tmp`)
