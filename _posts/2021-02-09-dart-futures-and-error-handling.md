---
title: "[Dart] Futures and error handling 정리"
categories:
- Dart
tags:
- Document
---

[Dart 공식 문서 원본 이동](https://dart.dev/guides/libraries/futures-error-handling){:target="_blank"} 

# Futures and error handling

Dart SDK 1.9 버전부터 비동기식 Dart 코드를 더 쉽게 읽고 쓸 수 있도록 하는 비동기식 지원([asynchrony support](/dart/dart-a-tour-of-the-dart-language-13-asynchrony-support/))이 추가되었다. 하지만 몇몇 코드들(보통 옛날 코드)에서는 아직 `then()`, `catchError()`, `whenComplete()` 같은 Future method를 사용한다.

이 페이지에서는 Future method를 사용할 때 발생할 수 있는 문제들을 방지하게 해준다.

> `async`, `await`, try-catch를 통한 error handling 같은 비동기식 지원을 해주는 언어를 이미 사용하고 있다면 해당 페이지를 읽을 필요가 없을 것이다.

## The Future API and callbacks

Future API를 사용하는 함수들은 Future를 완료시키는 값(혹은 에러)을 처리하기 위한 콜백(callback)들을 등록한다. 아래는 이에 대한 예시이다.

``` dart
myFunc().then(processValue)
        .catchError(handleError);
```

등록된 콜백들은 아래와 같은 규칙에 따라 실행된다. `then()`의 콜백은 Future가 값과 함께 종료된 경우 실행되며, `catchError()`의 콜백은 Future가 에러와 함께 종료된 경우 실행된다.

위의 예시에서, `myFunc()`의 Future가 값과 함께 종료되면 `then()`의 콜백이 실행된다. 만약 `then()`의 콜백 실행 과정에서 새로운 에러가 발생하지 않는다면 `catchError()`의 콜백은 실행되지 않는다. 반대로, `myFunc()`의 Future가 에러와 함께 종료된 경우 `then()`의 콜백은 실행되지 않으며 `catchError()`의 콜백만 실행된다.

## Examples of using then() with catchError()
연속된 `then()`, `catchError()` 호출은 Future를 처리하기 위한 일반적인 패턴이며, try-catch 구문과 동일하게 생각할 수 있다.

다음 여러 섹션들은 해당 패턴의 예시들을 보여준다.

### catchError() as a comprehensive error handler

아래의 예시는 `then()`의 콜백 내에서 예외를 발생시키고 `catchError()`에서 에러를 처리하는 것을 보여준다.

``` dart
myFunc()
  .then((value) {
    doSomethingWith(value);
    ...
    throw("some arbitrary error");
  })
  .catchError(handleError);
```

`myFunc()`의 Future가 값과 함께 종료되면, `then()`의 콜백이 실행된다. 만약 `then()`의 콜백이 throw 구문을 만나면 `then()`의 Future는 에러와 함께 종료된다. 해당 에러는 `catchError()`에 의해 처리된다.

`myFunc()`의 Future가 에러와 함께 종료되면, `then()`의 Future도 해당 에러와 함께 종료된다. 해당 에러도 `catchError()`에 의해 처리된다.

`myFunc()`에서 발생한 에러이던 `then()`에서 발생한 에러이던 `catchError()`가 전부 처리한다.

### Error handling within then()

더 세부적인 에러 처리를 위해, `then()`에 두번째(`onError`) 콜백을 등록하여 에러와 함께 종료된 Future를 처리할 수 있다.

``` dart
abstract Future then(onValue(T value), {onError(AsyncError asyncError)})
```

`then()`으로 전달된 에러와 `then()` 내에서 생성된 에러를 구분하려는 경우에만 onError 콜백을 사용한다.

``` dart
funcThatThrows()
  .then(successCallback, onError: (e) {
    handleError(e);          // funcThatThrows()에서 발생한 에러 처리.
    anotherFuncThatThrows(); // then()에서 새로 발생한 에러.
  })
  .catchError(handleError);  // then()에서 발생한 에러 처리.
```

`funcThatThrows()`의 Future에서 발생한 에러는 `onError` 콜백에서 처리된다. 이때 `onError` 콜백에서 새로 발생하는 에러(위의 예시에서는 `anotherFuncThatThrows()`)가 있다면 `then()`의 Future가 해당 에러와 함께 종료되며, 그 에러는 `catchError()`에서 처리된다.

일반적으로, 두 개의 에러 처리 방법을 사용하는 것은 추천하지 않는다. `then()`에서 발생하는 에러를 꼭 구분해야하는 경우에만 두번째 콜백을 사용한다.

### Errors in the middle of a long chain

연속으로 `then()`를 호출할 때, 거기서 발생하는 에러들은 `catchError()`을 사용하여 처리하는 것이 일반적이다.

``` dart
Future<String> one()   => Future.value("from one");
Future<String> two()   => Future.error("error from two");
Future<String> three() => Future.value("from three");
Future<String> four()  => Future.value("from four");

void main() {
  one()                                   // Future가 "from one" 값과 함께 종료된다.
    .then((_) => two())                   // Future가 two()의 에러과 함께 종료된다.
    .then((_) => three())                 // Future가 two()의 에러과 함께 종료된다.
    .then((_) => four())                  // Future가 two()의 에러과 함께 종료된다.
    .then((value) => processValue(value)) // Future가 two()의 에러과 함께 종료된다.
    .catchError((e) {
      print("Got error: ${e.error}");     // 콜백이 실행된다.
      return 42;                          // Future가 42 값과 함께 종료된다.
    })
    .then((value) {
      print("The value is $value");
    });
}

// 해당 프로그램의 출력:
//   Got error: error from two
//   The value is 42
```

위의 코드에서, `one()`의 Future()는 값과 함께 종료되지만 `two()`의 Future는 에러와 함께 종료된다. 에러와 함께 종료된 Future에서 `then()`을 호출할 경우, `then()`의 콜백은 실행되지 않는다. 대신에, `then()`의 Future는 자신을 호출한 Future의 에러를 받아서 해당 에러와 함께 종료된다. 이는 `two()`가 호출된 뒤에 오는 연속된 `then()`들이 전부 `two()`의 에러와 함께 종료되는 것에서 확인할 수 있다. 
해당 에러는 결국 `catchError()`에서 처리된다.

### Handling specific errors

만약 특정 에러를 처리하고 싶거나 여러 개의 에러를 처리하고 싶을 수 있다.

`catchError()`는 선택적 argument로 test를 가진다. 이는 발생한 오류의 종류를 쿼리할 수 있게 해준다.

``` dart
abstract Future catchError(onError(AsyncError asyncError), {bool test(Object error)})
```

제공된 파라미터를 기반으로 사용자를 인증하고 해당 사용자를 적절한 URL로 리다이렉트하는 `handleAuthResponse(params)` 함수가 있다고 해보자. 복잡한 작업이 주어진다면 `handleAuthResponse()`로부터 다양한 에러와 예외가 발생할 것이고 그것들은 각각 다르게 처리되어야 한다. 이는 아래와 같이 `test`를 사용하여 해결할 수 있다.

``` dart
void main() {
  handleAuthResponse({'username': 'johncage', 'age': 92})
    .then((_) => ...)
    .catchError(handleFormatException,
                test: (e) => e is FormatException)
    .catchError(handleAuthorizationException,
                test: (e) => e is AuthorizationException);
}
```

## Async try-catch-finally using whenComplete()

`then().catchError()`가 try-catch와 동일하다면 `whenComplete()`는 finally와 동일하다고 볼 수 있다. `whenComplete()`에 등록된 콜백은 `whenComplete()` 수신자가 종료되면 값과 함께 종료되었는지 에러와 함께 종료되었는지와 상관 없이 무조건 호출된다.

``` dart
var server = connectToServer();
server.post(myUrl, fields: {"name": "john", "profession": "juggler"})
      .then(handleResponse)
      .catchError(handleError)
      .whenComplete(server.close);
```

`whenComplete()`을 사용했기 때문에 `server.post()`에서 유효한 응답이 생성되는지 에러가 발생하는지에 관계 없이 `server.close`가 호출된다.

### Completing the Future returned by whenComplete()

`whenComplete()` 내에서 에러가 발생하지 않으면 `whenComplete()`의 Future는 자신을 호출한 Future와 동일한 방식으로 종료된다.

아래의 코드에서, `then()`의 Future가 에러와 함께 종료되기 때문에 `whenComplete()`의 Future도 해당 에러와 함께 종료된다.

``` dart
void main() {
  funcThatThrows()
    .then((_) => print("won't reach here"))    // Future가 에러와 함께 종료된다.
    .whenComplete(() => print('reaches here')) // Future가 같은 에러와 함께 종료된다.
    .then((_) => print("won't reach here"))    // Future가 같은 에러와 함께 종료된다.
    .catchError(handleError);                  // 여기서 에러를 처리한다.
}
```

아래의 코드에서, `then()`의 Future가 에러와 함께 종료되고 해당 에러는 바로 `catchError()`에서 처리된다. `catchError()`의 Future는 `someObject`와 함께 종료되기 때문에 `whenComplete()`의 Future도 같은 오브젝트와 함께 종료된다.

``` dart
void main() {
  funcThatThrows()
    .then((_) => ...)         // Future가 에러와 함께 종료된다.
    .catchError((e) {
      handleError(e);
      printErrorMessage();
      return someObject;
    })                                   // Future가 someObject와 함께 종료된다.
    .whenComplete(() => print("Done!")); // Future가 someObject와 함께 종료된다.
}
```

### Errors originating within whenComplete()

만약 `whenComplete()`의 콜백에서 에러를 발생시키면, `whenComplete()`의 Future는 자신을 호출한 Future와 상관없이 해당 에러와 함께 종료된다.

``` dart
void main() {
  funcThatThrows()
    .catchError(handleError)               // Future가 값과 함께 종료된다.
    .whenComplete(() => throw "new error") // Future가 에러와 함께 종료된다.
    .catchError(handleError);              // 에러를 처리한다.
}
```

## Potential problem: failing to register error handlers early

에러 처리자는 Future가 종료되기 전에 연결하는 것이 중요하다. 이렇게 하면 Future가 에러와 함께 종료되었을 때 에러 처리자가 연결되지 않아서 에러가 퍼져나가는 상황을 방지할 수 있다. 아래의 코드를 살펴보자.

``` dart
void main() {
  Future future = funcThatThrows();

  // BAD. funcThatThrows() 예외를 처리하기에 너무 늦었다.
  Future.delayed(const Duration(milliseconds: 500), () {
    future.then(...)
          .catchError(...);
  });
}
```

위의 코드에서 `catchError()`는 `funcThatThrows()`가 호출되고 0.5초 뒤에 등록되기 때문에 에러를 처리하지 못한다.

`funcThatThrows()`를 `Future.delayed()` 콜백 안에서 호출하면 이 문제는 해결된다.

``` dart
void main() {
  Future.delayed(const Duration(milliseconds: 500), () {
    funcThatThrows().then(processValue)
                    .catchError(handleError)); // We get here.
  });
}
```

## Potential problem: accidentally mixing synchronous and asynchronous errors

Future를 리턴하는 함수는 항상 Future에서 에러를 발생시켜야 한다. 이때 동기적 에러가 해당 함수 밖으로 나가지 않도록 하여, 해당 함수의 호출자가 여러 개의 에러 처리 시나리오를 구현하지 않게 해야 한다.

``` dart
Future<int> parseAndRead(data) {
  var filename = obtainFileName(data);         // 에러 발생 가능.
  File file = File(filename);
  return file.readAsString().then((contents) {
    return parseFileData(contents);            // 에러 발생 가능.
  });
}
```

위의 코드의 두 함수, `obtainFileName()`와 `parseFileData()`는 동기적 에러를 발생시킬 수 있다. `parseFileData()`는 `then()` 콜백 안에서 실행되기 때문에 에러가 함수 밖으로 나가지 못한다. 대신에, `then()`의 Future는 `parseFileData()`의 에러와 함께 종료하고, 이후 해당 에러는 `parseAndRead()`의 Future도 종료시키고, 결국 `catchError()`에 의해서 처리된다.

하지만 `obtainFileName()`는 `then()` 콜백 안에서 호출되지 않는다. 따라서 만약 여기서 에러가 발생한다면 해당 동기적 에러는 밖으로 퍼지게 된다.

``` dart
void main() {
  parseAndRead(data).catchError((e) {
    print("inside catchError");
    print(e.error);
  });
}

// 프로그램 출력:
//   Unhandled exception:
//   <error from obtainFileName>
//   ...
```

`catchError()`를 통해 해당 에러를 잡지 못하기 때문에 `parseAndRead()`의 클라이언트는 이 에러에 대한 별도의 오류 처리 방법을 구현해야한다.

### Solution: Using Future.sync() to wrap your code

함수에서 동기적 에러가 발생하지 않도록 하는 일반적인 방법은 함수의 본문(body) 안을 `Future.sync()`  콜백으로 감싸는 것이다.

``` dart
Future<int> parseAndRead(data) {
  return Future.sync(() {
    var filename = obtainFileName(data);         // 에러 발생 가능.
    File file = File(filename);
    return file.readAsString().then((contents) {
      return parseFileData(contents);            // 에러 발생 가능.
    });
  });
}
```

만약 콜백이 Future 이외의 값을 리턴하면, `Future.sync()`의 Future는 해당 값과 함께 종료한다. 만약 콜백이 에러를 발생시키면, Future는 에러와 함께 종료한다. 만약 콜백 자체가 Future를 리턴하면, 리턴된 Future의 값 혹은 에러가 `Future.sync()`의 Future를 종료시킨다.

`Future.sync()`, `catchError()`으로 싸인 코드는 모든 에러를 처리할 수 있다.

``` dart
void main() {
  parseAndRead(data).catchError((e) {
    print("inside catchError");
    print(e.error);
  });
}

// 프로그램 출력:
//   inside catchError
//   <error from obtainFileName>
```

`Future.sync()`는 잡히지 않는 예외에 대해 대응할 수 있게 해준다. 복잡한 함수의 경우, 개발자가 자신도 모르게 위험한 에러를 발생시킬 수 있는 코드를 넣었을 수도 있다.

``` dart
Future fragileFunc() {
  return Future.sync(() {
    var x = someFunc();     // 드문 경우에 예상치 못한 에러가 발생한다.
    var y = 10 / x;         // x는 0이 아니어야 한다.
    ...
  });
}
```

`Future.sync()`를 통해 우리가 예상하고 있는 에러를 처리할 수 있을 뿐만 아니라 실수로 에러가 함수 밖으로 퍼지는 것을 방지할 수 있다.
