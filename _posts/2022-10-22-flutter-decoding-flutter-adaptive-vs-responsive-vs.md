---
title: "[Flutter/Decoding Flutter] Adaptive vs Responsive(적응형 vs 반응형)"
categories:
- Flutter
tags:
- DecodingFlutter
---

## Decoding Flutter 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/HD5gYnspYzk?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

## 적응형 vs 반응형

Flutter는 기본적으로 크로스 플랫폼 프레임워크다. Flutter로 개발을 하시는 분들 중에 하나의 플랫폼을 타깃으로 어플리케이션을 개발하는 사람은 거의 없을 것이다. 나 또한 IOS와 AOS를 한번에 개발하는 용도로 Flutter를 사용하고 있다.

그렇다면 크로스 플랫폼 프레임워크인 Flutter를 사용하고 있으니, IOS와 AOS에서 돌아가는 나의 코드를 그대로 Mac과 Window에서 돌리면 제대로 작동할까? 그렇지 않다.

그 이유는 **플랫폼별 기능 차이**와 **화면의 비율, 크기, 모양** 때문이다. 이 두 문제를 해결하기 위해 필요한 것이 바로 **적응형**과 **반응형**이다.

### 적응형(Adaptive)

적응형이란 플랫폼이 제공할 수 있는 기능들에 앱이 적응하는 것을 말한다.

예를 들어 위치 정보를 가져올 수 있는 GPS 기능을 생각해보자. 요즘 나오는 기기들에는 대부분 GPS 기능이 들어가있다. 만약 플랫폼들에서 전부 같은 API를 사용해서 GPS 정보를 불러올 수 있으면 편할 것이다. 하지만 각 플랫폼은 서로 다른 API를 사용한다.

이러한 문제를 해결하는 가장 쉬운 방법은 각 플랫폼 별 정보와 분리하여 추상화하는 것이다. 이렇게 하면 겉에서 봤을 때는 하나의 API를 제공하는 패키지를 얻게 되지만, 내부에서는 플랫폼 별로 다른 부분에 대한 처리가 진행된다.

### 반응형(Responsive)

반응형이란 스크린 비율, 크기, 모양에 따라서 어떻게 보여줄지 정하는 것을 말한다.

반응형을 적용하는 가장 기본적인 방법으로는 `MediaQuery`를 사용하는 방법이 있다. `MediaQuery`를 통해 화면 크기를 알아내고 이에 따라 화면에 보여줄 레이아웃을 결정한다. 하지만 `MediaQuery`는 단순히 디바이스의 화면 크기만 알려주기 때문에, 주로 위젯 트리 상에서 높은 위치에 있는 위젯의 빌드 메소드에서 사용된다. 따라서 반응형이 맞긴 하지만 그렇게까지 반응형이라고 보기는 어렵다.

반응성을  더 높이기 위해서는  `LayoutBuilder`를 사용하면 된다. `LayoutBuilder`는 부모 위젯에 기반하여 자식 위젯이 사용할 수 있는 공간의 크기를 알려준다. `LayoutBuilder`는 위젯 트리의 낮은 위치에서도 사용할 수 있다는 장점이 있다.

## 코드에서 플랫폼을 구별할 때 주의할 점!

Flutter에서 플랫폼을 구별하는 방법에는 두가지가 있다. 바로 `dart:io.Platform`과 `Theme.of(ctx).platform`이다. 이 두가지 중 아무거나 사용하면 될까?

아니다. `dart:io.Platform`과 `Theme.of(ctx).platform`는 각각 상황에 맞춰서 사용한다.

* `dart:io.Platform`의 경우, 플랫폼 별로 기능이 다를 때 사용한다. 앞에서 말한 **적응형(Adaptive)**에 해당하는 것이다.
* `Theme.of(ctx).platform`의 경우, 플랫폼 별로 유저에게 보여지는 부분이 다를 때 사용한다. 앞에서 말한 **반응형(Responsive)**에 해당하는 것이다.
