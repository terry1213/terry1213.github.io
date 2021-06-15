---
title: "[Flutter/Widget of the Week] FadeTransition"
categories:
- Flutter
tags:
- WidgetOfTheWeek
---

## Widget of the Week 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/rLwWVbv3xDQ?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

`FadeTransition`는 선명도의 변화에 애니메이션 효과를 부여해주는 위젯이다.

## 사용 예시

![](/assets/flutter/WidgetOfTheWeek/7.FadeTransition/Example1.gif){: #magnific width="300" height="500"}

<details markdown="1">
  <summary>FadeTransition 사용 예시에 대한 코드 펼치기/접기</summary>

``` dart
class _FadeTransitionExampleState extends State<StatefulWidget>
    with TickerProviderStateMixin {
  AnimationController _controller;
  Animation<double> _animation;

  initState() {
    super.initState();
    _controller = AnimationController(
        duration: const Duration(seconds: 2), vsync: this);
    _animation = CurvedAnimation(parent: _controller, curve: Curves.easeIn);

    _animation.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        _controller.reverse();
      } else if (status == AnimationStatus.dismissed) {
        _controller.forward();
      }
    });
    _controller.forward();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: double.infinity,
      width: double.infinity,
      color: Colors.white,
      child: FadeTransition(
        opacity: _animation,
        child: Padding(
            padding: EdgeInsets.all(8),
            child: Image.network(
                'https://terry1213.github.io/assets/images/logo.png')),
      ),
    );
  }
}
```

</details>
<br>

노트북 이미지가 주기적으로 투명해졌다 선명해졌다를 반복하는 것을 볼 수 있다. `opacity`에 들어가는 `Animation<double>`를 통해 애니메이션의 효과의 상세 설정을 할 수 있다. 예를 들어 애니메이션의 속도나 종류 등을 정할 수 있다.

`_controller.reverse()`는 애니메이션을 반대로 재생하는 함수로 위의 예시에선 해당 함수를 통해 선명도가 0에서 1까지 도달했을 때 반대 방향인 1부터 0으로 애니메이션을 재생하도록 했다.

## Properties

| Property               	| Description 	| Type              	| Default 	|
|------------------------	|-------------	|-------------------	|---------	|
| child                  	| 선명도 변화 애니메이션 효과를 적용할 위젯	| Widget?           	|         	|
| opacity                	| 선명도 변화 애니메이션 효과 설정 	| Animation\<double> 	|         	|
| alwaysIncludeSemantics 	| 정확한 용도를 모르겠다\...	| bool              	| false   	|
