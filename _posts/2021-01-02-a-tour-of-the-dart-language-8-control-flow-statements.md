---
title: "[Dart] A tour of the Dart language - 8. Control flow statements"
categories:
- Dart
tags:
- Mobile
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)
# Control flow statements
아래의 것들을 사용해서 Dart 코드의 흐름을 제어할 수 있다.

* `if` and `else`
* `for` loops
* `while` and `do-while` loops
* `break` and `continue`
* `switch` and `case`
* `assert`

또한 `try-catch`와 `throw`를 사용해서 제어 흐름에 영향을 줄 수 있다.

## If and else
Dart는 선택사항인 `else` statement와 함께 `if` statement를 지원한다. 다음은 이에 대한 예시이다.

{% highlight dart %}
if (isRaining()) {
  you.bringRainCoat();
} else if (isSnowing()) {
  you.wearJacket();
} else {
  car.putTopDown();
}
{% endhighlight %}

자바스크립트와 다르게 조건(condition)은 무조건 boolean 값만을 사용해야한다.

## For loops

표준 `for` loop를 통해 반복을 구현할 수 있다.

{% highlight dart %}
var message = StringBuffer('Dart is fun');
for (var i = 0; i < 5; i++) {
  message.write('!');
}
{% endhighlight %}

Dart의 `for` loop 안에 있는 closure는 인덱스(index) 값을 그 안에 붙잡고 있다.  이는 자바스크립트에서 찾을 수 있는 허점을 가지고 있지 않는 것이다.

{% highlight dart %}
var callbacks = [];
for (var i = 0; i < 2; i++) {
  callbacks.add(() => print(i));
}
callbacks.forEach((c) => c());
{% endhighlight %}

위의 예시는 `0`을 출력하고 그 다음 `1`을 출력한다. 이와 다르게 자바스크립트에선 `2`를 출력하고 그 다음 또 `2`를 출력한다.

만약 반복하고 있는 오브젝트가 Iterable이면 forEach() 메소드를 사용할 수 있다. 만약 반복 도중에 현재 인덱스를 알 필요가 없다면 `forEach()`를 사용하는 것이 좋다.

{% highlight dart %}
candidates.forEach((candidate) => candidate.interview());
{% endhighlight %}

List와 Set 같은 Iterable 클래스는 `for-in` 형식도 제공한다.

{% highlight dart %}
var collection = [1, 2, 3];
for (var x in collection) {
  print(x); // 1 2 3
}
{% endhighlight %}

## While and do-while
`while` loop는 loop 이전에 조건을 확인한다.

{% highlight dart %}
while (!isDone()) {
  doSomething();
}
{% endhighlight %}

`do-while` loop는 loop 이후에 조건을 확인한다.

{% highlight dart %}
do {
  printLine();
} while (!atEndOfPage());
{% endhighlight %}

## Break and continue
loop를 멈추기 위해서는 `break`를 사용한다.

{% highlight dart %}
while (true) {
  if (shutDownRequested()) break;
  processIncomingRequests();
}
{% endhighlight %}

현재 반복을 스킵하고 다음 반복으로 넘어가고 싶을 때는 `continue`를 사용한다.

{% highlight dart %}
for (int i = 0; i < candidates.length; i++) {
  var candidate = candidates[i];
  if (candidate.yearsExperience < 5) {
    continue;
  }
  candidate.interview();
}
{% endhighlight %}

list나 set 같이 Iterable를 사용할 때는 위의 예를 다른 방식으로도 구현할 수 있다.

{% highlight dart %}
candidates
    .where((c) => c.yearsExperience >= 5)
    .forEach((c) => c.interview());
{% endhighlight %}

## Switch and case
Dart에서 switch statement는 `==`를 사용해서 integer, string, 컴파일 타임 constant를 비교한다. 비교된 오브젝트 전부는 무조건 같은 클래스의 인스턴스여야 한다. 서브 타입도 불가능하다. 또한 클래스가 `==`를 override하지 않아야 한다. Enumerated type들은 `switch` statement에서 잘 돌아간다.

> **Note**: Dart에서의 switch statement는 interpreter나 scanner 같이 제한적인 상황을 위한 것이다.

비어있지 않은 `case` 절은 보통 `break` statement로 끝난다. 다른 방법으로는 `continue`, `throw`, `return` statement가 있다.

맞는 `case` 절이 없는 경우를 위해 `default`절을 사용해라.

{% highlight dart %}
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    executeClosed();
    break;
  case 'PENDING':
    executePending();
    break;
  case 'APPROVED':
    executeApproved();
    break;
  case 'DENIED':
    executeDenied();
    break;
  case 'OPEN':
    executeOpen();
    break;
  default:
    executeUnknown();
}
{% endhighlight %}

아래의 예시는 `case` 절에 `break` statement를 사용하지 않아서 에러를 일으킨다.

{% highlight dart %}
var command = 'OPEN';
switch (command) {
  case 'OPEN':
    executeOpen();
    // ERROR: Missing break

  case 'CLOSED':
    executeClosed();
    break;
}
{% endhighlight %}

하지만 Dart는 빈 `case` 절을 지원한다. 이는 fall-through 형태를 허용한다.

{% highlight dart %}
var command = 'CLOSED';
switch (command) {
  case 'CLOSED': // 빈 case =  falls-through 형태.
  case 'NOW_CLOSED':
    // CLOSED와 NOW_CLOSED 두 경우에 대해서 실행된다.
    executeNowClosed();
    break;
}
{% endhighlight %}

fall-through 꼭 사용하고 싶다면 `continue` statement와 라벨을 사용하면 된다.

{% highlight dart %}
var command = 'CLOSED';
switch (command) {
  case 'CLOSED':
    executeClosed();
    continue nowClosed;
  // nowClosed 라벨에서 계속 실행된다.

  nowClosed:
  case 'NOW_CLOSED':
    // CLOSED와 NOW_CLOSED 두 경우에 대해서 실행된다.
    executeNowClosed();
    break;
}
{% endhighlight %}

`case` 절은 local 변수를 가지고 있을 수 있다. 이 변수는 해당 절에서만 보인다.

## Assert
개발을 하는 중에 boolean 조건이 false면 excution을 일으키기 위해서 assert statement를 사용해라. assert statement는 `assert(condition, optionalMessage);`이다.  아래는 이에 대한 예시이다.

{% highlight dart %}
// 변수가 null 값을 가지고 있지 않아야한다.
assert(text != null);

// 값이 100보다 작아야한다.
assert(number < 100);

// https URL이어야한다.
assert(urlString.startsWith('https'));
{% endhighlight %}

assertion에 메시지를 넣으려면 `assert`에 두번째 argument로 추가한다.

{% highlight dart %}
assert(urlString.startsWith('https'),
    'URL ($urlString) should start with "https".');
{% endhighlight %}

첫번재 argument는 boolean 값을 가지는 아무 expresiion이나 올 수 있다. 만약 expression 값이 true라면 assertion은 성공하고 코드 실행은 계속된다. 만약 false라면 assertion은 실패하고 exception이 던져진다.

언제 정확히 assertion이 작동할까? 이는 어떤 툴과 프레임워크를 사용하는지에 따라 다르다.

* Flutter는 debug 모드에서 assertion이 사용된다.
* dartdevc 같은 개발 전용 툴은 일반적으로 assertion를 디폴트로 사용한다.
* dart와 dart2js 같은 툴은 command-line flag를 통해 assertion을 지원한다. `--enable-asserts`

실제 배포되는 앱에선 assertion은 무시된다.
