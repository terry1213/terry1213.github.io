---
title: "[Flutter] 점선 디바이더(DashedDivider) 구현하기"
categories:
- Flutter
tags:
- Tip
---

Flutter에선 `Divider` 위젯을 기본적으로 제공한다. 대부분의 경우에는 `Divider` 위젯을 사용하면 된다.

하지만 점선으로 이루어진 디바이더를 사용하고 싶을 때가 있다. `Divider` 위젯으로는 점선 디바이더를 만들 수 없기 때문에 점선 디바이더(`DashedDivider`)를 직접 구현하여 사용해야 한다.

그래서 간단하게 `DashedDivider`를 구현해보고자 한다. `Divider`에도 수평과 수직이 따로 있듯이 `DashedDivider`도 수평(`HorizontalDashedDivider`)과 수직(`VerticalDashedDivider`)을 나눠서 구현할 것이다.

## 수평 점선 디바이더(`HorizontalDashedDivider`)

우선 수평 점선 디바이더(`HorizontalDashedDivider`)를 어떻게 구현하는지에 대해 알아보자.

### Properties

``` dart
final double? space;
final double? length;
final double? thickness;
final Color? color;
final double? indent;
final double? endIndent;
```

 * `space` : 디바이더의 높이
 * `length` : 점선 하나의 길이 
 * `thickness` : 점선의 두께
 * `color` : 점선의 색깔
 * `indent` : 점선이 시작하기 전 빈공간 길이(좌측 빈공간)
 * `endIndent` : 점선이 끝난 후 빈공간 길이(우측 빈공간)

### Constructor

``` dart
const HorizontalDashedDivider(
    {Key? key,
      this.space,
      this.length,
      this.thickness,
      this.color,
      this.indent,
      this.endIndent})
    : assert(space == null || space >= 0.0),
      assert(length == null || length >= 0.0),
      assert(thickness == null || thickness >= 0.0),
      assert(indent == null || indent >= 0.0),
      assert(endIndent == null || endIndent >= 0.0),
      super(key: key);
```

`space`, `length`, `thickness`, `indent`, `endIndent`는 `null`이거나 `0`이상이어야 한다. `assert()`를 사용하여 이를 걸러주었다.

### `build()` method

``` dart
@override
Widget build(BuildContext context) {
  // Part1
  final DividerThemeData dividerTheme = DividerTheme.of(context);
  final double space = this.space ?? dividerTheme.space ?? 10.0;
  final double length = this.length ?? 10.0;
  final double thickness = this.thickness ?? dividerTheme.thickness ?? 5.0;
  final Color color =
      this.color ?? dividerTheme.color ?? Theme.of(context).dividerColor;
  final double indent = this.indent ?? dividerTheme.indent ?? 0.0;
  final double endIndent = this.endIndent ?? dividerTheme.endIndent ?? 0.0;

  // Part2
  return Padding(
    padding: EdgeInsets.only(left: indent, right: endIndent),
    child: Container(
      height: space,
      child: LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          final boxWidth = constraints.constrainWidth();
          final dashLength = length;
          final dashThickness = thickness;
          final dashCount = (boxWidth / (2 * dashLength)).floor();
          return Flex(
            children: List.generate(dashCount, (_) {
              return SizedBox(
                width: dashLength,
                height: dashThickness,
                child: DecoratedBox(
                  decoration: BoxDecoration(color: color),
                ),
              );
            }),
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            direction: Axis.horizontal,
          );
        },
      ),
    ),
  );
}
```

 * Part1 : 디바이더에 사용되는 변수들의 값을 설정하는 부분이다. 값이 설정되는 방법의 우선 순위는 다음과 같이 정했다.
    1. 유저가 직접 입력한 값(`this.`)이 있다면 해당 값으로 설정한다.
    2. 1번 값이 없고 `dividerTheme`에 설정된 값이 있다면 해당 값으로 설정한다.(`length` 변수와 같이 `dividerTheme`로 설정할 수 없는 부분이라면 2번 부분을 생략한다.)
    3. 1,2번 값이 모두 없다면 디폴트 값으로 설정한다.
 * Part2 : 실직적으로 디바이더를 그리는 부분이다. 어려운 부분이 없기 때문에 따로 설명을 하진 않겠다.

### 사용 예시

![](/assets/flutter/Tip/DashedDivider/Example1.png){: #magnific width="300" height="500"}

``` dart
Scaffold(
  appBar: AppBar(
    title: Text('DashedDivider Example'),
  ),
  body: Column(
    children: [
      Expanded(
        child: Container(
          color: Colors.yellow,
        ),
      ),
      HorizontalDashedDivider(),
      Expanded(
        child: Container(
          color: Colors.green,
        ),
      ),
    ],
  ),
)
```

위의 예시에서는 `HorizontalDashedDivider`에 아무 것도 설정하지 않았기 때문에 디폴트 값들을 사용하여 `HorizontalDashedDivider`를 그렸다. 상황에 따라 설정을 바꾼다면 다양한 형태의 `HorizontalDashedDivider`를 사용할 수 있다.

## 수직 점선 디바이더(`VerticalDashedDivider`)

다음은 수직 점선 디바이더(`VerticalDashedDivider`)이다. 사실 `HorizontalDashedDivider`과 거의 동일하다. `build()` 메소드만 조금 다르기 때문에 해당 부분만 살펴보자.

### `build()` 메소드

``` dart
@override
Widget build(BuildContext context) {
  final DividerThemeData dividerTheme = DividerTheme.of(context);
  final double space = this.space ?? dividerTheme.space ?? 10.0;
  final double length = this.length ?? 10.0;
  final double thickness = this.thickness ?? dividerTheme.thickness ?? 5.0;
  final Color color =
      this.color ?? dividerTheme.color ?? Theme.of(context).dividerColor;
  final double indent = this.indent ?? dividerTheme.indent ?? 0.0;
  final double endIndent = this.endIndent ?? dividerTheme.endIndent ?? 0.0;

  return Padding(
    padding: EdgeInsets.only(top: indent, bottom: endIndent), // 변경
    child: Container(
      width: space, // 변경
      child: LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          final boxHeight = constraints.constrainHeight(); // 변경
          final dashThickness = thickness;
          final dashLength = length;
          final dashCount = (boxHeight / (2 * dashLength)).floor(); // 변경
          return Flex(
            children: List.generate(dashCount, (_) {
              return SizedBox(
                width: dashThickness, // 변경
                height: dashLength, // 변경
                child: DecoratedBox(
                  decoration: BoxDecoration(color: color),
                ),
              );
            }),
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            direction: Axis.vertical, // 변경
          );
        },
      ),
    ),
  );
}
```

변경 사항은 매우 간단하다. 높이와 너비를 반대로 바꿔주었고, 점선들의 나열 방식을 수평에서 수직으로 변경했다.

### 사용 예시

![](/assets/flutter/Tip/DashedDivider/Example2.png){: #magnific width="300" height="500"}

``` dart
Scaffold(
  appBar: AppBar(
    title: Text('DashedDivider Example'),
  ),
  body: Row(
    children: [
      Expanded(
        child: Container(
          color: Colors.yellow,
        ),
      ),
      VerticalDashedDivider(),
      Expanded(
        child: Container(
          color: Colors.green,
        ),
      ),
    ],
  ),
)
```

`VerticalDashedDivider`를 사용하기 위해 `Column`을 `Row`로 변경했다. 화면에 수직 점선 디바이더가 그려지는 것을 확인할 수 있다.

## 전체 코드

<details markdown="1">
  <summary>전체 코드 펼치기/접기</summary>

``` dart
import 'package:flutter/material.dart';

void main() {
  runApp(ExampleApp());
}

class ExampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DashedDivider Example',
      home: DashedDividerExample(),
    );
  }
}

class DashedDividerExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('DashedDivider Example'),
      ),
      body: Row(
        children: [
          Expanded(
            child: Container(
              color: Colors.yellow,
            ),
          ),
          VerticalDashedDivider(),
          Expanded(
            child: Container(
              color: Colors.green,
            ),
          ),
        ],
      ),
    );
  }
}

class HorizontalDashedDivider extends StatelessWidget {
  final double space;
  final double length;
  final double thickness;
  final Color color;
  final double indent;
  final double endIndent;

  const HorizontalDashedDivider(
      {Key key,
        this.space,
        this.length,
        this.thickness,
        this.color,
        this.indent,
        this.endIndent})
      : assert(space == null || space >= 0.0),
        assert(length == null || length >= 0.0),
        assert(thickness == null || thickness >= 0.0),
        assert(indent == null || indent >= 0.0),
        assert(endIndent == null || endIndent >= 0.0),
        super(key: key);

  @override
  Widget build(BuildContext context) {
    final DividerThemeData dividerTheme = DividerTheme.of(context);
    final double space = this.space ?? dividerTheme.space ?? 10.0;
    final double length = this.length ?? 10.0;
    final double thickness = this.thickness ?? dividerTheme.thickness ?? 5.0;
    final Color color =
        this.color ?? dividerTheme.color ?? Theme.of(context).dividerColor;
    final double indent = this.indent ?? dividerTheme.indent ?? 0.0;
    final double endIndent = this.endIndent ?? dividerTheme.endIndent ?? 0.0;

    return Padding(
      padding: EdgeInsets.only(left: indent, right: endIndent),
      child: Container(
        height: space,
        child: LayoutBuilder(
          builder: (BuildContext context, BoxConstraints constraints) {
            final boxWidth = constraints.constrainWidth();
            final dashLength = length;
            final dashThickness = thickness;
            final dashCount = (boxWidth / (2 * dashLength)).floor();
            return Flex(
              children: List.generate(dashCount, (_) {
                return SizedBox(
                  width: dashLength,
                  height: dashThickness,
                  child: DecoratedBox(
                    decoration: BoxDecoration(color: color),
                  ),
                );
              }),
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              direction: Axis.horizontal,
            );
          },
        ),
      ),
    );
  }
}

class VerticalDashedDivider extends StatelessWidget {
  final double space;
  final double length;
  final double thickness;
  final Color color;
  final double indent;
  final double endIndent;

  const VerticalDashedDivider(
      {Key key,
      this.space,
      this.length,
      this.thickness,
      this.color,
      this.indent,
      this.endIndent})
      : assert(space == null || space >= 0.0),
        assert(length == null || length >= 0.0),
        assert(thickness == null || thickness >= 0.0),
        assert(indent == null || indent >= 0.0),
        assert(endIndent == null || endIndent >= 0.0),
        super(key: key);

  @override
  Widget build(BuildContext context) {
    final DividerThemeData dividerTheme = DividerTheme.of(context);
    final double space = this.space ?? dividerTheme.space ?? 10.0;
    final double length = this.length ?? 10.0;
    final double thickness = this.thickness ?? dividerTheme.thickness ?? 5.0;
    final Color color =
        this.color ?? dividerTheme.color ?? Theme.of(context).dividerColor;
    final double indent = this.indent ?? dividerTheme.indent ?? 0.0;
    final double endIndent = this.endIndent ?? dividerTheme.endIndent ?? 0.0;

    return Padding(
      padding: EdgeInsets.only(top: indent, bottom: endIndent),
      child: Container(
        width: space,
        child: LayoutBuilder(
          builder: (BuildContext context, BoxConstraints constraints) {
            final boxHeight = constraints.constrainHeight();
            final dashThickness = thickness;
            final dashLength = length;
            final dashCount = (boxHeight / (2 * dashLength)).floor();
            return Flex(
              children: List.generate(dashCount, (_) {
                return SizedBox(
                  width: dashThickness,
                  height: dashLength,
                  child: DecoratedBox(
                    decoration: BoxDecoration(color: color),
                  ),
                );
              }),
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              direction: Axis.vertical,
            );
          },
        ),
      ),
    );
  }
}
```

</details>
