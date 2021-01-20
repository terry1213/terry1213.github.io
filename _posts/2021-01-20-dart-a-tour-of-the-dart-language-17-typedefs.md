---
title: "[Dart] A tour of the Dart language - 17. Typedefs"
categories:
- Dart
tags:
- Mobile
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)

# Typedefs

Dart에서, 문자열과 숫자가 오브젝트인 것처럼 함수도 오브젝트이다. typedef는 필드를 선언하거나 타입을 리턴할 때 사용하는 이름을 함수 타입에 제공한다. typedef를 통해서 함수 타입이 변수로 할당될 때 함수 타입 정보를 유지할 수 있다.

아래의 코드는 typedef를 사용하지 않는 예시이다.

``` dart
class SortedCollection {
  Function compare;

  SortedCollection(int f(Object a, Object b)) {
    compare = f;
  }
}

int sort(Object a, Object b) => 0;

void main() {
  SortedCollection coll = SortedCollection(sort);

  // compare가 함수라는 것은 알 수 있지만,
  // 과연 어떤 함수 타입인지도 알 수 있을까?
  assert(coll.compare is Function);
}
```

타입 정보는 `f`를 `compare`에 할당할 때 사라진다.  `f`의 타입은 `(Object, Object)` → `int` 이다 (여기서 →는 리턴을 의미한다. ) . 하지만 `compare`의 타입은 Funtcion이다. 여기서 만약 명시적 이름을 사용하고 타입 정보를 유지하도록 코드를 변경하면 개발자와 툴 모두 해당 정보를 사용할 수 있게 된다.

``` dart
typedef Compare = int Function(Object a, Object b);

class SortedCollection {
  Compare compare;

  SortedCollection(this.compare);
}

int sort(Object a, Object b) => 0;

void main() {
  SortedCollection coll = SortedCollection(sort);
  assert(coll.compare is Function);
  assert(coll.compare is Compare);
}
```

> **Note**: 현재 typedef는 함수 타입으로 제한되어 있다.

typedef는 단순히 별칭이기 때문에, 어떤 함수의 타입이던 전부 확인할 수 있다.

``` dart
typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True.
}
```
