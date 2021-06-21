---
title: "[Dart/Document] A tour of the Dart language - 19. Comments"
categories:
- Dart
tags:
- Document
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)

# Comments

Dart는 한 줄(single-line) 주석, 여러 줄(multi-line) 주석, 문서화(documentation) 주석을 제공한다.

## Single-line comments

한 줄 주석은 `//` 로 시작한다. `//` 부터 해당 라인 끝까지는 Dart 컴파일러가 무시한다.

``` dart
void main() {
  // TODO: refactor into an AbstractLlamaGreetingFactory?
  print('Welcome to my Llama farm!');
}
```

## Multi-line comments

여러 줄 주석은 `/*` 로 시작해서 `*/`로 끝난다. `/*` 와 `*/ `사이에 있는 모든 것은 Dart 컴파일러가 무시한다. 여러 줄 주석은 중첩될 수 있다.

``` dart
void main() {
  /*
   * This is a lot of work. Consider raising chickens.

  Llama larry = Llama();
  larry.feed();
  larry.exercise();
  larry.clean();
   */
}
```

## Documentation comments

문서화 주석은 `///`나 `/**`로 시작하는 여러 줄 혹은 한 줄 이다. `///`를 연속된 라인에 사용하면 여러 줄 문서화 주석이 되는 것이다.

문서화 주석 안에서 Dart 컴파일러는 `[]` 괄호로 묶여있는 것을 제외한 모든 텍스트를 무시한다. 괄호를 사용하여 클래스, 메소드, 필드, 최상위 변수, 함수, 파라미터들을 참조할 수 있다. 괄호 안에 텍스트들은 문서화된 프로그램 요소들의 범위 안에서 결정된다.

아래는 다른 클래스와 argument에 대한 참조를 포함하는 문서화 주석의 예시이다.

``` dart
/// A domesticated South American camelid (Lama glama).
///
/// Andean cultures have used llamas as meat and pack
/// animals since pre-Hispanic times.
class Llama {
  String name;

  /// Feeds your llama [Food].
  ///
  /// The typical llama eats one bale of hay per week.
  void feed(Food food) {
    // ...
  }

  /// Exercises your llama with an [activity] for
  /// [timeLimit] minutes.
  void exercise(Activity activity, int timeLimit) {
    // ...
  }
}
```

생성된 문서에서 `[Food]` 부분은 Food 클래스에 대한 API 문서와 연결된 링크가 된다.

Dart 코드를 파싱하고 이를 HTML 문서로 변환하기 위해선 SDK의 documentation generation tool을 사용하면 된다.
