---
title: '[Flutter] Could not find a file named "pubspec.yaml" 에러'
categories:
- Flutter
tags:
- Error
---

Flutter 채널을 변경하던 중에 갑자기 아래와 같은 에러가 발생해서 고생을 했다.

## 에러 내용

``` console
Building flutter tool...
Could not find a file named "pubspec.yaml" in "/{path_to_flutter}/.pub-cache/hosted/pub.dartlang.org/json_annotation-3.1.1".
Error: Unable to 'pub upgrade' flutter tool. Retrying in five seconds... (9 tries left)
```

## 원인

채널은 자주 바꿨는데 한번도 생기지 않았던 에러라서 원인을 정확히 모르겠다. 하지만 에러 메시지를 보면 남아있던 캐시로 인한 에러인 것으로 보인다.

## 해결 방법

`flutter doctor`와 같은 여러 Flutter 명령어들을 통해 해결해보려고 했다. 하지만 어떤 Flutter 명령어를 실행해도 계속 같은 에러만 발생했다. 아마 채널을 바꾸던 중에 발생한 에러라서 이 에러가 해결되어야 다른 것들을 사용할 수 있는 것으로 생각된다.

해결법은 간단했다. 해당 캐시 폴더(`.pub-cache`)를 삭제하니 바로 정상적으로 돌아왔다. 아예 Flutter를 다시 깔아야하나 걱정했는데 다행이다.

``` console
sudo rm -r /{path_to_flutter}/.pub-cache
```
