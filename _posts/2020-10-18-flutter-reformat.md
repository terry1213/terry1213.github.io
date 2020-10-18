---
title: "[Flutter] 코드 자동 정렬(Reformat) 하는 법"
categories:
- Flutter
tags:
- Mobile
- iOS
- Android
- Tip
---

열심히 프로그래밍을 하다보면 간혹 분명 내가 짠 코드인데 알아보기가 어려울 때가 있다. 코드를 짤 때 identation을 완벽하게 한다면 괜찮겠지만 사실 완벽하게 하기는 어렵다. 이는 Flutter에서도 마찬가지이다.

Flutter에서는 괄호 뒤에 자동으로 주석을 달아주는 기능을 제공하기 때문에 코드의 구조를 파악하기 쉬운 편이다. 하지만 위와 같은 상황은 무조건 생기기 마련이다. 그럴 때 필요한 게 코드를 자동으로 정렬해주는 기능이다.

## 구조를 파악하기 어려운 코드 예시

![Example1](/assets/flutter/Reformat/Reformat Example1.png){: width="500" height="500"}

위와 같은 코드는 간단한 코드이지만 구조를 파악하기가 어렵다. 더 복잡한 코드라면 구조를 파악하기가 더 어려워질 것이다. 

## 해결 방법 (Mac 기준)

해결 방법은 매우 간단하다.

자동 정렬을 하고 싶은 파일에서 손가락 두 개로 클릭 혹은 control 키를 누른 체로 손가락 한 개로 클릭을 하면(윈도우는 우클릭) 아래와 같은 메뉴가 뜬다.

![Example2](/assets/flutter/Reformat/Reformat Example2.png){: width="300" height="200"}

여기서 중간에 'Reformat Code with dartfmt'를 클릭하면

![Example3](/assets/flutter/Reformat/Reformat Example3.png){: width="400" height="300"}

이와 같이 코드가 사용자가 구조를 파악하기 쉬운 형태로 정렬되는 것을 볼 수 있다.
