---
title: "[Flutter] ModalBottomSheet 높이 조절"
categories:
- Flutter
tags:
- Tip
---

Flutter에서 대부분의 위젯들은 쉽게 높이를 설정할 수 있다. `SizedBox`나 `Container`으로 위젯을 감싸고, `height`를 설정해주면 된다.

그런데  `ModalBottomSheet`는 높이 조절하는 방법이 다른 위젯들과 약간 다르다. 그래서 이번에는 `ModalBottomSheet`의 높이를 조절하는 방법에 대해서 간단하게 정리해보려고 한다.

## 높이를 설정하지 않은 ModalBottomSheet

우선 높이를 따로 설정하지 않고 `showModalBottomSheet`를 호출해보자.

``` dart
void showDefaultHeightModalBottomSheet(BuildContext context) {
  showModalBottomSheet(
    context: context,
    builder: (BuildContext context) {
      return Center(
        child: ElevatedButton(
          child: const Text('ModalBottomSheet 닫기'),
          onPressed: () => Navigator.pop(context),
        ),
      );
    },
  );
}
```

![](/assets/flutter/Tip/modal-bottom-sheet-height/Example1.png){: #magnific width="300"}


내부의 `ElevatedButton` 위젯 높이가 매우 낮지만 `ModalBottomSheet`의 높이는 화면의 절반 정도가 된다. `ModalBottomSheet`에는 기본 높이 값이 있기 때문에 그렇다.

## 기본 높이보다 짧은 ModalBottomSheet

이제 `ModalBottomSheet`의 높이를 기본 높이보다 짧게 조절해보자.

``` dart
void showShortHeightModalBottomSheet(BuildContext context) {
  showModalBottomSheet(
    context: context,
    builder: (BuildContext context) {
      return SizedBox(
        // SizedBox로 감싸고 height로 높이를 설정.
        height: 200,
        child: Center(
          child: ElevatedButton(
            child: const Text('ModalBottomSheet 닫기'),
            onPressed: () => Navigator.pop(context),
          ),
        ),
      );
    },
  );
}
```

내부 컨텐츠를 `SizedBox`로 감싸고 `height`을 통해 높이를 200으로 설정했다.

![](/assets/flutter/Tip/modal-bottom-sheet-height/Example2.png){: #magnific width="300"}

`ModalBottomSheet`의 높이가 200으로 잘 설정된 것을 확인할 수 있다.

## 기본 높이보다 긴 ModalBottomSheet

마지막으로 `ModalBottomSheet`의 높이를 기본 높이보다 길게 설정해보자.

``` dart
void showLongHeightModalBottomSheet(BuildContext context) {
  showModalBottomSheet(
    context: context,
    builder: (BuildContext context) {
      return SizedBox(
        height: MediaQuery.of(context).size.height * 0.8,
        child: Center(
          child: ElevatedButton(
            child: const Text('ModalBottomSheet 닫기'),
            onPressed: () => Navigator.pop(context),
          ),
        ),
      );
    },
  );
}
```

우선 짧은 경우와 동일하게 `SizedBox`감쌌다. 그리고 `MediaQuery`를 활용해 스크린 높이의 80퍼센트로 `height`를 설정했다.

![](/assets/flutter/Tip/modal-bottom-sheet-height/Example3.png){: #magnific width="300"}

그런데 `ModalBottomSheet`의 높이가 변하지 않았다. 이는 `ModalBottomSheet`의 높이를 기본 높이보다 길게 하고 싶을 때 추가로 설정해야하는 것이 있기 때문이다.

``` dart
void showLongHeightModalBottomSheet(BuildContext context) {
  showModalBottomSheet(
    context: context,
    // isScrollControlled를 true로 설정.
    isScrollControlled: true,
    builder: (BuildContext context) {
      return SizedBox(
        height: MediaQuery.of(context).size.height * 0.8,
        child: Center(
          child: ElevatedButton(
            child: const Text('ModalBottomSheet 닫기'),
            onPressed: () => Navigator.pop(context),
          ),
        ),
      );
    },
  );
}
```

`isScrollControlled`를 true로 설정해주기만 하면 된다.

![](/assets/flutter/Tip/modal-bottom-sheet-height/Example4.png){: #magnific width="300"}

이제 `ModalBottomSheet`의 높이가 스크린 높이의 80퍼센트로 보이는 것을 볼 수 있다.
