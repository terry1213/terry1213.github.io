---
title: "[Flutter] WidgetsFlutterBinding.ensureInitialized()"
categories:
- Flutter
tags:
- Tip
---

``` dart
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MyApp());
}
```

개발을 하다보면 위의 코드처럼 `main()` 메소드 안에서 `runApp()` 메소드를 호출하기 전에 `WidgetsFlutterBinding.ensureInitialized()`를 호출해야할 때가 있다. 그냥 사용하라고 하니까 써야지하고 넘어가는 것보다는 왜 사용하는지 어떤 역할을 하는지를 알고 넘어가면 더 좋을 것이다.

아는 지인이 `WidgetsFlutterBinding.ensureInitialized()`를 어떤 이유로 사용하는 것이냐고 물어보길래 이참에 블로그에도 적어두려고 한다.

## WidgetsFlutterBinding.ensureInitialized()를 사용하는 경우

보통 `runApp()`를 호출하기 전에 어떤 사전 작업을 해야하는 경우에 `WidgetsFlutterBinding.ensureInitialized()`를 사용한다.

대표적인 예시는 Firebase를 사용하는 경우이다.

``` dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}
```

Firebase를 사용하려면  `runApp()` 전에 `await Firebase.initializeApp()`를 통해 사전 작업을 완료해야하는데, 이때 `WidgetsFlutterBinding.ensureInitialized()`를 호출하지 않으면 에러가 발생한다.

## WidgetsFlutterBinding.ensureInitialized()의 역할

그렇다면 `WidgetsFlutterBinding.ensureInitialized()`가 어떤 역할을 하길래 이걸 사용해야만 제대로 작동할까?

결론부터 말하면 `WidgetsFlutterBinding.ensureInitialized()`가 바인딩을 초기화 해주는 역할을 한다. 바인딩이 초기화되지 않으면 Flutter 엔진과 통신할 수 없다. 따라서 `WidgetsFlutterBinding.ensureInitialized()`를 호출하지 않으면 Flutter 엔진과의 통신이 필요한 사전 작업 코드가 제대로 작동하지 않는 것이다.

## 추가 정보

여기서 하나 궁금한 점이 생겼다. 그렇다면 `runApp()` 호출 직후에는 왜 `WidgetsFlutterBinding.ensureInitialized()`를 호출할 필요가 없을까?

이 부분을 알기 위해서는 `runApp()`이 어떻게 구현되어 있는지 뜯어보면 된다.

``` dart
void runApp(Widget app) {
  assert(
      ui.webOnlyIsInitialized,
      'The platform has not been initialized. '
      'It is required to call `ui.webOnlyInitializePlatform()` before `runApp`.');
  WidgetsFlutterBinding.ensureInitialized()
    ..attachRootWidget(app)
    ..scheduleWarmUpFrame();
}
```

`runApp()`은 실행되자마자  `WidgetsFlutterBinding.ensureInitialized()`부터 실행하는 것을 볼 수 있다. 따라서 `runApp()` 호출 직후에는 `WidgetsFlutterBinding.ensureInitialized()`를 우리가 직접 호출할 필요가 없어지는 것이다.
