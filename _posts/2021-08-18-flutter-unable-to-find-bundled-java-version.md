---
title: "[Flutter] Unable to find bundled Java version. 에러"
categories:
- Flutter
tags:
- Error
---

안드로이드 스튜디오를 Arctic Fox 버전으로 업데이트했다. 업데이트 후 iOS 시물레이터에선 Flutter 어플이 정상적으로 돌아갔지만, Android 에뮬레이터에서 실행하려고 하니 빌드 자체가 되질 않았다.

## 에러 내용

원인이 무엇인가 싶어서 `flutter doctor -v` 명령어를 입력했다. 그랬더니 아래와 같은 결과가 나왔다.

``` console
[!] Android Studio (version 2020.3)
    • Android Studio at /Applications/Android Studio.app/Contents
    • Flutter plugin can be installed from:
      🔨 https://plugins.jetbrains.com/plugin/9212-flutter
    • Dart plugin can be installed from:
      🔨 https://plugins.jetbrains.com/plugin/6351-dart
    ✗ Unable to find bundled Java version.
    • Try updating or re-installing Android Studio.
```

다른 부분들은 전부 정상이었고 `Unable to find bundled Java version.` 하나가 문제였다.

## 에러 원인

`Unable to find bundled Java version.`는 설치된 Java를 찾지 못해서 발생하는 에러이다.

그렇다면 정상적이었던 Java와의 연결이 왜 안드로이드 스튜디오를 Arctic Fox 버전으로 업데이트한 이후에 끊겼을까?

이는 Arctic Fox 버전부터 Mac 환경에서 안드로이드 스튜디오의 Java Path가 변경되었는데, Flutter에선 이를 따로 처리해주지 않기 때문이다.

### Flutter 내부 코드에서의 Java Path

우선 Flutter 내부 코드에서는 Java Path를 어떻게 설정하고 있는지를 확인해보자.

[packages/flutter_tools/lib/src/android/android_studio.dart 465번째 줄](https://github.com/flutter/flutter/blob/3c72ef374d748ef07bb2f6781161fa6bcb0b4289/packages/flutter_tools/lib/src/android/android_studio.dart#L465){:target="_blank"}

``` dart
globals.fs.path.join(directory, 'jre', 'jdk', 'Contents', 'Home')
```

위의 코드를 보면 Flutter 내부 코드에서는 Java Path를 `jre/jdk/Contents/Home`로 설정한 것을 알 수 있다.

### 안드로이드 스튜디오의 Java Path

그럼 이번에는 안드로이드 스튜디오의 Java Path를 확인해보자.

아래의 명령어를 통해 `jre` 디렉토리로 이동하고 내부 파일 목록을 확인한다.

``` console
cd /Applications/Android\ Studio.app/Contents/jre
ls
```

그럼 다음과 같이,

``` console
Contents
```

`jdk` 디렉토리는 없고 `Contents` 디렉토리가 바로 나올 것이다.
 
 안드로이드 스튜디오의 Java Path는 `jre/Contents/Home` 인 것이다.

## 해결 방법

그렇다면 이 문제의 해결하기 위해서는 Flutter 내부 코드에서 설정한 Java Path과 안드로이드 스튜디오의 Java Path를 동일하게 만들어 주어야 한다. Flutter 내부 코드를 변경하는 것은 어려우니  안드로이드 스튜디오 쪽의 Java Path을 Flutter 내부 코드에 맞춰서 변경해보자.

### 안드로이드 스튜디오의 Java Path 변경

`jre` 디렉토리와 `Contents` 디렉토리 사이에  `jdk` 디렉토리를 만들면 해결된다. 실제로 디렉토리를 만들어도 되지만 이보다는 심볼릭 링크를 사용해서 가상 디렉토리를 만드는 방법을 선택했다.

`jre` 디렉토리에서 다음 명령어를 입력하여 `jdk` 이름으로 심볼릭 링크를 생성하자.

```
ln -s ../jre jdk
```

이제 `jre` 디렉토리와 `Contents` 디렉토리 사이에서 `jdk` 심볼릭 링크가 가상의 디렉토리 역할을 하게 된다. 따라서 Flutter 내부 코드와 동일하게 `jre/jdk/Contents/Home` Path로 Java에 접근할 수 있게 되었다.

## 결과 확인

`flutter doctor -v` 명령어를 입력해서 결과를 확인해보자.

``` console
[✓] Android Studio (version 2020.3)
    • Android Studio at /Applications/Android Studio.app/Contents
    • Flutter plugin can be installed from:
      🔨 https://plugins.jetbrains.com/plugin/9212-flutter
    • Dart plugin can be installed from:
      🔨 https://plugins.jetbrains.com/plugin/6351-dart
    • Java version OpenJDK Runtime Environment (build 11.0.10+0-b96-7281165)
```

`Unable to find bundled Java version.` 에러가 사라지고 Java가 정상적으로 연결된 것을 볼 수 있다.

## 참고

* <https://github.com/flutter/flutter/issues/76215#issuecomment-864407892>{:target="_blank"}
* <https://stackoverflow.com/a/68575967>{:target="_blank"}
