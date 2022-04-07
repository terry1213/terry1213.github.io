---
title: "[Flutter/Decoding Flutter] ShrinkWrap vs Slivers"
categories:
- Flutter
tags:
- DecodingFlutter
---

## Decoding Flutter 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/LUqDNnv_dh0?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

## ShrinkWrap vs Slivers

### 'Vertical viewport was given unbounded height.' 에러

Flutter를 처음 배우는 사람이 가장 먼저 접하는 것 중 하나가 `ListView` 위젯이다. `ListView` 위젯을 통해 간편하게 여러 위젯들을 나열하고 스크롤할 수 있게 만들 수 있기 때문이다.

`ListView`를 처음 배우고 신나게 개발하다가, 어느 순간에 빨간 화면과 함께 아래와 같은 에러를 마주치게 된다.

``` console
Vertical viewport was given unbounded height.
```

Flutter를 배우는 모든 개발자는 이 에러를 마주친 적이 있을 것 같다. 그리고 이 에러를 어떻게 해결할 수 있는지 모두 잘 알고 있을 것이다. 일반적으로 이 에러는 `ListView`안에 `ListView`를 사용할 때 발생하며, 하위 `ListView`의 `shrinkWrap`을 true로 설정하면 해결된다.

하지만 여기에는 여전히 문제가 있다고 한다. 지금까지 위와 같은 상황을 마주하면 생각 없이 기계적으로 `shrinkWrap`을 true로 설정하고 넘어갔고, 아무 문제도 없을 것이라고 생각했기 때문에 놀랐다.

### ShrinkWrap의 문제점

`shrinkWrap`을 사용하는 것의 문제는 비용이 많이 든다는 점이라고 한다. 왜 그럴까? 이를 알기 위해서는 우선 `ListView`의 작동 방식에 대해 알아야한다.

`ListView`에는 사용자에게 보이는 높이와 내부 높이가 따로 존재한다. 사용자에게 보이는 높이는 상위에서 따로 정해줘야하고, 내부 높이는 자식 위젯들에 따라 무한히 늘어난다.

그럼 `ListView`(상위) 안에 `ListView`(하위)가 있는 경우를 생각해보자. 이 경우에 상위 `ListView`는 내부 높이가 자식 위젯들에 따라 늘어나야하는데, 반대로 하위 `ListView`는 사용자에게 보이는 높이를 상위에서 받아야 한다. 따라서 서로가 상대방의 높이를 알아야 자신의 높이를 정할 수 있는 교착 상태가 된다. 결국 아무 높이를 정할 수 없고 에러가 발생하게 된다.

그래서 이를 해결하기 위해 하위 `ListView`의 사용자에게 보이는 높이를 자신의 내부 높이와 똑같이 늘린다. 이렇게 되면 한쪽의 높이가 정해졌기 때문에 교착 상태가 풀리게 된다. 이것이 바로 하위 `ListView`의 `shrinkWrap`을 true로 설정하면 일어나는 작업이다.

그렇다면 이게 왜 문제가 되는 것일까?

만약 `shrinkWrap`을 true로 설정한 하위  `ListView`가 굉장히 길고 애니메이션 효과를 가지고 있다고 생각해보자. 해당 `ListView`의 높이를 자신의 내부 높이와 동일한 길이로 늘려야한다. 그렇기 때문에 길고 복잡한 자식 위젯들을 한번에 전부 렌더링해야한다. 이렇게 되면 프레임 드랍과 애니메이션의 버벅임이 발생하게 된다.

### 해결 방법

아래와 같은 코드가 있다고 생각해보자.

``` dart
final outerListChildren = <ListView>[
  ListView(
    shrinkWrap: true,
    physics: const NeverScrollableScrollPhysics(),
    children: <Widget>[...],
  ),
  ...
];
return ListView.builder(
  itemCount: outerListChildren.length,
  itemBuilder: (context, index) {
    return outerListChildren[index];
  },
);
```

예시에선 상위 `ListView`의 자식 위젯들을 전부 `ListView`로 가정했다. 내부 `ListView`들은 당연히 에러를 피하기 위해 전부 `shrinkWrap`을 true로 설정해놨다. 그렇기 때문에 내부 `ListView`들이 복잡할수록 문제가 더 생길 것이다.

다행히 해결 방법은 간단하다.

``` dart
return CustomScrollView( // ListView 대신 CustomScrollView 사용.
  children: outerListChildren,
)
```

우선, 상위 `ListView`를 `CustomScrollView`로 바꿔줘야한다.

``` dart
final outerListChildren = <SliverList>[]; // ListView 대신 SliverList 사용.

return CustomScrollView(
  slivers: outerListChildren,
)
```

다음으로, 하위 `ListView`를 `SliverList`로 변경한다.

``` dart
final outerListChildren = <SliverList>[
  SliverList(
    delegate: SliverChildBuilderDelegate( // 기존 하위 `ListView`의 자식 위젯들을 넣는다.
      (context, index) => _myWidgets[index],
      childCount: _myWidgets.length,
    )
  )
];

return CustomScrollView(
  slivers: outerListChildren,
)
```


기존 하위 `ListView`의 자식 위젯들을 `SliverList`의 `delegate`에 넣어준다. 만약 기존 하위 `ListView`에서 `.builder` 생성자를 사용했다면, `delegate`에 `SliverChildBuilderDelegate`를 사용하면 된다. 두가지가 매우 비슷한 형태이기 때문이다.

벌써 끝났다. `shrinkWrap`을 사용했을 때와 다르게,  이제 각 하위 `ListView`들의 내부가 복잡하더라도 효율적으로 빌드된다.
