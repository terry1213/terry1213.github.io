---
title: "[Dart] A tour of the Dart language - 12. Libraries and visibility"
categories:
- Dart
tags:
- Mobile
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)

# Libraries and visibility
`import`와 `library` 지시어는 공유할 수 있는 코드를 만드는데 도움을 준다. 라이브러리는 API를 제공하며 개인 정보의 단위이다. \_로 시작하는 식별자(identifier)는 라이브러리 내에서만 보인다. 모든 Dart 앱은 라이브러리다. `library` 지시어를 사용하지 않는 앱도 마찬가지다.

라이브러리는 패키지를 통해 배포될 수 있다.

## Using libraries
한 라이브러리의 namespace가 다른 라이브러리에서 어떻게 사용될지를 명시하기 위해 `import`를 사용한다.

예를 들어 Dart 웹앱은 일반적으로 아래와 같이 import할 수 있는 dart:html 라이브러리를 사용한다.

``` dart
import 'dart:html';
```

`import`에 필요한 유일한 argument는 라이브러리를 지정하는 URI이다. built-in 라이브러리에 대해서 URI는 `dart:`를 사용한다. 다른 라이브러리에 대해서는 파일 경로나 `package:`를 사용할 수 있다. `package:`는 pub 툴 같은 패키지 매니저가 제공하는 라이브러리를 지정한다.

``` dart
import 'package:test/test.dart';
```

> NOTE: URI는 uniform resource identifier의 약자이다. URLs (uniform resource locators)는 URI의 일반적인 종류이다.

### Specifying a library prefix
식별자가 충돌하는 두 개의 라이브러리를 import하는 경우에, 하나 혹은 두 라이브러리 모두에 prefix를 지정할 수 있다. 예를 들어, 라이브러리 1과 라이브러리 2 모두 Element 클래스를 가지고 있다면 아래와 같이 코드를 짜야한다.

``` dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// lib1의 Element를 사용한다.
Element element1 = Element();

// lib2의 Element를 사용한다.
lib2.Element element2 = lib2.Element();
```

### Importing only part of a library
만약 라이브러리의 일부만 사용하고 싶다면 부분적으로 import할 수 있다.

``` dart
// foo만 import.
import 'package:lib1/lib1.dart' show foo;

// foo 제외하고 전부 import.
import 'package:lib2/lib2.dart' hide foo;
```

### Lazily loading a library
지연 로딩을 통해 웹앱은 라이브러리가 필요할 때 불러올 수  있다. 지연 로딩을 사용할 수 있는 몇가지 경우가 있다.

* 웹앱의 초기 시작 시간을 줄이기 위해
* A/B 테스트를 사용하기 위해
* 거의 사용하지 않는 기능을 불러오기 위해

> **dart2js만 지연 로딩을 지원한다.** Flutter, Dart VM, dartdevc는 지원하지 않는다.

라이브러리를 지연 로드하기 위해서는 우선 import할 때  `deferred as`를 사용해라.

``` dart
import 'package:greetings/hello.dart' deferred as hello;
```

라이브러리가 필요하게 되면 라이브러리 식별자를 통해 `loadLibrary()`를 호출해라.

``` dart
Future greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

위의 코드에서 `await` 키워드는 라이브러리가 로드될 때까지 실행을 정지시킨다.

`loadLibrary()`를 여러번 호출해도 문제가 생기진 않는다. 어차피 라이브러리는 한 번만 로드된다.

지연 로딩을 사용할 때 아래의 사항들을 유의하자.

* 지연된 라이브러리의 상수는 import하는 파일의 상수가 아니다. 그렇기 때문에 이러한 상수들은 지연된 라이브러리가 로드되기 전까지 존재하지 않는 것이다.
* import하는 파일에서 지연된 라이브러리의 타입을 사용할 수 없다. 그 대신, 지연된 라이브러리와 import하는 라이브러리 파일 모두에서 import하는 라이브러리로 인터페이스 타입을 옮기는 것을 고려해라.
* Dart는 `deferred as namespace`로 정의한 namespace 에 `loadLibrary()`를 암묵적으로 삽입한다. `loadLibrary()` 함수는 Future를 리턴한다.

## Implementing libraries
라이브러리 패키지를 어떻게 구현하는지에 대해서는 [여기](https://dart.dev/guides/libraries/create-library-packages)에 나와있다. 해당 페이지에는 아래의 항목들을 포함하고 있다.

* 라이브러리 소스 코드를 구성하는 방법
* export 지시어를 사용하는 방법
* part 지시어를 사용하는 경우
* library 지시어를 사용하는 경우
* 여러 플랫폼을 지원하는 라이브러리를 구현하기 위해 조건적 import와 export를 사용하는 방법
