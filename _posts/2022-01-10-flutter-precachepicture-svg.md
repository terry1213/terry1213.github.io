---
title: "[Flutter] precachePicture()를 통해 svg 파일을 캐시에 저장하기"
categories:
- Flutter
tags:
- Tip
---

이전에 `precacheImage()`를 통해 이미지 파일의 로딩 시간을 줄이는 법(<https://terry1213.github.io/flutter/flutter-precacheimage/>)을 정리했었다. 다른 이미지 파일들은 해당 방법으로 캐시에 저장할 수 있지만, svg 파일에는 사용할 수 없다.

svg 파일을 캐시에 저장하기 위해선 `precachePicture()`를 사용해야한다.
## precachePicture() 적용

`precachePicture()`를 사용하는 방법은 다음과 같다.

``` dart
precachePicture(
  ExactAssetPicture(SvgPicture.svgStringDecoderBuilder, 'assets/flutter_logo.svg'),
  context, // null도 들어갈 수 있다.
);
```

여기서 `context`는 필수가 아니다. 만약 `main()`처럼 `BuildContext`를 사용할 수 없는 위치에서 `precachePicture()`를 사용하고 싶다면, `BuildContext` 대신 `null`을 넣으면 된다.

``` dart
// 처음 보이는 홈화면.
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // precachePicture()를 통해 홈화면을 빌드할 때 캐시에 미리 svg 이미지를 넣음.
    precachePicture(
      ExactAssetPicture(SvgPicture.svgStringDecoderBuilder, 'assets/flutter_logo.svg'),
      context,
    );
    return Scaffold(
      appBar: AppBar(
        title: const Text('precachePicture() Example'),
      ),
      body: Center(
        child: TextButton(
          child: const Text('이미지 보기'),
          onPressed: () {
            Navigator.push(
              context,
              PageRouteBuilder(
                pageBuilder: (_, __, ___) => const ImagePage(),
                // 확실히 차이를 보기 위해 화면 전환 애니메이션 삭제.
                transitionDuration: const Duration(seconds: 0),
              ),
            );
          },
        ),
      ),
    );
  }
}

// 이미지를 보여주는 화면.
class ImagePage extends StatelessWidget {
  const ImagePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Svg Image'),
      ),
      backgroundColor: Colors.black,
      body: Center(
        child: SvgPicture.asset(
            'assets/flutter_logo.svg',
          height: 500,
        ),
      ),
    );
  }
}
```

첫화면인 `HomePage`를 빌드할 때 `precachePicture()`를 통해 svg 이미지를 미리 캐시에 저장했다. 그리고 버튼을 눌러서 svg 이미지가 들어있는 `ImagePage()`를 보여준다. 차이를 확실히 확인하기 위해 화면 전환 애니메이션은 삭제했다.

`precachePicture()`는 `Future` 타입이기 때문에 필요하다면 `await`을 걸어줄 수도 있다.

## 확인

이제 `precachePicture()` 적용 전후의 차이를 직접 눈으로 확인해보자. 왼쪽은 위 코드에서 precacheImage() 부분만 주석 처리하고 돌린 것이다.

![precacheImage() 적용 전](/assets/flutter/Tip/precachePicture/Example1.gif){: #magnific  width='300' }
![precacheImage() 적용 후](/assets/flutter/Tip/precachePicture/Example2.gif){: #magnific  width='300' }

큰 차이는 없어보인다. 그래서 `ImagePage()`가 나타나는 순간의 화면을 찾아서 가져왔다.

![적용 전 순간 스크린샷](/assets/flutter/Tip/precachePicture/Example3.png){: #magnific  width='300' }
![적용 후  순간 스크린샷](/assets/flutter/Tip/precachePicture/Example4.png){: #magnific  width='300' }

적용 전의 경우, 짧지만 검은 화면만 보이는 시점이 존재한다. 하지만 오른쪽의 경우, `ImagePage()`가 보이는 동시에 svg 이미지도 보인다.

차이가 크지는 않지만, 약간 늦게 나오는 게 은근히 거슬리는 상황일 때 유용하다. 예를 들어, 스플래시 이미지에서 배경보다 중앙 로고(svg)가 약간씩 늦게 나타나는 게 불편할 때 유용하게 사용했다.

## 전체 예시 코드

<https://github.com/terry1213/flutter-example/tree/precachePicture>{:target="\_blank"}
