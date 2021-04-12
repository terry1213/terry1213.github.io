---
title: "[Dart] A tour of the Dart language - 4. Variables"
categories:
- Dart
tags:
- Mobile
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)
# Variables
아래는 variable을 생성하고 initialize 하는 예시이다.

{% highlight dart %}
var name = 'Bob';
{% endhighlight %}

variable은 레퍼런스(reference)를 저장한다. 위에서 `name`이라는 variable은 “Bob”이라는 값의 `String` 오브젝트(object)의 레퍼런스를 담는다.

위에서 name 변수의 타입(type)은 `String`으로 볼 수 있지만 타입을 지정해서 변경할 수 있다. 만약 오브젝트를 한 타입으로 제한하고 싶지 않으면 `Object`나 `dynamic` 타입을 사용해라.

{% highlight dart %}
dynamic name = 'Bob';
{% endhighlight %}

다른 선택지는 부여할 타입을 명시적으로 선언하는 것이다.

{% highlight dart %}
String name = 'Bob';
{% endhighlight %}

> **Note**: 스타일 가이드 추천에 의하면 local variable에 경우  타입을 명시하는 것 보다 `var`를 사용하는 것이 좋다.

## Default value
initialize 하지 않은 variable는 `null` 값을 가진다. numeric 타입의 variable도 마찬가지다. 숫자도 다른 것들처럼 오브젝트이기 때문이다.

{% highlight dart %}
int lineCount;
assert(lineCount == null);
{% endhighlight %}

> **Note**: `assert(condition) `구문은 괄호 안에 있는 `condition`이 `false`일 때 exception을 던진다. 이는 개발 단계에서만 작동하고 출시된 앱에선 무시된다.

## Final and const
만약 variable의 값을 변경할 일이 없다면  다른 타입들 앞이나 `var` 대신해서 `final` 이나 `const`를 넣어라. final variable은 한번만 값이 설정(런타임에서도 가능)될 수 있고 const variable은 컴파일 타임(compile-time)에서만 상수(constant)를 정의할 수 있다.

> **Note**: 인스턴스 variable은 `final`이 될 수 있지만 `const`가 될 수 없다. final 인스턴스 variable은 constructor body가 시작하기 전(변수 선언 시)에 constructor parameter에 의해서나 constructor의 initializer 리스트에서 initialize되어야 한다.

아래는 `final` variable의 생성과 설정 예시이다.

{% highlight dart %}
final name = 'Bob'; // type annotation 없이
final String nickname = 'Bobby';
{% endhighlight %}

`final` variable의 값을 변경할 수 없다.

{% highlight dart %}
name = 'Alice'; // Error: final variable은 한번만 설정할 수 있다.
{% endhighlight %}

**컴파일 타임 상수**로 사용하기 위한 변수가 있다면 `const`를 사용해야한다. 만약 `const` variable이 클래스(class) 단계에 있다면 `static const`로 표시해야한다. 해당 variable을 선언할 때, 숫자 literal, 문자열 literal, const variable, 혹은 상수 숫자의  산술식의 결과 같은 컴파일 타임 상수로 값을 설정해야 한다.

{% highlight dart %}
const bar = 1000000; // 압력의 단위 (dynes/cm2)
const double atm = 1.01325 * bar; // 표준 대기
{% endhighlight %}

`const` 키워드는 단지 variable을 선언하는 것에만 사용되는 것은 아니다. 상수 값을 생성할 때, 상수 값을 생성하는 constructor을 선언하기 위해 사용할 수도 있다. 아무 variable이던 상수 값을 가질 수 있다.

{% highlight dart %}
var foo = const [];
final bar = const [];
const baz = []; // const [] 와 동일하다.
{% endhighlight %}

위의 예시의 `baz`처럼, `const` 선언의 initializing expression에서 `const`를 생략할 수 있다.

`const` 값을 가졌었어도 변수 자체가 `const`가 아니라면, non-final 하고 non-const한 값으로 변경할 수 있다.

{% highlight dart %}
foo = [1, 2, 3]; // const 값인 []를 가지고 있었다. 
{% endhighlight %}

하지만 `const` variable의 값은 변경할 수 없다.

{% highlight dart %}
baz = [42]; // Error: const variable에는 값을 할당할 수 없습니다.
{% endhighlight %}

Dart 2.5부터 타입 검사(`is`), 타입 캐스트(`as`), collection if,  spread operator (`...`랑 .`..?`)를 사용하는 상수를 선언할 수 있다.

{% highlight dart %}
// Dart 2.5부터 가능한 컴파일 타임 상수.
const Object i = 3; // i는 int 값을 가지는 const 오브젝트.
const list = [i as int]; // 타입 캐스트 사용.
const map = {if (i is int) i: "int"}; // is와 collection if 사용.
const set = {if (list is List<int>) ...list}; // spread operator 사용.
{% endhighlight %}

> **Note**: `final` 오브젝트는 수정될 수 없지만, 그것의 field는 변경될 수 있다. 하지만 `const` 오브젝트와 그것의 field는 변경될 수 없다.
