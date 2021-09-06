---
title: "[Flutter] IconButton 위젯의 패딩 없애는 방법"
categories:
- Flutter
tags:
- Tip
---

`IconButton` 위젯를 나란히 배치해야할 때가 있다. 다음과 같은 코드가 있다고 생각해보자.

``` dart
Scaffold(
  body: Center(
    child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        IconButton(
          onPressed: () {},
          icon: Icon(Icons.arrow_back),
        ),
        IconButton(
          onPressed: () {},
          icon: Icon(Icons.arrow_forward),
        ),
      ],
    ),
  ),
)
```

## 문제

여기서 `IconButton` 위젯에 패딩이 과도하게 들어가는 문제가 발생한다.

![](/assets/flutter/Tip/IconButton/Example1.png){: #magnific width="300" height="500"}

이를 어떻게 해결할까?

일반적인 경우처럼 `padding`을 `EdgeInsets.zero`로 설정하면 될까?

``` dart
Scaffold(
  body: Center(
    child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        IconButton(
          padding: EdgeInsets.zero, // 패딩 설정
          onPressed: () {},
          icon: Icon(Icons.arrow_back),
        ),
        IconButton(
          padding: EdgeInsets.zero, // 패딩 설정
          onPressed: () {},
          icon: Icon(Icons.arrow_forward),
        ),
      ],
    ),
  ),
)
```

그렇지 않다. 아래 화면에서 패딩 크기는 그대로인 것을 확인할 수 있다.

![](/assets/flutter/Tip/IconButton/Example2.png){: #magnific width="300" height="500"}

## 원인

`padding`을 `EdgeInsets.zero`로 설정해도 패딩이 그대로인 이유가 뭘까?

이는 터치가 가능한 오브젝트에 대해서 한 면이 최소 48px의 길이를 가져야 한다는 룰이 적용되기 때문이다.
## 해결 방안

결국 해당 룰이 `IconButton` 위젯에 적용되지 않게 해주면 된다.

이는 매우 간단하다. `padding`을 `EdgeInsets.zero`로 설정하고, `constraints`를 `BoxConstraints()`로 설정하자.

``` dart
Scaffold(
  body: Center(
    child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        IconButton(
          padding: EdgeInsets.zero, // 패딩 설정
          constraints: BoxConstraints(), // constraints 
          onPressed: () {},
          icon: Icon(Icons.arrow_back),
        ),
        IconButton(
          padding: EdgeInsets.zero, // 패딩 설정
          constraints: BoxConstraints(),
          onPressed: () {},
          icon: Icon(Icons.arrow_forward),
        ),
      ],
    ),
  ),
)
```

실행해보면 `IconButton` 위젯들 사이의 패딩이 사라진 것을 볼 수 있다.

![](/assets/flutter/Tip/IconButton/Example3.png){: #magnific width="300" height="500"}
