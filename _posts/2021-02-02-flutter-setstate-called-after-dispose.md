---
title: '[Flutter] "setState() called after dispose()" 에러'
categories:
- Flutter
tags:
- Mobile
- iOS
- Android
- Error
---

상황에 따라 변화하는 위젯(Stateful Widget)을 제어하기 위해 `setState()`을 사용하곤 한다. 이때 종종 아래와 같은 에러가 발생할 때가 있다.

## 에러 내용

``` console
setState() called after dispose()
```

## 원인

이는 해당 위젯이 이미 `dispose()`된 상태인데 `setState()`이 불려서 발생하는 에러이다.

## 해결 방법

이 에러는 `this.mounted`를 사용해서 해결할 수 있다. `mounted`는 위젯이 `dispose()`되는 순간 `false`가 되기 때문에, 아래와 같이 `mounted`이 `true`일 때만 `setState()`를 호출하도록 설정하면 된다.

> `mounted`에 대한 [상세 설명](https://api.flutter.dev/flutter/widgets/State/mounted.html){:target="_blank"}.

``` dart
if (this.mounted) {
  setState(() {
    // state 변경에 대한 코드.
  });
}
```
