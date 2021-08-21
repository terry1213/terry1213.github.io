---
title: "[Flutter/Decoding Flutter] 노란색 밑줄이 생긴 텍스트 (Yellow underline text)"
categories:
- Flutter
tags:
- DecodingFlutter
---

## Decoding Flutter 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/DUX1uVCewvk?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

## 텍스트에 노란색 밑줄이 생기는 현상

![](/assets/flutter/DecodingFlutter/Yellow-underline-text/Example1.png){: #magnific width="300" height="500"}

Flutter를 막 배우기 시작했을 때 이런 화면을 보고 당황한 적이 있었다. 딱히 설정한 게 없는데 글씨는 빨간색으로 보이고 노란색 밑줄까지 있었으니 말이다.

이러한 현상이 일어나는 이유가 무엇일까?

## `Text` 위젯은 기본 스타일 값을 필요로 한다.

먼저 `Text` 위젯의 성질을 알아야 한다.

`Text`위젯은 위젯 트리를 올라가며 기본 스타일 값을 찾는다. 이를 찾게 되면 `Text`위젯은 그 스타일을 그대로 가져와서 사용하거나, `style` 필드를 통해 몇몇 부분만 변경하여 사용한다.

## `DefaultTextStyle` 위젯이 기본 스타일 값을 제공한다.

이러한 텍스트 기본 스타일 값을 제공해주는 것이 `DefaultTextStyle` 위젯이다.

결국 `Text` 위젯이 위젯 트리 내에서 `DefaultTextStyle` 위젯을 찾지 못하면, 기본 스타일 값을 얻을 수 없고, 노란 밑줄이 생기게 된다.

## `Scaffold` 위젯을 사용해도 된다.

그렇다면 개발자는 매번 `DefaultTextStyle` 위젯을 사용해야 할까? 결론부터 말하자면, 아니다.

아래의 예시를 보자.

``` dart
MaterialApp(
  home: Scaffold(
    body: Center(
      child: Text('Hello World'),
    ),
  ),
)
```

이 코드에는 `DefaultTextStyle`를 사용되지 않았다. 그래서 `Hello World`에는 노란 밑줄이 생길 거라고 생각할 수 있지만, 코드를 돌려보면 결과는 그렇지 않다.

![](/assets/flutter/DecodingFlutter/Yellow-underline-text/Example2.png){: #magnific width="300" height="500"}

`Hello World`는 정상적으로 화면에 그려진다.

이는 `Scaffold` 위젯 때문이다. `Scaffold` 위젯은 자신의 하위 위젯들을 `Material` 위젯으로 감싸 주는데, 이 `Material` 위젯이 내부에 텍스트 기본 스타일 값을 가지고 있기 때문이다.

## `DefaultTextStyle` 위젯, `Scaffold` 위젯이 모두 없다면?

아까의 코드에서 `Scaffold` 위젯을 지우고 돌려보자.

``` dart
MaterialApp(
  home: Center(
    child: Text('Hello World'),
  ),
)
```

![](/assets/flutter/DecodingFlutter/Yellow-underline-text/Example3.png){: #magnific width="300" height="500"}

`DefaultTextStyle` 위젯과 `Scaffold` 위젯 중 아무 것도 사용하지 않았기 때문에, 텍스트에 노란색 밑줄이 생겼다.

## 해결 방법

원인을 알고 나니 해결 방법은 간단하다.

노란색 밑줄이 생기는 경우는 텍스트의 기본 스타일 값이 필요한 상황이므로, `DefaultTextStyle` 위젯이나 `Scaffold` 위젯을 통해 텍스트의 기본 스타일을 지정해주면 된다.
