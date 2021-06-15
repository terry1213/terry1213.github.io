---
title: "[Dart] A tour of the Dart language - 18. Metadata"
categories:
- Dart
tags:
- Document
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)

# Metadata

코드의 추가 정보를 부여하기 위해 metadata를 사용한다, matadata 표기는 `@`로 시작하고  컴파일 타임 상수(`deprecated` 등)에 대한 참조나 상수 생성자에 대한 호출이 뒤따라온다.

`@deprecated`와 `@override` 두 표기는 모든 Dart 코드에 사용할 수 있다. 아래는 `@deprecated` 표기를 사용하는 예시이다.

``` dart
class Television {
  /// _Deprecated: [activate] 대신에 [turnOn]를 사용해라._
  @deprecated
  void activate() {
    turnOn();
  }

  /// 티비 전원을 켠다.
  void turnOn() {...}
}
```

나만의 metadata 표기를 정의할 수도 있다. 아래는 두 개의 argument를 취하는 @todo 표기의 정의이다.

``` dart
library todo;

class Todo {
  final String who;
  final String what;

  const Todo(this.who, this.what);
}
```

아래는 @todo 표기를 사용하는 예시이다.

``` dart
import 'todo.dart';

@Todo('seth', 'make this do something')
void doSomething() {
  print('do something');
}
```

metadata는 라이브러리, 클래스, typedef, 타입 파라미터, 생성자, factory, 함수, 필드, 파라미터, 변수 정의 앞에 나올 수 있고 import, export 앞에 나올 수도 있다.
