---
title: "[Xcode] [Swfit] 코드 재정렬(Re-Indent) 방법"
tags:
- Mobile
- iOS
- Tip
categories:
- Swift
---

열심히 프로그래밍을 하다보면 간혹 분명 내가 짠 코드인데 알아보기가 어려울 때가 있다. 코드를 짤 때 identation을 완벽하게 한다면 괜찮겠지만 사실 완벽하게 하기는 어렵다. 이는 Xcode에서도 마찬가지이다. 그럴 때 필요한 게 코드를 재정렬해주는 기능이다.

## 정렬 전 코드 예시

![Example1](/assets/swift/Re-Indent/Re-Indent Example1.png){: width="400" height="200"}

위와 같은 코드는 간단한 코드이지만 더 복잡한 코드라면 구조를 파악하기가 어려워질 것이다. 

## 해결 방법 (Mac 기준)

해결 방법은 매우 간단하다.

![Example2](/assets/swift/Re-Indent/Re-Indent Example2.png){: width="400" height="200"}

자동 정렬을 하고 싶은 코드를 드래그한다.

![Example3](/assets/swift/Re-Indent/Re-Indent Example3.png){: width="300" height="500"}

상단 메뉴에서 'Editor' - 'Structure' - 'Re-Indent'를 찾아 클릭하면,

![Example4](/assets/swift/Re-Indent/Re-Indent Example4.png){: width="400" height="200"}

이와 같이 코드가 재정렬되는 것을 볼 수 있다.

## 단축키 (Mac 기준)

'**option + A**' 를 통해서 코드 전체를 선택하고 '**control + I**' 를 통해 더 간편하게 재정렬을 할 수도 있다.
