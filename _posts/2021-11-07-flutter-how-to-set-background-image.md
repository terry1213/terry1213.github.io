---
title: "[Flutter] 배경 이미지 적용하기(How to Set Background Image)"
categories:
- Flutter
tags:
- Tip
---

`Scaffold`에 배경 이미지를 추가하는 방법을 알아보자. `Scaffold`는 배경 이미지를 위한 property가 제공되지 않기 때문에 직접 구현해야한다.
## assets 디렉토리에 이미지 파일 추가

우선 배경으로 설정할 이미지를 `assets` 디렉토리에 추가한다.

![](/assets/flutter/Tip/background-image/Example1.png)

## pubspec.yaml에 이미지 명시

`pubspec.yaml` 파일의 assets 부분에 해당 이미지를 명시해야한다.

``` yaml
flutter:
  assets:
    - assets/background.jpeg
```

<br>

준비 작업은 끝났으니, 이제 `Scaffold`에 배경 이미지를 추가하는 두가지 방법에 대해 알아보자.

## 방법1

첫번째 방법은 `Scaffold`를 `Container`으로 감싸고, 해당 `Container`에 이미지를 씌우는 것이다.

``` dart
Container(
  decoration: BoxDecoration(
    image: DecorationImage(
      fit: BoxFit.cover,
      image: AssetImage('assets/background.jpeg'), // 배경 이미지
    ),
  ),
  child: Scaffold(
    backgroundColor: Colors.transparent, // 배경색을 투명으로 설정
  ),
)
```

이때 `Scaffold`의 `backgroundColor`를 `Colors.transparent`(투명)으로 설정해야한다. 그렇게 하지 않으면 `Scaffold`의 기본 배경색 때문에 뒤의 이미지가 보이지 않는다.

## 방법2

두번째 방법은 반대로 `Scaffold`의 `body` 안에 이미지를 씌운 `Container`를 넣는 것이다. 

``` dart
Scaffold(
  resizeToAvoidBottomInset: false, // 키보드가 올라와도 배경 이미지가 밀려 올라가지 않도록
  body: Container(
    decoration: BoxDecoration(
      image: DecorationImage(
        fit: BoxFit.cover,
        image: AssetImage('assets/background.jpeg'), // 배경 이미지
      ),
    ),
  ),
)
```

이 방법으로 구현 시 배경 이미지가 `Scaffold` 안에 있어서 생기는 문제점이 있다. 키보드가 올라오면 `Scaffold`와 함께 배경 이미지도 위로 올라간다는 점이다. 이것을 해결하기 위해 `resizeToAvoidBottomInset`를 `false`로 설정했다.

그런데 `resizeToAvoidBottomInset`를 `false`로  설정하는 것도 문제가 있다. 애초에 키보드가 올라올 때`Scaffold`도 같이 올라가는 이유가 화면 하단에 위치한 텍스트 필드가 키보드에 가리지 않게 하기 위함이다. 그런데 화면을 못 올라오게 강제로 막는 것이다. 그렇게 되면 화면 하단에 위치한 텍스트 필드는 키보드에 가려지고, 사용자는 타자를 치면서도 본인이 입력하는 내용을 확인할 수 없는 문제가 발생한다.

이런 문제 때문에 첫번째 방법을 더 선호한다. 물론 키보드를 사용하지 않는 화면이라면 두 방법 중 무엇을 사용해도 상관없다.
