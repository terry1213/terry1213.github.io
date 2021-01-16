---
title: "[Flutter] Firebase Analytics 사용법"
categories:
- Flutter
tags:
- Mobile
---

## Firebase Analytics를 통해 어떤 일을 할 수 있을까?

Google Analytics는 유저의 앱 사용과 행동 패턴에 대한 정보를 무료료 제공하는 서비스다. Analytics 리포트는 사용자의 행동을 명확하게 알 수 있게 도와주며 이를 통해 앱 마케팅 및 성능 최적화를 효과적으로 할 수 있다.

## 설치

### 1. dependency 추가

`pubspec.yaml`에 `firebase_analytics: "^7.0.1"`를 추가한다.

``` yaml
dependencies:
  flutter:
    sdk: flutter
  firebase_core: "^0.7.0"
  firebase_analytics: "^7.0.1"
```

### 2. Dependency 다운로드

``` bash
$ flutter pub get
```

### 3. (웹의 경우만) SDK 추가

만약 웹에서 FlutterFire를 사용한다면 index.html 파일에 `firebase-analytics` JavaScript SDK를 추가한다.

``` html
<html>
  ...
  <body>
    <script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-analytics.js"></script>
  </body>
</html>
```

### 4. 앱 다시 빌드

앱을 다시 빌드한다.

``` console
$ flutter run
```

## firebase_analytics 패키지 사용법

### firebase_analytics에서 제공하는 표준 메소드 목록

firebase_analytics 패키지의 `FirebaseAnalytics` 클래스에는 자주 사용되는 이벤트 로그에 대한 표준 메소드들이 존재한다.

### AppOpen

``` dart
logAppOpen()
```

표준 `app_open` 이벤트 로그를 발생시킨다.

### Login

``` dart
logLogin({String loginMethod})
```

표준 login 이벤트 로그를 발생시킨다.

### SelectContent

``` dart
logSelectContent({String contentType, String itemId})
```

표준 `select_content` 이벤트 로그를 발생시킨다. 유저가 특정 카테고리(`contentType`)의 아이템들 중 어떤 아이템(`temId`)을 선택했는지를 알려준다. 이를 통해 인기 있는 아이템이나 카테고리를 알 수 있다.

### SignUp

``` dart
logSignUp({String signUpMethod})
```

표준 `sign_up` 이벤트 로그를 발생시킨다. 유저가 계정을 등록했다는 것을 알려준다. `signUpMethod`은 유저의 가입 방법을 의미한다.

### TutorialBegin

``` dart
logTutorialBegin()
```

표준 `tutorial_begin` 이벤트 로그를 발생시킨다. 유저가 튜토리얼을 시작했음을 알려준다. `logTutorialComplete`와 함께 사용해서 얼마나 많은 유저가 튜토리얼을 완료하고 넘어갔는지 비율을 알 수 있다.

### logTutorialComplete

``` dart
logTutorialComplete()
```

표준 `tutorial_complete` 이벤트 로그를 발생시킨다. 유저가 튜토리얼을 완료했음을 알려준다. `logTutorialBegin()`와 함께 사용해서 얼마나 많은 유저가 튜토리얼을 완료하고 넘어갔는지 비율을 알 수 있다.

## 커스텀 이벤트 로그
### logEvent

만약 제공되는 표준 메소드들에 자신이 원하는 것이 없다면 `logEvent` 메소드를 통해 상황에 맞는 이벤트 로그를 발생시킬 수도 있다.

``` dart
logEvent({String name, Map<String, dynamic> parameters})
```

커스텀 이벤트 로그를 발생시킨다. `name`으로 이벤트 이름, `parameters`로 원하는 데이터를 설정할 수 있다.

> 만약 철자는 같지만 대소문자가 다른 `name`을 가진 두 개의 이벤트(**ex.** `UserConvert`, `userconvert`)가 있다면 이들은 서로 다른 두 이벤트로 인식된다.

Firebase console 대시보드에서 이벤트의 통계를 확인할 수 있다. 또한 대시보드에는 앱에서 발생한 이벤트 로그의 타입 별로 이벤트 보고서가 자동 생성된다.

## 유저 속성 설정
### setUserProperty

``` dart
setUserProperty({String name, String value})
```

특정 이름(`name`)의 유저 속성을 입력한 값(`value`)으로 설정한다. 최대 25개의 유저 속성 이름이 지원된다. 유저 속성 값이 한번 설정되면 앱 라이프 사이클 내내 앱 전체에서 유지된다.

### 속성 이름 규칙

`name`은 설정할 유저 속성의 이름이다. `name`은 1~24 자리의 문자, 숫자, \_의 조합이여야 하며 맨 앞에는 문자가 나와야 한다. 또한 "firebase_" 로 시작할 수 없다.

마지막으로 아래 목록의 유저 속성 이름들은 구글에서 예약해두었기 때문에 사용할 수 없다.

* Age
* Gender
* Interest

이렇게 설정한 데이터들은 Firebase console의 유저 속성 대시보드에서 확인할 수 있다. 이러한 속성은 Google Analytics에서 리포트에 대한 필터로 사용할 수 있다.

## 유저 아이디 설정

### setUserId

``` dart
setUserId(String id)
```

유저의 아이디를 설정한다.

유저 아이디를 설정한 후에 발생하는 이벤트에 대해서는 자동으로 유저 아이디가 붙게 된다. 따라서 BigQuery에서 `user_id` 값을 쿼리하여 이벤트에 접근할 수 있다. 하지만 아이디를 설정하기 이전에 기록된 이벤트에는 영향을 끼치지 않는다.
