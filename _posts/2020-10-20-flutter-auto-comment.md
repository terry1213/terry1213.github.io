---
title: "[Flutter] 자동 주석 기능(Auto Comment)"
categories:
- Flutter
tags:
- Tip
---

Flutter에선 괄호 뒤에 자동으로 주석을 달아주는 편리한 기능을 제공한다. 덕분에 코드의 구조를 더 쉽게 파악할 수 있다.
그런데 사용하다가 보면 해당 기능이 꺼져있어서 다시 키고 싶을 수 있다. 혹은 반대로 주석 때문에 난잡하다고 생각해서 해당 기능을 끄고 싶을 때가 있다.

## 해결방법

![Example1](/assets/flutter/AutoComment/AutoComment Example1.png){: width="200" height="500"}

좌측 상단에서 Android Studio - Preferences 로 들어간다.

![Example2](/assets/flutter/AutoComment/AutoComment Example2.png){: width="600" height="500"}

그럼 위와 같은 창이 뜨게 되고 Languages & Frameworks - Flutter로 들어간다. 중간에 Show closing labels in Dart source code의 체크 박스를 볼 수 있다. 자동 주석 기능을 사용하고 싶다면 체크, 사용하지 않고 싶다면 체크 해제 후 OK를 누르면 적용된다.

## 자동 주석 기능 사용 시

![Example3](/assets/flutter/AutoComment/AutoComment Example3.png){: width="500" height="500"}

## 자동 주석 기능 해제 시

![Example4](/assets/flutter/AutoComment/AutoComment Example4.png){: width="500" height="500"}
