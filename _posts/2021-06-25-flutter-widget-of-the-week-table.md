---
title: "[Flutter/Widget of the Week] Table"
categories:
- Flutter
tags:
- WidgetOfTheWeek
---

## Widget of the Week 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/_lbE0wsVZSw?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

Flutter에서 `GridView` 위젯을 사용하면 스크롤이 가능한 그리드를 쉽게 만들 수 있다. 하지만 스크롤이 불가능한 그리드가 필요할 때도 있다. 이럴 때 사용하는 것이 바로 `Table` 위젯이다.

또한 그리드로 다양한 크기의 위젯을 배열하고 싶어서, `Column`과 `Row`를 여러 개의 사이즈를 조절하여 복잡하게 만들어본 적이 있을 것이다. 이때 `Table`을 사용하면 된다. `Table`은 `children` 각각의 사이즈를 조절할 수 있다.

## 사용 예시

우선, 가장 기본적인 `Table`을 만들어보자. `border`(테두리) 외에는 아무 설정을 하지 않고, 세로 2 X 가로 3 총 6개의 색이 다른 `Container()`을 배치할 것이다.

``` dart
class TableExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Table Example'),
      ),
      body: Table(
        border: TableBorder.all(),
        children: [
          TableRow(
            children: [
              Container(
                height: 32,
                color: Colors.green,
              ),
              Container(
                height: 32,
                color: Colors.red,
              ),
              Container(
                height: 64,
                color: Colors.blue,
              ),
            ],
          ),
          TableRow(
            children: [
              Container(
                height: 64,
                color: Colors.purple,
              ),
              Container(
                height: 32,
                color: Colors.yellow,
              ),
              Container(
                height: 32,
                color: Colors.orange,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
```

![](/assets/flutter/WidgetOfTheWeek/10.Table/Example1.png){: #magnific width="300" height="500"}

색이 다른 6개의 `Container`가  그리드 형태로 화면에 그려졌다.

코드에서 알 수 있듯이, `Table`의 `children`에는 `TableRow`이 들어간다. 또한 각 `TableRow`의 세로 길이는 해당 줄에서 가장 세로 길이가 높은 `Container`에 맞춰지고, 각 `Container`의 가로 길이는 동일하게 설정된다.

## Properties

이제 `Table`의 property들의 목록을 정리하고, 그 중 주로 사용되는 property의 용도를 코드 예시와 함께 살펴보자.

| Property                 	| Description 	| Type                        	| Default                        	|
|--------------------------	|-------------	|-----------------------------	|--------------------------------	|
| border                   	| Table의 테두리.	| TableBorder?                	|                                	|
| children                 	| Table에 들어갈 TableRow 리스트.	| List\<TableRow>              	|                                	|
| columnWidths             	| 각 세로 줄의 가로 길이 리스트.	| Map\<int, TableColumnWidth>? 	| defaultColumnWidth의 값             	|
| defaultColumnWidth       	| 세로 줄의 디폴트 가로 길이.	| TableColumnWidth            	| FlexColumnWidth(1.0)           	|
| defaultVerticalAlignment 	| 각 칸의 내부의 수직 정렬 방식.	| TableCellVerticalAlignment  	| TableCellVerticalAlignment.top 	|
| textBaseline             	| 텍스트를 정렬하는데 사용되는 기준 수평선. (TableCell의 tableCellVerticalAlignment을 TableCellVerticalAlignment.baseline으로 설정했을 때만 유효하다.)	| TextBaseline?               	|                                	|
| textDirection            	| 내부 텍스트 진행 방향. (왼쪽에서 오른쪽 방향, 오른쪽에서 왼쪽 방향)	| TextDirection?              	|                                	|


### children

`Table`에 들어갈 `TableRow` 리스트이다. 각 `TableRow`는 가로 한 줄이 된다. 여기서 `Table` 위젯이 일반적인 위젯들과 다른 점은 `children`으로 `TableRow`만 받을 수 있다는 점이다.

### columnWidths

각 세로 줄의 가로 길이 리스트이다. `Table`은 `GridView`와 다르게 각 세로 줄마다 가로 길이를 정할 수 있다. 이 때 `Map<int, TableColumnWidth>` 형태로 데이터를 받는다. 만약 `i`개의 세로 줄이 있다면 `int`에 들어가는 숫자는 `0`부터 `i-1`까지가 된다.

`TableColumnWidth` 중에 아래의 대표적인 3가지를 알아보자.

* `IntrinsicColumnWidth()`는 해당 세로 줄에 해당하는 칸들의 크기에 따라서 가로 길이를 설정한다. 
* `FlexColumnWidth()`는 나머지 세로 줄이 차지하고 남은 공간 전체를 가로 길이로 설정한다. 만약 여러 줄이 `FlexColumnWidth()`을 사용한다면 남은 공간은 동일하게 나누어 사용한다.
* `FixedColumnWidth()`는 특정 픽셀 만큼을 가로 길이로 설정한다.

이제 위의 3가지 `TableColumnWidth`을 각각 1번째, 2번째, 3번째 세로 줄에 적용해볼 것이다.

``` dart
columnWidths: {
  0: IntrinsicColumnWidth(),
  1: FlexColumnWidth(),
  2: FixedColumnWidth(64),
},
```

1번째 세로 줄에 `IntrinsicColumnWidth()`를 사용했으므로 1번째 세로 줄에 해당하는 초록색, 보라색 컨테이너 중에 한 곳이라도 `width`를 설정해줘야 한다. 그렇지 않으면 1번째 세로 줄의 가로 길이가 `0`으로 설정되어 아예 화면에 보이지 않게 된다.

``` dart
Container(
  height: 64,
  width: 128,
  color: Colors.purple,
),
```

보라색 컨테이너의 `width`를 `128`로 설정했다.

![](/assets/flutter/WidgetOfTheWeek/10.Table/Example2.png){: #magnific width="300" height="500"}

1번째 줄은 `IntrinsicColumnWidth()`를 사용했기 때문에, 해당 줄에서 자동으로 가장 긴 컨테이너인 보라색 컨테이너에 맞춰서 가로 길이가 `128`이 되었다. 3번째 줄은 `FixedColumnWidth(64)`를 사용했기 때문에, 가로 길이가 `64`가 되었다. 2번째 줄은 `FlexColumnWidth()`를 사용했기 때문에, 남는 공간 전체를 가로 길이로 차지한다.

### defaultColumnWidth

세로 줄의 디폴트 가로 길이이다. `columnWidths`에서 따로 가로 길이를 설정하지 않은 세로 줄은 가로 길이가 이 값으로 설정된다는 말이다.

`defaultColumnWidth`를 한번 적용해보자.

``` dart
defaultColumnWidth: FixedColumnWidth(10),
```

`defaultColumnWidth`를 `FixedColumnWidth(10)`으로 설정했다. 이렇게만 하면 화면은 바뀌지 않는다. 위에서도 언급했듯이, `columnWidths`에서 따로 가로 길이를 설정하지 않은 세로 줄에만 적용되기 때문이다.

``` dart
columnWidths: {
  0: IntrinsicColumnWidth(),
  1: FlexColumnWidth(),
  // 2: FixedColumnWidth(64),
},
```

그래서 3번째 세로 줄의 가로 길이 설정을 위와 같이 주석 처리했다.

![](/assets/flutter/WidgetOfTheWeek/10.Table/Example3.png){: #magnific width="300" height="500"}

이제 3번째 세로 줄의 가로 길이를 따로 설정하지 않았는데도, `defaultColumnWidth`에 해당하는 `FixedColumnWidth(10)`가 적용된 것을 확인할 수 있다.

### defaultVerticalAlignment

각 칸 내부의 수직 정렬 방식이다.

![](/assets/flutter/WidgetOfTheWeek/10.Table/Example3.png){: #magnific width="300" height="500"}

현재 칸을 꽉 채운 파란색, 보라색 컨테이너를 제외하고 모든 칸들에는 빈 공간이 존재한다. 이렇게 빈 공간이 존재하는 칸들의 컨테이너들이 모두 칸 상단에 붙어있는 것을 확인할 수 있다. `defaultVerticalAlignment`의 디폴트 값이 `TableCellVerticalAlignment.top`이기 때문이다.

칸 내부의 수직 정렬 방식을 변경해보자.

``` dart
defaultVerticalAlignment: TableCellVerticalAlignment.middle,
```

`defaultVerticalAlignment`를 `TableCellVerticalAlignment.middle`로 설정했다.

![](/assets/flutter/WidgetOfTheWeek/10.Table/Example4.png){: #magnific width="300" height="500"}

이제 빈 공간이 존재하는 칸들의 컨테이너들이 모두 칸 중간에 위치하는 것을 볼 수 있다.

그런데 여기서 빨간색 컨테이너는 이전처럼 칸 상단에 배치하고 싶을 수 있다. 이런 식으로 특정 칸만 내부의 수직 정렬 방법을 변경하고 싶은 경우에 `TableCell`을 사용한다.

``` dart
TableCell(
  verticalAlignment: TableCellVerticalAlignment.top,
  child: Container(
    height: 32,
    width: 32,
    color: Colors.red,
  ),
),
```

위와 같이 `TableCell`를 사용하고, `child`에  기존의 빨간색 컨테이너를 넣었다. 또한 컨테이너를 칸의 상단에 배치하기 위해 `verticalAlignment`을 `TableCellVerticalAlignment.top`로 설정했다.

![](/assets/flutter/WidgetOfTheWeek/10.Table/Example5.png){: #magnific width="300" height="500"}


빨간색 컨테이너만 칸의 상단에 배치된 것을 확인할 수 있다.
