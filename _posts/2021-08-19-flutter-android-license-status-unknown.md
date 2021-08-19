---
title: "[Flutter] 'Android license status unknown.' 에러"
categories:
- Flutter
tags:
- Error
---

## 에러 내용

`flutter doctor -v` 명령어를 입력했더니 처음 보는 문제가 발생했다.

``` console
[!] Android toolchain - develop for Android devices (Android SDK version 30.0.2)
    • Android SDK at /Users/Terry/Library/Android/sdk
    • Platform android-30, build-tools 30.0.2
    • Java binary at: /Applications/Android
      Studio.app/Contents/jre/jdk/Contents/Home/bin/java
    • Java version OpenJDK Runtime Environment (build 11.0.10+0-b96-7281165)
    ✗ Android license status unknown.
      Run `flutter doctor —android-licenses` to accept the SDK licenses.
      See https://flutter.dev/docs/get-started/install/macos#android-setup for
      more details.
```

바로 `Android license status unknown.` 에러다.

## 에러 원인

`Android SDK Tool` 중에 `Android SDK Command-line Tools`가 없어서 에러가 발생하는 것이다.

## 해결 방법

따라서 `Android SDK Command-line Tools`를 설치해주면 이 문제를 해결할 수 있다.

설치하는 방법은 간단하다.

`Android Studio` > `Preferences`로 들어간다.

![](/assets/flutter/Error/android-license status-unknown/Example1.png)

그 다음, 왼쪽 사이드 바에서 `Appearance & Behavior` > `System Settings` > `Android SDK` 순서로 들어간다.

![](/assets/flutter/Error/android-license status-unknown/Example2.png)

`SDK Tools` 탭의 `Android SDK Command-line Tools` 체크 박스를 선택하고 `OK` 버튼을 눌러준다.

![](/assets/flutter/Error/android-license status-unknown/Example3.png)

## 결과 확인

`flutter doctor -v` 명령어를 입력해서 결과를 확인해보자.

``` console
[✓] Android toolchain - develop for Android devices (Android SDK version 30.0.2)
    • Android SDK at /Users/Terry/Library/Android/sdk
    • Platform android-30, build-tools 30.0.2
    • Java binary at: /Applications/Android
      Studio.app/Contents/jre/jdk/Contents/Home/bin/java
    • Java version OpenJDK Runtime Environment (build 11.0.10+0-b96-7281165)
    • All Android licenses accepted.
```

`Android license status unknown.` 에러가 사라지고 안드로이드 라이센스가 정상적으로 추가되었다.
