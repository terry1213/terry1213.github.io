---
title: "[Android Studio] 전체 변경(Replace All)"
categories:
- AndroidStudio
tags:
- Tip
---

Android Studio를 통해 개발할 때 변수나 함수의 이름을 변경해야할 때가 있다. 그런데 만약 이름을 변경하려는 변수나 함수가 너무 많은 파일에서 사용되었다면 이를 하나씩 전부 찾아서 변경하는 건 불가능하다. 이런 경우에 **전체 변경(Replace All)** 기능을 사용하면 된다.

## Edit - Find - Replace in Path..

![Example1](/assets/androidstudio/replaceall/Example1.png){: width="250" height="400"}
![Example2](/assets/androidstudio/replaceall/Example2.png){: width="250" height="400"}

`Edit - Find - Find in Path..`순서로 클릭하면 아래와 같은 화면이 나온다. 두 개의 입력칸 중 위의 입력칸을 통해 **변경할 단어**를 검색하고 아래 입력칸을 통해 변경할 단어가 **변경될 단어**를 정하면 된다.

![Example3](/assets/androidstudio/replaceall/Example3.png){: width="500" height="500"}
## Command + Shift + R (Mac)

`Command + Shift + R`를 눌러도 위의 방법과 동일한 화면이 나온다.

> Window의 경우, **Control + Shift + R** 이다!
