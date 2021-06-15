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

`shrinkWrap`를 `true`로 설정하면 내부 컨텐츠에 맞춰서 높이를 결정한다. 하지만 이 상태에선 `ListView`에서 스크롤이 되지 않기 때문에 스크롤이 가능하게 하고 싶다면 `scrollDirection`도 설정해주면 된다.


``` dart
ListView(
	shrinkWrap: true,
	scrollDirection: Axis.vertical,// 세로 방향으로 스크롤(가로 방향은 Axis.horizontal).
	// 나머지 코드 생략.
)
```
