---
title: "[Flutter/Document] 핫 리로드(Hot reload)"
categories:
- Flutter
tags:
- Document
---

[Flutter 공식 문서 원본 이동](https://flutter.dev/docs/development/tools/hot-reload){:target="_blank"}

Flutter의 핫 리로드 기능은 개발자가 빠르고 간단하게 테스트하고, UI를 빌드하고, 버그를 고치는 것에 도움을 준다. 핫 리로드는 실행 중인 가상 머신(Virtual Machine)에 업데이트된 소스 코드를 주입하는 방식으로 작동한다. 가상 머신이 새로운 버전의 필드와 함수로 클래스를 업데이트한 후에, Flutter 프레임워크가 자동으로 위젯 트리를 재빌드하고, 개발자가 변경 사항을 빠르게 확인할 수 있게 만들어준다.

## 핫 리로드를 실행하는 방법

1. 지원하는 Flutter 에디터 혹은 터미널 윈도우에서 앱을 실행시킨다. 이때 실제 디바이스와 가상 디바이스 모두 가능하다. 하지만 여기서 주의할 점은 디버그 모드의 Flutter 앱에서만 핫 리로드가 가능하다.
2. 프로젝트 내부의 Dart 파일 하나를 수정한다. 대부분의 변경 사항은 핫 리로드가 적용되지만, 예외들이 있다. 해당 예외들의 경우, **핫 리스타트(Hot restart)**가 필요하다.
3. 만약 Flutter의 IDE 툴을 지원하는 IDE 혹은 에디터에서 작업하고 있다면, **모두 저장(cmd-s/ctrl-s)** 기능을 사용하거나 툴바의 **핫 리로드 버튼**을 클릭하면 된다.

만약 `flutter run` 명령어를 사용하여 앱을 실행하고 있다면, `r`을 입력하여 핫 리로드를 실행할 수 있다.

핫 리로드가 성공적으로 실행되면, 아래와 같은 콘솔 메시지를 볼 수 있을 것이다.

``` console
Performing hot reload...
Reloaded 1 of 448 libraries in 978ms.
```

변경사항을 반영하여 앱이 업데이트되고, 앱의 현재 상태가 보존된다. 또한 앱은 핫 리로드가 실행되기 이전의 위치에서 계속 작동된다.

> **핫 리로드, 핫 리스타트, 풀 리스타트의 차이점:**
> <br>
> * **핫 리로드**는 가상 머신에 변경된 코드를 불러오고 위젯 트리를 재빌드한다. 이때 앱의 상태를 보존하기 때문에 `main()`이나 `initState()`를 재실행하지 않는다. (Intellij와  Android Studio에서는 ⌘\, VSCode에서는  ⌃F5)
> * **핫 리스타트** 는 가상 머신에 변경된 코드를 불러오고 Flutter 앱을 재시작한다. 이때 앱의 상태는 잃어버린다. (Intellij와  Android Studio에서는 ⇧⌘\, VSCode에서는  ⇧⌘F5)
> * **풀 리스타트**는 iOS, Android, Web 어플을 재시작한다. 이는 앞선 두가지보다 더 많은 시간을 필요로하는데 Java / Kotlin / ObjC / Swift 코드를 재 컴파일링 해야하기 때문이다. Web의 경우에는 Dart Development Compiler를 재시작하기까지 한다. 풀 리스타트에는 단축키는 따로 없어서 직접 앱을 멈췄다가 시작해야한다.
> <br><br>
> 현재 Flutter Web에서는 핫 리스타트만 지원한다. 핫 리로드는 지원하지 않는다.

![](/assets/flutter/Document/Example1.png)

Android Studio의 컨트롤 버튼 위치이다.

변경된 코드는 변경 이후에 꼭 재실행되어야 적용된다. 특별히 핫 리로드는 모든 위젯을 재빌드하는데, 이때 위젯 재빌드 과정에 포함되는 코드만 재실행된다. 예를 들어, `main()`과 `initState()` 함수는 위젯의 재빌드 과정에 포함되지 않기 때문에 재실행되지 않는다.

## 핫 리로드가 적용되지 않는 예외

이번 섹션에서는 핫 리로드와 관련하여 여러가지 상황에 대해 다룰 것이다. 몇몇 경우에는 핫 리로드를 사용할 수 있지만, 상황에 따라서는 핫 리스타트 혹은 풀 리스타드가 필요할 때가 있다.

### 앱이 죽었을 때

앱이 죽으면 핫 리로드를 사용할 수 없다. 앱이 백그라운드에 너무 오래 있게 되면 이런 일이 발생한다.

### 컴파일 에러

만약 변경된 코드에서 컴파일 에러가 발견된다면, 핫 리로드는 아래와 같은 에러 메시지를 보여준다.

``` console
Hot reload was rejected:
'/Users/obiwan/Library/Developer/CoreSimulator/Devices/AC94F0FF-16F7-46C8-B4BF-218B73C547AC/data/Containers/Data/Application/4F72B076-42AD-44A4-A7CF-57D9F93E895E/tmp/ios_testWIDYdS/ios_test/lib/main.dart': warning: line 16 pos 38: unbalanced '{' opens here
  Widget build(BuildContext context) {
                                     ^
'/Users/obiwan/Library/Developer/CoreSimulator/Devices/AC94F0FF-16F7-46C8-B4BF-218B73C547AC/data/Containers/Data/Application/4F72B076-42AD-44A4-A7CF-57D9F93E895E/tmp/ios_testWIDYdS/ios_test/lib/main.dart': error: line 33 pos 5: unbalanced ')'
    );
    ^
```

### CupertinoTabView의 builder

핫 리로드가 CupertinoTabView의 builder에는 적용되지 않는다. 해당 문제에 관하여 더 자세한 정보가 필요하다면 [Issue 43574](https://github.com/flutter/flutter/issues/43574){:target="_blank"}를 살펴보자.

### 열거형 타입(Enumerated types)

열거형 타입을 클래스로 변경하거나 클래스를 열거형 타입으로 변경하는 것에 대해 핫 리로드가 적용되지 않는다.

아래는 이에 대한 예시이다.

``` dart
// 변경 전.
enum Color {
  red,
  green,
  blue
}
```

``` dart
// 변경 후.
class Color {
  Color(this.i, this.j);
  final int i;
  final int j;
}
```

### 폰트 변경

대부분의 asset 변경에 대해선 핫 리로드가 지원된다. 하지만 폰트 변경의 경우에는 핫 리스타트가 필요하다.

### 일반형 타입(Generic types)

일반형 타입의 선언을 수정한 것에 대해선 핫 리로드가 작동하지 않는다.

아래는 이에 대한 예시이다.

``` dart
// 변경 전.
class A<T> {
  T? i;
}
```

``` dart
// 변경 후.
class A<T, V> {
  T? i;
  V? v;
}
```

### 네이티브 코드

만약 Kotlin, Java, Swift, Objective-C와 같은 네이티브 코드를 변경했다면 반드시 풀 리스타트 해야 변경 사항을 적용할 수 있다.

### 이전 상태가 새로운 코드와 결합되어 있는 경우

핫 리로드는 앱의 상태를 보존한다. 이러한 방식 때문에 현재 상태를 버리지 않고 변경 사항만 볼 수 있다. 예를 들어, 앱이 로그인을 필요로 한다면, 로그인 과정을 다시 거치지 않고 하위 페이지를 핫 리로드할 수 있다. 상태가 유지되는 것이다.

만약 변경된 코드가 앱의 상태에 영향을 끼친다면, 앱이 갖는 데이터가 앱을 처음부터 작동시켰을 경우에 갖을 데이터와 다를 수 있다. 이 말을 쉽게 표현하면 핫 리르드 이후의 동작과 핫 리스타트 이후의 동작이 다를 수 있다는 것이다.

> Note: Flutter 1.17부터, `StatefulWidget`에서 `StatelessWidget`로(혹은 반대로)의 변경이 핫 리스타트를 필요로 하지 않게 되었다.

### 코드 변경이 포함되었지만 앱의 상태가 제외된 경우

Dart에서 static 필드는 lazy하게 초기화된다. 이는 static 필드의 값은 Flutter 앱이 실행되고 static 필드가 처음 읽힐 때 설정된다는 것을 의미한다. 따라서 grobal 변수와 static 필드는 상태로 취급하고, 핫 리로드 중에 재초기화되지 않는다.

만약 grobal 변수와 static 필드의 이니셜라이져를 변경하면, 풀 리스타트가 필요하다. 아래의 코드를 통해 생각해보자.

``` dart
final sampleTable = [
  Table("T1"),
  Table("T2"),
  Table("T3"),
  Table("T4"),
];
```

앱을 실행한 후에, 아래와 같이 코드를 변경한다.

``` dart
final sampleTable = [
  Table("T1"),
  Table("T2"),
  Table("T3"),
  Table("T10"),    // 변경.
];
```

여기서 핫 리로드를 하면 변경 사항이 적용되지 않는다.

이제 다른 예시를 보자.

``` dart
const foo = 1;
final bar = foo;
void onClick() {
  print(foo);
  print(bar);
}
```

앱을 실행하면, `1`을 출력하고 또 `1`을 출력한다. 이제 아래와 같이 코드를 변경하자.

``` dart
const foo = 2;    // 변경.
final bar = foo;
void onClick() {
  print(foo);
  print(bar);
}
```

`const` 필드는 상태가 아니라 alias로 취급하기 때문에 `const` 필드 값의 변경은 항상 핫 리로드가 되지만, static 필드의 이니셜라이져는 재실행되지 않는다.

Dart 가상 머신이 이니셜라이져의 변화를 감지하고 해당 변화를 적용하기 위해서 핫 리스타트가 필요하다면 플래그(신호)를 준다. 위의 예시에서는  static 필드의 이니셜라이져의 변화가 일어났기 때문에 플래그 메카니즘이 발동되어 핫 리스타트가 필요하다고 알려준다. 하지만 위의 코드를 아래에서 설명할 방법대로 수정하면 핫 리로드를 통해서도 변화를 적용할 수 있게 된다.

``` dart
final bar = foo;
```

`foo`를 업데이트하고 핫 리로드 후에 변경된 것을 보려면, `final`을 사용하지 않고, constant로 필드를 재정의하거나 `getter`를 사용하여 값을 반환해야한다. 예를 들어 다음 두가지 방법 중 하나를 사용하면 된다.

``` dart
const bar = foo;    // foo를 const로 변경하거나,
int get bar => foo;     // getter를 사용한다.
```

더 자세한 정보가 궁금하다면, [여기](https://news.dartlang.org/2012/06/const-static-final-oh-my.html){:target="_blank"}를 읽어보자.

### UI 변경이 제외된 경우

핫 리로드 작동이 성공했고 아무 에러도 발생하지 않았더라도 새로운 UI에 일부 코드 변경들이 보이지 않을 수 있다. 이러한 경우는 보통 `main()` 메소드나  `initState()` 메소드를 변경한 후에 발생한다.

일반적으로 변경된 코드가 루트 위젯의 `build()` 메소드 하위에 위치한다면 핫 리로드가 예상대로 진행된다. 그러나 위젯 트리를 재빌드했을 때 수정된 코드 부분이 다시 실행되지 않으면 핫 리로드 후에도 해당 변경 사항이 적용되지 않는다.

아래의 예를 살펴보자.

``` dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return GestureDetector(onTap: () => print('tapped'));
  }
}
```

앱을 실행한 후에, 다음과 같이 코드를 변경한다.

``` dart
import 'package:flutter/widgets.dart';

void main() {
  runApp(const Center(
      child: const Text('Hello', textDirection: TextDirection.ltr)));
}
```

여기서 핫 리스타트를 하면, 프로그램이 처음부터 시작하고, 새로운 버전의 `main()` 메소드를 실행하며, 결국 `Hello` 텍스트를 보여주는 위젯 트리를 빌드한다.

하지만, 만약 핫 리로드를 하게 되면, `main()` 메소드와 `initState()` 메소드는 재실행되지 않고, `MyApp`를 루트로 갖는 기존의 위젯 트리를 재빌드한다. 결과적으로 핫 리로드 후에도 화면 변화는 없다.

## 핫 리로드가 작동되는 메커니즘

핫 리로드가 호출되면, 호스트 머신은 마지막 컴파일 이후 변경된 코드를 확인한다. 그리고 다음 항목에 해당하는 라이브러리들은 재컴파일된다.

* 변경된 코드가 있는 모든 라이브러리
* 앱의 메인 라이브러리
* 메인 라이브러리에서 영향을 받는 라이브러리로 이어지는 라이브러리

이러한 라이브러리의 소스 코드는 커널 파일로 컴파일 되고 모바일 디바이스의 Dart 가상 머신로 전달된다.

Dart 가상 머신은 새로운 커널 파일로부터 모든 라이브러리를 리로드한다. 지금까지의 작업에선 어떤 코드도 재실행되지 않았다.

그 다음, Flutter 프레임워크가 모든 위젯에 대해 리빌드/리레이아웃/리페인트를 트리거하고 오브젝트를 렌더링한다.
