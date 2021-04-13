---
title: "[Flutter/Web] url에서 샵(#) 없애기"
categories:
- Flutter
tags:
- Web
---

요즘 플러터로 웹 개발을 해야할 일이 생겼다. 네비게이션(페이지) 작업을 하다가 우연히 url이 눈에 들어왔다.

url 중간에 들어가는 #이 너무 신경쓰였다. 그래서 오늘은 플러터를 통해 웹 개발을 할 때 url에서 #을 없애는 방법을 간단한 예시와 함께 설명하려한다.

## 문제

``` dart
import 'package:flutter/material.dart';

void main() {
  runApp(ExampleApp());
}

class ExampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'URL Sharp Example',
      home: Scaffold(
        appBar: AppBar(
          title: Text('URL Sharp Example'),
        ),
      ),
    );
  }
}
```

위와 같은 기본적인 코드가 있다고 생각해보자.

![](/assets/flutter/URLSharp/Example1.png){: width="300" height="500"}

이 코드를 실행해보면 url에 #이 들어가는 것을 확인할 수 있다.
## 해결 방법

`url_strategy` 패키지를 사용하면 아주 간단하게 해결할 수 있다.

### 1. pubspec.yaml

``` yaml
dependencies:
  url_strategy: ^0.2.0
```

`pubspec.yaml`에 위와 같은 줄을 추가한다.

### 2. flutter pub get

``` console
flutter pub get
```

명령어를 통해 패키지를 가져온다.

### 3. 패키지 import, setPathUrlStrategy() 추가

``` dart
import 'package:flutter/material.dart';
import 'package:url_strategy/url_strategy.dart'; // 패키지를 import.

void main() {
  setPathUrlStrategy(); // 해당 라인 추가.
  runApp(ExampleApp());
}

class ExampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'URL Sharp Example',
      home: Scaffold(
        appBar: AppBar(
          title: Text('URL Sharp Example'),
        ),
      ),
    );
  }
}
```

`main.dart` 파일에서 `url_strategy` 패키지를 `import`하고, `runApp()` 직전에 `setPathUrlStrategy();`를 추가하여 웹 앱을 위한 url strategy를 세팅한다.

### 4. 확인

![](/assets/flutter/URLSharp/Example2.png){: width="300" height="500"}

다시 실행해보면, url에서 #이 없어진 것을 확인할 수 있다.
