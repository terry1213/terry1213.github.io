---
title: "[Flutter/Widget of the Week] AnimatedContainer"
categories:
- Flutter
tags:
- WidgetOfTheWeek
---

## Widget of the Week 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/yI-8QHpGIP4?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

`AnimatedContainer`는 애니메이션 효과를 줄 수 있는 `Container`이다. `border`, `width`, `height`, `color` 등 다양한 부분에 애니메이션을 적용할 수 있고 애니메이션 종류(`curve`)와 걸리는 시간(`duration`)도 설정할 수 있다.

## 사용 예시

![AnimatedContainer 사용](/assets/flutter/WidgetOfTheWeek/4.AnimatedContainer/Example1.gif){: #magnific width="300" height="500"}

<details markdown="1">
  <summary>AnimatedContainer 사용 예시에 대한 코드 펼치기/접기</summary>

``` dart
Center(
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      AnimatedContainer(
        decoration: BoxDecoration(
          color: clicked ? Colors.greenAccent : Colors.deepPurple,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: clicked ? Colors.deepPurple : Colors.greenAccent, width: 5),
        ),
        width: clicked ? 300.0 : 150.0,
        height: clicked ? 150.0 : 300.0,
        alignment: Alignment.center,
        duration: Duration(seconds: 3),
        curve: Curves.fastLinearToSlowEaseIn,
        child: FlutterLogo(size: 75),
      ),
      RaisedButton(
        child: Text('animate!'),
        onPressed: () {
          setState(() {
            clicked = !clicked;
          });
        },
      ),
    ],
  ),
)
```

</details>
<br>

예시를 보면 하단의 버튼을 클릭할 때마다 `clicked` 값이 변경되고 해당 값에 따라 애니메이션이 적용되는 것을 볼 수 있다. 위의 예시에선 `color`, `border`의 `color`, `width`, `height`에만 애니메이션을 적용했지만 필요에 따라서 더 다양한 부분에 애니메이션을 사용할 수 있다.
## Properties

| Property             	| Description 	| Type               	| Default       	|
|----------------------	|-------------	|--------------------	|---------------	|
| child             	| AnimatedContainer을 적용할 Widget	| Widget?             	|               	|
| alignment            	| child 배치 방식	| AlignmentGeometry?  	|               	|
| constraints          	| child에 적용할 추가적인 제약사항(constraints)	| BoxConstraints?     	|               	|
| curve                	| 애니메이션 종류	| Curve              	| Curves.linear 	|
| decoration           	| child 뒤쪽의 데코레이션	| Decoration?         	|               	|
| duration             	| 애니메이션에 걸리는 시간	| Duration           	|               	|
| foregroundDecoration 	| child 앞쪽의 데코레이션	| Decoration?         	|               	|
| margin               	| decoration의 외부 여유 공간.	| EdgeInsetsGeometry? 	|               	|
| onEnd                	| 애니메이션이 끝날 시에 실행되는 함수	| VoidCallback?       	|               	|
| padding              	| decoration의 내부 여유 공간. child는 해당 공간 만큼 여유를 두고 위치하게 된다.	| EdgeInsetsGeometry? 	|               	|
| transform            	| AnimatedContainer에 적용할 변환 행렬(transformation matrix).	| Matrix4?            	|               	|

### curve

`curve`를 통해서 변화 이전과 이후가 같더라도 해당 변화의 중간 과정(애니메이션)을 다양화시킬 수 있다. 아래는  `curve` 사용한 예시이다.

![curve: Curves.fastLinearToSlowEaseIn](/assets/flutter/WidgetOfTheWeek/4.AnimatedContainer/Example1.gif){: #magnific width="300" height="500"}
![curve: Curves.bounceInOut](/assets/flutter/WidgetOfTheWeek/4.AnimatedContainer/Example2.gif){: #magnific width="300" height="500"}

왼쪽과 오른쪽은 변화 이전과 이후가 같지만 애니메이션이 다른 것을 볼 수 있다. `curve`의 종류는 굉장히 다양하고 이름만 봐서는 실제로 어떻게 적용되는지 알기 어렵다. 다행히 일일히 적용해 확인해보는 수고를 덜어주기 위한 [페이지](https://api.flutter.dev/flutter/animation/Curves-class.html)가 있다. 여기서 영상을 통해 확인하여 상황에 맞는 `curve`를 찾아 사용하자.

### duration

애니메이션이 시작해서 끝나기까지의 시간이다.

![duration:  Duration(seconds: 3)](/assets/flutter/WidgetOfTheWeek/4.AnimatedContainer/Example1.gif){: #magnific width="300" height="500"}
![duration:  Duration(seconds: 1)](/assets/flutter/WidgetOfTheWeek/4.AnimatedContainer/Example3.gif){: #magnific width="300" height="500"}

위의 예시와 같이 동일한 애니메이션이더라도 오른쪽이 왼쪽보다 빠른 것을 확인할 수 있다.
