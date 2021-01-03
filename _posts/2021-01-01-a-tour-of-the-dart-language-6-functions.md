---
title: A tour of the Dart language [6. Functions]
categories:
- Flutter
- Dart
tags:
- Mobile
---

# Functions

Dart는 객체지향(object-oriented) 언어이기 때문에 함수(function)들도 오브젝트(object)이며 타입을 가진다.  이것은 함수가 변수(variable)에 할당되거나 다른 함수에 argument로 보내질 수 있다는 것을 의미한다. Dart 클래스의 인스턴스를 함수처럼 부를 수도 있다.

아래는 함수를 구현한 예시이다.

{% highlight dart %}
bool isNoble(int atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
{% endhighlight %}

Effective Dart는 public API에 대해서 type annotation을 권장하지만, 함수에 타입을 적지 않아도 문제 없다.

{% highlight dart %}
isNoble(atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
{% endhighlight %}

하나의 expression만 포함하고 있는 함수는  짧은 구문(shorthand syntax)을 통해 간편히 쓸 수 있다.

{% highlight dart %}
bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
{% endhighlight %}

`=> expr` 구문은 `{ return expr; }` 를 줄인 것이다. `=>` 표기(notation)은 화살표 구문이라고도 말한다.

> **Note**: 화살표(=>)와 세미콜론(semicolon) 사이에는 expression만 들어갈 수 있다. statement는 넣을 수 없다. 예를 들어 if statement는 넣을 수 없지만 conditional expression는 사용할 수 있다.

## Parameters
함수는 required positional parameter를 몇 개던 가질 수 있다. 그 뒤에는 named parameter나 optional positional parameter를 넣을 수 있다. 하지만 named parameter와 optional positional parameter 둘 다를 넣을 수는 없다.

> **Note**: 일부 API(특히 Flutter 위젯 constructor)는 필수 parameter에 대해서도 named parameter만 사용한다. 자세한 내용은 다음 섹션에서 다룬다.

함수로 argument를 보낼 때나 함수 parameter를 정의할 때 **trailing comma**(마지막 아이템 뒤의 쉼표)를 사용할 수 있다.

### Named parameters
Named parameter는 필수라고 명시되지 않는 이상 기본적으로는 선택사항이다.

함수를 부를 때, `paramName: value`를 사용해서 named parameter를 지정할 수 있다. 아래는 예시이다.

{% highlight dart %}
enableFlags(bold: true, hidden: false);
{% endhighlight %}

함수를 정의할 때, `{param1, param2, …}`를 사용해서 named parameter를 지정한다.

{% highlight dart %}
/// [bold]와 [hidden]를 설정.
void enableFlags({bool bold, bool hidden}) {...}
{% endhighlight %}

비록 named parameter가 optional parameter의 종류이지만, @required로 표기해서 parameter가 필수라고 표시할 수 있다. 유저는 필수 parameter에 대해서 무조건 값을 제공해야한다. 아래는 예시이다.

{% highlight dart %}
const Scrollbar({Key key, @required Widget child})
{% endhighlight %}

만약 `child `argument를 지정하지 않고 `Scrollbar`를 만들려고 한다면 analyzer가 문제가 생겼다고 말해줄 것이다.

@required 표기를 사용하기 위해서는 meta package를 사용하면 된다.

### Optional positional parameters
`[]` 괄호로 감싼 함수의 parameter는 optional positional parameter가 된다.

{% highlight dart %}
String say(String from, String msg, [String device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
{% endhighlight %}

아래는 이 함수를 optional parameter 없이 부르는 예시이다.

{% highlight dart %}
assert(say('Bob', 'Howdy') == 'Bob says Howdy');
{% endhighlight %}

아래는 3번째 parameter와 함께 이 함수를 부르는 예시이다.

{% highlight dart %}
assert(say('Bob', 'Howdy', 'smoke signal') ==
    'Bob says Howdy with a smoke signal');
{% endhighlight %}

### Default parameter values
named parameter와 positional 변수에 디폴트(default) 값을 정의하기 위해 =를 사용할 수 있다. 디폴트 값은 컴파일 타임 constant여야만 한다. 만약 디폴트 값이 따로 제공되지 않는다면 디폴트 값은 자동으로 `null`이 된다.

아래는 named parameter의 디폴트 값을 설정하는 예시이다.

{% highlight dart %}
/// [bold]와 [hidden]를 설정.
void enableFlags({bool bold = false, bool hidden = false}) {...}

// bold는 true, hidden은 false가 될 것이다.
enableFlags(bold: true);
{% endhighlight %}

> **Deprecation note**: 옛날 코드는 named parameter에 디폴트 값을 설정하기 위해  `=` 대신에 `:`를 사용했을 수 있다. 그 이유는 원래 named parameter를 위해 `:`만 지원되었기 때문이다. 이는 더 이상 지원되지 않을 수 있으므로 `=`를 사용해서 디폴트 값을 지정하는 것을 추천한다.

아래의 예시는 positional parameter에 디폴트 값을 세팅하는 방법을 보여준다.

{% highlight dart %}
String say(String from, String msg,
    [String device = 'carrier pigeon']) {
  var result = '$from says $msg with a $device';
  return result;
}

assert(say('Bob', 'Howdy') ==
    'Bob says Howdy with a carrier pigeon');
{% endhighlight %}

디폴트 값으로 list나 map을 보낼 수도 있다. 아래의 예시에서 `doStuff()`를 정의하는데, 이 함수는 list parameter에 디폴트 `list`, `gifts` parameter에 디폴트 map을 지정한다.

{% highlight dart %}
void doStuff(
    {List<int> list = const [1, 2, 3],
    Map<String, String> gifts = const {
      'first': 'paper',
      'second': 'cotton',
      'third': 'leather'
    }}) {
  print('list:  $list');
  print('gifts: $gifts');
}
{% endhighlight %}

## The main() function
모든 앱은 최상위 단계의 `main()` 함수를 가지고 있다. main() 함수는 앱의 시작점 역할을 한다. 또한 `main()` 함수는 void를 return하고 argument에 대한 optional `List<String>` parameter를 가진다.

아래는 웹 앱을 위한 `main()` 함수의 예시이다.

{% highlight dart %}
void main() {
  querySelector('#sample_text_id')
    ..text = 'Click me!'
    ..onClick.listen(reverseText);
}
{% endhighlight %}

> **Note**: 위의 코드에서 `..` 구문은 cascade로 불린다.  cascade를 통해 한 오브젝트의 맴버에 대해 여러 operation을 실행할 수 있다.

아래는 argument를 사용하는 command-line 앱의 `main()` 함수 예시이다.

{% highlight dart %}
// 앱을 이렇게 실행한다:  dart args.dart 1 test
void main(List<String> arguments) {
  print(arguments);

  assert(arguments.length == 2);
  assert(int.parse(arguments[0]) == 1);
  assert(arguments[1] == 'test');
}
{% endhighlight %}

command-line argument를 정의하고 parse하기 위해 args library를 사용할 수 있다.

## Functions as first-class objects
아래와 같이 함수를 다른 함수의 parameter로 넘길 수 있다.

{% highlight dart %}
void printElement(int element) {
  print(element);
}

var list = [1, 2, 3];

// printElement를 parameter로 넘긴다.
list.forEach(printElement);
{% endhighlight %}

또한 아래와 같이 함수를 변수로 넘길 수 있다.

{% highlight dart %}
var loudify = (msg) => '!!! ${msg.toUpperCase()} !!!';
assert(loudify('hello') == '!!! HELLO !!!');
{% endhighlight %}

위의 예시는 anonymous 함수를 사용한다. 이에 대한 내용은 바로 다음 섹션에서 자세히 나와있다.

## Anonymous functions
대부분의 함수들은 `main()`이나 `printElement()`처럼 이름이 있다. 하지만 이름이 없는 anonymous 함수도 만들 수 있다. anonymous 함수는 lambda나 closure라고 불리기도 한다. anonymous 함수도 변수에 할당할 수 있다. 예를 들어 anonymous 함수를 collection에 더하거나 뺄 수도 있다.

anonymous 함수은 괄호 안에서 쉼표와 optional 타입 표기로 구분되는 0개 이상의 parameter를 가진다는 것에서 named 함수와 비슷하다.

아래의 코드 블록은 함수의 body를 포함한다.

```
([[Type] param1[, …]]) {
  codeBlock;
};
```

아래의 예시는 타입이 적혀있지 않은 parameter인 `item`을 가지는 anonymous 함수를 정의한다. 해당 함수는 목록의 각 item 마다 불리며 그때마다 인덱스(index)에 해당하는 값을 포함하는 문자열(string)을 출력한다.

{% highlight dart %}
var list = ['apples', 'bananas', 'oranges'];
list.forEach((item) {
  print('${list.indexOf(item)}: $item');
});
{% endhighlight %}

위의 코드를 실행하게 되면 아래와 같은 결과가 나온다.

{% highlight console %}
0: apples
1: bananas
2: oranges
{% endhighlight %}

만약 함수가 단 하나의 statement만 포함하고 있다면 화살표 표기를 사용해서 줄일 수 있다.

{% highlight dart %}
var list = ['apples', 'bananas', 'oranges'];
list.forEach(
    (item) => print('${list.indexOf(item)}: $item'));
{% endhighlight %}

## Lexical scope
Dart는 lexically scoped 언어로서, 변수의 범위가 코드의 레이아웃에 의해 단순하고 정적으로 결정된다. {} 괄호를 따라 보면 변수의 범위를 쉽게 알 수 있다.

아래는 각 {} 괄호 범위마다 변수가 있는 nested 함수의 예시이다.

{% highlight dart %}
bool topLevel = true;

void main() {
  var insideMain = true;

  void myFunction() {
    var insideFunction = true;

    void nestedFunction() {
      var insideNestedFunction = true;

      assert(topLevel);
      assert(insideMain);
      assert(insideFunction);
      assert(insideNestedFunction);
    }
  }
}
{% endhighlight %}

`nestedFunction()`가 각 레벨에서부터 최상위 레벨에서까지 변수를 어떻게 사용할 수 있는지를 주의하자.

## Lexical closures
closure는 함수가 본래의 범위 밖에서 사용되더라도 함수의 lexical 범위 안에 있는 변수에 접근할 수 있는 함수 오브젝트이다.

함수는 아래의 예에서 `makeAdder()`는 `addBy` 변수를 가지고 있다. 리턴된 함수는 어디에 있던 `addBy`를 기억한다.

{% highlight dart %}
/// 함수의 argument에 [addBy]를 더하는 함수를 리턴한다.
Function makeAdder(int addBy) {
  return (int i) => addBy + i;
}

void main() {
  // 2를 더하는 함수를 생성.
  var add2 = makeAdder(2);

  // 4를 더하는 함수를 생성.
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);
}
{% endhighlight %}

## Testing functions for equality
아래는 equality에 대한 최상위 레벨 함수, 정적 메소드, 인스턴스 메소드의 예시이다.

{% highlight dart %}
void foo() {} // 최상위 레벨 함수.

class A {
  static void bar() {} // 정적 메소드.
  void baz() {} // 인스턴스 메소드.
}

void main() {
  var x;

  // 최상위 레벨 함수를 비교한다.
  x = foo;
  assert(foo == x);

  // 정적 메소드를 비교한다.
  x = A.bar;
  assert(A.bar == x);

  // 인스턴스 메소드를 비교한다.
  var v = A(); // A의 인스턴스 #1
  var w = A(); // A의 인스턴스 #2
  var y = w;
  x = w.baz;

  // 이 closure들은 같은 인스턴스(#2)를 참조하기 때문에 같다.
  assert(y.baz == x);

  // 이 closuer들은 다른 인스턴스를 탐조하기 때문에 다르다.
  assert(v.baz != w.baz);
}
{% endhighlight %}

## Return values
모든 함수는 값을 리턴한다. 만약 리턴 값이 적혀있지 않다면 `return null ;` statement가 자동적으로 들어간다고 보면 된다.

{% highlight dart %}
foo() {}

assert(foo() == null);
{% endhighlight %}
