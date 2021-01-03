---
title: A tour of the Dart language [9. Exceptions]
categories:
- Flutter
- Dart
tags:
- Mobile
---

# Exceptions
Dart에서 exception을 throw 하고 catch할 수 있다. exception은 개발자가 기대하지 않는 일이 일어났다는 것을 알려주는 에러이다. 만약에 exception이 잡히지 않으면 exception을 발생시킨 isolate가 중단되고 해당 isolate와 프로그램이 끝나게 된다.

자바와 다르게 Dart의 모든 exception은 unchecked exception이다. 메소드가 어떤 exception을 throw할 것인지 선언하지 않고 유저는 exception을 catch하는 것이 필수가 아니다.

Dart는 Exception과 Errer 타입을 제공한다. 물론 자신만의 exception을 정의할 수 있다. 하지만 Dart 프로그램은 Exception과 Error 오브젝트가 아니더라도 null이 아닌 아무 오브젝트나 exception으로 throw할 수 있다.

## Throw
아래는 exception을 throw하는 예시이다.

{% highlight dart %}
throw FormatException('Expected at least 1 section');
{% endhighlight %}

뿐만 아니라 임의의 오브젝트를 throw할 수도 있다.

{% highlight dart %}
throw 'Out of llamas!';
{% endhighlight %}

> **Note**: 출시 수준의 코드는 Error나 Exception을 implement하는 타입을 throw한다.

exception을 throw하는 것은 expression이기 때문에 => statement 안에 넣을 수 있다. 이는 expression을 넣을 수 있는 곳이면 어디던 마찬가지다.

{% highlight dart %}
void distanceTo(Point other) => throw UnimplementedError();
{% endhighlight %}

## Catch
exception을 잡아서 해당 exception을 다시 throw하지 않는 이상 퍼지지 않게 해준다. exception을 잡으면 해당 exception을 처리할 수 있다.

{% highlight dart %}
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  buyMoreLlamas();
}
{% endhighlight %}

하나 이상의 exception 타입을 throw하는 코드를 다루기 위해서는 여러 개의 catch 절을 사용하면 된다. throw된 오브젝트의 타입과 일치하는 첫번째 catch 절은 exeption을 처리한다. 만약 catch 절이 타입을 명시하고 있지 않다면 해당 절은 아무 오브젝트의 타입을 처리할 수 있다.

{% highlight dart %}
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // 특정 exception
  buyMoreLlamas();
} on Exception catch (e) {
  // 위의 exeption을 제외한 아무 exception
  print('Unknown exception: $e');
} catch (e) {
  // 명시된 타입이 없으므로 모든 것을 다룬다.
  print('Something really unknown: $e');
}
{% endhighlight %}

위의 코드가 보여주듯이 `on`, `catch`, 혹은 둘 다 사용할 수 있다. `on`은 exception 타입을 명시할 필요가 있을 때 사용한다. `catch`는 exception handler가 exception 오브젝트를 필요로 할 때 사용한다.

`catch()`에 한 개 혹은 두 개의 parameter를 명시할 수 있다. 첫번째는 throw된 exception이고 두번째는 stach trace이다.

{% highlight dart %}
try {
  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
{% endhighlight %}

exception의 전파를 허용하면서 이를 부분적으로 처리하기 위해, `rethrow` 키워드를 사용한다.

{% highlight dart %}
void misbehave() {
  try {
    dynamic foo = true;
    print(foo++); // 런타임 에러
  } catch (e) {
    print('misbehave() partially handled ${e.runtimeType}.');
    rethrow; // 호출자가 exception을 볼 수 있도록 한다.
  }
}

void main() {
  try {
    misbehave();
  } catch (e) {
    print('main() finished handling ${e.runtimeType}.');
  }
}
{% endhighlight %}

## Finally
exeption이 throw되었던 아니던 실행을 보장할 코드에는 `finally` 절을 사용하면 된다. 만약 exception에 일치하는 `catch` 절이 없다면 exception은 `finally` 절이 실행된 후에 퍼진다.

{% highlight dart %}
try {
  breedMoreLlamas();
} finally {
  // throw된 에러가 있더라도 항상 실행된다.
  cleanLlamaStalls();
}
{% endhighlight %}

`finally` 절은 일치하는 `catch` 절 이후에 실행된다.

{% highlight dart %}
try {
  breedMoreLlamas();
} catch (e) {
  print('Error: $e'); // 먼저 exception을 처리한다.
} finally {
  cleanLlamaStalls(); // 그리고 실행된다.
}
{% endhighlight %}
