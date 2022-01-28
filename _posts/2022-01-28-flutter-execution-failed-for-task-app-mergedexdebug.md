---
title: "[Flutter] Execution failed for task ':app:mergeDexDebug'. 에러"
categories:
- Flutter
tags:
- Error
---

개발을 하다 다음과 같은 에러가 발생했다.

``` dart
Execution failed for task ':app:mergeDexDebug'.
```

해당 에러의 원인과 해결 방법은 안드로이드 개발자 사이트의 [사용자 가이드](https://developer.android.com/studio/build/multidex#mdex-gradle){:target="\_blank"} 내에서 찾을 수 있었다.

## 원인

`minSdkVersion`이 20 이하로 설정되어 있으면 멀티덱스 라이브러리를 사용해야한다. 그런데 `minSdkVersion`이 20 이하임에도 관련 설정이 되어있지 않으면 해당 에러가 발생하는 것이라고 한다.

`android/app/build.gradle` 파일을 열어서 `minSdkVersion`를 확인해보자. 20 이하로 설정되어 있을 것이다.

## 해결 방법

`android/app/build.gradle` 파일을 다음과 같이 수정하여, 멀티덱스를 사용하도록 설정하고 멀티덱스 라이브러리를 종속 항목으로 추가해야한다.

``` gradle
android {
    defaultConfig {
        ...
        minSdkVersion 15
        targetSdkVersion 28
        multiDexEnabled true // 멀티덱스를 사용하도록 설정.
    }
    ...
}

dependencies {
    implementation "androidx.multidex:multidex:2.0.1" // 멀티덱스 라이브러리를 종속 항목으로 추가.
}
```

이제 다시 앱을 실행하면 에러가 사라진 것을 확인할 수 있을 것이다.
