---
title: "[Flutter / Widget of the Week] SliverAppBar"
categories:
- Flutter
tags:
- WidgetOfTheWeek
---

## Widget of the Week 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/R9C5KMJKluE?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

`SliverAppBar` 위젯은 `CustomScrollView` 위젯과 함께 사용되는 app bar이다. `SliverAppBar` 위젯은 app bar이기 때문에 보통 `CustomScrollView` 위젯의 자식 위젯들 중에 첫번째 위젯으로 들어가며, 나머지 화면을 채우는 위젯들이 뒤따라오게 된다.

`SliverAppBar`는 toolbar, `TabBar`, `FlexibleSpaceBar` 등 다양한 위젯으로 구성된다.

## 사용 예시

아래는 아주 간단한 `CustomScrollView`의 예시다.

![](/assets/flutter/WidgetOfTheWeek/11.SliverAppBar/Example1.gif){: #magnific width="300" height="500"}

<details markdown="1">
  <summary>SliverAppBar 사용 예시에 대한 코드 펼치기/접기</summary>

``` dart
Scaffold(
  body: CustomScrollView(
    slivers: [
      SliverAppBar(
          expandedHeight: 150.0,
          flexibleSpace: const FlexibleSpaceBar(
            title: Text('SliverAppBar Example'),
            background: FlutterLogo(),
          ),
      ),
      SliverList(
        delegate: SliverChildBuilderDelegate(
              (BuildContext context, int index) {
            return Container(
              color: index.isOdd ? Colors.white : Colors.grey,
              height: 100.0,
              child: Center(
                child: Text('$index', textScaleFactor: 5),
              ),
            );
          },
          childCount: 10,
        ),
      ),
    ],
  ),
),
```

</details>

## Properties

이제 `SliverAppBar`의 property들의 목록을 정리하고, 그 중 주로 사용되는 property의 용도를 코드 예시와 함께 살펴보자.

| Property                  	| Description 	| Type                  	| Default        	|
|---------------------------	|-------------	|-----------------------	|----------------	|
| actions                   	| title 위젯 뒤에 가로로 나열될 위젯 리스트.	| List\<Widget>?         	|                	|
| actionsIconTheme          	| actions에 들어가는 아이콘의 색, 투명도, 사이즈 등. 	| IconThemeData?        	|                	|
| automaticallyImplyLeading 	| leading 값이 null일 때, leading에 들어갈 적절한 위젯을 자동으로 채워주는지 여부. ex) 뒤로가기 버튼	| bool                  	| true           	|
| backgroundColor           	| 배경 색.	| Color?                	|                	|
| bottom                    	| app bar 바로 밑에 위치하는 위젯.	| PreferredSizeWidget?  	|                	|
| centerTitle               	| title을 중앙에 배치할지 여부.	| bool?                 	|                	|
| collapsedHeight           	| app bar가 접혔을 때의 높이.	| double?               	|                	|
| elevation                 	| app bar의 상대적인 z 좌표.	| double?               	|                	|
| excludeHeaderSemantics    	| title을 헤더 시맨틱으로 감싸야 하는지 여부.	| bool                  	| false          	|
| expandedHeight            	| app bar가 최대한 길어졌을 때의 높이.	| double?               	|                	|
| flexibleSpace             	| toolbar와 tabbar 뒷편에 위치하는 위젯. 해당 위젯의 높이는 app bar 전체 높이와 동일하게 설정된다.	| Widget?               	|                	|
| floating                  	| 사용자가 app bar 쪽으로 스크롤할 시에 곧 바로 app bar가 보이게 할지 여부.	| bool                  	| false          	|
| forceElevated             	| elavation으로 인한 app bar의 그림자가 항상 보일지, 스크롤을 아래로 내렸을 때만 보일지 여부(pinned가 true일 때만 해당).	| bool                  	| false          	|
| foregroundColor           	| app bar의 텍스트와 아이콘 색.	| Color?                	|                	|
| iconTheme                 	| toolbar에 들어가는 아이콘의 색, 투명도, 사이즈 등.	| IconThemeData?        	|                	|
| leading                   	| toolbar의 title 앞에 나오는 위젯.	| Widget?               	|                	|
| leadingWidth              	| leading 위젯의 가로 길이.	| double?               	|                	|
| onStretchTrigger          	| 사용자가 stretchTriggerOffset에서 지정한 offset까지 오버 스크롤할 때 실행할 콜백 함수. 오버 스크롤이란 화면 범위를 넘어서 하는 스크롤.	| AsyncCallback?        	|                	|
| pinned                    	| app bar을 scroll view의 시작 부분에 항상 보이게 할지 여부.	| bool                  	| false          	|
| primary                   	| app bar가 스크린의 최상단에 위치할지 여부. true일 경우에, 시스템 상태 정보 높이만큼 여유 공간을 두고 시작한다.	| bool                  	| true           	|
| shadowColor               	| app bar의 그림자 색.	| Color?                	|                	|
| shape                     	| app bar의 모양과 그에 따른 그림자 모양.	| ShapeBorder?          	|                	|
| snap                      	| app bar가 snapping 되는지 여부. snap은 floating이 true일 때만 의미가 있다.	| bool                  	| false          	|
| stretch                   	| 오버 스크롤 될 때 app bar 크기가 늘어나는지 여부.	| bool                  	| false          	|
| stretchTriggerOffset      	| onStretchTrigger를 작동시키는데 필요한 오버 스크롤 offset. 해당 offset까지 오버 스크롤할 시에 onStretchTrigger가 동작한다.	| double                	| 100.0          	|
| systemOverlayStyle        	| app bar와 겹쳐 보이는 시스템 상태 정보(배터리, 시간 등이 보이는 부분)에 적용할 스타일. backwardsCompatibility이 false일 때만 적용된다.	| SystemUiOverlayStyle? 	|                	|
| title                     	| app bar의 제목 위젯.	| Widget?               	|                	|
| titleSpacing              	| title 주위 간격.	| double?               	|                	|
| titleTextStyle            	| title 위젯의 디폴트 텍스트 스타일.	| TextStyle?            	|                	|
| toolbarHeight             	| toolbar의 높이.	| double                	| kToolbarHeight 	|
| toolbarTextStyle          	| leading, actions 위젯의 디폴트 텍스트 스타일. title에는 적용되지 않음.	| TextStyle?            	|                	|

### floating & pinned & snap

* `floating` : 사용자가 app bar 쪽으로 스크롤할 시에 곧 바로 app bar가 보이게 할지 여부.
* `pinned` : app bar을 scroll view의 시작 부분에 항상 보이게 할지 여부.
* `snap` : app bar가 snapping 되는지 여부. `snap`은 `floating`이 `true`일 때만 의미가 있다.

아래는 이 3개의 property의 다양한 조합으로 나올 수 있는 화면이다.

![floating: false, pinned: false, snap: false](/assets/flutter/WidgetOfTheWeek/11.SliverAppBar/Example1.gif){: #magnific width="300" height="500"}
![floating: true, pinned: false, snap: false](/assets/flutter/WidgetOfTheWeek/11.SliverAppBar/Example2.gif){: #magnific width="300" height="500"}

![floating: true, pinned: false, snap: true](/assets/flutter/WidgetOfTheWeek/11.SliverAppBar/Example3.gif){: #magnific width="300" height="500"}
![floating: true, pinned: true, snap: false](/assets/flutter/WidgetOfTheWeek/11.SliverAppBar/Example4.gif){: #magnific width="300" height="500"}

![floating: true, pinned: true, snap: true](/assets/flutter/WidgetOfTheWeek/11.SliverAppBar/Example5.gif){: #magnific width="300" height="500"}
![floating: false, pinned: true, snap: false](/assets/flutter/WidgetOfTheWeek/11.SliverAppBar/Example6.gif){: #magnific width="300" height="500"}

> `snap`은 `floating`이 `true`일 때만 의미가 있기 때문에, `floating`가 `false`이면서 `snap`이 `true`인 조합은 없다.

### stretch

하단의 리스트 뷰를 아래 방향으로 최대한 드래그하면, 리스트 뷰와 app bar 사이의 공간이 보이게 된다. 만약 해당 공간을 보이지 않게 하고 싶다면 `stretch`를 `true`로 설정하면 된다.

![stretch: false](/assets/flutter/WidgetOfTheWeek/11.SliverAppBar/Example7.gif){: #magnific width="300" height="500"}
![stretch: true](/assets/flutter/WidgetOfTheWeek/11.SliverAppBar/Example8.gif){: #magnific width="300" height="500"}

`stretch`를 `true`로 설정하니, app bar 크기가 자연스럽게 변화하면서 리스트 뷰와 app bar 사이의 공간을 채워주는 것을 확인할 수 있다.
