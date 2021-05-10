---
title: "[Flutter] GetX 정리"
categories:
- Flutter
tags:
- Mobile
- iOS
- Android
---

최근 주변에 상태 관리 툴로 GetX를 사용하는 사람들이 많아지고 있다. '나도 GetX를 한번 사용해볼까'하는 생각도 들었지만, 얼마 전에 Provider를 배웠고 아직 익숙해지고 있는 중이라 나중에 사용해보기로 마음먹었다.

그런데 갑자기 새로 들어가는 프로젝트에서 GetX를 사용하게 되었다. 그래서 저번 Provider에 이어서 오늘은 GetX에 대해 정리해보려고 한다.

## 0. GetX 특징

GetX는 매우 가볍고 강력한 솔루션이며, 고성능 상태 관리, 지능형 종속성 주입, 라우트 관리 기능을 제공한다.

GetX는 다음과 같은 3가지의 기본 원칙을 가지고 있다.

* 성능
	* 성능과 리소스 소비의 최소화에 집중한다.
	* Streams, ChangeNotifier를 사용하지 않는다.
* 생산성:
	* 쉽고 간결한 구문을 사용한다.
	* 사용하지 않는 리소스는 메모리에서 자동으로 제거해준다. 따라서 개발자가 메모리에서 컨트롤러를 제거하는 것을 신경쓰지 않아도 된다.
* 조직화:
	* 화면, 프레젠테이션 로직, 비즈니스 로직, 종속성 주입, 네비게이션을 완전히 분리할 수 있다.

##  패키지 사용을 위한 준비 작업
{:.no_toc}


<details markdown="1">
 <summary> 패키지 사용을 위한 준비 작업 펼치기/접기 </summary>

###  pubspec.yaml 파일에 패키지 추가
{:.no_toc}

``` yaml
dependencies:
  get: ^4.1.4
```

### 설치
{:.no_toc}

``` console
flutter pub get
```

### import
{:.no_toc}

``` dart
import 'package:get/get.dart';
```

</details>

## 1. 라우트(Route) 관리

GetX에서 제일 마음에 드는 부분이 바로 라우트 관리였다. 그래서 상태 관리보다 먼저 정리해보도록 하겠다.

원래 다른 페이지로 이동하거나 다이얼로그를 띄울 때 같이 라우트간 이동에서 컨텍스트(`context`)를 필요로 한다. Flutter에 입문할 때 이 `context`의 개념을 이해하기 어려웠고 불편하다는 생각도 했다.

그런데 GetX를 사용하면 `context`없이 라우트를 관리할 수 있다. 따라서 코드가 더 간결해지고 쉬워진다. 이제부터 GetX를 통한 라우트 관리 방법을 알아보자.

우선, 라우트 관리를 위해선 `MaterialApp` 를 `GetMaterialApp`로 변경해야한다.

``` dart
// 변경 전
MaterialApp(
  title: 'Getx example',
  home: HomePage(),
)
```

``` dart
// 변경 후
GetMaterialApp(
  title: 'Getx example',
  home: HomePage(),
)
```

### 1.1. Navigation

가장 기본적인 화면 이동 부분이다.

#### 1.1.1. Get.to()

새로운 화면으로 이동한다. 아래의 코드에서는 `NextPage()`로 이동한다.

``` dart
Get.to(NextPage());
```

![](/assets/flutter/GetX/to.gif){: width="300" height="500"}

#### 1.1.2. Get.toNamed()

미리 설정해둔 이름을 통해 새로운 화면으로 이동한다. 아래의 코드에서는 `/next`라는 이름을 가진 페이지로 이동한다.

``` dart
Get.toNamed('/next');
```

하지만 이렇게만 하면 `/next`라는 이름과 연결된 화면이 없기 때문에 에러가 발생할 것이다.

따라서 `GetMaterialApp`의 `getPages`를 추가하고, `/next`와 `NextPage()`를 연결해야 한다.

``` dart
GetMaterialApp(
  title: 'Getx example',
  home: HomePage(),
  getPages: [
    GetPage(name: '/next', page: () => NextPage()),
  ],
)
```

이제 `/next`란 이름을 통해서 `NextPage()`로 화면이 이동하는 것을 확인할 수 있다.

![](/assets/flutter/GetX/toNamed.gif){: width="300" height="500"}

#### 1.1.3. Get.back()

이전 화면으로 돌아간다.

``` dart
Get.back();
```

`NextPage()`에서 이전 화면인 `HomePage()`로 돌아가는 것을 확인할 수 있다.

![](/assets/flutter/GetX/back.gif){: width="300" height="500"}

#### 1.1.4. Get.off()

다음 화면으로 이동하면서 이전 화면을 아예 없애버린다. 이전 화면으로 돌아갈 필요가 없을 때 사용한다.

``` dart
Get.off(NextPage());
```

`NextPage()`에서 버튼을 클릭해도 `HomePage()`가 없어졌기 때문에 돌아갈 수 없는 것을 확인할 수 있다.

![](/assets/flutter/GetX/off.gif){: width="300" height="500"}

#### 1.1.5. Get.offAll()

`Get.off()`가 이전 화면 하나만 없앴다면 `Get.offAll()`는 이전의 모든 화면을 없애고 다음 화면으로 이동한다.

``` dart
Get.offAll(NextPage());
```

### 1.2. Snackbar

기본적으로 Snackbar는 하단에서만 나온다. 그런데 GetX를 사용하면 Snackbar를 상단에 보이게 할 수도 있다.

#### 1.2.1. Get.snackbar()

제목과 메시지를 설정하면 해당 내용으로 Snackbar를 보여준다. 지속시간(`duration`), 방향(`snackPosition`), 배경색(`backgroundColor`) 등 여러 설정들을 추가할 수 있다.

``` dart
Get.snackbar('Snackbar', 'Snackbar', snackPosition: SnackPosition.TOP);
```

`snackPosition`를 `SnackPosition.TOP`으로 설정했기 때문에 위에서 나오는 것을 볼 수 있다.

![](/assets/flutter/GetX/snackbar.gif){: width="300" height="500"}

#### 1.2.2. Get.showSnackbar()

`Get.snackbar()`와 거의 동일하다. `Get.showSnackbar()`만의 특별한 용도가 있는지는 모르겠다.


``` dart
Get.showSnackbar(
  GetBar(
    title: 'Snackbar',
    message: 'Snackbar',
    duration: Duration(seconds: 2),
		snackPosition: SnackPosition.BOTTOM,
  ),
);
```

똑같이 제목과 메시지만 설정하고 실행했을 때, `Get.snackbar()`는 디자인과 설정이 기본적으로 되어있는 것에 비해 `Get.showSnackbar()`는 아무 설정도 안 되어 있는 것처럼 보인다. 이러한 점 때문에 `Get.showSnackbar()`보다 `Get.snackbar()`를 사용하게 되는 것 같다.

`snackPosition`를 `SnackPosition.BOTTOM`으로 설정했기 때문에 아래에서 나오는 것을 볼 수 있다.

![](/assets/flutter/GetX/showSnackbar.gif){: width="300" height="500"}

### 1.3. Dialog

#### 1.3.1. Get.defaultDialog()

Dialog를 화면에 띄어준다. 확인/취소 시에 실행할 함수(`onConfirm`, `onCancel`),  확인/취소 텍스트(`textConfirm`, `textCancel`), 배경색(`backgroundColor`) 등 여러 설정들을 추가할 수 있다.

``` dart
Get.defaultDialog(title: 'Dialog', middleText: 'Dialog');
```

제목과 텍스트만 설정했지만, 디자인 및 설정들이 기본적으로 되어있는 것을 볼 수 있다.

![](/assets/flutter/GetX/defaultDialog.gif){: width="300" height="500"}

#### 1.3.2. Get.dialog()

`Get.defaultDialog()`와 달리 원래 사용하던 `Dialog` 위젯을 가져와서 사용할 수 있다. 따라서 새로 시작하는 프로젝트에서 GetX를 적용할 때는 `Get.defaultDialog()`를 사용하는 것이 좋지만, 원래 존재하는 프로젝트에 GetX를 적용할 때는 `Get.dialog()`를 통해 기존 `Dialog` 위젯을 복사하여 빠르게 작업하는 편이 좋을 것 같다.

``` dart
Get.dialog(
  Dialog(
    child: Container(
      height: 100,
      child: Center(
        child: Text('Dialog'),
      ),
    ),
  ),
);
```

![](/assets/flutter/GetX/dialog.gif){: width="300" height="500"}

### 1.4. BottomSheet

#### 1.4.1. Get.bottomSheet()

내부에 들어갈 위젯만 넣어주면 해당 위젯을 포함하는 BottomSheet를 보여준다.

``` dart
Get.bottomSheet(
  Container(
    height: 100,
    color: Colors.white,
    child: Center(
      child: Text('BottomSheet'),
    ),
  ),
)
```

![](/assets/flutter/GetX/bottomSheet.gif){: width="300" height="500"}

### 라우트 관리 전체 코드
{:.no_toc}

<details markdown="1">
 <summary> 라우트 관리 전체 코드 펼치기/접기 </summary>

``` dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Getx example',
      home: HomePage(),
      getPages: [
        GetPage(name: '/next', page: () => NextPage()),
      ],
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Getx example'),
      ),
      body: Center(
        child: Column(
          children: [
            TextButton(
              onPressed: () => Get.to(NextPage()),
              child: Text('Get.to()'),
            ),
            TextButton(
                onPressed: () => Get.toNamed('/next'),
                child: Text('Get.toNamed()')),
            TextButton(
              onPressed: () => Get.off(NextPage()),
              child: Text('Get.off()'),
            ),
            TextButton(
              onPressed: () => Get.offAll(NextPage()),
              child: Text('Get.offAll()'),
            ),
            TextButton(
              onPressed: () => Get.snackbar('Snackbar', 'Snackbar', snackPosition: SnackPosition.TOP),
              child: Text('Get.snackbar()'),
            ),
            TextButton(
              onPressed: () => Get.showSnackbar(
                GetBar(
                  title: 'Snackbar',
                  message: 'Snackbar',
                  duration: Duration(seconds: 2),
                  snackPosition: SnackPosition.BOTTOM,
                ),
              ),
              child: Text('Get.showSnackbar()'),
            ),
            TextButton(
              onPressed: () =>
                  Get.defaultDialog(title: 'Dialog', middleText: 'Dialog'),
              child: Text('Get.defaultDialog()'),
            ),
            TextButton(
              onPressed: () => Get.dialog(
                Dialog(
                  child: Container(
                    height: 100,
                    child: Center(
                      child: Text('Dialog'),
                    ),
                  ),
                ),
              ),
              child: Text('Get.dialog()'),
            ),
            TextButton(
              onPressed: () => Get.bottomSheet(
                Container(
                  height: 100,
                  color: Colors.white,
                  child: Center(
                    child: Text('BottomSheet'),
                  ),
                ),
              ),
              child: Text('Get.bottomSheet()'),
            ),
          ],
        ),
      ),
    );
  }
}

class NextPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('NextPage'),
      ),
      body: Center(
        child: Column(
          children: [
            TextButton(
              onPressed: () => Get.back(),
              child: Text('Get.back()'),
            ),
          ],
        ),
      ),
    );
  }
}
```

</details>

## 2. 상태(State) 관리

GetX에는 크게 두가지의 상태 관리법이 존재한다. 이 두가지의 상태 관리법을 아주 간단한 예시인 Counter( 버튼 클릭 시에 숫자가 1씩 증가) 예시를 통해 설명해보겠다.

### 2.1. simple 방식

첫번째 방식은 비교적 간단한(simple) 방식이다. 이 방식은 이후에 설명할 reactive 방식보다 메모리를 적게 사용한다는 장점이 있다.

#### 2.1.1. 변수 선언

`GetxController`를 extend하는 `Controller` 클래스를 선언하고, 초기값을 0으로 설정한 `count1` 변수를 선언한다.

``` dart
class Controller extends GetxController {
  var count1 = 0;
}
```

#### 2.1.2. GetBuilder()

`GetBuilder`을 통해 화면에 `count1` 변수를 보여준다. 이때 `init`을 설정하지 않으면 에러가 발생하는 것을 유의하자.

``` dart
GetBuilder<Controller>(
  init: Controller(),
  builder: (_) => Text(
    'clicks: ${_.count1}',
   ),
)
```

![](/assets/flutter/GetX/GetBuilder.png){: width="300" height="500"}

`count1`의 초기값인 0이 보이는 것을 확인할 수 있다.

#### 2.1.3. update()

이제 `count1` 변수를 증가시켜야 한다. 또한 증가할 때 이를 화면에 알려줘야한다. 이를 위해 `update()` 함수를 사용한다.

``` dart
class Controller extends GetxController {
  var count1 = 0;

  void increment1() {
    count1++;
    update();
  }
}
```

`update()`는 `ChangeNotifier`의 `notifyListeners()`와 동일하게 생각하면 된다. `count1++`를 통해 `count1`을 증가시킨 후 `update()`를 호출하는 `increment1()`을 정의한다.

#### 2.1.4. Get.find()

> `Get.find()`, `Get.put()`는 순서상 여기에 들어가는 것이 매끄러워서 넣은 것이지, simple 방식에 해당하는 것은 아니다. 두 방식(simple, reactive) 모두에서 사용된다.

`Get.find()`을 사용하여 `increment1()`을 호출하는 버튼을 만들어 텍스트 아래에 배치한다.

``` dart
TextButton(onPressed: Get.find<Controller>().increment1, child: Text('increment1'))
```

하지만 리빌드해보면 `Get.find<Controller>()`에서 에러가 발생할 것이다. 이는 `Get.find<Controller>()`가 `Controller`를 찾는 시점이 `GetBuilder()`의 `init`에서 `Controller`를 등록하기 이전이라서 그렇다.

#### 2.1.5. Get.put()

> `Get.find()`, `Get.put()`는 순서상 여기에 들어가는 것이 매끄러워서 넣은 것이지, simple 방식에 해당하는 것은 아니다. 두 방식(simple, reactive) 모두에서 사용된다.

이 문제를 해결하기 위해서 `Get.put()`을 사용한다.

우선 `build()` 메소드 내부에 `controller` 변수를 선언하며, 이때 `Get.put()`를 통해 `Controller`를 등록한다.

``` dart
@override
Widget build(BuildContext context) {
  final controller = Get.put(Controller());
  // ...
}
```

`controller` 변수를 선언하면서  `Controller`를 등록했기 때문에 `GetBuilder`에서 또 등록할 필요가 없다. 따라서 `init` 부분을 지운다.

``` dart
GetBuilder<Controller>(
  // init 부분 삭제.
  builder: (_) => Text(
    'clicks: ${_.count1}',
  ),
)
```

버튼에서 `increment1()`를 호출할 때, `Get.find()` 대신 `controller` 변수를 사용한다.

``` dart
TextButton(onPressed: controller.increment1, child: Text('increment1')),
```

![](/assets/flutter/GetX/count1button.gif){: width="300" height="500"}

리빌드 해보면 에러가 발생하지 않을 것이다. 또한 버튼을 클릭해보면 화면의 숫자가 증가하는 것을 확인할 수 있다.

### 2.2. reactive 방식

simple 방식은 메모리를 적게 사용한다는 장점이 있었다. 그렇다면 reactive 방식은 무슨 장점이 있고 어느 경우에 사용할까?

reactive 방식에는 simple 방식에는 없는 특별한 기능이 있다. 이에 대해선 reactive 방식에 대한 기본 설명 이후에 정리해보도록 하겠다.

#### 2.2.1. Rx(observable 변수) 선언

reactive 방식에서는 observable 변수라는 특별한 변수를 사용한다. observable 변수를 Rx라고도 부른다. 이런 Rx를 선언하는 방법에는 아래와 같이 3가지가 있다.

1. Value.obs
2. Rx\<Type>(Value)
3. RxType(Value)

이 중 가장 간단한 1번 방법을 주로 사용한다. 우리도 1번 방법을 사용하여 `count2` 변수를 정의해보자.

``` dart
  var count2 = 0.obs; // 1번
  var count2 = Rx<int>(0); // 2번
  var count2 = RxInt(0); // 3번
```

#### 2.2.2.  Rx(observable 변수)의 값 접근 .value

Rx의 값을 접근할 때는 일반적인 변수의 값의 경우와 다르게 `.value`를 통해 접근할 수 있다. 여기서 주의해야할 점이 있다. `String`과 `int` 같은 primitive type에는 `.value`를 사용해야하지만, `List`에서는 `.value`가 필요없다. dart api가 리스트에서만 `.value` 없이도 값에 접근할 수 있게 해주기 때문이다.

이 점은 좀 불편하다고 생각했다. `.value`를 붙이는 것은 더 길게 써야하는 것이고, 그 방법 마저도 `List`라는 예외가 존재하기 때문이다. 이 이유에 대해서 찾아보니, code generator와 decoration을 사용하면 이 불편함을 해결할 수 있지만, 외부 종속성을 없애고자 그대로 두었다고 한다.

``` dart
void increment2() => count2.value++;
```

`.value`를 사용해서 `count2`의 값을 1 증가시키는 `increment2()` 함수를 정의했다. reactive 방식에선 `update()` 함수가 필요하지 않다.

#### 2.2.3. GetX()

simple 방식의 `GetBuilder`과 같은 역할을 하는 것이 `GetX`이다. 그럼 `GetX`를 사용해서 `count2`의 값을 보여주는 텍스트를 만들어보자.

``` dart
GetX<Controller>(
  builder: (_) => Text(
    'clicks: ${_.count2.value}',
  ),
),
```

이전 simple 방식 예시(`count1`) 예시에 `count2` 코드를 추가하고 있기 때문에 이미 `Get.put()`을 통해 `Controller`를 등록한 상태이다. 따라서 `GetX`에 `init` 부분을 넣지 않았다. 필요한 경우에는 `GetBuilder`에서처럼 `init`을 통해 `Controller`를 등록할 수 있다.

![](/assets/flutter/GetX/GetX.png){: width="300" height="500"}

`count2`의 초기값인 0이 보이는 것을 확인할 수 있다.

#### 2.2.4. Obx()

`GetX`보다 더 간단한 방법이 있다. 바로 `Obx()`를 사용하는 것이다. `Obx()`의 경우 사용할 컨트롤러의 종류를 따로 명시할 필요가 없고, 보여줄 위젯만 리턴하면 된다. 하지만 이 방법은 무조건 `Get.put()`을 필요로 한다.

`Obx`를 사용해서 `count2`의 값을 보여주는 텍스트를 만들어서 `GetX`를 통해 만든 텍스트 하단에 배치하자.

``` dart
Obx(() {
  return Text(
    'clicks: ${controller.count2.value}',
  );
}),
```

이미 앞선 예시에서 `Get.put()`을 통해 선언한 `controller`가 존재하기 때문에 이를 바로 사용했다.

![](/assets/flutter/GetX/Obx.png){: width="300" height="500"}

`count2`의 초기값인 0이 보이는 것을 확인할 수 있다.

마지막으로 `count1` 예시에서처럼 `count2`를 증가시키는 버튼을 만든다.

``` dart
TextButton(onPressed: controller.increment2, child: Text('increment2'))
```

![](/assets/flutter/GetX/count2button.gif){: width="300" height="500"}

버튼을 클릭하면 `GetX()`를 통해 만든 텍스트와 `Obx()`를 통해 만든 텍스트의 숫자가 모두 증가하는 것을 확인할 수 있다.

### 상태 관리 전체 코드
{:.no_toc}

<details markdown="1">
 <summary> 상태 관리 전체 코드 펼치기/접기 </summary>

#### controller.dart
{:.no_toc}

``` dart
import 'package:get/get.dart';

class Controller extends GetxController {
  var count1 = 0;
  var count2 = 0.obs;
  // var count2 = Rx<int>(0);
  // var count2 = RxInt(0);

  void increment1() {
    count1++;
    update();
  }

  void increment2() => count2.value++;
}
```

#### main.dart
{:.no_toc}

``` dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'controller.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Getx example',
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final controller = Get.put(Controller());
    return Scaffold(
      appBar: AppBar(
        title: Text('Getx example'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            GetBuilder<Controller>(
              init: Controller(),
              builder: (_) => Text(
                'clicks: ${_.count1}',
              ),
            ),
            TextButton(onPressed: controller.increment1, child: Text('increment1')),
            GetX<Controller>(
              builder: (_) => Text(
                'clicks: ${_.count2.value}',
              ),
            ),
            Obx(() {
              return Text(
                'clicks: ${controller.count2.value}',
              );
            }),
            TextButton(onPressed: controller.increment2, child: Text('increment2')),
          ],
        ),
      ),
    );
  }
}
```

</details>
