---
title: "[Dart] A tour of the Dart language - 13. Asynchrony support"
categories:
- Dart
tags:
- Document
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)

# Asynchrony support
Dart 라이브러리에는 Future, Stream object를 리턴하는 함수가 매우 많다. 이러한 함수들은 비동기식(asynchronous)으로, 시간이 걸리는 작업을 세팅한 후에 해당 작업이 끝나기를 기다리지 않고 리턴한다.

`async`와 `await` 키워드는 비동기식 프로그래밍을 지원하고, 동기식(synchronous) 코드처럼 보이는 비동기식 코드를 작성할 수 있게 해준다.

## Handling Futures
완료된 Future의 결과가 필요한 경우, 두가지 선택지가 있다.

* `async`와 `await`를 사용한다.
* Future API를 사용한다. 

`async`와 `await`를 사용하는 코드는 비동기식이지만 동기식 코드로 보인다. 예를 들어, 아래는 비동기식 함수의 결과를 기다리기 위해 `await`을 사용하는 코드이다. 

``` dart
await lookUpVersion();
```

`async` 함수 안에서만 `await`을 사용을 할 수 있다.

```
Future checkVersion() async {
  var version = await lookUpVersion();
}
```

> **Note**: `async` 함수가 시간이 걸리는 작업을 한다고 해도 해당 함수가 그런 작업들을 기다리고 있는 것은 아니다. 대신, `async` 함수는 첫 `await` expression을 만날 때까지만 실행된다. 그 후 Future object를 리턴하고 await expression이 끝난 후에 실행을 재개한다.

`await`을 사용하는 코드의 에러를 처리하기 위해 `try`, `catch`, `finally`를 사용한다.

``` dart
try {
  version = await lookUpVersion();
} catch (e) {
  // version을 찾을 수 없는 경우에 대한 처리.
}
```

`async` 함수에서 `await`을 여러 번 사용할 수 있다. 예를 들어, 아래의 코드는 함수의 결과를 위해 3번을 기다린다.

``` dart
var entrypoint = await findEntrypoint();
var exitCode = await runExecutable(entrypoint, args);
await flushThenExit(exitCode);
```

`await expression`에서 `expression`의 값은 보통 Future이다. 만약 Future가 아니라도 자동으로 해당 값을 Future로 포장한다. 이 Future object는  object를 리턴할 것을 보장해준다. `await expression`의 값은 바로 그 리턴된 object가 된다. await expression은 object를 사용할 수 있을 때까지 실행을 일시 중지시킨다.

만약 `await`을 사용할 때 컴파일 타임 에러가 발생하면 `await`이 `async` 함수 안에 있는지를 확인해라. 예를 들어 `await`을 `main()` 함수에서 사용하면 `main()`의 본문(body) 앞에 `async`를 적어야한다.

``` dart
Future main() async {
  checkVersion();
  print('In main: version is ${await lookUpVersion()}');
}
```

## Declaring async functions
`async` 함수는 본문에 `async` 수식어가 붙는다.

`async` 키워드를 함수에 추가하면 해당 함수는 Future를 리턴하게 된다. 예를 들어, 아래는 문자열을 리턴하는 동기식 함수이다.

``` dart
String lookUpVersion() => '1.0.0';
```

이 함수를 `async` 함수로 만들면 리턴되는 값은 Future가 된다.

``` dart
Future<String> lookUpVersion() async => '1.0.0';
```

만약 본래 함수의 리턴 값이 없다면 변경된 `async` 함수의 리턴 타입은 `Future<void>`가 된다.

## Handling Streams
Stream에서 값을 가져와야 하는 경우, 두가지 선택지가 있다.

* `async`와 `await for`(loop를 위한 비동기)
* Stream API를 사용한다.

> **Note**: `await for`를 사용하기 전에, `await for`가 코드를 더 명확하게 하는지와  stream의 모든 결과를 기다리고 싶은지를 확실히 해야한다. 예를 들어, UI 프레임워크는 끝나지 않는 이벤트 stream을 보내기 때문에 UI 이벤트 리스너에 `await for`를 사용하면 안 된다.

loop를 위한 비동기는 다음과 같은 형태이다.

``` dart
await for (varOrType identifier in expression) {
  // stream이 값을 내보낼 때마다 실행한다.
}
```

`expression`의 값은 Stream 타입을 가져야한다. 아래와 같은 순서로 실행된다.

1. stream이 값을 내보내기를 기다린다.
2. for loop의 본문을 실행한다. 이때 변수는 내보내진 값이 된다.
3. stream이 닫힐 때까지 1번과 2번을 반복한다.

stream 구독을 중지하기 위해 break 혹은 return statement를 사용할 수 있다. 이 statement들은 for loop를 break하고 스트림 구독을 취소한다.

비동기식 for loop를 구현할 때 컴파일 타입 에러가 생기면 `await for`가 `async` 함수 안에 있는지 확인해라. 예를 들어, 비동기식 for loop를 `main()`함수에서  사용하면 `main()`의 본문(body) 앞에 `async`를 적어야한다.

``` dart
Future main() async {
  // ...
  await for (var request in requestServer) {
    handleRequest(request);
  }
  // ...
}
```
