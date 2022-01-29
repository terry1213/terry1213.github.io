---
title: "[Flutter] Extension Method란?"
categories:
- Flutter
tags:
- Tip
---

## Extension Method란?

Extension method란 무엇일까? 간단한 예를 통해 Extension method가 무엇인지 알아보자.

### String을 int로 변경하는 법

`String` '5'을 `int`로 변경하려면 어떻게 해야할까? 아마 대부분 아래처럼 사용할 것이다.

``` dart
int.parse('5');
``` 

그런데 Extension method을 통해서 이를 호출하도록 만들 수도 있다.

``` dart
extension NumberParsing on String {
  int parseInt() {
    return int.parse(this);
  }
}
```

위의 코드에서는 `String` 타입에 대해 `NumberParsing`이라는 Extension을 만들었다. 그리고 그 안에 `parseInt()`라는 `int.parse(this)`를 호출하는 Extension method를 구현했다.

이제 다음과 같이 사용하면 `int.parse('5')`와 같은 효과를 낼 수 있다.

``` dart
'5'.parseInt();
```

이제 Extension 덕분에, 타입이 `String`이라면 어떤 변수에서던 `.parseInt()` 메소드를 호출할 수 있게 되었다. (물론 안에 담긴 문자열이 숫자로 이루어져 있어야만 제대로 작동하긴 할 것이다.)

이처럼 특정 타입에서 사용할 수 있도록 추가된 확장 메소드를 Extension method라고 한다.

## 언제 사용할까?

그렇다면 Extension method는 언제 사용할까?

Extension method는 특정 타입에 대해 메소드를 만들어주기 때문에, 해당 타입에서 자주 호출하게 될 메소드가 있을 때 이를 Extension method로 만들면 좋다. 예를 들어 `List<int>` 타입에 대해서 리스트 전체의 합을 구하는 경우가 많다고 생각해보자.

그럼 다음과 같이 Extension method를 작성하면 된다.

``` dart
extension MyListExtension on List<int> {
  int sum() => fold(0, (int a, int b) => a + b);
}
```

이렇게 해두면 매 리스트마다 `.fold(0, (int a, int b) => a + b)`를 호출할 필요 없이 아래처럼 `.sum()`만 호출하면 된다.

``` dart
List<int> nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
print(nums.sum()); // 55
```

또한 외부 패키지에서 만들어진 클래스를 사용할 때 Extension method를 유용하게 사용할 수 있다. 외부 패키지의 클래스에 메소드를 추가하고 싶어도 해당 클래스를 직접 수정할 수 없기 때문에 난감할 때가 있다. 이럴 때 Extension method를 사용하면 해당 패키지의 코드를 수정하지 않고도 용도에 맞는 메소드를 추가할 수 있다.

## Extension 구조

마지막으로 Extension의 구조를 정리해보자.

```
extension <extension name> on <type> {
  (<member definition>)*
}
```

### extension name

Extension의 이름. 이름은 생략할 수 있다.

### type

Extension을 설정할 타입. 여기에는 `enum`도 들어갈 수 있다.

### member definition

Extension의 멤버 정의. 위에서는 메소드에서만 다루지만 꼭 메소드만 들어가야하는 것은 아니다. 메소드, 게터(getter), 세터(setter), 오퍼레이터(operator) 전부 들어갈 수 있다.

따라서 위에서 구현한 `sum()` 메소드를 아래와 같이 getter로 만들 수도 있다.

``` dart
extension MyListExtension on List<int> {
  int get sum => fold(0, (int a, int b) => a + b);
}
```
