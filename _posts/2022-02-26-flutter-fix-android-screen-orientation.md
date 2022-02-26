---
title: "[Flutter] 안드로이드 화면 방향 고정하는 방법"
categories:
- Flutter
tags:
- Tip
---

Flutter에서는 Dart 코드를 통해 한번에 ios와 안드로이드의 화면 방향을 고정할 수 있다. 이전에 [이에 대한 글](https://terry1213.github.io/flutter/flutter-how-top-fix-the-screen-orientation/)을 작성한 적도 있다.

그런데 위와 같은 방법으로 화면을 세로로 고정했더니 생각지도 못한 문제가 생겼다.

현재 개발 중인 Flutter 앱에는 네이티브 스플래시 이미지를 적용된 상태였다. 안드로이드에서는 홈에서도 화면을 가로로 만들 수 있는데 이 상태에서 앱을 실행하면 네이티브 쪽 스플래시 이미지가 가로로 보이게 된다. 물론 1~2초 내에 Flutter가 실행되면서 화면은 세로로 돌아오게 되지만, 거슬리는 부분이기 때문에 고치는 것이 좋다고 생각했다.

## 안드로이드 화면 방향 고정 방법

Flutter와 관계 없는 문제이기 때문에 네이티브 쪽만 건들이면 된다.

### AndroidManifest.xml 설정 추가

``` xml
<activity
  android:name=".MainActivity"
  ...생략...
  android:screenOrientation="portrait">
```

`AndroidManifest.xml` 파일에서 `activity`에 `android:screenOrientation="portrait"`를 추가하면 된다. 이제 다시 앱을 빌드하면 네이티브 스플래시 이미지도 세로로 고정되어 보일 것이다.
