---
title: "[Flutter/Web] 드래그 사용을 막고, 마우스 휠로만 스크롤하게 하기"
categories:
- Flutter
tags:
- Tip
---

Flutter를 통해 Web 개발을 하다가 문득 드래그를 통해서 스크롤이 가능한 게 불편하게 느껴졌다. 모바일 환경에서는 당연히 드래그를 통해 스크롤하지만 일반적인 Web 환경에서는 마우스 휠로만 스크롤한다.

그래서 드래그 사용을 막고, 오직 마우스 휠로만 스크롤을 할 수 있도록 하는 방법에 대해 알아보려고 한다.

## 기본 `ListView`

우선, 다음과 같이 `ListView`를 구현했다.

``` dart
ListView.builder(
  itemCount: 30,
  itemBuilder: (context, index) {
    return Container(
      height: 100,
      margin: EdgeInsets.symmetric(vertical: 5, horizontal: 10),
      color: index.isEven ? Colors.blue : Colors.green,
    );
  },
),
```

### 실행 화면

위의 코드를 실행하고, 드래그와 마우스 휠을 사용해보자.

![](/assets/flutter/Tip/DisableDrag/Example1.gif){: #magnific}

드래그와 마우스 휠 두 방법 모두를 통해서 스크롤할 수 있는 것을 볼 수 있다.

## 드래그 사용이 불가능한 `ListView`

그럼 이제 드래그 사용을 막아볼 차례이다.

``` dart
final ScrollController _scrollController = ScrollController(); // 컨트롤러 선언.
```

``` dart
ListView.builder(
  itemCount: 30,
  controller: _scrollController, // 컨트롤러 할당.
  physics: NeverScrollableScrollPhysics(), // 기존 스크롤 기능 해제.
  itemBuilder: (context, index) {
    return Container(
      height: 100,
      margin: EdgeInsets.symmetric(vertical: 5, horizontal: 10),
      color: index.isEven ? Colors.blue : Colors.green,
    );
  },
),
```

우선 `ScrollController`를 선언하고 이를 `ListView`의 컨트롤러로 할당한다.

또한 `physics: NeverScrollableScrollPhysics()`을 통해 기존 스크롤 기능을 꺼야 한다. 이는 기존 스크롤 기능에는 드래그를 통한 스크롤도 포함되어 있기 때문이다. 기존 스크롤 기능을 아예 끄고 마우스 휠로만 작동하는 별개의 스크롤 이동 로직을 짤 것이다.

``` dart
import 'package:flutter/gestures.dart'; // Listener 사용을 위해 'gestures.dart' import.
```

``` dart
Listener( // Listener로 감싸기.
  child: ListView.builder(
    /* 생략 */
  ),
),
```

그리고 `Listener`를 사용하여 기존 `ListView`를 감싸준다. `Listener`를 통해서 여러 이벤트를 감지할 수 있다. 지금의 경우는 마우스 휠을 통한 스크롤을 감지하기 위해서 `Listener`를 사용하는 것이다.

이제 다음과 같이 `Listener`에 `onPointerSignal` 부분을 추가한다.

``` dart
Listener(
  onPointerSignal: (ps) {
    if (ps is PointerScrollEvent) {
      double newOffset =
          _scrollController.offset + ps.scrollDelta.dy;
      if (newOffset < 0) {
        newOffset = 0;
      } else if (newOffset > _scrollController.position.maxScrollExtent) {
        newOffset = _scrollController.position.maxScrollExtent;
      }
      _scrollController.jumpTo(newOffset);
    }
  },
  child: ListView.builder(
    /* 생략 */
  ),
),
```

우선 마우스 휠을 통한 스크롤 이벤트에 해당하는 `PointerScrollEvent`를 조건문을 통해서 걸러냈다. 그리고 스크롤의 새로운 위치(`newOffset`)를 계산했다.

다음으로 스크롤의 새로운 위치가 화면을 넘어가지 않도록 했다. 만약 화면 최상단보다 위로 갈 경우에는 `newOffset`을 최상단의 offset 값(`0`)으로 설정했고, 반대로 화면 최하단보다 아래로 갈 경우에는  `newOffset`을 최하단의 offset 값(`_scrollController.position.maxScrollExtent`)으로 설정했다.

### 실행 화면

이제 완성한 코드를 실행해보자.

![](/assets/flutter/Tip/DisableDrag/Example2.gif){: #magnific}

아까와 다르게 드래그에는 스크롤이 반응하지 않는 것을 확인할 수 있다.
### 전체 코드

<details markdown="1">
  <summary>전체 코드 펼치기/접기</summary>

``` dart
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(ExampleApp());
}

class ExampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DisableDrag Example',
      debugShowCheckedModeBanner: false,
      home: DisableDragExample(),
    );
  }
}

class DisableDragExample extends StatelessWidget {
  final ScrollController _scrollController = ScrollController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Listener(
        onPointerSignal: (ps) {
          if (ps is PointerScrollEvent) {
            double newOffset = _scrollController.offset + ps.scrollDelta.dy;
            if (newOffset < 0) {
              newOffset = 0;
            } else if (newOffset > _scrollController.position.maxScrollExtent) {
              newOffset = _scrollController.position.maxScrollExtent;
            }
            _scrollController.jumpTo(newOffset);
          }
        },
        child: ListView.builder(
          itemCount: 30,
          controller: _scrollController,
          physics: NeverScrollableScrollPhysics(),
          itemBuilder: (context, index) {
            return Container(
              height: 100,
              margin: EdgeInsets.symmetric(vertical: 5, horizontal: 10),
              color: index.isEven ? Colors.blue : Colors.green,
            );
          },
        ),
      ),
    );
  }
}
```

</details>
