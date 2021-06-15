---
title: "[Dart] A tour of the Dart language - 14. Generators"
categories:
- Dart
tags:
- Document
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)

# Generators
generator 함수를 사용하면 일련의 값을 쉽게 생성할 수 있다. Dart는 두가지의 built-in generator 함수를 제공한다.

* 동기식 generator: Iterable 오브젝트를 리턴.
* 비동기식 generator: Stream 오브젝트를 리턴.

동기식 generator 함수를 구현하기 위해서는, 함수의 본문(body)에 `sync*`를 붙이고 값을 전달하기 위해 `yield` statement를 사용한다.

``` dart
Iterable<int> naturalsTo(int n) sync* {
  int k = 0;
  while (k < n) yield k++;
}
```

비동기식 generator 함수를 구현하기 위해서는, 함수의 본문(body)에 `async*`를 붙이고 값을 전달하기 위해 `yield` statement를 사용한다.

``` dart
Stream<int> asynchronousNaturalsTo(int n) async* {
  int k = 0;
  while (k < n) yield k++;
}
```

generator가 재귀 함수라면 `yield*`를 사용해서 효율성을 높일 수 있다.

``` dart
Iterable<int> naturalsDownFrom(int n) sync* {
  if (n > 0) {
    yield n;
    yield* naturalsDownFrom(n - 1);
  }
}
```
