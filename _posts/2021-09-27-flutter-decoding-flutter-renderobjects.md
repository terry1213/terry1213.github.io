---
title: "[Flutter/Decoding Flutter] RenderObjects?!"
categories:
- Flutter
tags:
- DecodingFlutter
---

## Decoding Flutter 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/zmbmrw07qBc?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

## Render Tree

![](/assets/flutter/DecodingFlutter/RenderObjects/Example1.png){: width="700" height="400"}

Flutter가 `Widget Tree`를 만든다는 것은 아마 모두가 알 것이다. `Widget Tree`에 맞춰서 `Element Tree`를 만드는 것도 마찬가지다.

하지만 이 `Widget Tree`와 `Element Tree` 외에 `Render Tree`라는 트리가 있다는 것은 생소하다.

`Render Tree`는 `RenderObject`들로 이루어진 트리이며, `Element Tree`에 의해 만들어진다.

## Rendering Layer

![](/assets/flutter/DecodingFlutter/RenderObjects/Example2.png){: width="400" height="700"}

위는 `Dart Framework`의 구조이다. 이 중 `Widget Layer`는 많이 익숙하다. 하지만 바로 밑에 있는 `Rendering Layer`는 익숙하지 않다.

`Rendering Layer`는 `RenderObject`, 그리고 이와 관련된 클래스들을 다루는 레이어이다.

일반적으로 개발자는 직접 `Rendering Layer`에 접근하지 않는다. 그 대신 `Widget Layer`가 `Rendering Layer`에 접근한다. 따라서 코드에서는 `Rendering Layer`가 다루는 `RenderObject`가 보이지 않는다.

![](/assets/flutter/DecodingFlutter/RenderObjects/Example3.png){: width="350" height="150"}

하지만 `RenderObject`를 볼 수 있는 방법이 있다. `Flutter Inspector`의 `Render Tree` 탭에 들어가면 `RenderObject`가 보이는 것을 확인할 수 있다.
## RenderObject

앞서 `Render Tree`는 `RenderObject`로 이루어진 트리, `Rendering Layer`는 `RenderObject`를 다루는 레이어라고 했다.

그렇다면 공통적으로 언급된 이 `RenderObject`는 무엇일까?

`RenderObject`는 레이아웃, 페인팅, 적중 테스트(hit testing), 접근성 등을 다루는 오브젝트이다. 여러 종류의 `RenderObject`가 있지만, 대부분의 경우에는 2차원 좌표를 사용하는 `RenderBox`가 사용된다.

### RenderObject의 재사용

`Element Tree`는 매 프레임마다 `Render Tree`를 `Widget Tree`와 동기화시킨다. 만약 조금의 변화가 있을 때마다 새로운 `RenderObject` 사용해야 한다면 동기화 작업이 매우 오래 걸릴 것이다. 하지만 다행히 `RenderObject`는 재사용할 수 있다.

예를 들어, 특정 `Widget`의 색깔이 변한다면, 해당 `Widget`에 상응하는 기존 `RenderObject`가 재사용되며 다시 그려진다.

![](/assets/flutter/DecodingFlutter/RenderObjects/Example4.png){: width="550" height="500"}

또한 위의 이미지처럼 특정 `Widget`이 `Widget Tree`에서 없어진다면, 해당 `Widget`에 상응하는 `Element` 또한 `Element Tree`에서 분리되고, 마찬가지로 해당 `Widget`에 상응하는 `RenderObject`도 `Render Tree`에서 분리된다. 그리고 분리된 `Widget`이 새로운 위치로 이동되면 `Element`와 `RenderObject` 또한 그 위치로 이동하여 재사용된다.

### Key의 중요성

앞서 말한 `Element`와 `RenderObject`의 재사용을 위해서 `Key`가 필요하다. `Widget`이 어느 위치로 이동했는지를 알아내야 `Element`와 `RenderObject`를 재사용할 수 있는데, `Key`가 이를 알려주기 때문이다.

![](/assets/flutter/DecodingFlutter/RenderObjects/Example5.png){: width="450" height="800"}

A와 B라는 고유 `Key`를 가지는 두 개의 `Widget`이 스왑되는 상황이라고 해보자. 두 `Widget`의 위치가 바뀌었지만 A와 B라는 `Key` 덕분에 각 `Widget` 해당하는 `Element`가 무엇이었는지 알 수 있다. 따라서 해당 `Key`를 가진 `Widget`에 상응하는 `Element`를 가져와 재사용할 수 있게 된다. 또한 이미지에서는 `RenderObject`가 생략되었지만 `RenderObject`도 동일한 방법을 통해 재사용된다.

### 페인팅과 레이아웃 커스터마이즈

`RenderObject`를 직접 활용하여 `Widget`의 페인팅과 레이아웃을 커스터마이즈할 수 있다.
 
하지만 이 방법은 코드가 복잡하고 길어진다고 한다. 따라서 위젯을 사용하는 간단한 방법이 있는지 꼭 확인해야한다. 예를 들어 캔버스 위에 페인트하는 정도라면, 복잡하게 `RenderObject`를 활용할 필요 없이 `CustomPaint` 위젯을 사용해서 간단하게 해결할 수 있다.
