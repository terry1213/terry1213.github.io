---
title: "[Xcode] The use of Swift 3 @objc inference in Swift 4 mode is deprecated 경고"
categories:
- Xcode
tags:
- Warning
---

Xcode 빌드 중에 아래와 같은 경고가 발생했다.

## 경고 내용

``` console
The use of Swift 3 @objc inference in Swift 4 mode is deprecated. Please address deprecated
@objc inference warnings, test your code with “Use of deprecated Swift 3 @objc inference”
logging enabled, and disable Swift 3 @objc inference.
```

## 원인

Swift 4 이전에는 컴파일러가 기본적으로 Objective-C 코드를 자동으로 인식했다. 이를 @objc inference이라고 한다. 하지만 Swift 4에서는 @objc inference 기능을 사용 여부를 설정할 수 있다. 해당 경고는 @objc inference가 켜져 있어서 옛날 방식의 코드가 작동되도록 설정되어 있기 때문에 발생하는 것이다.


## 해결 방법

`TARGETS` > `Build Settings`에서 `Swift 3 @objc Inference`을 `Default`로 변경하면 더 이상 경고가 보이지 않게 된다.

![Swift3@objcInferenceError](/assets/swift/Warning/Swift3@objcInference.png)
