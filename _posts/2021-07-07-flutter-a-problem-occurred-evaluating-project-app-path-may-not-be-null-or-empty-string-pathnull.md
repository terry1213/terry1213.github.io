---
title: "[Flutter] A problem occurred evaluating project ':app'. > path may not be
  null or empty string. path='null' 에러"
categories:
- Flutter
tags:
- Error
---

기존 어플에 새로운 기능을 추가하고 나서 잘 돌아가는지 확인하는 작업을 진행하고 있었다. 안드로이드 에뮬레이터를 키고 어플을 실행하는데 갑자기 다음과 같은 에러가 발생했다.

## 에러 내용

``` console
FAILURE: Build failed with an exception.

* Where:
Build file 'directory\progject\android\app\build.gradle' line: 57

* What went wrong:
A problem occurred evaluating project ':app'.
> path may not be null or empty string. path='null'
```

## 에러 원인

원인을 찾아보니 `android\app\build.gradle` 파일의 signingConfigs와 buildTypes에 있는 release 부분 때문에 발생한 에러였다. 

## 해결 방법

그렇다면 해결 방법은 어떻게 될까?

``` dart
/*
    signingConfigs {
        release {
          // 생략
        }
    }

    buildTypes {
        release {
          // 생략
        }
    }
*/
```

간단한 원인이었다보니 해결 방안도 간단했다. 해당 부분을 다음과 같이 주석 처리해주면 된다. 현재 해당 어플을 릴리즈를 하는 것이 아니라 디버깅 및 테스팅을 위한 실행이기 때문이다.

> 이 [스택오버플로우 답글](https://stackoverflow.com/a/57515614){:target="_blank"}을 참고했다.
