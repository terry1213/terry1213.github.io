---
title: "[Flutter/Decoding Flutter] Unbounded height / width"
categories:
- Flutter
tags:
- DecodingFlutter
---

## Decoding Flutter 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/jckqXR5CrPI?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

## Unbounded height 에러 발생

Flutter를 통해 개발을 하다 보면 `Colum` 안에 `ListView`를 넣게 될 경우가 있다.

``` dart
Column(
  children: [
    MyWidget(),
    ListView(children: ...),
  ],
)
```

이 경우에 Flutter는 다음과 같은 에러 메시지를 보낸다.

``` console
Viewport was given unbounded height.
```

## Unbounded height 에러 원인

그렇다면 이 에러가 발생하는 원인은 무엇일까?

### Flutter의 레이아웃 알고리즘

이에 대해 알아보기 위해서는 Flutter의 레이아웃 알고리즘에 대해 먼저 얘기해봐야 한다.

Flutter에서는 레이아웃 작업이 빠르게 처리되어야 한다. 각 위젯을 스크린 어디에 두어야 하는지를 매우 효과적으로 결정해야 한다는 말이다. 이렇게 하면 어플을 빠르게 만들어주고 배터리 소비를 줄일 수 있다.

따라서 효율적인 레이아웃 작업을 위해, Flutter의 레이아웃 알고리즘은 다음과 같은 원리를 지키며 작동한다.

* single pass: 서로 한번만 정보를 전달한다. 여러번의 상호작용을 하지 않는다는 말이다.
* constraints go down: 제약 사항은 부모에서 자녀로 내려간다.
* geometry goes up: 기하학적 정보는 자녀에서 부모로 올라간다.

위의 원칙이 적용되는 과정을 자세히 설명하면 이렇다.

우선 부모 위젯은 자녀 위젯에서 제약사항을 알려준다. 그러면 자녀 위젯은 자신이 필요로 하는 공간을 부모 위젯에게 알려주고, 해당 정보를 통해 자녀 위젯의 위치가 결정된다.

해당 작업은 모든 위젯에 적용된다. 따라서 최상단 위젯에서부터 시작해서 최하단 위젯들까지 제약사항을 알려주고, 반대로 최하단부터 최상단까지 올라가며 레이아웃이 결정된다.

### Column의 경우는?

`Column`의 경우에는 어떨까? `Column`은 다수의 자녀 위젯을 가진다는 조금 특이한 점이 있지만, 일반적으로는 다른 위젯들과 동일하게 레이아웃 알고리즘이 적용된다.

하지만 자녀 위젯 중 하나가 `ListView`라면, 상황은 달라진다. 아까와 같이 레이아웃 알고리즘의 과정을 하나씩 따져보자.

우선 `Column`이 자녀들에게 제약사항을 알려준다. 여기서 `Column`의 높이 제약사항은 없다는 것이 중요하다. 이제 자녀들이 필요로 하는 높이를 `Column`에게 알려줄 차례이다. 그런데 여기서 문제가 생긴다. `ListView`는 가능한 한 많은 높이를 필요로 하고, `Column`은 높이 제약사항이 없기 때문에, 높이를 자녀가 원하는 만큼 준다. 결국 무한대의 높이를 할당하게 되어 레이아웃을 결정할 수 없게 된다.

바로 과정을 통해서 'Viewport was given unbounded height.' 에러가 발생하게 된다.

이제 이런 의문이 들 수 있다. 왜 `Column`은 자녀가 원하는 만큼의 높이를 주는 걸까? 왜 자녀들의 사이즈를 제한하지 않는 것일까? 

`Column`이 자녀들의 높이를 제한하게 되면 물론 에러 자체는 사라진다. 하지만 근본적인 문제는 해결되지 않는다. `Column`의 높이 제한이 있다고 가정하고, 다시 한번 레이아웃 알고리즘의 과정을 생각해보자.

우선 `Column`이 자녀들에게 제약사항을 알려준다. 높이 제한이 100 픽셀이라고 가정한다. 이제 자녀들이 자신이 필요로 하는 공간을 `Column`에게 알려줄 차례이다. `ListView`는 여기서 100 픽셀 전부를 혼자 가져가려고 할 것이다.

이렇게 되면 에러는 사라진다. 하지만 레이아웃이 우리가 의도대로 그려지지 않을 것이다.

## Unbounded height 에러 해결 방법

지금까지 얘기한 것들을 정리해보면, 우리가 취할 수 있는 행동은 다음과 같다.

1. 에러를 그대로 둔다.(사실상 해결 방법이라고 할 수 없다.)
2. 높이의 제한을 두어 에러를 해결한다. 하지만 우리의 의도와 다른 레이아웃 결과를 얻게 된다.
3. `Column`과 자녀들이 여러 번의 상호 작용을 통해 문제를 해결한다. 하지만 이 경우에는 레이아웃 알고리즘이 매우 느려진다.(Flutter의 레이아웃 알고리즘이 single pass로 정해져 있기 때문에 해결 방법이라고 볼 수 없다.)

그렇다면 이 문제를 완벽히 해결하는 방법은 무엇일까? 크게 2가지 방법이 있다.

### Expanded & Flex

`ListView` 이외의 자녀 위젯에게 필요한 공간을 우선적으로 주고 `ListView`가 나머지 모든 공간을 차지하게 하고 싶다면, `Expanded` 혹은 `Flex`를 사용하여 `ListView`를 감싸주면 된다.

``` dart
Column(
  children: [
    MyWidget(),
    Expanded( // Flex도 마찬가지
      child: ListView(children: ...),
    ),
  ],
)
```

### SizedBox

`ListView`가 특정 높이를 차지하게 하고 싶다면, `SizedBox`를 사용하면 된다.

``` dart
Column(
  children: [
    MyWidget(),
    SizedBox(
      height: 100,
      child: ListView(children: ...),
    ),
  ],
)
```

## 결론 및 나의 생각

Unbounded height 에러가 발생하는 이유와 해결 방법에 대해서 정리해봤다.

사실 Unbounded height 에러는 약 1년 전 쯤 Flutter를 처음 공부할 때 만났던 문제이다. 그런데 해결 방법이 매우 간단하보니, 개념에 대해 이해하고 에러의 원인을 알아보는 것에 집중하지 못하고 해결 방법을 외워서 사용해왔다.

Decoding Flutter 시리즈를 통해, 좋은 공부 습관을 들일 수 있는 기회가 생긴 것 같아서 좋다. 다음 Decoding Flutter 시리즈 영상 주제가 무엇일지 기대된다.
