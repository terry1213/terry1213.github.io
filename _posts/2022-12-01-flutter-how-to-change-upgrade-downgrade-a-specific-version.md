---
title: "[Flutter] Flutter 특정 버전 변경(업그레이드, 다운그레이드)하는 법"
categories:
- Flutter
tags:
- Tip
---

Flutter 버전을 변경하는 방법에는 `flutter` 명령어를 사용하는 방법이 있고, 이에 해당하는 명령어는 다음과 같다.

* flutter channel: 특정 채널(master, beta, stable 등)로 flutter 버전을 변경한다.
* flutter downgrade: 현재 최신 버전의 직전 버전으로 변경한다.
* flutter upgrade: 현재 최신 버전으로 변경한다.

하지만 위의 명령어들로는 한정된 버전들로만 변경이 가능하다. 그렇다면 꽤 옛날 버전으로 변경하고 싶다면 어떻게 해야할까?

## 해결 방법

직접 git을 사용해 버전(브랜치)을 변경해야한다.

우선 flutter가 설치된 디렉토리로 이동한다. 만약 설치된 디렉토리가 어딘지 모르겠다면 `which flutter` 명령어를 사용해 알 수 있다.

``` console
which flutter
/Users/terry/Development/flutter/bin/flutter
```

여기서 뒤의 `/bin/flutter`를 뺀 부분이 flutter가 설치된 디렉토리가 된다.

해당 디렉토리로 이동 후, `git checkout` 명령어를 통해 사용하고자 하는 버전의 브랜치로 변경한다.

``` console
git checkout 2.10.5(원하는 버전)
```

그리고 나서 아무 flutter 명령어나 사용하면 자동으로 해당 버전으로 설정이 시작된다.

마지막으로 `flutter --version` 명령어를 통해 원하는 버전으로 잘 바뀌었는지를 확인하면 되겠다.
