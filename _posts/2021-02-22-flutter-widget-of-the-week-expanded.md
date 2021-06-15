---
title: "[Flutter/Widget of the Week] Expanded"
categories:
- Flutter
tags:
- WidgetOfTheWeek
---

## Widget of the Week 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/_rnZaagadyo?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

개발하다보면 `Column`이나 `Row`를 사용할 일이 매우 많다. `Column`이나 `Row`에 여러 `child`를 배치할 때 특정 `child`가 남은 공간을 전부 채우게 하고 싶은 경우, `Expanded`를 사용한다.

## 사용 예시

### 기본 예시

![No Expanded](/assets/flutter/WidgetOfTheWeek/2.Expanded/Example1.png){: #magnific width="320" height="610"}
![Expanded](/assets/flutter/WidgetOfTheWeek/2.Expanded/Example2.png){: #magnific width="320" height="610"}

<details markdown="1">
  <summary>기본 예시에 대한 코드 펼치기/접기</summary>

``` dart
Center(
  child: Column(
    children: [
      Container(
        color: Colors.yellow,
        height: 100,
        width: 200,
        child: Center(
          child: Text(
            'No Expanded',
            style: TextStyle(
              fontSize: 30,
            ),
          ),
        ),
      ),
      Container(
        color: Colors.green,
        height: 100,
        width: 200,
        child: Center(
          child: Text(
            'No Expanded',
            style: TextStyle(
              fontSize: 30,
            ),
          ),
        ),
      ),
      Expanded(
        child: Container(
          color: Colors.red,
          width: 200,
          child: Center(
            child: Text(
              'Expanded',
              style: TextStyle(
                fontSize: 30,
              ),
            ),
          ),
        ),
      ),
    ],
  ),
),
```

</details>
<br>

`Expanded`를 사용하면 두번째 이미지와 같이 `Expanded`를 적용한 `Widget`이 남은 공간을 전부 차지한다.

## Properties

| Property 	| Description 	| Type    	| Default 	|
|----------	|-------------	|---------	|---------	|
| child    	| Expadned를 적용할 위젯	| Widget  	|         	|
| flex     	|  해당 child 위젯이 남은 공간을 차지할 비율	| int     	| 1       	|

### flex 

하나 이상의 `Expanded` `Widget`이 있을 때 남은 공간을 각 `Widget`이 차지할 비율을 뜻한다. 예를 들어 `flex`가 2인 `Widget` A와 `flex`가 1인 `Widget` B가 있다면 남은 공간을 2:1의 비울로 차지한다. 아래는 해당 예시에 대한 이미지이다.

![flex 2:1](/assets/flutter/WidgetOfTheWeek/2.Expanded/Example3.png){: #magnific width="320" height="610"}

<details markdown="1">
  <summary>flex 예시에 대한 코드 펼치기/접기</summary>

``` dart
Center(
  child: Column(
    children: [
      Container(
        color: Colors.yellow,
        height: 100,
        width: 200,
        child: Center(
          child: Text(
            'No Expanded',
            style: TextStyle(
              fontSize: 30,
            ),
          ),
        ),
      ),
      Expanded(
        flex: 2,
        child: Container(
          color: Colors.green,
          width: 200,
          child: Center(
            child: Text(
              'Expanded\nflex: 2',
              style: TextStyle(
                fontSize: 30,
              ),
            ),
          ),
        ),
      ),
      Expanded(
        flex: 1,
        child: Container(
          color: Colors.red,
          width: 200,
          child: Center(
            child: Text(
              'Expanded\nflex: 1',
              style: TextStyle(
                fontSize: 30,
              ),
            ),
          ),
        ),
      ),
    ],
  ),
),
```

</details>
<br>

노란색 `Widget`이 차지하고 남은 공간을 초록색 `Widget`과 빨간색 `Widget`이 2:1의 비율로 차지하는 것을 확인할 수 있다.
