---
title: "[Flutter/Decoding Flutter] Widgets vs Helper Methods"
categories:
- Flutter
tags:
- DecodingFlutter
---

## Decoding Flutter 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/IOyq-eTRhvo?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>


## Widgets vs Helper Methods

Flutter에서 모든 것은 위젯으로 이루어져있다. 그렇기 때문에 UI를 구현할 때, 아래와 같이 위젯으로 다른 위젯을 감싸는 것에 매우 익숙할 것이다.

``` dart
Card(
  child: ListTile(
    title: Text('Example'),
  ),
),
```

그런데 계속 위젯을 다른 위젯으로 감싸다보면 위젯 구조가 굉장히 복잡해지고 그 안에서 반복되어 사용되는 위젯들이 생긴다. 방금 봤던 `Card` 위젯 여러 개가 `ListView` 안에 있다고 생각해보자.

``` dart
ListView(
  children: [
    Card(
      child: ListTile(
        title: Text('Example1'),
      ),
    ),
    Card(
      child: ListTile(
        title: Text('Example2'),
      ),
    ),
    Card(
      child: ListTile(
        title: Text('Example3'),
      ),
    ),
  ],
)

```

위의 코드에서처럼 반복되는 위젯을 매번 일일이 타이핑하는 것은 매우 비효율적이다. 그래서 개발자는 이런 위젯들을 재사용할 수 있게 만들어야하는데, 그 방법은 두가지가 있다.

> 물론 위의 예시에서는 `ListView`의 `.builder` 생성자를 사용하면 `Card` 위젯을 반복적으로 사용할 필요가 없다. 설명을 하기 위해서 상황을 가정해본 것이고 꼭 `ListView` 내부에서 반복적으로 사용되는 경우만 있는 것이 아니라는 것을 명심하자.

### Helper Methods 방법

첫번째 방법은 같은 위젯 안에서 메소드를 활용하는 헬퍼 메소드(helper method) 방법이다.

``` dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        _buildWidget(1),
        _buildWidget(2),
        _buildWidget(3),
      ],
    );
  }

  Widget _buildWidget(int num) {
    return Card(
      child: ListTile(
        title: Text('Example$num'),
      ),
    );
  }
}
```

`_buildWidget()`라는 메소드를 통해 반복적으로 사용되는 `Card` 위젯의 코드를 분리했다.

### Widgets 방법

두번째 방법은 별개의 새로운 위젯을 생성하는 것이다.

``` dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        MyCard(num: 1),
        MyCard(num: 2),
        MyCard(num: 3),
      ],
    );
  }
}

class MyCard extends StatelessWidget {
  const MyCard({
    Key? key,
    required this.num,
  }) : super(key: key);

  final int num;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text('Example$num'),
      ),
    );
  }
}
```

### 정답은?

그렇다면 두가지 방법 중 어느 쪽을 사용해야할까? 헬퍼 메소드를 사용하면 위젯 내의 모든 변수를 자유롭게 사용할 수 있기 때문에 헬퍼 메소드가 좋다고 생각할 수 있다. 하지만 이는 잘못된 생각이다.

다음과 같은 이유들로 별개의 위젯으로 나누는 쪽이 더 좋다.

#### 불필요한 재빌드

화면에 사진과 글이 담긴 위젯이 있고 그 위젯 구석에 좋아요를 나타내는 하트 아이콘이 있다고 생각해보자. 사용자가 빈 하트를 클릭하면 빨간색 하트로 변경하기 위해 `setState()`를 호출할 것이다.

그런데 모두들 알고 있듯이 특정 위젯에서 `setState()`를 호출하면 해당 위젯의 `build()` 메소드가 재실행된다. 이 말은 결국 헬퍼 메소드를 사용하면, 사진과 글이 담긴 커다란 위젯이 전부 재빌드된다는 것을 알 수 있다.

결국 실제로 재빌드가 필요한 부분은 하트 하나인데 불필요한 부분까지 다시 그리면서 어플의 성능이 떨어지게 된다.

만약 하트 아이콘 부분을 별도의 위젯으로 만들고 그 안에서 `setState()`을 호출한다면, 딱 필요한 부분만 리빌드함으로써 어플이 더욱 효율적이게 된다.

#### 테스트 속도 및 효율

위에서 말한 하트 아이콘에 대해 테스트 작업을 진행한다고 생각해보자.

하트 아이콘을 별도의 위젯으로 만든 버전에서는 딱 해당 위젯만 가져와서 테스트를 진행할 수 있다. 하지만 헬퍼 메소드를 사용한 버전에서는 테스트와 상관 없는 부분(사진과 글)까지 불러오게 되어 테스트 속도와 효율이 떨어진다.

#### BuildContext 에러 방지

개발하다보면 `Builder` 위젯을 사용하는 경우가 있다. 이 때 `Builder` 위젯 내에서는 `Builder` 위젯  밖에 있는 `BuildContext`를 사용하지 않도록 주의해야한다.

``` dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Builder(
      builder: (innerContext) {
        return IconButton(
          onPressed: () {
            Theme.of(context)...
          }
        );
      }
    );
  }
}
```

그런데 위 코드의 `Builder` 위젯 내에서 `innerContext`를 사용해야하는데, 잘못해서 `context`를 사용했다.

만약 `IconButton`을 별도의 위젯으로 만들어주면 이러한 실수를 방지할 수 있다.

``` dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Builder(
      builder: (innerContext) {
        return MyIconButton();
      }
    );
  }
}

class MyIconButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: () {
        Theme.of(context)...
      }
    );
  }
}
```

`MyIconButton`라는 별도의 위젯을 만든 덕분에 하나의 `BuildContext`에만 접근할 수 있는 상태가 되었다.

### 결론

위에서 알아봤듯이 모든 면에서 별도의 위젯을 구성하는 것이 좋다. 굳이 헬퍼 메소드의 이점을 찾아보자면, 코드를 조금 더 짧게 작성할 수 있다는 것 정도다.

지금까지 헬퍼 메소드를 사용하고 있었다면 앞으로는 조금 귀찮더라도 별도의 위젯을 구성하도록 하자.
