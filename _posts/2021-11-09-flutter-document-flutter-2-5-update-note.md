---
title: "[Flutter/Document] Flutter 2.5 업데이트 정리"
categories:
- Flutter
tags:
- Document
---

## Performance: iOS shader warmup, async tasks, GC & message passing

성능적인 부분이 개선이 되었다. 기존에 Flutter에선 처음 애니메이션이 발생할 때 프레임 드랍으로 인해 뚝뚝 끊기곤 했다. 하지만 이번에 웜 업(사전 컴파일) 기능이 추가되어 이 부분이 많이 해결되었다 [(#25644)](https://github.com/flutter/engine/pull/25644). 또한 기존에는 네트워크, 파일 시스템, 플러그 인 등에서의 비동기 이벤트 처리로 인해 프레임 드랍이 발생하기도 했다. 이번 업데이트를 통해 스케줄링 방식[#25789](https://github.com/flutter/engine/pull/25789)이 개선됨에 따라 프레임 작업을 다른 비동기 이벤트보다 우선 처리하여 버벅거림을 해결했다.

![비동기 이벤트 처리로 인한 프레임 지연 정도 업데이트 전/후](/assets/flutter/Document/flutter-2-5/Example1.png){: #magnific }

프레임 드랍의 또 다른 원인은 garbage collector(GC)에 있다. GC는 UI 쓰레드를 중지시키고 메모리를 회수하는데 사용되는 녀석이다. 그런데 기존에는 GC가 너무 많이 사용되는 문제가 있었다. 이번 업데이트에선 사용되지 않는 이미지에 대한 메모리를 즉시 회수하도록 변경([#26219](https://github.com/flutter/engine/pull/26219), [#82883](https://github.com/flutter/engine/pull/82883), [#84740](https://github.com/flutter/engine/pull/84740))되어 GC의 숫자를 눈에 띄게 줄일 수 있었다.

![GC 양 업데이트  전후](/assets/flutter/Document/flutter-2-5/Example2.png){: #magnific }

예를 들어 20초짜리 GIF가 기존에는 400개 이상의 GC를 필요로 했지만, 이제는 4개만 필요하다. GC 수가 줄어들었다는 것은 프레임 드랍이 사라져 애니메이션이 부드러워졌다는 것과 CPU와 파워를 적게 사용하게 되었다는 것을 의미한다.

다른 성능 개선으로는 Dart와 Objective-C/Swift (iOS)간, Dart와 Java/Kotlin (Android)간의 메시지 전송 지연시간 감소가 있다. 메시지 크기와 장치에 따라 기존 대비 최대 50%까지 감소했다([#25988](https://github.com/flutter/engine/pull/25988), [#26331](https://github.com/flutter/engine/pull/26331)).

![iOS 메시지 지연 시간 업데이트 전/후](/assets/flutter/Document/flutter-2-5/Example3.png){: #magnific }

마지막으로, M1 Mac에서 빌드된 Flutter 앱이 ARM iOS 시뮬레이터에서 네이티브하게 돌아가도록 변경되었다 ([#85642](https://github.com/flutter/flutter/pull/85642)). 이제 Intel x86_64와 ARM 사이의 변환 작업이 필요 없어진 것이다. 따라서 iOS 앱 테스트 상황에서 성능이 올라갔고 변환 과정에서 발생했던 문제들을 피할 수 있게 되었다 ([#74970](https://github.com/flutter/flutter/issues/74970#issuecomment-858170914), [#79641](https://github.com/flutter/flutter/issues/79641)).

## Dart 2.14: formatting, language features, pub & linting out-of-the-box

Dart의 버전이 2.14로 업데이트되었다. 새로운 버전의 Dart에는 여러가지 변화가 있지만 제일 좋은 점은 바로 lint이다. 기존의 경우 lint를 따로 직접 설정해야 했지만 이제 Flutter 프로젝트 생성 시 자동으로 설정된다.

![iOS 메시지 지연 시간 업데이트 전/후](/assets/flutter/Document/flutter-2-5/Example4.png){: #magnific }

기본 설정 값은 표준에 맞춰져 있지만 자신의 상황에 맞춰 수정하여 사용할 수도 있다.

## Framework: Android full screen, Material You & text editing shortcuts

Flutter 2.5에는 프레임워크에 대한 여러 수정 사항과 개선 사항도 포함되어 있다. 우선 안드로이드에서 풀 스크린 모드와 괄련된 문제들을 해결했다 ([#81303](https://github.com/flutter/flutter/pull/81303)). 풀스크린에 다양한 모드(lean back, sticky, sticky immersive, edge to edge)가 생겼다고 하는데 이 부분은 무슨 내용인지 잘 이해가 가지 않는다ㅜㅜ

![edge-to-edge 모드 노말(왼쪽), edge-to-edge 모드(가운데), 커스텀 SystemUIOverlayStyle이 적용된 edge-to-edge(오른쪽)](/assets/flutter/Document/flutter-2-5/Example5.png){: #magnific }

floating action button의 사이즈를 설정할 수 있게 되었으며, extended FAB에서 아이콘과 텍스트 사이도 조절할 수 있게 되었다 ([#86441](https://github.com/flutter/flutter/pull/86441)). 그리고 현재 이 위젯 아래에 스크롤 가능한 컨텐츠가 있는지를 나타내는 `MaterialState.scrolledUnder` 상태를 추가했다 ([#79999](https://github.com/flutter/flutter/pull/79999)).

![다양한 설정이 가능하게 된 floating action button](/assets/flutter/Document/flutter-2-5/Example6.png){: #magnific }

![MaterialState.scrolledUnder 상태가 사용된 화면](/assets/flutter/Document/flutter-2-5/Example7.gif){: #magnific  width='300' }

또한 유저가 스크롤하고 있지 않아도 스크롤 가능한 범위를 알 수 있는 기능이 추가되었다 ([#85221](https://github.com/flutter/flutter/pull/85221), [#85499](https://github.com/flutter/flutter/pull/85499)). 아래 예시에서 유저가 스크롤하고 있지 않지만 `ListView`의 높이에 따라 스크롤바가 보이고 사라지는 것을 확인할 수 있다.

![스크롤 하지 않아도 스크롤바가 보였다 사라졌다 한다.](/assets/flutter/Document/flutter-2-5/Example8.gif){: #magnific  width='500' }


`ScaffoldMessenger`를 통해 상단 배너를 보여줄 수 있게 되었다.

`ScaffoldMessenger`의 `showMaterialBanner` 메소드를 호출하면 된다.

상단 배너는 한번에 하나씩만 보여줄 수 있기 때문에 만약 여러번 호출하게 되면 순서대로 하나씩 나타나게 된다.

![](/assets/flutter/Document/flutter-2-5/Example9.gif){: #magnific width='300' }

단축키를 오버라이팅할 수 있는 기능이 추가되었다 ([#85381](https://github.com/flutter/flutter/pull/85381)). `DefaultTextEditingShortcuts` 클래스에는 Flutter가 각 플랫폼에서 지원하는 단축키 리스트가 포함되어 있다. 만약 이 리스트에서 오버라이드 하고 싶은 단축키가 있다면, `Shortcuts` 위젯을 사용하여 커스터마이징할 수 있다.

## Plugins: camera, image picker & plus plugins

[camera 플러그인](https://pub.dev/packages/camera)도 많이 개선되었다.

* [3795](https://github.com/flutter/plugins/pull/3795) 안드로이드 카메라를 지원하는 베이스 클래스
* [3796](https://github.com/flutter/plugins/pull/3796) 안드로이드 자동 초점 기능
* [3797](https://github.com/flutter/plugins/pull/3797) 안드로이드 노출 관련 기능
* [3798](https://github.com/flutter/plugins/pull/3798) 안드로이드 플래시, 확대 기능
* [3799](https://github.com/flutter/plugins/pull/3799) 안드로이드 fps 범위, 해상도, 센서 방향 기능
* [4039](https://github.com/flutter/plugins/pull/4039) 안드로이드 노출, 초점 기능
* [4052](https://github.com/flutter/plugins/pull/4052) 안드로이드 소음 감소 기능
* [4054](https://github.com/flutter/plugins/pull/4054) 최종 구현을 위한 지원 모듈
* [4010](https://github.com/flutter/plugins/pull/4010) iOS에서 기기가 평평할 때 세로 방향으로 고정되던 에러 해결
* [4158](https://github.com/flutter/plugins/pull/4158) iOS에서 포커스 및 노출 지점을 설정하도록 좌표 회전 수정
* [4197](https://github.com/flutter/plugins/pull/4197) 디바이스 방향 변경 시 미리보기 화면이 재빌드되지 않던 부분 수정
* [3992](https://github.com/flutter/plugins/pull/3992) 지원되지 않는 FocusMode로 설정 시 충돌 방지
* [4151](https://github.com/flutter/plugins/pull/4151) camera_web 패키지 소개

[image_picker 플러그인](https://pub.dev/packages/image_picker)에도 카메라와 관련하여 많은 작업이 진행되었다.

* [3898](https://github.com/flutter/plugins/pull/3898) `getVideo` 메소드에서 `preferredCameraDevice`가 잘 작동되지 않던 에러 해결
* [3956](https://github.com/flutter/plugins/pull/3956) 새로운 Google Play 저장 공간 요구 사항에 맞춰서 카메라 캡처의 저장 위치를 Android의 내부 캐시로 변경
* [4001](https://github.com/flutter/plugins/pull/4001) 카메라 권한에 대한 중복 요청 제거
* [4019](https://github.com/flutter/plugins/pull/4019) 카메라가 소스일 때 발생하던 회전 문제 해결

기존에 Flutter 팀에서 관리하던 몇몇 플러그인들 대신에 Flutter Community에서 만든 [plus 플러그인들](https://plus.fluttercommunity.dev/)이 나왔다. 기존 Flutter 팀의 플러그인들은 더 이상 업데이트를 지원하지 않으니 plus 플러그인들로 옮기는 것을 추천한다고 한다.

![](/assets/flutter/Document/flutter-2-5/Example10.png){: #magnific width='500' }

## Flutter DevTools: performance, Widget inspector, & polish

DevTools 부분은 아직 한번도 사용해보지 못했다. Flutter로 앱 출시까지 해봤는데 이 부분을 아직까지 모른다니. 지금은 DevTools에 대해서 하나도 알지 못해서 조만간 공부해서 따로 정리해봐야겠다.

## IntelliJ/Android Studio: integration tests, test coverage, and icon previews

integration test(통합 테스트) 기능이 추가되었다([#5459](https://github.com/flutter/flutter-intellij/pull/5459)). 통합 테스트는 기기에서 실행되는 전체 앱 테스트이다.

![통합 테스트 예시 화면](/assets/flutter/Document/flutter-2-5/Example11.png){: #magnific }

프로젝트에 통합 테스트를 추가하고 싶다면, [이 링크](https://flutter.dev/docs/testing/integration-tests)에 적힌대로 따라하면 된다.

![](/assets/flutter/Document/flutter-2-5/Example12.png){: #magnific }

그리고 Flutter용 최신 IJ/AS 플러그인을 사용하면 단위 테스트 및 통합 테스트 실행 모두에 대한 커버리지 정보를 볼 수 있다.

![](/assets/flutter/Document/flutter-2-5/Example13.png){: #magnific }

커버리지 정보는 에디터의 좌측에 빨간색과 초록색 막대로 표시된다.

미리 보기를 지원하는 Material 및 Cupertino 아이콘처럼 TrueType 글꼴 파일([#5504](https://github.com/flutter/flutter-intellij/pull/5504), [#5595](https://github.com/flutter/flutter-intellij/pull/5595), [#5677](https://github.com/flutter/flutter-intellij/pull/5677), [#5704](https://github.com/flutter/flutter-intellij/pull/5704))을 기반으로 하는 pub.dev의 패키지에서 사용되는 아이콘을 미리 볼 수 있는 새로운 기능도 최신 릴리스에 포함되어 있다.

![아이콘 프리뷰](/assets/flutter/Document/flutter-2-5/Example14.png){: #magnific }

이 기능을 사용하려면 따로 사용할 아이콘 관련 패키지를 따로 명시해야한다. settings/preferences 페이지 아래와 같은 텍스트 필드에 적으면 된다고 한다.

![](/assets/flutter/Document/flutter-2-5/Example15.png){: #magnific }

## Visual Studio Code: dependencies, Fix All, and Test Runner

현재 안드로이드 스튜디오를 사용하고 있기 때문에 이 부분은 생략했다. 비주얼 스튜디오를 사용하시는 분들은 읽어보시길 바란다.

## Tools: exceptions, new app template & Pigeon 1.0

이전 버전까지는 사용자가 따로 처리하지 않은 예외 사항을 Framework 단에서 잡아내는 경우가 있었다. 이때 프레임워크 깊은 곳 어딘가를 가리키기 때문에 어디서 문제가 생겼는지 어려웠던 적이 자주 있다. 이제 그 문제를 해결하여 디버거가 예외 사항을 발생시킨 코드 라인을 가르켜준다 [#17007](https://github.com/flutter/flutter/issues/17007). 또한 에러 발생 시에 `FutureBuilder`가 해당 에러를 rethrow 해야할지 swallow 해야할지를 사용자가 정할 수 있게 되었다 [#84308](https://github.com/flutter/flutter/pull/84308).

Flutter 프로젝트를 생성하면 지금까지는 기본앱으로 Counting 앱 템플릿이 구현되어 있었다. 이번 업데이트부터 아래의 명령어를 통해 새로운 템플릿이 들어간 프로젝트를 생성할 수 있다.

``` dart
flutter create -t skeleton my_app
```

![](/assets/flutter/Document/flutter-2-5/Example16.gif){: #magnific width='300' }

Counting 템플릿보다 한 단계 높은 템플릿으로 보인다. 이 템플릿은 다음과 같은 기능을 가지고 있다고 한다.

* `ChangeNotifier`를 통해 여러 위젯을 조정한다.
* arb 파일을 통해 디폴트로 현지화를 생성한다.
* 예시용 이미지를 포함하고, 이미지 에셋을 위한 1x, 2x, 3x 디렉토리를 생성한다.
* 기능을 최우선 기준으로 하여 디렉토리 구성
* shared preferences 지원
* light/dark theme 지원
* 여러 페이지 간의 네이게이션 지원

사실 프로젝트 생성 후 제일 먼저 하는 게 템플릿 지우는 거라 큰 의미는 없어보인다\...ㅋㅋㅋ

마지막으로 Pigeon의 1.0 릴리즈이다. 이 부분은 앱 개발이 아니라 플러그인 개발을 하는 분들에게 의미가 있는 부분 같다. 앱 개발만 겨우 하는 나에겐 아직 몰라도 되는 부분이다. 열심히 공부해서 언젠가는 그럴듯한 플러그인 하나 만들어야지~
