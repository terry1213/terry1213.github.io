---
title: "[Dart] A tour of the Dart language - 15. Callable classes"
categories:
- Dart
tags:
- Mobile
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)

# Callable classes
Dart에서 클래스의 인스턴스를 함수처럼 호출하기 위해, `call()` 메소드를 구현한다.

아래의 예시를 보면, `WannabeFunction` 클래스는 call() 함수를 정의한다. 해당 함수는 3개의 문자열을 받아서 연결한다. 이때 문자열은 공백으로 구분하고 마지막에 느낌표를 추가한다. 

``` dart
class WannabeFunction {
  String call(String a, String b, String c) => '$a $b $c!';
}

var wf = WannabeFunction();
var out = wf('Hi', 'there,', 'gang');

main() => print(out);
```

이를 실행하면 다음과 같은 결과를 볼 수 있다.

``` console
Hi there, gang!
```
