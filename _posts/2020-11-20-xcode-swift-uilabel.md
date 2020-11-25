---
title: "[Xcode] [Swift] UILabel 기본 정리"
---

## UILabel 생성 방법

작업할 프로젝트를 열어준다.
<br><br><br>

![Example1](/assets/swift/Label/Create/Example1.png){: width="200" height="400"}

좌측 상단에서 'Project navigator' 를 선택하고 'Main.storyboard' 를 클릭한다.
<br><br><br>

![Example2](/assets/swift/Label/Create/Example2.png){: width="500" height="400"}

그럼 위와 같은 화면(메인 스토리보드)을 볼 수 있을 것이다. 이제 가운데 보이는 뷰 위에 UILabel을 올릴 것이다.
<br><br><br>

![Example3](/assets/swift/Label/Create/Example3.png){: width="200" height="400"}

우측 상단에서 '+' 버튼을 클릭해서 'Library' 을 열어준다.
<br><br><br>

![Example4](/assets/swift/Label/Create/Example4.png){: width="500" height="400"}

'Library' 에서 'Label'을 끌어다가 화면에 올린다.
<br><br><br>

![Example5](/assets/swift/Label/Create/Example5.png){: width="200" height="400"}

그럼 위와 같이 뷰에 'Label' 이 올라온 것을 볼 수 있다.
<br><br><br>

## Label 의 Atrributes Inspector

![Example6](/assets/swift/Label/Create/Example6.png){: width="300" height="400"}

우측 상단에 있는 메뉴 중에 우측에서 3번째 메뉴가 'Atrributes Inspector' 이다. 
<br><br><br>

![Example7](/assets/swift/Label/Create/Example7.png){: width="300" height="400"}

전부는 아니지만 아는 기능들에 대해서 정리해뒀다.

1. **Text** : 텍스트 내용
2. **Color** : 텍스트 색
3. **Font** : 글씨체, 스타일, 텍스트 사이즈
4. **Dynamic Type** : 사용자 설정에 맞춰 텍스트 사이즈가 자동 변경
5. **Alignment** : 텍스트 정렬 방법
6. **Lines** : 라인 수
7. **Behavior** : Enabled(), Highlighted(텍스트를 하이라이트 처리할지 말지)
8. **Highlighted** : 하이라이트된 텍스트의 색
9. **Shadow** : 그림자 효과의 색
10. **Background** : Label의 배경 색
