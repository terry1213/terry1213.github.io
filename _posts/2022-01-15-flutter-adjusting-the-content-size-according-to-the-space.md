---
title: "[Flutter] 공간에 맞춰서 컨텐츠 크기 조절하기(Adjusting the Content Size According to the
  Space)"
categories:
- Flutter
tags:
- Tip
---

Flutter에서 공간을 할당해줄 때, 내부 컨텐츠의 길이와 크기에 따라서 의도하지 않은 UI를 보여줄 때가 있다. 글로 설명하는 게 어려우니 예시를 통해 확인해보자.

## 예시

아래와 같은 위젯이 있다.

``` dart
// 아무 설정도 하지 않음.
class ItemFormat1 extends StatelessWidget {
  const ItemFormat1(this.index, {Key? key}) : super(key: key);

  final int index;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text('Item$index'),
        Expanded(
          child: Container(
            height: 100,
            color: Colors.green,
          ),
        )
      ],
    );
  }
}
```

`ListView` 위젯에 해당 위젯을 20개 정도 넣어보자.

![](/assets/flutter/Tip/FittedBox/Example1.png){: #magnific  width='300' }

위의 화면을 보면 10번 아이템부터 초록색 컨테이너의 가로 길이가 미세하게 짧아졌고 그만큼 텍스트 부분이 길어졌다. 10번 아이템부터는 숫자가 두자리가 되어서 텍스트가 한글자 길어졌기 때문이다.

만약 초록색 컨테이너 부분과 텍스트 부분의 가로 길이를 동일하게 설정하고 싶었다면 위와 같은 화면을 어떻게 고치면 될까?

## SizedBox()를 사용하면?

`Text` 위젯을 `SizedBox`으로 감싸고 `width`를 지정하면 될까?

``` dart
// 공간 크기만 지정.
class ItemFormat2 extends StatelessWidget {
  const ItemFormat2(this.index, {Key? key}) : super(key: key);

  final int index;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 40,
          child: Text('Item$index'),
        ),
        Expanded(
          child: Container(
            height: 100,
            color: Colors.yellow,
          ),
        )
      ],
    );
  }
}
```

위 코드에서는 `Text` 위젯의 가로 길이를 40으로 고정시켰다. 이렇게 하면 어떤 화면이 나올지 확인해보자.

![](/assets/flutter/Tip/FittedBox/Example2.png){: #magnific  width='300' }

이번에는 10번째 아이템부터 아예 2줄이 되어서 더 큰 문제가 되었다. `width`를 아예 10번째 아이템의 `Text` 길이에 맞춘다고 해도 100번째 아이템에서 2줄이 되는 문제가 다시 발생할 것이다.

## FittedBox()으로 해결!

그래서 내부 컨텐츠를 지정한 공간에 맞춰서 늘리고 줄이는 방법이 필요하다. 이럴 때 사용하는 것이 바로 `FittedBox` 위젯이다.

``` dart
// 공간 크기를 지정하고, FittedBox를 사용.
class ItemFormat3 extends StatelessWidget {
  const ItemFormat3(this.index, {Key? key}) : super(key: key);

  final int index;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 40,
          child: FittedBox(
            fit: BoxFit.fitWidth, // 가로 길이에 맞추도록 설정.
            child: Text('Item$index'),
          ),
        ),
        Expanded(
          child: Container(
            height: 100,
            color: Colors.blue,
          ),
        )
      ],
    );
  }
}
```

위의 코드에서는 이전 코드와 동일하게 40의 가로 길이를 할당했다. 그런데 추가로 `Text` 위젯을 `FittedBox` 위젯으로 감싸고, `fit`을 `BoxFit.fitWidth`로 설정했다. 여기서 `fit`은 어떤 기준으로 `FittedBox`의 `child` 위젯의 크기를 조절할지를 나타낸다.

![](/assets/flutter/Tip/FittedBox/Example3.png){: #magnific  width='300' }

이제 10번 아이템에서도 오른쪽 파란색 컨테이너와 텍스트의 가로 길이가 변경되지 않는다. 왼쪽 `Text` 위젯의 크기가 `SizedBox`의 가로 길이인 40에 맞춰서 줄어들었기 때문이다.

## 결론

`FittedBox` 위젯은 내부 컨텐츠를 외부 사이즈에 맞춰 늘리거나 줄이고 싶을 때 사용한다.

앞서 말한 상황이 `FittedBox` 위젯을 사용하기에 엄청 적절한 예시는 아니었던 것 같다. 하지만 `FittedBox` 위젯을 사용하면 어떤 효과를 얻을 수 있는지에 대한 설명은 충분히 되었을 것이라고 생각한다.

## 전체 예시 코드

<https://github.com/terry1213/flutter-example/tree/FittedBox>{:target="\_blank"}
