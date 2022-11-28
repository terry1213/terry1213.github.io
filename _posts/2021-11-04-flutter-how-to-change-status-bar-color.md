---
title: "[Flutter] 스테이터스 바 색깔 변경하는 법(How to Change Status Bar Color)"
categories:
- Flutter
tags:
- Tip
---

스테이터스 바를 보면 시간이나 배터리 등을 표현하는 색깔이 흰 색일 때도 있고 검정색일 때도 있다. Flutter에서도 스테이터스 바의 색을 변경할 수 있는 방법이 여러 개가 있으며, 상황에 따라 맞게 사용해야한다.

## AppBar가 있는 화면에 적용

`AppBar`가 존재하는 화면에서 스테이터스 바 색을 변경해보자.

`SystemUiOverlayStyle`을 사용하면 된다.

``` dart
MaterialApp(
  theme: ThemeData(
    appBarTheme: AppBarTheme(
      systemOverlayStyle: SystemUiOverlayStyle.dark,
    )
  ),
  home: StatusBarColorExample(),
)
```

``` dart
Scaffold(
  appBar: AppBar(
    title: Text('Status Bar Color Example'),
    systemOverlayStyle: SystemUiOverlayStyle.dark,
  ),
)
```

위와 동일하게 첫번째는 `AppBarTheme`에 적용하여 어플 전체의, 아래는 `AppBar`에 적용하여 특정 화면의 스테이터스 바 색이 변경된다.

![SystemUiOverlayStyle.light](/assets/flutter/Tip/change-status-bar-color/Example1.png){: #magnific width="300" height="500"}
![SystemUiOverlayStyle.dark](/assets/flutter/Tip/change-status-bar-color/Example2.png){: #magnific width="300" height="500"}

## AppBar가 없는 화면에 적용

위의 방법은 `AppBar`가 있는 화면에만 적용된다. 따라서 `AppBar`가 없는 화면의 스테이터스 바 색을 변경할 수 있는 방법도 필요하다.

앞의 방법처럼 `SystemUiOverlayStyle`를 설정하면 되지만, 다른 점은 `SystemChrome.setSystemUIOverlayStyle()`를 사용한다는 것이다.

``` dart
@override
Widget build(BuildContext context) {
  SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.light);
  return Scaffold(
    backgroundColor: Colors.blue,
  );
}
```

위의 코드처럼`build()` 메소드 안에서 `SystemChrome.setSystemUIOverlayStyle();`를 호출해야한다.

![SystemUiOverlayStyle.light](/assets/flutter/Tip/change-status-bar-color/Example3.png){: #magnific width="300" height="500"}
![SystemUiOverlayStyle.dark](/assets/flutter/Tip/change-status-bar-color/Example4.png){: #magnific width="300" height="500"}

`AppBar`가 없는 화면의 스테이터스 바 색도 변경되는 것을 확인할 수 있다.
