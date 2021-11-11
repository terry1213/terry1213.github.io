---
title: "[Flutter] Android Studio에서 아이콘 미리보기(Icon Preview) 설정법"
categories:
- Flutter
tags:
- Tip
---

Flutter가 2.5 버전이 나온지도 2달이 지났다. 매일 업데이트 노트를 읽어보자 생각만 하고 미루다가 드디어 다 읽었다. 정말 다양한 부분에서 여러 개선 사항들이 있었다.


그 중 되게 사소한 부분이지만 한번 써보고 싶은 기능이 있었다. 바로 Android Studio 부분에서 추가된 아이콘 미리보기 기능이다.

사실 아이콘 미리보기 기능이 아예 없던 기능은 아니다.

![](/assets/flutter/Tip/icon-preview/Example1.png)

사진에도 볼 수 있듯이 기본 아이콘과 `CupertinoIcons`에 대해선 에디터 왼쪽에 미리보기가 지원된다. 그치만 기본 아이콘만 사용하는 사람은 거의 없다. 대부분 아이콘 패키지를 추가해서 더 다양하고 이쁜 아이콘들을 사용하고 있을 것이다.

하지만 이렇게 패키지로 추가된 아이콘들은 미리보기가 지원되지 않는다. 위의 사진에서도 아래 3개의 아이콘은 앱을 돌려서 화면을 통해 확인하거나, 아이콘 패키지를 제공하는 곳의 사이트를 방문해서 확인해야한다.

그래서 매번 이 아이콘 써보고 핫 리로드해서 확인하고, 저 아이콘 써보고 다시 핫 리로드해서 확인하고를 반복해왔다. 사소한 부분이지만 너무 불편했다.

그런데 나만 불편한 게 아니었나보다. 이번 2.5 버전 업데이트에서 패키지로 추가한 아이콘들에 대해 미리보기를 지원하는 기능이 추가되었다.

## 적용 방법

![](/assets/flutter/Tip/icon-preview/Example2.png)

상단에서 **Android Studio** > **Preference** 순서로 들어간다.

![](/assets/flutter/Tip/icon-preview/Example3.png)

여기서 화면 좌측에서 **Languages & Frameworks** 를 클릭하고, 하위 메뉴 중 **Flutter**를 선택한다.

![](/assets/flutter/Tip/icon-preview/Example4.png)

이제 스크롤을 쭉 내려서 아래로 가면 **Font Packages** 텍스트 필드가 나온다. 여기에 본인이 사용하는 아이콘 패키지 이름들을 적는다.

마지막으로 **OK** 버튼을 눌러주면 끝난다.

![](/assets/flutter/Tip/icon-preview/Example5.png)

잠시 기다리니 모든 아이콘들에 대해서 미리보기가 가능해진 것을 확인할 수 있다. 이제 핫리로드를 반복할 필요없다!!
