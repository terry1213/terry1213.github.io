---
title: "[Flutter] 특정 위젯의 위치로 스크롤 이동"
categories:
- Flutter
tags:
- Tip
---

한 화면에 담아야할 정보가 너무 많아져서 스크롤이 길어질 때가 있다. 이때 사용자가 매번 화면 드래그를 통해 스크롤을 이동시켜야하면 매우 불편하다. 따라서 특정 위젯의 위치로 스크롤을 이동시키는 기능이 필요하다.

## 예시

아래와 같은 코드가 있다고 생각해보자.

``` dart
class ScrollToWidgetExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Moving Scroll to Widget'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              height: 600,
              color: Colors.green,
            ),
            Container(
              height: 600,
              color: Colors.yellow,
            ),
          ],
        ),
      ),
    );
  }
}
```

![](/assets/flutter/Tip/move-scroll-to-specific-widget/Example1.gif){: #magnific width="300" height="500"}

초록색 컨테이너와 노란색 컨테이너가 세로로 배치되어 있고 스크롤을 이동시키기 위해선 직접 화면을 드래그 해야한다.

예시에선 이해하기 쉽도록 2개의 컨테이너만 사용했지만 컨테이너가 많아질수록 직접 드래그하는 게 불편해질 것이다.

## 해결 방법

[scrollable_positioned_list ](https://pub.dev/packages/scrollable_positioned_list){:target="\_blank"} 패키지를 사용하는 간단한 방법이 있다.

하지만 이 글에서는 `GlobalKey`와 `Scrollable.ensureVisible()`를 사용하여 직접 구현하는 방법을 사용했다. 그렇게 한 이유는 그저 공부하기 위해서다.

패키지를 활용하는 방법이 기능적으로나 편리함으로나 무조건 좋으니 실제 개발에선 패키지를 사용하자.

### GlobalKey 생성

우선 각 컨테이너에 필요한 `GlobalKey`를 생성한다.

``` dart
final GlobalKey greenKey = GlobalKey(); // 키 생성
final GlobalKey yellowKey = GlobalKey(); // 키 생성
```

### GlobalKey 할당

그리고 생성한 `GlobalKey`를 각 컨테이너에 할당시킨다.

``` dart
Container(
  height: 600,
  key: greenKey, // greenKey 할당
  color: Colors.green,
),
Container(
  height: 600,
  key: yellowKey, // yellowKey 할당
  color: Colors.yellow,
),
```

###  Scrollable.ensureVisible()를 통한 스크롤 이동

`Scrollable.ensureVisible()`는 특정 위치가 화면에 보이도록 스크롤을 이동시키는 함수이다. 여기서 화면에 보여질 위치는 `BuildContext`를 통해 결정한다. 만약 A란 위젯의 위치로 스크롤을 이동시키고 싶다면, A 위젯의 `BuildContext`가 있어야 한다는 말이다.

앞서 `GlobalKey`를 컨테이너에 할당한 이유가 여기에 있다. `GlobalKey`의 `currentContext`를 호출하면, 해당 `GlobalKey`가 할당된 위젯의 `BuildContext`와 연결되기 때문이다.

예를 들어 아래처럼 작성하면, `greenKey.currentContext!`가 초록색 컨테이너의 `BuildContext`와 연결되기 때문에 초록색 컨테이너의 위치로 스크롤을 이동시키는 함수가 되는 것이다.

``` dart
Scrollable.ensureVisible(
  greenKey.currentContext!, // 초록색 컨테이너의 BuildContext
);
```

이제 `Scaffold`에 `drawer`를 추가하고, 거기에 각 컨테이너들로 스크롤을 이동시키는 버튼을 추가해보자.

``` dart
drawer: Drawer(
  child: ListView(
    children: [
      ListTile(
        onTap: () {
          Navigator.pop(context);
          Scrollable.ensureVisible( // 클릭 시, greenKey 위치로 스크롤 이동
            greenKey.currentContext!, // 초록색 컨테이너의 BuildContext
            duration: Duration(seconds: 1),
          );
        },
        title: Text('Green'),
      ),
      ListTile(
        onTap: () {
          Navigator.pop(context);
          Scrollable.ensureVisible( // 클릭 시, yellowKey 위치로 스크롤 이동
            yellowKey.currentContext!, // 노란색 컨테이너의 BuildContext
            duration: Duration(seconds: 1),
          );
        },
        title: Text('Yellow'),
      ),
    ],
  ),
),
```

## 확인

![](/assets/flutter/Tip/move-scroll-to-specific-widget/Example2.gif){: #magnific width="300" height="500"}

`Drawer`에서 Green 버튼을 클릭하면 초록색 컨테이너의 위치로, Yellow 버튼을 클릭하면 노란색 컨테이너의 위치로 스크롤이 이동되는 것을 볼 수 있다.

## ListView를 사용하지 않은 이유

예시에서는 `Column`을 `SingleChildScrollView`로 감싸서 사용했다. 왜 `ListView`를 사용하지 않았을까?

앞서 말했듯이 특정 위젯의 위치로 스크롤을 이동시키기 위해선 해당 위젯의 `BuildContext`가 필요하다. 하지만 `ListView`는 현재 화면에 보이는 자식 위젯만 렌더링한다. 따라서 화면에 보이지 않는 위젯은 빌드되지 않으며 `BuildContext`도 갖지 못한다.

`ListView`를 사용하면 화면에 보이지 않는 위젯의 `BuildContext`를 가져올 수 없어서 스크롤 이동 기능이 제한되기 때문에 `Column`을 `SingleChildScrollView`로 감싸서 사용한 것이다.

물론 이 방법이 무조건 좋은 것은 아니다. 화면에 보이지 않는 자식 위젯들까지 전부 렌더링하기 때문에 자식 위젯이 너무 많으면 성능 문제가 발생할 수 있으니 주의하자.

## 완성 코드

<details markdown="1">
  <summary>완성 코드 펼치기/접기</summary>

``` dart
class ScrollToWidgetExample extends StatelessWidget {
  final GlobalKey greenKey = GlobalKey();
  final GlobalKey yellowKey = GlobalKey();
	
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Moving Scroll to Widget'),
      ),
      drawer: Drawer(
        child: ListView(
          children: [
            ListTile(
              onTap: () {
                Navigator.pop(context);
                Scrollable.ensureVisible(
                  greenKey.currentContext!,
                  duration: Duration(seconds: 1),
                );
              },
              title: Text('Green'),
            ),
            ListTile(
              onTap: () {
                Navigator.pop(context);
                Scrollable.ensureVisible(
                  yellowKey.currentContext!,
                  duration: Duration(seconds: 1),
                );
              },
              title: Text('Yellow'),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              height: 600,
              key: greenKey,
              color: Colors.green,
            ),
            Container(
              height: 600,
              key: yellowKey,
              color: Colors.yellow,
            ),
          ],
        ),
      ),
    );
  }
}
```

</details>
