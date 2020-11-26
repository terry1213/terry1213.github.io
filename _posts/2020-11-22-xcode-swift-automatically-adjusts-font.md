---
title: "[Xcode] [Swift] 폰트 자동 조절(Automatically Adjusts Font) 기능"
categories:
- Swift
- Xcode
tags:
- iOS
- Mobile
---

가끔 어르신들 핸드폰을 보면 텍스트가 필자의 핸드폰의 텍스트보다 훨씬 클 때가 있다. 텍스트 크기를 설정 기능을 제공하고 있기 때문에 유저는 이를 사용해 텍스트 크기를 자유롭게 변경할 수 있다. 아이폰도 마찬가지이다. 필자의 아버지도 아이폰을 사용하시는데 텍스트 크기를 많이 크게 해놓으셨다.

텍스트 크기 설정을 변경하게 되면 아이폰의 기본 어플들은 전부 텍스트 크기가 변경된다. 하지만 기본 어플이 아닌 어플들 중 일부는 텍스트 크기 설정을 변경하게 되어도 어플 내에서의 텍스트 크기에 변화가 없다. 이 글을 쓰게 된 계기도 왜 몇몇 어플은 설정이 적용이 되지 않을까 하는 의문에서 왔다.

## 환경 준비

![Example1](/assets/swift/Label/AutomaticallyAdjustsFont/Example1.png){: width="300" height="400"}

우선 Label을 뷰 가운데 올려둔다.

![Example2](/assets/swift/Label/AutomaticallyAdjustsFont/Example2.png){: width="300" height="400"}
![Example3](/assets/swift/Label/AutomaticallyAdjustsFont/Example3.png){: width="150" height="400"}

해당 Label을 클릭하고 우측 메뉴에서 Font를 Custom이 아닌 다른 것으로 설정한다. Custom으로 선택 시 텍스트 크기가 고정이 되기 때문이다. 예시에서는 Headline으로 선택했다. 

![Example4](/assets/swift/Label/AutomaticallyAdjustsFont/Example4.png){: width="300" height="400"}

Automatically Adjusts Font 기능을 선택하여준다.

![Example5](/assets/swift/Label/AutomaticallyAdjustsFont/Example5.png){: width="300" height="400"}

그러고 나서 시뮬레이터에서 실행을 해보면 다음과 같은 화면이 나오는 것을 확인할 수 있다.

##  텍스트 크기 변경 방법
이제 아이폰 설정에서 텍스트 크기를 변경해보자.

![Example6](/assets/swift/Label/AutomaticallyAdjustsFont/Example6.png){: width="300" height="400"}
![Example7](/assets/swift/Label/AutomaticallyAdjustsFont/Example7.png){: width="300" height="400"}

![Example8](/assets/swift/Label/AutomaticallyAdjustsFont/Example8.png){: width="300" height="400"}
![Example9](/assets/swift/Label/AutomaticallyAdjustsFont/Example9.png){: width="300" height="400"}

'설정'(Setting) - '손쉬운 사용'(Accessibility) - '디스플레이 및 텍스트 크기'(Display & Text size) - '더 큰 텍스트'(Larger Text) 를 순서대로 클릭한다. 그 후 화면에 상단의  '글자 더 크게 조절'(Larger Accessibility Sizes) 을 켜주고 하단의 버튼을 오른쪽으로 끌어서 텍스트 크기를 크게 설정한다. 이렇게 하면 텍스트 크기 변경 설정이 끝난다.

## 텍스트 크기 변경 적용 확인
이제 아까 실행해놨던 어플을 다시 들어가보자.


| ![Example5](/assets/swift/Label/AutomaticallyAdjustsFont/Example5.png){: width="300" height="400"} | ![Example10](/assets/swift/Label/AutomaticallyAdjustsFont/Example10.png){: width="300" height="400"} |
| -------- | -------- |
| 설정 변경 이전 | 설정 변경 이후 |




코드를 변경하지 않았지만 설정에 따라 텍스트 크기가 자동으로 변경된 것을 볼 수 있다.
