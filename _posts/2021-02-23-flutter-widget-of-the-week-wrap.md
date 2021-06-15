---
title: "[Flutter/Widget of the Week] Wrap"
categories:
- Flutter
tags:
- WidgetOfTheWeek
---

## Widget of the Week 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/z5iw2SeFx2M?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>



## 사용 예시

### 기본 예시

![Row](/assets/flutter/WidgetOfTheWeek/3.Wrap/Example1.png){: #magnific width="320" height="610"}
![Wrap](/assets/flutter/WidgetOfTheWeek/3.Wrap/Example2.png){: #magnific width="320" height="610"}

<details markdown="1">
  <summary>기본 예시에 대한 코드 펼치기/접기</summary>

``` dart
Wrap(
  children: [
    RaisedButton(
      onPressed: (){},
      child: Text("Button 1"),
    ),
    RaisedButton(
      onPressed: (){},
      child: Text("Button 2"),
    ),
    RaisedButton(
      onPressed: (){},
      child: Text("Button 3"),
    ),
    RaisedButton(
      onPressed: (){},
      child: Text("Button 4"),
    ),
    RaisedButton(
      onPressed: (){},
      child: Text("Button 5"),
    ),
    RaisedButton(
      onPressed: (){},
      child: Text("Button 6"),
    ),
  ],
),
```

</details>
<br>

`Row`을 사용할 시 overflow 에러가 발생하는 것을 볼 수 있다. 하지만 `Row` 대신에 `Wrap`을 사용할 시 화면 밖으로 넘어가는 `Button 4`부터 자동으로 다음 줄로 넘어간다.

## Properties

| Property           	| Description 	| Type               	| Default                  	|
|--------------------	|-------------	|--------------------	|--------------------------	|
| children           	| Wrap으로 감쌀 Widget 리스트.	| List\<Widget>       	|                          	|
| direction          	| 주축으로 사용할 방향.	| Axis               	| Axis.horizontal          	|
| crossAxisAlignment 	| 교차축의 한 줄 내에서 child 나열 방식 | WrapCrossAlignment 	| WrapCrossAlignment.start 	|
| alignment          	| 주축에서 child 나열 방식. | WrapAlignment      	| WrapAlignment.start      	|
| runAlignment       	| 교차축에서 각 줄의 나열 방식.	| WrapAlignment      	| WrapAlignment.start      	|
| spacing            	| 주축에서	child 사이의 간격. | double             	| 0.0                      	|
| runSpacing         	| 교차축에서 줄 사이의 간격. | double             	| 0.0                      	|
| textDirection      	| 수평 배치 방향(왼쪽에서 오른쪽, 오른쪽에서 왼쪽). | TextDirection      	|                          	|
| verticalDirection  	| 수직 배치 방향(위에서부터 아래로,아래서부터 위로).	| VerticalDirection  	| VerticalDirection.down   	|
| clipBehavior       	|             	| Clip               	| Clip.hardEdge            	|

### direction

주축(`direction`)과 교차축은 무조건 수직 관계이다. 주축 방향이 `Axis.horizontal`이면 교차축은 `Axis.vertical`이 되고, 주축 방향이 `Axis.vertical`이면 교차축은 `Axis.horizontal`이 된다.

### crossAxisAlignment

`crossAxisAlignment`는 교차축의 한 줄 내에서의 배치 방법이다. 이는 항목들의 높이(`direction`이 `Axis.horizontal`일 때) 혹은 넓이(`direction`이 `Axis.vertical`일 때)가 다양할 때만 의미가 있다.

![crossAxisAlignment 설정 안 함(default = WrapCrossAlignment.start)](/assets/flutter/WidgetOfTheWeek/3.Wrap/Example3.png){: #magnific width="320" height="610"}
![crossAxisAlignment를 WrapCrossAlignment.center로 설정](/assets/flutter/WidgetOfTheWeek/3.Wrap/Example4.png){: #magnific width="320" height="610"}

위의 예시를 보면 항목들의 높이가 다양하다. 이때 왼쪽처럼 `crossAxisAlignment`를 따로 설정하지 않으면 디폴트 값인 `WrapCrossAlignment.start`로 설정되어 항목들이 각 줄의 상단에 맞춰서 배열된다. 만약 오른쪽처럼 `crossAxisAlignment`를 `WrapCrossAlignment.center`로 설정하면 항목들이 각 줄의 중간에 맞춰서 배열된다.
