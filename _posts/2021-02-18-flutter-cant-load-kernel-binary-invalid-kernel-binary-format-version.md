---
title: "[Flutter] Can't load Kernel binary: Invalid kernel binary format version 에러"
categories:
- Flutter
tags:
- Mobile
- iOS
- Android
- Error
---

아침에 작업을 하려고 Flutter를 켰는데 아래와 같은 에러가 떴다. 어떤 명령어를 입력해도 해당 에러만 떠서 너무 당황했다\...

## 에러 내용

``` console
Can't load Kernel binary: Invalid kernel binary format version.
```

## 원인

에러가 발생한 정확한 시점을 모르겠다. 어제까지는 아무 문제가 없다가 갑자기 오늘 아침에 에러가 터졌다. 찾아보니 Flutter의`bin/cache` 디렉토리의 문제라는 의견도 있었고 `bin/cache/flutter_tools.stamp` 파일의 문제라는 의견도 있었다.

## 해결 방법

`flutter_tools.stamp`이 `bin/cache` 디렉토리 안에 있으니 `flutter_tools.stamp`부터 삭제해보고 문제가 해결되지 않으면 `bin/cache` 디렉토리까지 삭제해보려했다.

``` console
rm {flutter_directory}/bin/cache/flutter_tools.stamp
```

> `{flutter_directory}`는 Flutter를 설치한 경로를 의미한다. 이는 사람마다 다르기 때문에 본인이 설치한 경로를 입력해야한다. 해당 경로를 모르겠다면 `which flutter` 명령어를 입력하여 알 수 있다.

다행히 `flutter_tools.stamp` 파일을 삭제하자 에러가 사라졌다. 만약 `flutter_tools.stamp` 파일 삭제 후에도 에러가 해결되지 않았다면 `bin/cache` 디렉토리까지 삭제해보길 바란다. 이렇게 해도 해결되지 않는다면 Flutter SDK 재설치를 추천한다.(막상 재설치 해보면 얼마 안 걸리는데 하기 귀찮은 방법이다\...ㅠ)
