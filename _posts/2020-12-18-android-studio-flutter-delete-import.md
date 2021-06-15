---
title: "[Android Studio] 사용하지 않는 import 자동 삭제"
categories:
- AndroidStudio
tags:
- Tip
---

개발을 하다보면 import 해야할 것들이 점점 많아진다. 그리고 한번 import 했다가도 사용하지 않게 될 때도 있다.

![Example1](/assets/flutter/DeleteImport/Example1.png)

그런데 이 때 import 했던 것을 지우는 걸 까먹으면 해당 import가 검정색으로 보인다.

## 사용하지 않는 import 자동 삭제

그럼 이제부터 저런 사용하지 않는 import를 자동으로 삭제하는 방법을 알아보자.

![Example2](/assets/flutter/DeleteImport/Example2.png){: width="500" height="400"}

파일, 폴더, 프로젝트 등 모든 단위로 가능하니 적용하려는 곳을 우클릭한다. 그리고 메뉴에서 'Optimaze Imports' 클릭한다.

![Example3](/assets/flutter/DeleteImport/Example3.png)

다시 아까 봤던 파일을 다시 확인해보면 사용하지 않는 import가 사라진 것을 볼 수 있다.

## 단축키 (Mac 기준)
**control + option + o**
