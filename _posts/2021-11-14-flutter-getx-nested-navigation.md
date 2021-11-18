---
title: "[Flutter] GetX를 통한 중첩 네비게이션 구현 (Nested Navigation)"
categories:
- Flutter
tags:
- Tip
---

중첩 네비게이션(Nested Navigation)은 같은 앱 내에서 하나 이상의 네비게이터를 중첩하여 사용하는 것이다. 오늘은 중첩 네비게이션이 어떤 경우에 필요한지, 그리고 어떻게 구현하는지를 알아보자.

이 글에선 GetX를 활용하여 중첩 네비게이션을 구현한다. 따라서 GetX의 네비게이션 부분에 대한 기본적인 이해가 필요하다. 만약 GetX에 대해서 알지 못한다면, [공식 패키지 사이트](https://pub.dev/packages/get){:target="\_blank"}나 [이전에 올린 GetX 정리글](https://terry1213.github.io/flutter/flutter-getx/){:target="\_blank"}을 읽어보고 오는 것을 추천한다.

## 중첩 네비게이션이 필요한 상황

어떤 경우에 중첩 네비게이션이 필요할까? 보통 `BottomNavigationBar`를 사용할 때 중첩 네비게이션이 필요하다.

`BottomNavigationBar`가 들어가는 간단한 앱을 만들어 왜 그런지 알아보자.

### App

``` dart
class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      getPages: [
        GetPage(name: '/', page: () => const TemplatePage()),
        GetPage(name: '/inside', page: () => const InsidePage()),
      ],
    );
  }
}
```

GetX를 사용하기 때문에 `MaterialApp` 대신에 `GetMaterialApp`를 사용해야한다. 그리고 `TemplatePage`와 `InsidePage`에 대한 루트 이름을 설정한다.

### TemplatePage

``` dart
class TemplatePage extends StatelessWidget {
  const TemplatePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: const OutsidePage(),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.arrow_back),
            label: 'First',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.arrow_forward),
            label: 'Second',
          ),
        ],
      ),
    );
  }
}
```

`TemplatePage`는 `BottomNavigationBar`이 들어가는 페이지이다. 지금은 간단한 예시이기 때문에 `body`에 `OutsidePage` 하나만 넣지만, 원래는 각 `BottomNavigationBarItem` 개수대로 페이지를 만들어야한다.

### OutsidePage

``` dart
class OutsidePage extends StatelessWidget {
  const OutsidePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Outside Page'),
      ),
      body: Center(
        child: TextButton(
          onPressed: () => Get.toNamed('/inside'),
          child: const Text('Inside'),
        ),
      ),
    );
  }
}
```

`OutsidePage`에는 `InsidePage`로 이동시켜주는 버튼이 들어간다. 해당 버튼은 클릭 시에 `Get.toNamed('/inside')`를 호출하여 `InsidePage`로 화면을 이동시킨다.

### InsidePage

``` dart
class InsidePage extends StatelessWidget {
  const InsidePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Inside Page'),
      ),
    );
  }
}
```

`InsidePage`는 버튼 클릭 시에 나타나는 내부 페이지이다.

### 확인

`BottomNavigationBar`를 가지는 간단한 앱을 만들었다. 이제 한번 앱을 실행해보자.

![](/assets/flutter/Tip/nested-navigation/Example1.gif){: #magnific  width='300' }

`InsidePage`로 이동할 때 아래의 `BottomNavigationBar`가 사라진다. 이는 네비게이터 역할을 하는 `GetMaterialApp`이 위젯 트리 상에서 `BottomNavigationBar`보다 상단에 있기 때문이다.

하지만 일반적으로 같은 탭 내에서의 페이지 이동 시에는 `BottomNavigationBar`가 유지되어야한다. 따라서 `BottomNavigationBar`보다 하위에 네비게이터를 하나 더 생성해야하고, 그 네비게이터에서 `InsidePage`로의 페이지 이동을 담당하도록 설정해야한다.

그리고 그러한 작업이 바로 중첩 네비게이션이다.

## 중첩 네비게이션 적용

이제 중첩 네비게이션이 무엇인지, 어느 경우에 필요한지를 알았다. 이제 적용시켜볼 차례이다.

### App

``` dart
class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      getPages: [
        GetPage(name: '/', page: () => const TemplatePage()), // InsidePage에 대한 루트 삭제.
      ],
    );
  }
}
```

`GetMaterialApp`에서는 `InsidePage`에 대한 루트가 더 이상 필요없기 때문에 삭제한다.

### TemplatePage

``` dart
class TemplatePage extends StatelessWidget {
  const TemplatePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Navigator( // 네비게이터 추가.
        key: Get.nestedKey(1), // id 설정.
        initialRoute: '/outside', // OutsidePage를 initialRoute로 설정.
        onGenerateRoute: (settings) {
          if (settings.name == '/outside') {
            return GetPageRoute(
              page: () => const OutsidePage(),
            );
          } else if (settings.name == '/inside') { // `InsidePage`에 대한 루트 설정.
            return GetPageRoute(
              page: () => const InsidePage(),
            );
          }
        },
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.arrow_back),
            label: 'First',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.arrow_forward),
            label: 'Second',
          ),
        ],
      ),
    );
  }
}
```

`TemplatePage`에 `Navigator`(네비게이터)를 추가한다. 이 때 기존에 있던 `GetMaterialApp`과 이 `Navigator`를 구분하기 위해 `Get.nestedKey(1)`로 id를 설정한다. 이 때 숫자는 꼭 1이 아니어도 된다.

그리고 `Navigator`에서 `OutsidePage`를 `initialRoute`로 설정하고, `InsidePage`에 대한 루트도 설정한다.

### OutsidePage

``` dart
class OutsidePage extends StatelessWidget {
  const OutsidePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Outside Page'),
      ),
      body: Center(
        child: TextButton(
          onPressed: () => Get.toNamed('/inside', id: 1), // id 추가.
          child: const Text('Inside'),
        ),
      ),
    );
  }
}
```

기존 `Get.toNamed('/inside')`에 `id`를 추가하여 사용한다. 이때 `id`는 자신이 호출하려는 네비게이터의 `id`와 동일한 것으로 입력해야한다.

### 확인

이제 앱을 다시 돌려서 중첩 네비게이션이 잘 적용되었는지 확인해보자.

![](/assets/flutter/Tip/nested-navigation/Example2.gif){: #magnific  width='300' }

`InsidePage`로 들어갈 때도 `BottomNavigationBar`가 유지되는 것을 볼 수 있다.

## 결론

이번에는  중첩 네비게이션을 구현하는 방법을 알아봤다. 예시에서는 `Get.toNamed()`만 사용했지만, GetX의 다른 네비게이션 기능들도 중첩 네비게이션 환경에서 `id`를 지정하여 사용할 수 있다.

그리고 `BottomNavigationBar`는 중첩 네비게이션이 사용되는 대표적인 상황일 뿐이다. 다른 위젯들도 화면 이동 시에 유지되도록 할 수 있다.

자신의 상황에 맞춰서 자유롭게 구현해보자.

## 주의할 점

중첩 네비게이션에도 주의할 점이 하나 있다. 중첩 네비게이션을 사용하면 메모리에 스택처럼 아래부터 네비게이터를 쌓아가게 된다. 이것은 RAM 소비에 좋지 않으니 너무 과도하게 사용하지 않도록 조심하자.
