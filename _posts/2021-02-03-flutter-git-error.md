---
title: "[Flutter] 채널 변경 및 업그레이드 실패 에러(git error)"
categories:
- Flutter
tags:
- Error
---

Flutter 채널을 변경하던 중에 갑자기 아래와 같은 에러가 발생해서 당황했던 적이 있다. 이는 Flutter 에러가 아니라 git 에러이다. 

## 에러 내용

``` console
Switching to flutter channel 'stable'...
git: error: The following untracked working tree files would be overwritten by checkout:
.
.
.
git: Aborting
Switching channels failed with error code 1.
```

## 해결 방법

flutter가 설치되어 있는 디렉토리로 이동해서 아래의 명령어를 실행하면 된다.

> flutter를 설치한 디렉토리는 사람마다 다르기 때문에 본인이 설치한 디렉토리를 알아야한다. 모르겠다면 `which flutter` 명령어를 입력하여 알 수 있다.

``` console
git clean -xfd
```

> 출처: [https://stackoverflow.com/questions/52397496/flutter-upgrade-fail](https://stackoverflow.com/questions/52397496/flutter-upgrade-fail)
