---
title: "[Flutter/Widget of the Week] FloatingActionButton"
categories:
- Flutter
tags:
- WidgetOfTheWeek
---

## Widget of the Week 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/2uaoEDOgk_I?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

평소에 여러 어플리케이션에서 하단에 동그란 버튼을 본 적이 있을 것이다. 그런 버튼이 바로 `FloatingActionButton`이다.

`FloatingActionButton`은 보통 한 화면에 하나만 사용한다.  그리고 `FloatingActionButton`은 무언가를 생성 혹은 공유하거나 페이지를 이동할 때만 사용해야한다.

## 사용 예시

![](/assets/flutter/WidgetOfTheWeek/8.FloatingActionButton/Example1.png){: #magnific width="300" height="500"}

<details markdown="1">
  <summary>FloatingActionButton 사용 예시에 대한 코드 펼치기/접기</summary>

``` dart
Scaffold(
  appBar: AppBar(
    title: Text('FloatingActionButton Example'),
  ),
  floatingActionButton: FloatingActionButton(
    onPressed: () {
      // 버튼 클릭 시 실행할 코드.
    },
    child: Icon(Icons.add),
  ),
);
```

</details>
<br>

`FloatingActionButton` 사용 방법은 매우 간단하다. `Scaffold`의 `floatingActionButton` property에 `onPressed`와 `child`를  설정한 `FloatingActionButton`를 할당하면 된다. 그럼 위와 같은 화면을 볼 수 있을 것이다. 다른 상세 설정들은 사용 목적에 맞춰서 설정하면 된다.

### FloatingActionButton.extended 생성자

![FloatingActionButton.extended 생성자 사용](/assets/flutter/WidgetOfTheWeek/8.FloatingActionButton/Example2.png){: #magnific width="300" height="500"}

<details markdown="1">
  <summary>FloatingActionButton.extended 생성자 사용 예시에 대한 코드 펼치기/접기</summary>

``` dart
Scaffold(
  appBar: AppBar(
    title: Text('FloatingActionButton Example'),
  ),
  floatingActionButton: FloatingActionButton.extended(
    onPressed: () {
      // 버튼 클릭 시 실행할 코드.
    },
    icon: Icon(Icons.add),
    label: Text('CREATE'),
  ),
);
```

</details>
<br>

`extended` 생성자를 사용하면 `icon`과 `label`이 들어가는 타원형 `FloatingActionButton`을 만들 수 있다.

## Properties

| Property              	| Description 	| Type                   	| Default(기본 생성자)           	| Default (extended 생성자)                 	|
|-----------------------	|-------------	|------------------------	|-------------------	|--------------------------	|
| child                 	| 버튼에 들어갈 위젯. 보통 아이콘이 들어간다.	| Widget                	|                   	| 해당 Property 없음	|
| icon                 	| 버튼에 들어갈 아이콘. extended 생성자에서 child 대신 사용.	| Widget                	| 해당 Property 없음	|                   	|
| label                 	| 버튼에 들어갈 라벨. extended 생성자에서 child 대신 사용.	| Widget                	| 해당 Property 없음	|                   	|
| autofocus             	| 버튼 위젯에 autofocus가 왜 있는지 잘 모르겠다\...	| bool                   	| false             	| false                    	|
| backgroundColor       	| 버튼의 배경 색깔.	| Color                 	|                   	|                          	|
| focusColor            	| 연결된 focusNode에 request가 들어왔을 때의 색깔. 	| Color                 	|                   	|                          	|
| foregroundColor       	| 버튼의 아이콘과 텍스트의 색깔.	| Color                 	|                   	|                          	|
| hoverColor            	| 마우스 포인터를 버튼 위에 올리고 있을 때의 버튼 색깔.	| Color                 	|                   	|                          	|
| splashColor           	| 버튼을 길게 클릭할 때 퍼지는 효과의 색깔.	| Color                 	|                   	|                          	|
| clipBehavior          	| 버튼의 child가 버튼보다 클 때 해당 child를 자르는 방법.	| Clip                   	| Clip.none         	| Clip.none                	|
| elevation             	| 버튼의 디폴트 z 좌표, 그림자 크기를 조절한다.	| double                	|                   	|                          	|
| disabledElevation     	| 버튼이 사용 불가능한 상태일 때의 elevation	| double                	|                   	|                          	|
| focusElevation        	| 연결된 focusNode에 request가 들어왔을 때의 elevation	| double                	|                   	|                          	|
| highlightElevation    	| 버튼을 클릭 중일 때의 elevation	| double                	|                   	|                          	|
| hoverElevation        	| 마우스 포인터를 버튼 위에 올리고 있을 때의 elevation	| double                	|                   	|                          	|
| focusNode             	| 버튼과 연결할 focusNode.	| FocusNode             	|                   	|                          	|
| heroTag               	| 한 화면에서 여러 FloatingActionButton를 사용할 때 필요한 버튼 고유의 값.	| Object                	| \_DefaultHeroTag() 	| \_DefaultHeroTag()        	|
| isExtended            	| 버튼이 extended 생성자를 통해 만들어졌는지 여부.	| bool                   	| false             	| true                     	|
| materialTapTargetSize 	| 버튼의 클릭 범위.	| MaterialTapTargetSize 	|                   	|                          	|
| mini                  	| 버튼 사이즈.	| bool                   	| false             	| 해당 Property 없음	|
| mouseCursor           	| 마우스 포인터를 버튼 위에 올리고 있을 때의 마우스 커서 모양.	| MouseCursor           	|                   	| SystemMouseCursors.click 	|
| onPressed             	| 버튼이 클릭했을 때 실행될 코드.	| VoidCallback          	|                   	|                          	|
| shape                 	| 버튼의 모양.	| ShapeBorder           	|                   	|                          	|
| tooltip               	| 버튼을 길게 클릭할 때 나오는 버튼에 대한 설명 문구.	| String                	|                   	|                          	|

### clipBehavior

![clipBehavior: Clip.none (default)](/assets/flutter/WidgetOfTheWeek/8.FloatingActionButton/Example3.png){: #magnific width="300" height="500"}
![clipBehavior: Clip.hardEdge](/assets/flutter/WidgetOfTheWeek/8.FloatingActionButton/Example4.png){: #magnific width="300" height="500"}

<details markdown="1">
  <summary>FloatingActionButton.extended 생성자 사용 예시에 대한 코드 펼치기/접기</summary>

``` dart
Scaffold(
  appBar: AppBar(
    title: Text('FloatingActionButton Example'),
  ),
  floatingActionButton: FloatingActionButton(
    onPressed: () {
      // 버튼 클릭 시 실행할 코드.
    },
    child: Text('CREATE', style: TextStyle(fontSize: 20, color: Colors.red),),
    clipBehavior: Clip.hardEdge,
  ),
);
```

</details>
<br>

`clipBehavior`은 버튼 안에 들어가는 child 위젯이 버튼의 범위를 넘어갈 때 이를 자르는 방법을 의미한다. 왼쪽 예시를 보면 default 값인 `Clip.none`일 때는 'CREATE' 텍스트 일부가 버튼 밖으로 나와있다. 하지만 오른쪽 예시를 보면 `clipBehavior`를 `Clip.hardEdge`로 설정했기 때문에 'CREATE' 텍스트의 버튼 범위를 넘어가는 부분이 잘린 것을 알 수 있다.
