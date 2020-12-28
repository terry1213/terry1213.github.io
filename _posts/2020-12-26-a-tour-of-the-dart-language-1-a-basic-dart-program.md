---
title: A tour of the Dart language [1. A basic Dart program]
categories:
- Flutter
- Dart
tags:
- Mobile
---

[목차로 돌아가기](/flutter/dart/a-tour-of-the-dart-language/)
# A basic Dart program

아래의 코드 예시는 Dart의 가장 기본적인 특징들을 많이 보여준다.

{% highlight Dart %}
// 함수를 정의한다.
void printInteger(int aNumber) {
  print('The number is $aNumber.'); // 콘솔에 출력한다.
}

// 여기서 앱이 실행되기 시작한다.
void main() {
  var number = 42; // 변수를 선언하고 초기화한다.
  printInteger(number); // 함수를 부른다.
}
{% endhighlight %}

**// 한 줄 주석.** <br>
**한 줄 주석**이다. 다트는 **여러 줄 주석**(**/* 여러 줄 주석. */**)과 **도큐먼트 주석**(**///  도큐먼트 주석.**)도 제공한다.

**void** <br>
아무 값도 리턴하지 않는 경우에 void를 리턴 타입으로 사용한다. 위의 예시에서 **printInteger()**와 **main()**가 여기에 속한다.

**int** <br>
**integer**를 의미하는 **built-in type** 이다. 다른 **built-in type**에는 **String**, **List**, **bool** 등이 있다.

**42** <br>
number literal 이다. Number literal은 compile-time constant이다.

**print()** <br>
출력해주는 간편한 방법.

**‘…’**(or **“…”**) <br>
String literal.

**$variableName** (or **${expression}**) <br>
String interpolation: String literal 안에 variable이나 expression의 string을 포함하는 것.

**main()** <br>
앱이 실행되기 시작하는 특별하고, 필수이고, 가장 최상위 함수이다.

**var** <br>
변수의 타입을 결정하지 않고 선언하는 방법.
