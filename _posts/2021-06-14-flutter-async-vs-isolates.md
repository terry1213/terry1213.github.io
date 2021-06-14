---
title: "[Flutter] Async vs Isolates"
categories:
- Flutter
tags:
- Mobile
- iOS
- Android
---

## Async vs Isolates 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/5AxWC49ZMzs?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

`Async`와 `Isolates`의 개념은 언뜻 봤을 때 헷갈릴 수 있다. 이 두가지 개념은 각각 `Concurrency`(병행성)와 `Parallelism`(병렬성)로 표현할 수도 있다. `Concurrency`와 `Parallelism`에 대해 이미 알고 있다면 바로 이해할 수 있을 것이다.

## Async(Concurrency)

우선 `Async`에 대해서 정리해보자.

아래는 `async`를 사용한 asynchronous한 함수의 예시이다.

``` dart
void _refresh() async {
  var url = _assembleUrl(options);
  var content = await http.get(url);
  var articles = _parse(content);
  _update(articles);
}
```

해당 코드는 위에서부터 차례로 실행하다가 두번째 줄(`await`이 들어간 부분)에서 파일이 다운되기를 기다린다. 그렇다면 이때 프로세스가 멈추고 아무 일도 하지 않는 것일까?

아니다. 해당 프로세스는 계속해서 일을 한다. 위의 예시에서 파일이 다운되는 동안, 프로세스는 멈추지 않고 `_refresh()` 함수 밖의 코드를 실행시킨다. 이후에 파일 다운로드가 완료되면 `_refresh()` 다시 돌아와 다음 코드를 실행시킨다.

여기서 `Async`는 자동으로 어플을 멀티쓰레드로 만들어주지 않는다는 것을 알 수 있다.

대부분의 경우에는 `Async`면 충분하다. 하지만 많은 자원을 소비하는 경우에는 어떨까?

이전 코드를 다시 가져와보자.

``` dart
void _refresh() async {
  var url = _assembleUrl(options);
  var content = await http.get(url);
  var articles = _parse(content);
  _update(articles);
}
```

만약 다운 받는 파일이 크다고 생각해보자. 그렇다면 해당 파일을 파싱할 때 소비되는 프로세스의 파워도 굉장히 커진다. 이 경우 어플이 정상적으로 부드럽게 돌아갈까?

`Async` 메소드 안에서의 자원 소비이니까 어플이 부드럽게 돌아갈 것이라고 생각할 수 있다. 하지만 이는 잘못된 생각이다. 파싱 작업(`_parse(content)`)은 쓰레드를 계속 사용해야하는 작업이라서 프로세스를 놔주지 않기 때문이다.

따라서 파싱 작업 중에는 프로세스가 다른 작업을 진행할 수 없어서 UI가 refresh 되지 않고, 결국 어플은 버벅거리게 된다.

## Isolate(Parallelism)

이러한 경우에 필요한 것이 바로 `Parallelism`이다. `Dart`에선 `isolate`를 통해 코드를 parallel하게 돌릴 수 있다.

다른 쓰레드, 다른 프로세스에 새로운 `Dart` 프로그램을 실행시키는 것이다. 이 때 각각의 `isolate`는 서로를 블록하지 않는다. 이렇게 `isolate`를 사용하면 무거운 작업을 하면서도 유저에게 부드러운 UI를 보여줄 수 있다.

> 이 글은 단순히 `Async`와 `Isolate`의 개념을 비교하기 위한 글이기 때문에, `isolate`를 구현하는 방법에 대해서는 다루지 않는다.

## 요약

`Async`는 블로킹(blocking) 없이 기다리는 것이다. 또한 새로운 쓰레드를 생성하지 않는다.

`Isolate`는 일을 parallel하게 진행하는 것이다. 각 isolate는 다른 isolate가 어떤 일을 하는지 신경쓰지 않는다. 각각 자신의 일을 진행한다.
