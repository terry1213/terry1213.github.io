---
title: "[Flutter] Vertical viewport was given unbounded height 에러"
categories:
- Flutter
tags:
- Error
---

`Column` 안에 `Listview`를 사용하다보니 다음과 같은 에러가 발생했다 .

## 에러 내용

``` console
Vertical viewport was given unbounded height.
```

## 원인

`Listview`는 부모 위젯의 높이에 맞춰서 자신의 높이를 설정한다. 따라서 `Listview`의 내부 컨텐츠가 적은 공간만 차지해도 되는 상황이라도 `Listview`는 사용할 수 있는 최대 공간을 차지한다.  이러한 `Listview`의 성격 때문에 위와 같은 에러가 발생한다. `Column`의 높이가 정해지지 않은 상태이기 때문에 `Listview`의 높이가 무한이 된 것이다. 따라서 `Listview`의 높이를 설정해주면 해당 에러를 해결할 수 있다.

## 해결 방법

### shrinkWrap: true

첫번째 방법은 `shrinkWrap`를 `true`로 설정하는 것이다. 이렇게 하면 내부 컨텐츠에 맞춰서 높이가 결정된다. 하지만 이렇게 하면 `ListView` 안의 `children`이 많아져 화면 이상으로 넘어가면 오버플로우가 발생하게 되는 문제가 있다.


``` dart
ListView(
  shrinkWrap: true,
  children: [
    Container(
      height: 400,
      color: Colors.red,
    ),
    Container(
      height: 400,
      color: Colors.blue,
    ),
    Container(
      height: 400,
      color: Colors.green,
    ),
  ],
)
```

### SizedBox()

두번째는 `SizedBox` 위젯을 활용하는 방법이다. `ListView`를 `SizedBox`으로 감싸고 `SizedBox`에 `height`를 설정한다.

``` dart
SizedBox(
  height: 400,
  child: ListView(
    children: [
      Container(
        height: 400,
        color: Colors.red,
      ),
      Container(
        height: 400,
        color: Colors.blue,
      ),
      Container(
        height: 400,
        color: Colors.green,
      ),
    ],
  ),
),
```

### Expanded()

마지막으로, 고정된 높이를 주기 싫고 화면의 나머지 높이를 전부 `ListView`에 할당해주고 싶다면 `Expanded`을 사용하자.

``` dart
Expanded(
  child: ListView(
    children: [
      Container(
        height: 400,
        color: Colors.red,
      ),
      Container(
        height: 400,
        color: Colors.blue,
      ),
      Container(
        height: 400,
        color: Colors.green,
      ),
    ],
  ),
),
```
