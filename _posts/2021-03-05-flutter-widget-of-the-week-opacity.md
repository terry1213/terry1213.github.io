---
title: "[Flutter/Widget of the Week] Opacity"
categories:
- Flutter
tags:
- Mobile
- iOS
- Android
---

## Widget of the Week 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/9hltevOHQBw?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

## 사용 예시

### 기본

![opacity: 1.0](/assets/flutter/WidgetOfTheWeek/5.Opacity/Example1.png){: #magnific width="300" height="500"}
![opacity: 0.5](/assets/flutter/WidgetOfTheWeek/5.Opacity/Example2.png){: #magnific width="300" height="500"}

<details markdown="1">
  <summary>Opacity 사용 예시에 대한 코드 펼치기/접기</summary>

``` dart
Center(
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      Container(
        height: 150,
        width: 150,
        color: Colors.blue,
        alignment: Alignment.center,
        child: Text('Container'),
      ),
      Opacity(
        opacity: _opacity,
        child: Container(
          height: 150,
          width: 150,
          color: Colors.green,
          alignment: Alignment.center,
          child: Text('Opacity $_opacity'),
        ),
      ),
      Container(
        height: 150,
        width: 150,
        color: Colors.red,
        alignment: Alignment.center,
        child: Text('Container'),
      ),
    ],
  ),
),
```

</details>
<br>

`Opacity`로 감싼 `child` 위젯은 `opacity`를 설정하여 선명도를 조절할 수 있다. `opacity`의 범위는 0.0부터 1.0이고, 0.0에 가까워질수록 투명해지며 1.0에 가까워질수록 선명해진다.

왼쪽 예시에서는 `opacity`를 1.0로 설정했기 때문에 위 아래에 있는 일반 컨테이너와 동일하게 100% 선명하게 보인다. 반면 오른쪽 예시에서는 `opacity`를 0.5로 설정했기 때문에 50%의 선명도를 보인다.

### 공간 유지 용도

특정 위젯을 없애고 싶다면 해당 위젯에 대한 코드를 지우거나 주석 처리하면 된다. 하지만 해당 위젯을 아예 사용하지 않을 것이 아니라 상황에 따라 보이거나 보이지 않게 하려는 의도일 때는 `Opacity`를 사용하는 편이 좋다. `Opacity`를 사용하여 위젯을 사라지게 하면 해당 위젯이 차지하던 공간이 유지되기 때문이다. 아래는 이에 대한 예시이다.

![보이지 않게 할 위젯에 대한 코드를 삭제](/assets/flutter/WidgetOfTheWeek/5.Opacity/Example3.png){: #magnific width="300" height="500"}
![opacity을 0.0으로 설정](/assets/flutter/WidgetOfTheWeek/5.Opacity/Example4.png){: #magnific width="300" height="500"}

보이지 않게 할 위젯에 대한 코드 자체를 지운 왼쪽 예시의 경우, 해당 위젯이 차지하던 공간 자체도 사라졌다. 하지만 보이지 않게 할 위젯을 `Opacity`으로 감싸고 `opacity`를 0.0으로 설정한 오른쪽 예시의 경우, 위젯은 사라졌지만 해당 위젯이 차지하던 공간은 유지되는 것을 확인할 수 있다.

그렇다면 공간이 유지되면 어떤 장점이 있을까? 만약 공간도 함께 사라져버린다면 다른 위젯들의 위치도 변경된다. 위의 예시에서도 중간 위젯이 있던 공간이 사라져서 위아래의 컨테이너의 위치가 변경되었다. 이렇게 되면 우리가 처리해야할 것들이 많아진다. 하지만 공간이 유지되면 다른 위젯들에 아무 영향도 주지 않기 때문에 편해진다.

## Properties

| Property               	| Description 	| Type   	| Default 	|
|------------------------	|-------------	|--------	|---------	|
| child                  	| Opacity를 적용할 위젯.	| Widget 	|         	|
| opacity                	| child 위젯의 선명도.	| double 	|         	|
| alwaysIncludeSemantics 	| 정확한 용도를 모르겠다\...	| bool   	| false	|
