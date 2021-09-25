---
title: "[Flutter] Failed to start the Dart CLI isolate(null). 에러"
categories:
- Flutter
tags:
- Error
---

오늘 특정 프로젝트의 패키지를 최신 버전으로 변경하는 작업을 진행했다. 버전 변경 중 특정 패키지의 디펜던시 문제 때문에 Flutter를 최신 버전으로 업그레이드했다.


불행히도 업그레이드 후, 문제가 발생했다. 모든 flutter 명령어가 먹통이 되었고 계속해서 다음과 같은 에러 메시지만 출력되었다.

## 에러 내용

``` console
Failed to start the Dart CLI isolate(null).
```

## 에러 원인
 
찾아보니 필자처럼 Flutter 버전 업그레이드 이후 해당 에러가 발생했다는 사람들이 꽤 있었다. 특정 버전 문제는 아닌 거 같고 버전 업그레이드 과정에서 이상이 생긴 것 같다.

## 해결 방법

이전에 비슷한 에러가 발생한 적이 있었다. 에러 내용 자체는 달랐지만 모든 flutter 명령어가 실행되지 않던 현상이 똑같았다.

그래서 그때처럼 `bin/cache` 디렉토리를 삭제하면 되지 않을까 싶었다. 아래는 `bin/cache` 디렉토리를 삭제하는 명령어이다.

``` console
sudo rm -r {flutter_directory}/bin/cache
```

> `{flutter_directory}`는 Flutter를 설치한 경로를 의미한다. 이는 사람마다 다르기 때문에 본인이 설치한 경로를 입력해야한다. 해당 경로를 모르겠다면 `which flutter` 명령어를 입력하여 알 수 있다. <br><br>
> `sudo`는 관리자 권한이 있어야 삭제할 수 있는 파일들을 삭제하기 위해 사용했다.

다행히 `bin/cache` 디렉토리를 삭제하자 flutter 명령어들이 정상적으로 작동했다.

사실 이 방법으로 에러가 해결된 정확한 이유는 모르겠다. 혹시 더 정확한 해결법과 원인을 알게 되면 이후에 해당 내용을 추가하겠다.
