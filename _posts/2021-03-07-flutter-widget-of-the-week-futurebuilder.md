---
title: "[Flutter/Widget of the Week] FutureBuilder"
categories:
- Flutter
tags:
- Mobile
- iOS
- Android
---

## Widget of the Week 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/ek8ZPdWj4Qo?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

일반적으로 코드를 작성할 때는 동기적(Synchronous)인 방법과 비동기적(Asynchronous)인 방법이 존재한다. 여기서 동기적은 코드가 순차적으로 진행되는 것을 의미한다. 쉽게 말해서 앞의 코드의 작업이 완료되기 전에 다음 코드가 실행되지 않는 것이다.

Flutter에서 일반적으로 대부분의 코드는 동기적이다. 하지만 동기적 코드의 단점이 있다. 서버로부터 데이터를 다 받아오기 전에는 아무 작업도 진행할 수 없다는 점이다. 화면에는 서버로부터 받아오는 데이터가 필요한 부분과 필요하지 않는 부분이 있을 것이다. 이 중 서버로부터 받아오는 데이터가 필요하지 않은 부분은 먼저 화면에 그려도 된다. 하지만 동기적 코드에선 이 부분도 데이터 받아오기를 기다려야한다.

이런 문제를 해결하기 위해 `Future`/`FutureBuilder`를 통한 비동기적 코드를 사용한다. `FutureBuilder`를 사용하면 서버로부터 데이터를 다 받아오기 전이라도 해당 데이터를 필요로 하지 않은 부분들은 미리 그릴 수 있으며 `ProgressIndicator` 등을 통해 데이터를 받아오는 중이라고 사용자에게 알려줄 수도 있다. 또한 데이터를 전부 받아오면 `setState()`를 따로 부를 필요 없이 자동으로 데이터를 화면에 보여줄 수 있다.

## 사용 예시

아래는 인터넷으로부터 이미지를 받아와서 화면에 보여주는 상황에 대한 2가지 예시이다.

![데이터 받기 성공](/assets/flutter/WidgetOfTheWeek/6.FutureBuilder/Example1.gif){: #magnific width="300" height="500"}
![에러 발생](/assets/flutter/WidgetOfTheWeek/6.FutureBuilder/Example2.gif){: #magnific width="300" height="500"}

<details markdown="1">
  <summary>FutureBuilder 사용 예시에 대한 코드 펼치기/접기</summary>

``` dart
FutureBuilder(
  future: Future<Image>.delayed(
    Duration(seconds: 2),
        () {
      // throw("이미지를 불러올 수 없습니다.");
      return Image.network('https://terry1213.github.io/assets/images/logo.png');
      },
  ),
  builder: (context, snapshot) {
    List<Widget> children;
    if (snapshot.hasData) {
      children = <Widget>[
        Padding(
          padding: EdgeInsets.only(top: 16),
          child: snapshot.data
        )
      ];
    } else if (snapshot.hasError) {
      children = <Widget>[
        Icon(
          Icons.error_outline,
          color: Colors.red,
          size: 60,
        ),
        Padding(
          padding: EdgeInsets.only(top: 16),
          child: Text('에러 발생: ${snapshot.error}'),
        )
      ];
    } else {
      children = <Widget>[
        SizedBox(
          child: CircularProgressIndicator(),
          width: 60,
          height: 60,
        ),
        Padding(
          padding: EdgeInsets.only(top: 16),
          child: Text('로딩중...'),
        )
      ];
    }
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: children,
      ),
    );
  },
),
```

</details>
<br>

데이터와 관계없는 부분인 `AppBar`는 이미지를 받아오기 전부터 보인다. 또한 이미지를 받아오는 중일 때는 이를 사용자에게 알려주는 `CircularProgressIndicator`가 돌아간다.

> 주의! 이미지를 받아오는 시간이 너무 짧으면 `CircularProgressIndicator`를 거의 볼 수 없기 때문에 `delayed()`를 사용하여 임의로 2초의 딜레이를 줬다.

여기까지는 양쪽 예시가 같지만 이어지는 결과에서는 차이가 있다. 왼쪽 예시에선 이미지를 받아오는 것에 성공하여 해당 이미지를 화면에 보여주지만 오른쪽 예시에선 에러가 발생하여 에러 화면을 보여준다.

> 주의! 실제로 이미지 로딩 중에 에러가 발생한 것이 아니라 `throw()`를 사용해서 임의로 에러를 발생시킨 것이다. 위에 코드에서 `throw()`의 주석 처리를 해제해야 오른쪽 예시와 같은 화면을 볼 수 있다.

## Properties

| Property    	| Description 	| Type      	| Default 	|
|-------------	|-------------	|-----------	|---------	|
| future      	| 해당 FutureBuilder가 연결되는 Future.	| Future\<T> 	|         	|
| builder     	| 해당 FutureBuilder가 사용할 빌드 전략.	| AsyncWidgetBuilder\<T>	|         	|
| initialData 	| future가 완료되기 전까지 사용할 snapshot을 만드는데 사용될 데이터.	| T         	|         	|
