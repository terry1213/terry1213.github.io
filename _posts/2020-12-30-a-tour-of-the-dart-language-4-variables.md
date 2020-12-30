---
title: A tour of the Dart language [4. Variables]
categories:
- Flutter
- Dart
tags:
- Mobile
---

[목차로 돌아가기](/flutter/dart/a-tour-of-the-dart-language/)
# Variables
아래는 variable을 생성하고 initialize 하는 예시이다.

{% highlight dart %}
var name = 'Bob';
{% endhighlight %}

변수(variable)은 레퍼런스(reference)를 저장한다. 위에서 name이라는 변수는 “Bob”이라는 값의 String 오브젝트(object)의 레퍼런스를 담는다.

위에서 name 변수의 타입(type)은 String으로 볼 수 있지만 타입을 지정해서 변경할 수 있다. 만약 오브젝트를 한 타입으로 제한하고 싶지 않으면 Object나 dynamic 타입을 사용해라.

{% highlight dart %}
dynamic name = 'Bob';
{% endhighlight %}

다른 선택지는 부여할 타입을 명시적으로 선언하는 것이다.

{% highlight dart %}
String name = 'Bob';
{% endhighlight %}

## Default value
initialize 하지 않은 변수는 null 값을 가진다. numeric 타입의 변수도 마찬가지다. 숫자도 다른 것들처럼 오브젝트이기 때문이다.

{% highlight dart %}
int lineCount;
assert(lineCount == null);
{% endhighlight %}

Note: assert(condition) 구문은 괄호 안에 있는 condition이 false일 때 exception을 던진다. 이는 개발 단계에서만 작동하고 사용자들이 직접 사용하는 제품에선 무시된다.

## Final and const
만약 변수의 값을 변경할 일이 없다면  다른 타입들 앞이나 var 대신해서 final 이나 const를 넣어라. final 변수는 한번만 값을 설정할 수 있고 const 변수는 컴파일 타임(compile-time) constant이다. const 변수는 암시적으로 final이다.

아래는 final 변수의 생성과 설정 예시이다.

{% highlight dart %}
final name = 'Bob'; // type annotation 없이
final String nickname = 'Bobby';
{% endhighlight %}

final 변수의 값을 변경할 수 없다.

{% highlight dart %}
name = 'Alice'; // Error: final 변수는 한번만 설정할 수 있다.
{% endhighlight %}

컴파일 타임 constant로 사용하기 위한 변수가 있다면 const를 사용해라. 만약 const 변수가 클래스(class) 단계에 있다면 static const로 표시해라. Where you declare the variable, set the value to a compile-time constant such as a number or string literal, a const variable, or the result of an arithmetic operation on constant numbers:

{% highlight dart %}
const bar = 1000000; // 압력의 단위 (dynes/cm2)
const double atm = 1.01325 * bar; // 표준 대기
{% endhighlight %}

const 키워드는 단지 constant 변수를 선언하는 것에만 사용되는 것은 아니다. constant 값을 생성할 때 constant 값을 생성하는 constructor을 선언하기 위해 사용할 수도 있다. 아무 변수이던 constant 값을 가질 수 있다.

{% highlight dart %}
var foo = const [];
final bar = const [];
const baz = []; // const [] 와 동일하다.
{% endhighlight %}

const value를 가졌었어도 non-final 하고 non-const한 변수의 값으로 변경할 수 있다.

{% highlight dart %}
foo = [1, 2, 3]; // const [] 였었다.
{% endhighlight %}

하지만 const 변수의 값은 변경할 수 없다.

{% highlight dart %}
baz = [42]; // Error: constant 변수에는 값을 할당할 수 없습니다.
{% endhighlight %}
