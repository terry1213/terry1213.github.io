---
title: "[Flutter] Provider를 통해 상태 관리하기"
categories:
- Flutter
tags:
- Package
---

Flutter를 통해 개발을 진행하다보면 상태(State) 관리가 매우 중요하다는 것을 느낄 수 있다.

여기서 상태(State)는 <sup>1)</sup>**위젯이 빌드되는 동시에 읽을 수 있고,** <sup>2)</sup>**위젯의 생명 주기동안 변경할 수 있는** 정보를 말한다. 보통 사용자와 어플의 상호작용으로 인해 변화하는 데이터들이 여기에 해당한다.

만약 특정 상태를 한 페이지 내에서만 사용한다면 상태 관리가 어렵지 않을 것이다. 하지만 여러 페이지에서 사용되는 상태가 필요한 상황이 많다. 예를 들어 쇼핑 앱에서 장바구니를 생각해보자. 장바구니의 상태는 장바구니 페이지에서 사용되고, 각 물품의 상세 페이지에서 해당 물품을 장바구니에 담을 때도 사용된다. 장바구니 같은 경우로 인해 상태 관리가 복잡해지고, 효과적인 상태 관리 방법이 필요해진다.

Flutter에서 사용할 수 있는 대표적인 상태 관리 방법에는 다음과 같은 것들이 있다.

* Provider
* InheritedWidget & InheritedModel
* Redux
* BLoC / Rx
* GetX

오늘은 이 중에 `Provider`에 대한 개념을 알아볼 것이다.

## 0. Provider란?

Provider는 여러가지 상태 관리 중에서도 쉬운 편에 속한다. BLoC을 먼저 배웠었는데, BloC 비하면 Provider를 이해하는데 걸린 시간은 절반도 안 되었던 것 같다.

Provider는 크게 **생성 부분**과 **소비 부분**으로 나누어 생각하면 된다.

생성 부분에서는 사용할 데이터 타입을 결정하고 해당 데이터에 대한 Provider를 만들고, 소비 부분에서는 Provider를 통해 데이터를 불러오거나 수정하는 등의 작업을 진행한다.

<br>

이제 간단한 예제(Counter)와 함께 Provider의 사용법을 알아보자.

##  패키지 사용을 위한 준비 작업
{:.no_toc}


<details markdown="1">
 <summary> 패키지 사용을 위한 준비 작업 펼치기/접기 </summary>

###  pubspec.yaml 파일에 패키지 추가
{:.no_toc}

``` yaml
dependencies:
  provider: ^5.0.0
```

### 설치
{:.no_toc}

``` console
flutter pub get
```

### import
{:.no_toc}

``` dart
import 'package:provider/provider.dart';
```

</details>

## 1. Provider 생성

Provider를 생성하는 방법은 다양하다. 용도에 따라 적합한 방법을 선택하여 사용한다.

### 1.1. `Provider`

`Provider`는 제일 기본적인 Provider를 생성하는 방법이다.

숫자가 1씩 증가하는 `Counter` 클래스에 대한 Provider를 생성해보자.

#### 1.1.1. (적용) `Counter` 클래스 정의

``` dart
class Counter {
  int _count = 0;

  int get count => _count;

  void increment() {
    _count++;
  }
}
```

우선 위와 같이 `Counter` 클래스를 정의했다.

#### 1.1.2. (적용) Provider 생성

``` dart
class ExampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider<Counter>( // Counter에 대한 Provider를 생성했다.
      create: (_) => Counter(),
      child: Example(), // Counter의 숫자를 보여주는 위젯이 들어갈 것이다.
    );
  }
}
```

정의한 `Counter`에 대한 Provider를 생성했다. 하지만 현재 상태에서는 `Counter`의 숫자가 증가해도 UI의 숫자는 그대로일 것이다.

### 1.2. `ChangeNotifierProvider`

`ChangeNotifierProvider`를 통해서 Provider를 생성하면, `Counter`의 숫자가 증가할 때 UI의 숫자도 똑같이 증가하게 할 수 있다.

`ChangeNotifierProvider`는 `ChangeNotifier`의 `notifyListeners()`를 기다리다가, `notifyListeners()`가 호출되면, 자신의 자식을 재빌드하여 UI를 업데이트해주기 때문이다.

#### 1.2.1. (적용) `Counter` 클래스 수정

``` dart
class Counter extends ChangeNotifier { // ChangeNotifier를 extends한다.
  int _count = 0;

  int get count => _count;

  void increment() {
    _count++;
    notifyListeners(); // 숫자가 증가했다는 것을 ChangeNotifierProvider에 알려주기 위해 notifyListeners()를 호출한다.
  }
}
```

`Counter` 클래스가 `ChangeNotifier`를 `extends`하도록 변경한다. 그리고  `increment()`에서 `notifyListeners()`를 호출하여, 숫자가 증가했다는 것을 알리도록 한다.

#### 1.2.2. (적용) `Provider`를 `ChangeNotifierProvider`로 변경

``` dart
class ExampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<Counter>( // ChangeNotifierProvider로 변경.
      create: (_) => Counter(),
      child: MaterialApp(
        title: 'Provider Example',
        home: Example(),
      ),
    );
  }
}
```

기존의 `Provider`를 대신하여 `ChangeNotifierProvider`를 사용한다.

여기까지 했으면 Provider 생성 부분은 완료되었다. 이제 Provider 소비 부분으로 넘어가보자.

## 2. Provider 소비

Provider를 소비한다는 말은 Provider의 데이터 값을 변경하거나 화면에 보여주는 것을 의미한다.

지금의 경우에는 `Counter`의 숫자를 증가시키거나 화면에 보여주는 것이 Provider 소비가 되겠다.
### 2.1. `context.watch<T>()`, `context.read<T>()`

`context.watch<T>()`, `context.read<T>()`를 통해 Provider의 데이터를 사용할 수 있다.

이 둘은 비슷하지만 분명한 **차이점이 존재**한다.

`context.watch<T>()`는 `T`의 데이터 값이 변경되었을 때 위젯을 재빌드한다. <br>
반대로, `context.read<T>()`는 `T`의 데이터 값이 변경되었을 때 위젯을 재빌드하지 않는다.


그래서 이런 차이점이 어떤 의미가 있을까? 바로 둘의 **용도가 달라진다.**

`context.watch<T>()`의 경우, **`T`의 데이터 값을 화면에 보여주는** 용도로 사용한다. `T`의 데이터 값이 변경되었을 때, 위젯을 재빌드하여 변경된 데이터 값을 보여줘야 하기 때문이다. <br>
`context.read<T>()`의 경우, **`T`의 데이터 값을 변경하는 등의 이벤트들**을 위한 용도로 사용한다. 이러한 이벤트들은 `T`의 데이터 값의 변경에 따라 재빌드할 필요가 없기 때문이다.

#### 2.1.1. (적용) `watch`, `read` 사용

``` dart
class Example extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Provider Example'),
      ),
      body: Center(
        child: ElevatedButton(
          child: Text(
            '현재 숫자: ${context.watch<Counter>().count}', // watch 사용.
          ),
          onPressed: () {
            context.read<Counter>().increment(); // read 사용.
          },
        ),
      ),
    );
  }
}
```

`ElevatedButton`을 만들어서 해당 버튼 위에 현재 숫자를 보여주도록 했다. 현재 숫자를 보여주는 부분은 숫자가 증가할 때마다 재빌드를 필요로 하기 때문에 `watch`를 사용했다.<br>
그리고 버튼을 클릭 시에 `increment()` 메소드를 호출하여 숫자를 증가시키도록 했다. 이는 이벤트에 해당하여 재빌드가 필요없기 때문에 `read`를 사용했다.
### 2.2. `Provider.of(context)`

사실 `context.watch<T>()`는 `Provider.of<T>(context)`와 동일하고, `context.read<T>()`는 `Provider.of<T>(context, listen: false)`와 동일하다. 그래서 둘 중 더 편한 쪽을 선택해서 사용하면 된다.

> 원래는 차이점이 존재했다. `Provider.of<T>(context)`,`Provider.of<T>(context, listen: false)`는 모든 조건에서 사용할 수 있지만, `context.watch<T>()`, `context.read<T>()`는 특정 조건에서 사용하지 못한다는 점이 달랐다. 예를들어 `StatelessWidget.build`, `State.build` 안에서는 `context.read<T>()`를 사용하지 못했다. 하지만 이런 제약들은 4.3.3 버전부터 없어졌다.

#### 2.2.1. (적용) `Provider.of(context)` 사용

``` dart
class Example extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Provider Example'),
      ),
      body: Center(
        child: ElevatedButton(
          child: Text(
            '현재 숫자: ${Provider.of<Counter>(context).count}', // Provider.of<Counter>(context) 사용.
          ),
          onPressed: () {
            Provider.of<Counter>(context, listen: false).increment(); // Provider.of<Counter>(context, listen: false) 사용.
          },
        ),
      ),
    );
  }
}
```

`context.watch<Counter>()` 위치에  `Provider.of<Counter>(context)`를, `context.read<Counter>()` 위치에 `Provider.of<Counter>(context, listen: false)`를 넣었다. 이전과 동일하게 작동하는 것을 확인할 수 있을 것이다.

### 2.3. `Consumer`

`Consumer`는 위에서 말한 `context.watch<T>()`, `context.read<T>()`(혹은 `Provider.of(context)`)를 사용할 수 없을 때 사용한다. 그렇다면 그런 경우는 언제일까? 바로 하나의 build 메소드에서 Provider를 생성도 하고 소비도 해야하는 상황이다. 이 때는 `Consumer`를 사용해야 Provider를 소비할 수 있다.

#### 2.3.1. (적용) ExampleApp()와 Example() 합치기

``` dart
class ExampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<Counter>(
      create: (_) => Counter(),
      child: MaterialApp( // Example()을 없애고 Example.build 내부 코드를 직접 넣었다.
        title: 'Provider Example',
        home: Scaffold(
          appBar: AppBar(
            title: Text('Provider Example'),
          ),
          body: Center(
            child: ElevatedButton(
              child: Text(
                '현재 숫자: ${context.watch<Counter>().count}',
              ),
              onPressed: () {
                context.read<Counter>().increment();
              },
            ),
          ),
        ),
      ),
    );
  }
}
```

`ExampleApp.build`에서 Provider를 생산하고, `Example.build`에서 Provider를 소비하던 기존 코드를 `ExampleApp.build` 하나로 합쳤다. 같은 build 메소드에서 Provider를 생성도 하고 소비도 하는 상황이 된 것이다. 위의 코드는 이런 상황에서 `watch`와 `read`를 사용하고 있기 때문에 에러가 발생할 것이다.

#### 2.3.2. (적용) `Consumer` 사용

따라서 아래와 같이 수정해야한다.


``` dart
class ExampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<Counter>(
      create: (_) => Counter(),
      child: MaterialApp(
        title: 'Provider Example',
        home: Scaffold(
          appBar: AppBar(
            title: Text('Provider Example'),
          ),
          body: Center(
            child: Consumer<Counter>( // Consumer를 사용하여 ElevatedButton을 감쌌다.
              builder: (_, counter, __) => ElevatedButton(
                child: Text(
                  '현재 숫자: ${counter.count}',
                ),
                onPressed: () {
                  counter.increment();
                },
              ),
            ),
          ),
        ),
      ),
    );
  }
}
```

`watch`와 `read`를 지우고, `Consumer`를 사용했다. 이제 정상적으로 돌아가는 것을 확인할 수 있을 것이다.
