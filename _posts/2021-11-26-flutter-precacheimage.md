---
title: "[Flutter] precacheImage 활용하여 이미지 첫 로딩 시간 줄이기"
categories:
- Flutter
tags:
- Tip
---

네트워크 이미지를 가져와서 화면에 보여줘야하는 경우가 많다. 이때 placeholder를 따로 설정해주고, cached_network_image 패키지를 사용하여 캐시를 사용하면 대부분은 문제가 없다.

하지만 첫번째 로딩 때부터 이미지를 빠르게 보여주고 싶은 경우에는 어떨까? 앞서 언급한 cached_network_image 패키지를 사용해도 이미지를 처음 로딩할 때는 시간이 걸린다.

## precacheImage()

이를 해결할 수 있는 것이 바로 `precacheImage()`이다. `precacheImage()`는 말 그대로 이미지를 미리 캐시에 넣어두어 처음 로딩 때부터 빠르게 화면에 보여줄 수 있게 해주는 메소드이다.

### 네트워크 이미지

아래와 같은 이미지가 있다고 하자. (예시로 사용할 이미지가 없어서 좋아하는 축구팀 사진으로ㅎㅎㅎ)

![](/assets/flutter/Tip/precacheImage/network_image.JPG){: width='500' }

이를 네트워크로 불러오기 위해 블로그 디렉토리에 넣어놨다. `precacheImage()`를 사용하여 이 이미지를 미리 캐시에 저장했다가 불러오는 코드를 작성해보자.

``` dart
// 처음 보이는 홈화면.
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // precacheImage()를 통해 홈화면을 빌드할 때 캐시에 미리 이미지를 넣음.
    precacheImage(
      Image.network(
              'https://terry1213.github.io/assets/flutter/Tip/precacheImage/network_image.JPG')
          .image,
      context,
    );
    return Scaffold(
      appBar: AppBar(
        title: const Text('precacheImage Example'),
      ),
      body: Center(
        child: TextButton(
          child: const Text('이미지 보기'),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const ImagePage()),
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
        title: const Text('Atletico Madrid Image'),
      ),
      backgroundColor: Colors.black,
      body: Center(
        child: Image.network(
            'https://terry1213.github.io/assets/flutter/Tip/precacheImage/network_image.JPG'),
      ),
    );
  }
}
```

첫화면인 `HomePage`를 빌드할 때 `precacheImage()`를 사용하여 미리 이미지를 캐시에 저장했다.

꼭 이 위치에서 `precacheImage()`를 사용해야하는 것은 아니다. 사용자가 원하는 위치에서 사용하면 된다. 그리고 `precacheImage()`가 `Future` 타입이기 때문에 원한다면 `await`을 걸어줄 수도 있다. 위에서는 간단한 예시를 위해 `HomePage`의 빌드 메소드 안에서 `precacheImage()`를 사용했을 뿐이다.

그럼 이제 `precacheImage()` 적용 전후의 차이를 직접 눈으로 확인해보자. 왼쪽은 위 코드에서 `precacheImage()` 부분만 지우고 돌린 것이다.

![precacheImage() 적용 전](/assets/flutter/Tip/precacheImage/Example1.gif){: #magnific  width='300' }
![precacheImage() 적용 후](/assets/flutter/Tip/precacheImage/Example2.gif){: #magnific  width='300' }

검정 화면만 보이는 시간이 꽤 긴 왼쪽에 비해 오른쪽은 화면이 나올 때부터 이미 이미지가 보이는 것을 확인할 수 있다.

### 로컬 이미지

네트워크 이미지는 본래 로딩 시간이 오래 걸리기 때문에 `precacheImage()`의 효과가 굉장히 컸다. 그러면 상대적으로 로딩 시간이 짧은 로컬 이미지의 경우에는 `precacheImage()`를 사용할 필요가 없을까?

사실 `precacheImage()`를 처음 사용하게 된 이유가 오히려 로컬 이미지를 빠르게 로딩하기 위해서였다. `Scaffold`의 배경으로 고화질 이미지를 넣어야하는 상황이었는데 0.1 초도 안 되는 로딩 시간도 사람 눈에 굉장히 거슬렸다. 그래서 `precacheImage()`를 사용했고 결과적으로는 아주 효과적이었다.

이것도 직접 한번 확인해보자.

``` dart
Image.asset('assets/atletico_madrid.jpg')
```

같은 이미지를 로컬에 저장하고, 아까의 코드에서 `Image` 부분만 `Image.asset('assets/atletico_madrid.jpg')`로 바꿔주었다.

![precacheImage() 적용 전](/assets/flutter/Tip/precacheImage/Example3.gif){: #magnific  width='300' }
![precacheImage() 적용 후](/assets/flutter/Tip/precacheImage/Example4.gif){: #magnific  width='300' }

미세하지만 확실히 차이가 있다. 상황에 따라서 로컬 이미지에도 적용하면 유용하게 사용할 수 있을 것 같다.

## 전체 예시 코드

<https://github.com/terry1213/flutter-example/tree/precacheImage>{:target="\_blank"}
