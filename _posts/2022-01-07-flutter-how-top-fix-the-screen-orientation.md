---
title: "[Flutter] 화면 방향 고정하기(How to Fix the Screen Orientation)"
categories:
- Flutter
tags:
- Tip
---

어플의 용도와 목적에 따라 화면의 방향을 제한시켜야하는 경우가 있다. 그렇다면 Flutter에서 이를 구현하는 방법을 한번 알아보자.

## 사전 설정

Flutter에서 화면 방향을 제한시키기 위해서는 Xcode에서의 사전 설정이 필요하다.

### Xcode 설정

아이폰의 경우에는 Xcode Workspace에서 사용할 화면 방향을 정해줘야한다.

![](/assets/Flutter/Tip/fixing-the-screen-orientation/Example1.png)

**General > Deployment Info > Device Orientation** 에서 사용할 화면 방향을 체크한다. 어차피 Flutter에서 Dart 코드를 통해 사용할 화면 방향을 제한할 수 있기 때문에, Xcode에서는 4가지를 모두 체크해도 된다.

## 화면 방향 설정 방법

다음은 Flutter에서 화면 방향을 설정하는 코드이다.

``` dart
SystemChrome.setPreferredOrientations([
  DeviceOrientation.portraitUp, // 세로 정방향
  DeviceOrientation.portraitDown, // 세로 역방향
  DeviceOrientation.landscapeLeft, // 가로 왼쪽 방향
  DeviceOrientation.landscapeRight, // 가로 오른쪽 방향
]);
```

위의 4가지 방향 중에 사용할 화면 방향을 선택해서 적어주면 된다.

``` dart
@override
Widget build(BuildContext context) {
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp, // 세로 정방향만 사용할 수 있다.
    // DeviceOrientation.portraitDown,
    // DeviceOrientation.landscapeLeft,
    // DeviceOrientation.landscapeRight,
  ]);
  return Scaffold(
    appBar: AppBar(
      title: const Text('Fixing the Screen Orientation Example'),
    ),
    body: const Center(
      child: FlutterLogo(size: 150),
    ),
  );
}
```

위 코드는 화면에 Flutter 로고를 보여주는 간단한 코드이다. 세로 정방향(`DeviceOrientation.portraitUp`)만 사용할 수 있게 제한을 걸었다.

## 적용 확인

이제 화면이 세로 정방향으로 잘 고정이 되었는지 확인해보자.

### 아이폰(홈버튼 X)

![전방향](/assets/flutter/Tip/fixing-the-screen-orientation/Example2.gif){: #magnific  width='400' }
![세로 정방향만](/assets/flutter/Tip/fixing-the-screen-orientation/Example3.gif){: #magnific  width='400' }

세로 정방향으로 고정이 잘 된 것을 확인할 수 있다.

그런데 전방향(왼쪽) 영상을 보면 조금 이상한 점이 있다. 세로 역방향만 적용되지 않는다는 것이다. 홈버튼이 없는 아이폰들의 경우, 4가지 방향 중에 세로 역방향을 지원하지 않는다. 찾아보니 애플이 이렇게 설정을 한 것이라고 한다.

### 아이폰(홈버튼 O)

![전방향](/assets/flutter/Tip/fixing-the-screen-orientation/Example4.gif){: #magnific  width='400' }
![세로 정방향만](/assets/flutter/Tip/fixing-the-screen-orientation/Example5.gif){: #magnific  width='400' }

홈버튼이 있는 예전  버전의  아이폰들의 경우, 4가지 방향을 모두 제공한다. 그리고 세로 정방향 고정도 잘 적용된 것을 확인할 수 있다.

### 안드로이드

![전방향](/assets/flutter/Tip/fixing-the-screen-orientation/Example6.gif){: #magnific  width='400' }
![세로 정방향만](/assets/flutter/Tip/fixing-the-screen-orientation/Example7.gif){: #magnific  width='400' }

안드로이드도 세로 정방향 고정이 잘 적용되었다.

## 전체 예시 코드

<https://github.com/terry1213/flutter-example/tree/fix_the_screen_orientation>{:target="\_blank"}
