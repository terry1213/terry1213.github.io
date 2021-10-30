---
title: "[Flutter/Decoding Flutter] Rendering?!"
categories:
- Flutter
tags:
- DecodingFlutter
---

## Decoding Flutter 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/54yoCqkew6g?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

매 프레임마다 어떤 작업이 이루어질까? 픽셀들은 마법처럼 스크린에 짠하고 나타나지 않는다.

픽셀이 스크린에 보여지기 위해서 어떤 작업들이 필요한지를 알아보자.

다음은 Flutter의 렌더링과 전후의 작업을 여러 단계로 나누어 적은 것이다.

![](/assets/flutter/DecodingFlutter/Rendering/Example1.png)

1번부터 7번까지 순서대로 살펴보자.

## User input & Animation & Build

`User input`을 받거나 `Animation`이 발생하는 등 어떤 변화가 생기면, Flutter는 `Build` 단계로 들어간다. 이 단계에선 프레임워크는 필요한 `build()` 메소드만 호출하여 위젯 트리를 재구성한다.

![](/assets/flutter/DecodingFlutter/Rendering/Example2.png)

`Build` 단계에서 위젯 트리는 엘리먼트 트리를 업데이트하고, 엘리먼트 트리는 렌더 트리를 업데이트한다.

## Layout

`RenderObject`는 `Layout`과 `Painting`을 담당한다. `Layout` 단계에서 Flutter는 렌더 트리를 아래로 내려가면서 제약(constraints)를 보낸다.

![](/assets/flutter/DecodingFlutter/Rendering/Example3.png)

대부분의 위젯은 `Constraints`로 `BoxConstraints`를 사용한다. `BoxConstraints`는 `RenderObject` 중에 `RenderBox`를 위한 2차원 제약이다.

![](/assets/flutter/DecodingFlutter/Rendering/Example4.png)

제약과 반대로, 사이즈는 자식 `RenderObject`이 부모 `RenderObject`에게 보낸다. 이때 `RenderBox`의 사이즈는 부모한테 받은 제약에 적합해야한다.

그래서 레이아웃 문제를 디버깅할 때, `RenderObject`에 넘어오는 `BoxConstraints`와 계산된 사이즈를 살펴보면 된다.

## Paint

`Layout` 단계가 끝나면, Flutter는 `Paint` 단계로 들어간다. 이 단계에서 Flutter는 모든 `RenderObject`에 대해서 `paint()` 메소드를 호출한다. `RenderObject`는 `drawRect()`와 `drawLine()` 같은 메소드를 사용해서 캔버스에 페인트한다.

만약 `RenderObject`가 자식을 가지고 있다면, `paint()` 메소드 안에서 자식들도 페인트해야한다. 자식들을 페인트하는 `paintChild()` 메소드를 호출하는 건 프레임워크가 해야하는 작업처럼 보인다. 하지만 그렇게 하지 않으므로써 `RenderObject`의 유연성이 높아진다.

예를 들어, `paintChild()` 메소드 뒤에 `drawRect()`나 `drawLine()` 메소드를 호출하면 `RenderObject`가 자식 위에다가 더 그릴 수 있게 되는 것이다.

## Compositing

`Paint` 단계 다음은 `Compositing` 단계이다. 여기서 합성(Compositing)이란 여러 이미지를 하나의 그림으로 합치는 것을 의미한다.

![](/assets/flutter/DecodingFlutter/Rendering/Example5.png)

왜 합성이 필요할까? 페이팅은 하나의 캔버스에서 이루어지지 않기 때문이다. 이는 긴 텍스트를 스크롤하는 상황을 생각해보면 알 수 있다. 유저가 스크롤을 내릴 때 텍스트를 다시 업데이트할 필요는 없다. 텍스트는 그저 위치 조정만 해주면 된다. 하지만 스크롤 바는 업데이트를 해야 한다. 따라서 여러 개의 캔버스가 필요하고 합성 작업도 필요한 것이다.

![](/assets/flutter/DecodingFlutter/Rendering/Example6.png)

이런 상황 때문에 Flutter는 레이어 트리를 사용한다. 레이어 트리의 각 레이어가 하나의 캔버스가 되는 것이다. 낮은 레이어일수록 나중에 페인트되고, 모든 것은 래스터화(텍스트와 이미지를 프린터 가능한 형태로 전환하는 작업)를 위해 Flutter 엔진으로 보내진다.

``` dart
Widget build(BuildContext context) {
  return RepaintBoundary(
    child: ScrollableContext(),
  );
}
```

Flutter는 여러 `RenderObject`를 하나의 레이어로 그룹화한다. 하지만 우리가 특정 위젯을 `RepaintBoundary` 위젯으로 감싼다면, Flutter는 해당 `RenderObject`에 자체 레이어를 할당한다. 각 레이어 별로 페인팅 작업이 이루어지기 때문에, 이러한 방법으로 레이어를 나누면 불필요한 추가 페이팅 작업을 줄일 수 있다.

## Rasterize

마지막으로 엔진은 업데이트된 레이어 트리를 전달 받고, 이를 픽셀로 변환한다. 이 작업을 래스터화라고 한다. 만약 레이어 트리의 일부분이 변경되지 않고 그대로라면, 엔진은 해당 픽셀을 재사용할 수 있다. 따라서 불필요한 페인팅 작업이 많아보일 때 앞서 언급한 `RepaintBoundary` 위젯을 사용하자. 레이어를 분리하면 성능 항샹에 도움이 될 것이다.
