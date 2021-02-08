---
title: "[Xcode] ARCHS[@]: unbound variable Command PhaseScriptExecution failed with
  a nonzero exit code 에러"
categories:
- Xcode
tags:
- iOS
- Error
---

Xcode 빌드 중에 아래와 같은 에러가 발생했다.

## 에러 내용

``` console
ARCHS[@]: unbound variable
Command PhaseScriptExecution failed with a nonzero exit code
```

## 원인

정확한 이유는 모르겠다. 아래의 표에서 알 수 있듯이 사용하는 아키텍처가 디바이스마다 다른데 이와 관련이 있는 것 같다.

| 아키텍처     	| 사용되는 디바이스          	|
|------------------	|-------------------	|
| ARM v6 (32-bit)  	| iPhone 2G, 3G     	|
| ARM v7 (32-bit)  	| iPhone 3GS, 4, 4S 	|
| ARM v7s (32-bit) 	| iPhone 5          	|
| ARM64            	| iPhone 5s 이상       	|

## 해결 방법


`TARGETS` > `Build Settings`에서 `VALID_ARCHS`를 `$(ARCHS_STANDARD)`로 설정했다. 다시 빌드 해보니 에러가 사라진 것을 확인할 수 있었다.

> **새로 알게된 정보**: Xcode 12 부터 `VALID_ARCHS`를 사용하지 않아서 생기는 에러라고 한다. 그래서 위와 같은 방법 말고도 `VALID_ARCHS` 부분을 아예 삭제하여 해결할 수도 있다.

![ARCHSError](/assets/swift/Error/ARCHS.png)
