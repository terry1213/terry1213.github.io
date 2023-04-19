---
title: "[Flutter] 왜 copyWith()를 사용할까?"
categories:
- Flutter
tags:
- Tip
---

Flutter로 개발을 하다보면 `copyWith()`란 메소드를 사용하거나 마주칠 일이 자주 있다. `TextStyle`, `Theme` 등 다양한 클래스에서 `copyWith()` 를 제공하고 있다.

## copyWith()를 사용하는 이유

그렇다면 `copyWith()`를 사용하는 이유는 뭘까?
원본 객체를 변경하지 않고 특정 값만 바꾼 새로운 객체를 반환하기 위함이다.

## copyWith()가 없다면?

그럼 `copyWith()` 없이  기본 생성자를 사용해서 새로운 객체를 만든다고 생각해보자. 이런 경우에는 기존 객체에서 몇가지의 속성만 변경한 객체가 필요한 상황에서 문제가 생긴다.

아래는 `bodyMedium`의 `TextStyle`에서 볼드 처리만 추가하여 사용하려는 상황이다.

``` dart
// copyWith() 사용 시
Theme.of(context).textTheme.bodyMedium.copyWith(
  fontWeight: FontWeight.bold,
)

// 기본 생성자 사용 시
TextStyle(
  fontWeight: FontWeight.bold,
  color: Colors.black,
  fontSize: 20,
  // 생략...
)
```

`copyWith()`의 경우에는 `fontWeight: FontWeight.bold,`만 설정해주면 된다. 하지만 기본 생성자의 경우에는 `fontWeight: FontWeight.bold,`외의 모든 속성들도 `bodyMedium`의 값으로 설정해야해서 코드가 불필요하게 길어진다.

그렇다면 이를 해결하기 위해서 원본 객체를 변환하여 사용하면 어떨까?
원본 객체를 변경하여 사용하는 경우 객체의 불변성이 유지되지 않게 된다. 이렇게 되면 해당 객체를 사용하는 부분에서 예상치 못한 문제가 발생할 수 있고 디버깅이 어려워질 수 있다.

결국 이러한 이유로 `copyWith()`를 사용하는 것이다.

## 직접 만든 Class에서도 copyWith() 사용하기

이러한 이유들로 직접 만들어 사용하는 Class에도 `copyWith()`를 구현하여 사용하는 것이 좋다고 생각한다.  `copyWith()`를 구현하는 것은 어렵지 않다. 아래의 간단한 예시를 보면 직접 만들 수 있을 것이다.

``` dart
class Person {
  final String name;
  final int age;
  final String gender;

  Person({required this.name, required this.age, required this.gender});

  Person copyWith({String? name, int? age, String? gender}) => Person(
    name: name ?? this.name,
    age: age ?? this.age,
    gender: gender ?? this.gender,
  );
}
```

1. 우선 `copyWith()`라는 이름으로 함수를 만드는데 리턴 타입을 해당 클래스인 `Person`으로 설정한다.
2. 그리고 `copyWith()`의 파라미터로 모든 속성들 다 받는데, 이때 `required`로 설정하지 말고 `optional`로 설정한다. 이는 우리가 `copyWith()`를 호출할 때 변경할 속성만 명시하고 나머지는 명시하지 않기 위함이다. 
3. 마지막으로 기본 생성자인 `Person()`를 호출하고, `??`를 통해 각 파라미터 값을 확인하여 null이라면 원본 객체의 값을 넣고 null이 아니라면 파라미터 값을 넣어서 리턴한다.

이렇게 하면 원본 객체를 변경하지 않고 특정 값만 바꾼 새로운 객체를 반환해주는 `copyWith()`가 완성된다.
