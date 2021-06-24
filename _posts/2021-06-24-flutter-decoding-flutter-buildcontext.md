---
title: "[Flutter/Decoding Flutter] BuildContext?!"
categories:
- Flutter
tags:
- DecodingFlutter
---

## Decoding Flutter 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/rIaaH87z1-g?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

## BuildContext란?

``` dart
Widget build(BuildContext context) {}
```

모든 위젯에는 `build()` 메소드가 존재하며, 그 안에는 `BuildContext`가 있다.

``` dart
Navigator.of(context)
MediaQuery.of(context)
ListView.builder(
  itemBuilder: (context, index) {}
),
```

위와 같이, `BuildContext`가 `Navigator`, `MediaQuery`, 여러 `builder`들에 사용되는 것은 많이 봤을 것이다. 하지만 정작 이 `BuildContext`가 무엇인지는 잘 모르는 경우가 많다.

`BuildContext`가 무엇인지 알기 위해선, 위젯이 무엇인지부터 알아야 한다. 위젯은 UI의 해당 부분에 무엇이 그려지는지를 알려주는 설계도이다. 하지만 위젯은 홀로 존재하지 않는다. 수많은 위젯들이 함께 존재한다. 그렇기 때문에 각 위젯이 어디에 위치하는지를 알 수 있어야 한다.

하지만 위젯 자체로는 자신이 어디에 위치하는지를 알 수 없다. 위젯은 설계도로써 어디서든 재사용되기 때문에 특정 인스턴스의 위치 정보를 포함할 수 없다. 따라서 위젯의 위치 정보를 알기 위해서는 다른 방법이 필요하다.

<br>

이제부터 그 방법에 대해 알아보자.

우선, 아래와 같이 `MyWidget`이라는 위젯이 있다고 해보자.(여기서 위젯이 `StatelessWidget`이던 `StatefulWidget`이던 상관없다.)

``` dart
class MyWidget extends StatelessWidget {
  // 생략
}
```

여기서 `StatelessWidget` 클래스의 구현 코드로 넘어가보자.(cmd 버튼을 누른 상태로 `StatelessWidget`를 클릭하면 된다.)

![](/assets/flutter/DecodingFlutter/BuildContext/Example1.png)

코드를 살펴보면 `StatelessWidget`가 `Widget`을 `extends`하고 있다.(`StatefulWidget`도 마찬가지다.)

여기가 목적지가 아니기 때문에 `Widget` 클래스의 구현 코드로 넘어가서, 그 안에 있는 메소드들을 살펴보자.

![](/assets/flutter/DecodingFlutter/BuildContext/Example2.png)

이 중 우리가 집중해야할 메소드는 `createElement()`이다.

`createElement()`의 리턴 타입인 엘리먼트(`Element`)는 특정 위젯이 어디에 있는지를 추적하는 객체이다. 위젯의 부모와 자식이 무엇인지를 추적한다고도 표현할 수 있겠다.

이제 다시 위로 올라가서, `MyWidget` 위젯을 빌드한다고 생각해보자.

`MyWidget` 위젯을 빌드하게 되면, Flutter 프레임워크는 `createElement()` 메소드를 호출한다. 호출된 `createElement()` 메소드로부터 생성된 엘리먼트는 `MyWidget` 위젯의 위치 정보를 런타임동안 지니고 있는다.

따라서 엘리먼트는 위젯과 1:1로 연결되며, 짝지어진 위젯에 대한 레퍼런스와 위치 정보를 가지고 있는 것이다. 이러한 엘리먼트들이 서로의 위치 정보를 기반으로 엘리먼트 트리를 구성한다.

<br>

그런데 `BuildContext`에 대해 알아본다고 하면서 왜 위젯의 위치를 찾는 방법과 엘리먼트에 대한 얘기를 하는 것일까? 이는 엘리먼트 클래스의 구현 코드를 보면 알 수 있다.

![](/assets/flutter/DecodingFlutter/BuildContext/Example3.png)

엘리먼트가 `BuildContext`를 `implements`하는 것을 확인할 수 있다. 이는 엘리먼트가 `BuildContext` 타입이라는 말이다. 결국 `BuildContext`가 위젯의 위치 정보를 가지고 있는 것이다.

이제부터 개발 도중에 `context`를 보면, `context`는 해당 위젯이 어디에 있는지를 파악할 수 있게 해준다고 생각하면 되겠다.
