---
title: A tour of the Dart language [2. Important concepts]
categories:
- Flutter
- Dart
tags:
- Mobile
---

[목차로 돌아가기](/flutter/dart/a-tour-of-the-dart-language/)
# Important concepts
Dart 언어를 배울 때 아래의 항목들을 명심해야한다.

* 변수(variable)에 넣을 수 있는 모든 것은 오브젝트(object)이다. 그리고 모든 오브젝트는 클래스(class)의 인스턴스(instance)이다. 숫자, 함수, 널(null) 마저 오브젝트이다. 모든 오브젝트는 `Object` 클래스를 상속한다.
* Type annotation은 옵션이다. 만약 특정 타입으로 정하지 않을 때는 dynamic이라는 특별한 타입을 사용한다.
* 다트는 generic 타입도 지원한다. `List<int>` (integer 타입의 리스트)이나 `List<dynamic>`(아무 타입의 리스트).
* 다트는 `main()` 같은 최상위 함수(top-level function)를 제공한다. 클래스나 오브젝트와 묶여있는 함수(Static and instance method)도 제공한다. 함수 안에 함수가 있는 nested, local 함수도 만들 수 있다.
* 비슷하게 최상위 변수(top-level variable), 클래스나 오브젝트와 묶여있는 변수(Static and instance variable)도 제공한다. 인스턴스 변수(Instance variable)는 field 나 property로도 알려져 있다.
* 자바와 다르게 `public`, `protected`, `private` 이란 키워드를 사용하지 않는다. identifier 앞에 \_를 붙여서  private를 표현한다.
* Identifier는 글자나 \_로 시작하고 이후에 글자, \_, 숫자의 조합으로 이어진다.
* 다트에는 런타임 값이 있는 expression과 런타임 값이 없는 statement가 있다. conditional expression인  `condition ? expr1 : expr2` 는 `expr1`이나 `expr2`라는 값을 가지게 되지만 if-else statement 는 값을 갖지 않는다.
* 다트는 두 종류의 문제를 알려줄 수 있다. warning과 error이다. warning은 코드가 아마 돌아가지 않을 것이라고 말해주지만 프로그램 실행을 막지는 않는다. error는 컴파일타임 에러이거나 런타임 에러일 수 있다. 컴파일타임 에러는 코드 실행 자체를 막고 런타임 에러는 코드가 실행될 때 exception이 생긴다.
