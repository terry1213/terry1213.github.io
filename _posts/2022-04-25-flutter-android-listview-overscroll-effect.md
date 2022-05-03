---
title: "[Flutter] ListView의 overscroll 효과 없애기"
categories:
- Flutter
tags:
- Tip
---

## overscroll 효과란?

Flutter가 크로스 플랫폼 프레임워크이지만, 특정 부분들에 대해서는 IOS와 Android에서 차이가 있기도 하다. 예를 들어 자동으로 생성되는 백 버튼의 모양이 다르고, 앱바의 타이틀 위치가 다르다.

그리고 또 여기에 속하는 것이 바로 `ListView`의 overscroll 효과이다. overscroll 효과가 무엇일까? 말그대로 스크롤이 가능한 범위 이상으로 스크롤하려고 하면 나타나는 효과이다.

IOS에서는 스크롤이 가능한 범위 이상으로 더 당겨졌다가 되돌아가는 효과가 나타나고, Android에서는 스크롤이 가능한 범위 끝 부분에 빛나는 효과가 나타난다. (Android 12부터는 IOS와 비슷한 효과로 변경되었다.)
IOS의 overscroll 효과는 어떤 ListView에 들어가도 크게 거슬리지 않았다. 하지만 Android의 빛나는 overscroll 효과는 ListView가 화면을 꽉 채우는 경우가 아니면 어울리지 않고 자꾸 거슬렸다.

그래서 이번에는 overscroll 효과를 없애는 방법에 대해서 알아보려고 한다.

## overscroll 효과를 없애는 방법

아래와 같은 `ListView`가 있다고 해보자.

``` dart
Scaffold(
  body: SafeArea(
    child: ListView.builder(
      itemCount: 20,
      itemBuilder: (_, int index) => SizedBox(
        height: 50,
        child: Center(
          child: Text('Box$index'),
        ),
      ),
    ),
  ),
)
```

![overscroll 효과O](/assets/flutter/Tip/off-overscroll-effect/Example1.gif){: #magnific  width='300' }

지금 상태에서는 `ListView`에 overscroll 효과가 들어간다. 여기서 `ListView`를 다음과 같이 변경해보자.

``` dart
 Scaffold(
  body: SafeArea(
    child: ScrollConfiguration(
      behavior: const ScrollBehavior().copyWith(overscroll: false),
      child: ListView.builder(
        itemCount: 20,
        itemBuilder: (_, int index) => SizedBox(
          height: 50,
          child: Center(
            child: Text('Box$index'),
          ),
        ),
      ),
    ),
  ),
)
```

`ListView`를 `ScrollConfiguration`로 감싸고 overscroll를 false 처리한 `ScrollBehavior`를 behavior로 설정했다.

![poverscroll 효과X](/assets/flutter/Tip/off-overscroll-effect/Example2.gif){: #magnific  width='300' }

코드를 다시 실행해보니, `ListView`에서 overscroll 효과가 사라진 것을 확인할 수 있다.

## 전체 예시 코드

<https://github.com/terry1213/flutter-example/tree/disable_overscroll_effect>{:target="\_blank"}
