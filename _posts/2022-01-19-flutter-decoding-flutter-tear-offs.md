---
title: "[Flutter/Decoding Flutter] Tear-offs"
categories:
- Flutter
tags:
- DecodingFlutter
---

## Decoding Flutter 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/OmCaloD7sis?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

이번 Decoding Flutter의 주제는 Tear-off이다.

지금까지 Decoding Flutter 시리즈들은 전부 제목을 보면 어떤 내용일지 예상이 갔다. 하지만 이번 영상은 무슨 내용인지 전혀 예상이 되질 않았다.

## Tear-off란?

Tear-off가 무엇일까?

아래와 같은 코드를 작성했다고 가정해보자.

``` dart
onTap: () {
  myHandler();
},
```

만약, Linter를 사용 중이며 [unnecessary_lambdas](https://dart-lang.github.io/linter/lints/unnecessary_lambdas.html){:target="\_blank"} 룰을 설정했다면 위 코드에서는 다음과 같은 메시지가 보일 것이다.

```
DON'T create a lambda when a tear-off will do.
```

해석해보면, Tear-off가 가능할 때 Lambda를 사용하지  말라는 뜻이다. 여기서 Lambda는 `(){}`를 의미한다.

Lambda를 사용하지 않고 Tear-off로 변경하면 코드는 다음과 같아진다.

``` dart
onTap: myHandler,
```

이렇게 `onTap` 파라미터에 함수를 직접 반환하는 것이 Tear-off이다. 이렇게 Tear-off를 사용하면 불필요한 코드를 없앨 수 있다.

## Tear-off의 기존 한계

Tear-off에는 한계가 있다. 이에 대해 알아보자.

아래는 `.fromJson` 이라는 `factory` 생성자를 갖는 `MyClass` 클래스이다.

``` dart
class MyClass {
  factory MyClass.fromJson(
    Map<String, dynamic> json,
  ) =>
    MyClass(...);
}
```

그리고 이 `MyClass` 클래스의 빌더를 받는 `StateManager` 클래스도 있다고 해보자.

``` dart
class StateManager {
  const StateManager(this.builder);

  final MyClass Function(Map<String, dynamic>) builder;
}
```

그렇다면 `StateManager` 클래스 인스턴스를 생성할 때 다음과 같은 코드를 사용하면 어떻게 될까?

``` dart
StateManager(MyClass.fromJson);
```

아쉽게도 이 코드는 작동하지 않는다. 따라서 다음과 같이 작성해야한다.

``` dart
StateManager(
  (Map<String, dynamic> json) =>
    MyClass.fromJson(json),
)
```

여기서 우리는 생성자는 Tear-off로 사용할 수 없는 메소드라는 것을 알 수 있다.

## Tear-off의 한계 해결!

다행히 Dart 2.15부터 이 문제가 해결되었다고 한다. 생성자도 Tear-off로 사용할 수 있게 되었다.

이제 다음과 같이 사용해도 정상적으로 작동할 것이다.

``` dart
StateManager(MyClass.fromJson);
```
