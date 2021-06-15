---
title: "[Flutter/Widget of the Week] PageView"
categories:
- Flutter
tags:
- WidgetOfTheWeek
---

## Widget of the Week 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/J1gE9xvph-A?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

페이지 단위로 스크롤 할 수 있는 화면을 그려준다. `PageView`에 들어가는 페이지들은 모두 뷰포트(viewport) 사이즈로 화면에 보이게 된다.

`TextField`가 `TextEditingController`를 통해 컨트롤되는 것 같이, `PageView`는 `PageController`를 통해 컨트롤된다. 처음 보일 페이지(`initialPage`), 각 페이지가 차지할 뷰포트 사이즈 비율(`viewportFraction`) 등을 설정할 수 있다.

## 사용 예시

`PageView`의 사용법은 매우 간단하다. `children`에 각 페이지가 될 위젯을 리스트 형태로 넣어주고, 컨트롤러만 할당해주면 된다.

``` dart
class PageViewExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final PageController _controller =
    PageController(initialPage: 0);
    return Scaffold(
      appBar: AppBar(
        title: Text('PageView example'),
      ),
      body: PageView(
        controller: _controller,
        children: [
          Container(
            color: Colors.yellow,
            child: Center(
              child: Text('First Page'),
            ),
          ),
          Container(
            color: Colors.green,
            child: Center(
              child: Text('Second Page'),
            ),
          ),
          Container(
            color: Colors.blue,
            child: Center(
              child: Text('Third Page'),
            ),
          ),
        ],
      ),
    );
  }
}
```

![](/assets/flutter/WidgetOfTheWeek/9.PageView/Example1.gif){: #magnific width="300" height="500"}

예시 코드에서 `children`에 들어간 3개의 `Container`가 각각 하나의 페이지를 구성하는 것을 볼 수 있다.

또한 `PageController`(`_controller` 변수)를 선언하고, 이를 `PageView`의 `controller`로 할당했다. `_controller` 변수의 `initialPage`를 `0`으로 설정했기 때문에 `children` 중에 가장 앞에 위치한 노란색 컨테이너가 제일 먼저 사용자에게 보여진다. 예시에서는 확인할 수 없지만, `_controller` 변수를 통해서 `PageView`의 페이지를 이동시키는 등의 컨트롤을 할 수 있다.

### PageView.builder 생성자

`ListView`의 `ListView.builder` 생성자와 비슷하다.

`PageView.builder` 생성자는 사용자에게 보이고 있는 페이지에 대해서만 builder를 호출하므로 `children` 개수가 아주 많거나 무한할 경우에 유용하다. `itemCount`를 통해 `children` 개수를 설정할 수 있는데 `itemCount`을 `null` 로 설정할 경우에 `children` 개수가 무한대가 된다. 

``` dart
PageView.builder(
  controller: _controller,
  itemBuilder: (context, index) {
    return Container(
      child: Center(
        child: Text(index.toString()),
      ),
    );
  },
  itemCount: null,
)
```

![](/assets/flutter/WidgetOfTheWeek/9.PageView/Example2.gif){: #magnific width="300" height="500"}

`itemCount`을 `null`로 설정했더니 페이지가 무한으로 늘어나는 것을 확인할 수 있다.

### PageView.custom 생성자

`PageView`를 사용자의 의도대로 커스터마이즈해서 사용할 수 있게 해주는 생성자 같은데 정확한 사용법과 용도를 모르겠다. 그런데 기본 생성자의 경우에는 `children`을 통해 위젯 리스트를 받아서 이를 자동으로 `childrenDelegate`에 할당시키는 반면에, `PageView.custom` 생성자의 경우에는 직접 `childrenDelegate`으로 받는다.

## Properties

| Property               	| Description 	| Type                	| Default                 	|
|------------------------	|-------------	|---------------------	|-------------------------	|
| allowImplicitScrolling 	| 각 children 위젯들에 내부 스크롤 부여 여부.	| bool                	| false                   	|
| childrenDelegate       	| children 위젯을 PageView 위젯에게 제공하는 역할. 어떤 식으로 돌아가는지는 잘 모르겠다. 	| SliverChildDelegate 	|                         	|
| clipBehavior           	| content가 범위를 넘어갈 때 해당 content를 자르는 방법.	| Clip                	| Clip.hardEdge           	|
| controller             	| PageView를 컨트롤하기 위한 컨트롤러.	| PageController      	|                         	|
| dragStartBehavior      	| 사용자의 드래그를 인식하는 방법. (down: 사용자가 화면을 누르기 시작했을 때, start: 사용자가 화면을 누른 상태로 옆으로 끌기 시작했을 때)	| DragStartBehavior   	| DragStartBehavior.start 	|
| onPageChanged          	| 뷰포트 중앙에 위치한 페이지가 변경될 때마다 호출되는 함수.	| ValueChanged\<int>?  	|                         	|
| pageSnapping           	| 페이지 단위로 화면이 넘어갈지 여부.	| bool                	| true                    	|
| physics                	| 페이지 뷰가 사용자 입력에 반응하는 방법.	| ScrollPhysics?      	|                         	|
| restorationId          	| 스크롤의 위치 정보를 저장하고 복원하는 역할.	| String?             	|                         	|
| reverse                	| children 위젯을 역방향으로 보여줄 것인지 여부.	| bool                	| false                   	|
| scrollDirection        	| 스크롤 방향, children 위젯 나열 방향	| Axis                	| Axis.horizontal         	|

### allowImplicitScrolling

각 `children` 위젯에 내부 스크롤 부여하는지를 의미한다. 말이 조금 어려운데, 특정 화면에서 다른 화면으로 갔다가 다시 돌아왔을 때 이전의 스크롤 위치로 돌아가는지 여부라고도 표현할 수 있겠다.

![allowImplicitScrolling: false](/assets/flutter/WidgetOfTheWeek/9.PageView/Example3.gif){: #magnific width="280" height="500" margin="10"}
![allowImplicitScrolling: true](/assets/flutter/WidgetOfTheWeek/9.PageView/Example4.gif){: #magnific width="280" height="500" margin="10"}

`allowImplicitScrolling`이 `false`(디폴트)일 때는 첫번째 화면의 스크롤 위치가 다시 맨 위로 돌아갔다. 하지만 `pageSnapping`이 `true`일 때는 이전의 스크롤 위치로 되돌아갔다.
### pageSnapping

사용자가 화면을 드래그할 때, 페이지 단위로 넘어갈지 여부를 의미한다.

![pageSnapping: true](/assets/flutter/WidgetOfTheWeek/9.PageView/Example5.gif){: #magnific width="280" height="500" margin="10"}
![pageSnapping: false](/assets/flutter/WidgetOfTheWeek/9.PageView/Example6.gif){: #magnific width="280" height="500" margin="10"}

`pageSnapping`이 `true`(디폴트)일 때는 화면이 페이지 단위로 끊어서 넘어갔다. 하지만 `pageSnapping`이 `false`일 때는 `ListView`처럼 넘어간다.

### reverse

`children` 위젯을 역방향으로 보여줄 것인지 여부를 의미한다.

![reverse: false](/assets/flutter/WidgetOfTheWeek/9.PageView/Example7.gif){: #magnific width="280" height="500" margin="10"}
![reverse: true](/assets/flutter/WidgetOfTheWeek/9.PageView/Example8.gif){: #magnific width="280" height="500" margin="10"}

`reverse`가 `false`(디폴트)일 때는 1-2-3 순서로 화면이 구성되었다. 하지만 `reverse`가 `true`일 때는 3-2-1 순서로 화면이 구성되는 것을 볼 수 있다.

여기서 주의할 점은 순서가 거꾸로 되었다고 3번 화면부터 보이는 것이 아니다. `initialPage`은 `children`을 뒤집기 이전을 기준으로 계산한다.

### scrollDirection

`PageView`의 스크롤 방향, 즉 `children` 위젯의 나열 방향을 의미한다.

![scrollDirection: Axis.horizontal](/assets/flutter/WidgetOfTheWeek/9.PageView/Example7.gif){: #magnific width="280" height="500" margin="10"}
![scrollDirection: Axis.vertical](/assets/flutter/WidgetOfTheWeek/9.PageView/Example9.gif){: #magnific width="280" height="500" margin="10"}

`scrollDirection`이 `Axis.horizontal`(디폴트)일 설정했을 때는 `children` 위젯이 가로 방향으로 나열되었다. 하지만 `scrollDirection`가 `Axis.vertical`일 때는 세로 방향으로 나열되었다.
