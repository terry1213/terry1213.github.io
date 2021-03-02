---
title: "[Flutter/Widget of the Week] SafeArea"
categories:
- Flutter
tags:
- iOS
- Android
- Mobile
---

## Widget of the Week 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/lkF0TQJO0bA?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

운영체제(안드로이드, iOS)에 따라서, 또 각 디바이스에 따라서 화면 모양이 매우 다르다. 그래서 특정 디바이스에 맞춰서 개발하면 다른 디바이스에서는 위젯들이 화면 밖으로 나가는 경우가 있다. `SafeArea`는 각 디바이스 별로 자동으로 `padding`을 설정해주기 때문에 이를 사용하여 위와 같은 문제를 간단하게 해결할 수 있다.
## 사용 예시

### 예시 1

![SafeArea 미사용](/assets/flutter/WidgetOfTheWeek/1.SafeArea/NoSafeArea1.png){: #magnific width="320" height="610"}
![SafeArea 사용](/assets/flutter/WidgetOfTheWeek/1.SafeArea/SafeArea1.png){: #magnific width="320" height="610"}

<details markdown="1">
  <summary>예시 1에 대한 코드 펼치기/접기</summary>

``` dart
Scaffold(
  body: SafeArea(
    child: Container(
      color: Colors.yellow,
      child: Center(
        child: Text(
          'SafeArea',
          style: TextStyle(
            color: Colors.blue,
            fontSize: 40,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    ),
  ),
)
```

</details>
<br>

`SafeArea`를 사용한 경우 디바이스(아이폰 12 프로)의 모양에 맞게 조절된 것을 볼 수 있다.

### 예시 2

![SafeArea 미사용](/assets/flutter/WidgetOfTheWeek/1.SafeArea/NoSafeArea2.png){: #magnific width="320" height="610"}
![SafeArea 사용](/assets/flutter/WidgetOfTheWeek/1.SafeArea/SafeArea2.png){: #magnific width="320" height="610"}

<details markdown="1">
  <summary>예시 2에 대한 코드 펼치기/접기</summary>

``` dart
Scaffold(
  body: SafeArea(
    child: ListView(
      children: List.generate(50, (index) => Text('SafeArea Example $index')),
    ),
  ),
)
```

</details>
<br>

`SafeArea`를 사용한 경우 내부의 `ListView`가 일정 영역 이상 넘지 않는 것을 볼 수 있다.

## Properties

| Property                  	| Description 	| Type       	| Default         	|
|---------------------------	|-------------	|------------	|-----------------	|
| child                     	|  SafeArea를 적용할 위젯.    	| Widget     	|                 	|
| top                       	| 화면 위쪽에 SafeArea를 적용할지 여부.	| bool       	| true            	|
| bottom                    	| 화면 아래쪽에 SafeArea를 적용할지 여부.	| 	bool       	| true            	|
| left                      	| 화면 왼쪽에 SafeArea를 적용할지 여부. 	| bool       	| true            	|
| right                     	| 화면 오른쪽에 SafeArea를 적용할지 여부. 	| bool       	| true            	|
|[ maintainBottomViewPadding](/flutter/flutter-widget-of-the-week-safearea/#maintainbottomviewpadding) 	| 아래에서 키보드가 올라오는 경우에 아래쪽 padding을 유지할지 여부.  	| bool       	| false           	|
| minimum                   	| 적용할 최소 padding(여백)의 값.  media padding(각 디바이스에 필요한 여백)과 비교하여 더 큰 값으로 padding을 설정한다.	| EdgeInsets 	| EdgeInsets.zero 	|


### maintainBottomViewPadding

많은 property 중에 `maintainBottomViewPadding`만 이해가 되지 않아서 간단하게 테스트를 해봤다.

![maintainBottomViewPadding: false(default)](/assets/flutter/WidgetOfTheWeek/1.SafeArea/maintainBottomViewPaddingFalse.png){: #magnific width="320" height="610"}
![maintainBottomViewPadding: true](/assets/flutter/WidgetOfTheWeek/1.SafeArea/maintainBottomViewPaddingTrue.png){: #magnific width="320" height="610"}

양쪽 다 `SafeArea`를 사용했음에도 화면 하단을 보면 다른 점을 찾을 수가 있다.

`maintainBottomViewPadding`이 false일 때는 하단 padding이 사라져서 키보드 뒷면이 전부 흰색으로 보이고 `maintainBottomViewPadding`이 true일 때는 padding이 남아있어서 검정색 부분이 일부 보인다.

<details markdown="1">
  <summary>maintainBottomViewPadding 테스트 코드 펼치기/접기</summary>

``` dart
Scaffold(
  body: SafeArea(
    maintainBottomViewPadding: true,
    child: TextField(),
  ),
)
```

</details>
