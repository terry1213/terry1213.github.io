---
title: "[Flutter] No ScaffoldMessenger widget found. 에러"
categories:
- Flutter
tags:
- Error
---

다음은 `ScaffoldMessenger`를 통해 `showSnackBar()`를 호출하는 코드이다.

``` dart
class ScaffoldMessengerExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('ScaffoldMessenger Example'),
      ),
      body: Center(
        child: OutlinedButton(
          onPressed: () => _showSnackBar(context),
          child: Text('Show SnackBar'),
        ),
      ),
    );
  }

  _showSnackBar(BuildContext context) {
    final snackBar = SnackBar(content: Text('SnackBar'));
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}
```

이 코드를 실행해서 버튼을 클릭하면 `SnackBar`가 나타나지 않고 아래와 같은 에러가 발생한다.

## 에러 내용

``` console
No ScaffoldMessenger widget found.
```

## 에러 원인

`ScaffoldMessenger.of()`를 호출하면 `BuildContext`를 통해 `Scaffold`를 찾는다. 하지만 위의 코드에선 제일 가까운 `BuildContext`가 `Scaffold` 밖에 있기 때문에 `Scaffold`를 찾을 수 없다.

그렇게 때문에 에러가 발생했고 `SnackBar`가 나타나지 않은 것이다.

## 해결 방법

원인을 알았으니 해결 방법은 간단하다.

`ScaffoldMessenger.of()` 호출 시 `Scaffold`를 찾을 수 있도록 `BuildContext`를 `Scaffold` 안에 추가하면 된다.

``` dart
class ScaffoldMessengerExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('ScaffoldMessenger Example'),
      ),
      body: Builder(
        builder: (context) => Center( // Scaffold 안에 BuildContext 추가.
          child: OutlinedButton(
            onPressed: () => _showSnackBar(context),
            child: Text('Show SnackBar'),
          ),
        ),
      ),
    );
  }

  _showSnackBar(BuildContext context) {
    final snackBar = SnackBar(content: Text('SnackBar'));
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}
```

`BuildContext`는 위와 같이 `Builder` 위젯을 사용해서 추가할 수 있다.

![](/assets/flutter/Error/no-scaffoldmessenger-widget-found/Example1.gif){: #magnific width="300" height="500"}

이제 `Builder` 위젯 덕분에 `Scaffold` 안에도 `BuildContext`가 생겼다. 따라서 `ScaffoldMessenger.of()` 호출 시에 `Scaffold`를 찾을 수 있고, 정상적으로 화면에 `SnackBar`가 나타나게 된다.
