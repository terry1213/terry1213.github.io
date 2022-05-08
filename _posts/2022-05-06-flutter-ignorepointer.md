---
title: "[Flutter] 특정 위젯에 대한 제스처를 무시하기(IgnorePointer)"
categories:
- Flutter
tags:
- Tip
---

요새 회사에서 개발하고 있는 앱에는 커스텀 토스트 메세지가 자주 사용된다. 그런데 토스트 메세지를 사용할 때 문제가 생겼다.

대부분의 경우에는 괜찮지만, 토스트 메세지가 버튼 위에 나타나면 토스트 메세지 때문에 버튼을 클릭할 수 없게 된다.

그래서 토스트 메시지에 대한 제스처를 무시하기 위해, `IgnorePointer`를 사용했다. 이번에는 `IgnorePointer`가 어떻게 작동하는지에 대해 간단한 예시를 통해 알아보려고 한다.

## IgnorePointer 예시

아래는 `IgnorePointer`를 사용한 간단한 예시이다.

``` dart
class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool _ignore = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('IgnorePointer Example'),
      ),
      body: Center(
        child: Column(
          children: [
            ElevatedButton(
              onPressed: () => setState(() => _ignore = !_ignore),
              child: Text('ignore:$_ignore'),
            ),
            Expanded(
              child: Stack(
                alignment: Alignment.center,
                children: [
                  ElevatedButton(
                    onPressed: () => ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Button clicked'),
                      ),
                    ),
                    child: const Text('Click me'),
                  ),
                  IgnorePointer(
                    ignoring: _ignore,
                    child: Container(
                      color: Colors.yellow.withOpacity(0.3),
                      height: double.maxFinite,
                      width: double.maxFinite,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

화면을 보면 반투명 노란색 `Container`가 'Click me' 버튼을 가리고 있는 것을 볼 수 있다. 이 노란색 `Container`를 `IgnorePointer`로 감싸놨다.

### \_ignore = false

'Click me' 버튼을 한번 클릭해보자.

![\_ignore = false](/assets/flutter/Tip/IgnorePointer/Example1.gif){: #magnific  width='300' }

`_ignore` 초기 값을 false로 설정했기 때문에 노란색 `Container`에 막혀서 버튼이 터치되지 않는다.

### \_ignore = true

그럼 이번에는 최상단 버튼을 통해서 `_ignore` 값을 true로 변경하고 'Click me' 버튼을 클릭해보자.

![\_ignore = true](/assets/flutter/Tip/IgnorePointer/Example2.gif){: #magnific  width='300' }

이제 노란색 `Container`에 대한 터치가 무시되고, 그 아래 있는 'Click me' 버튼이 클릭되어 `SnackBar`가 나타나는 것을 확인할 수 있다.

## 전체 예시 코드

<https://github.com/terry1213/flutter-example/tree/ignoring_widget_during_hit_testing>{:target="\_blank"}
