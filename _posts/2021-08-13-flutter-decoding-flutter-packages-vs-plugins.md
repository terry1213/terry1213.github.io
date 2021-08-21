---
title: "[Flutter/Decoding Flutter] 패키지 vs 플러그인 (Packages vs Plugins?)"
tags:
- DecodingFlutter
categories:
- Flutter
---

## Decoding Flutter 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/Y9WifT8aN6o?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

## 패키지란?

Dart 소스 코드 하나를 열고, 스크롤을 제일 위로 올려보자.

사진1

그럼 위과 같이 많은 수의 `import`가 보일 것이다. 이 `import`들은 얼핏 보기엔 전부 비슷해보인다.

하지만 `import`에도 종류가 있으며, 이는 `import` 뒤에 이어지는 부분을 보고 구별할 수 있다.

`import`  뒤에 `package`라고 쓰여 있다면 이는 패키지이다. 그 외에 나머지들은 패키지가 아니라 그저 같은 소스 프로젝트에 있는 다른 파일을 가르키고 있는 것뿐이다.

여기서 패키지란 어플과 상관 없지만, 어플의 기능을 구현하기 위해 필요한 코드를 말한다.

패키지는 Dart나 Flutter만의 개념이 아니다. 모듈, 젬, 라이브러리 등 다양한 이름으로 불리기는 하지만 이름만 다를 뿐 다 같은 개념이다.
## 그렇다면 플러그인은?

그런데 사실 패키지 중에 몇몇은 패키지이자 플러그인이다. 이는 플러그인이 패키지의 특별한 타입이라는 것을 의미한다.

그럼 어떤 패키지가 플러그인으로 분류될까? 

아래와 같은 어플이 있다고 생각해보자.

``` dart
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

const url = 'https://flutter.dev/';

void main() => runApp(
  MaterialApp(
    home: Material(
      child: Center(
        child: ElevatedButton(
          onPressed: () async => await canLaunch(url) ? await launch(url) : throw '$url을 열 수 없습니다.',
          child: Text('flutter.dev 열기'),
        ),
      ),
    ),
  ),
);
```

이 어플은 버튼을 클릭했을 때 웹 브라우저를 열어주며 iOS, Android, macOs 등 어떤 플랫폼에서 실행되든 같은 기능을 보여준다.

그런데 위의 코드를 보면 요구되는 작업에 비해 코드가 되게 짧고 간단하다. 이는 웹 브라우저를 여는 작업이 `url_launcher` 패키지에서 이루어지기 때문이다.

`url_launcher` 패키지는 자신이 어떻게 사용되는지에 대해 상관하지 않는다./신경쓰지 않는다. 사용자가 url를 제공하고 `url_launcher`  패키지는 해당 url을 웹 브라우저를 통해 열어줄 뿐이다.

그럼 이제 `url_launcher` 패키지의 소스 코드를 열어보자.

**UrlLauncher.java**

``` java
// ...
LaunchStatus launch(
    String url,
    Bundle headersBundle,
    boolean useWebView,
    boolean enableJavaScript,
    boolean enableDomStorage) {
  if (activity == null) {
    return LaunchStatus.NO_ACTIVITY;
  }

  Intent launchIntent;
  if (useWebView) {
    launchIntent =
        WebViewActivity.createIntent(
            activity, url, enableJavaScript, enableDomStorage, headersBundle);
  } else {
    launchIntent =
        new Intent(Intent.ACTION_VIEW)
            .setData(Uri.parse(url))
            .putExtra(Browser.EXTRA_HEADERS, headersBundle);
  }

  try {
    activity.startActivity(launchIntent);
  } catch (ActivityNotFoundException e) {
    return LaunchStatus.ACTIVITY_NOT_FOUND;
  }

  return LaunchStatus.OK;
}
// ...
```

**FLTURLLauncherPlugin.m**

``` objective_c
// ...
- (void)launchURL:(NSString *)urlString
             call:(FlutterMethodCall *)call
           result:(FlutterResult)result {
  NSURL *url = [NSURL URLWithString:urlString];
  UIApplication *application = [UIApplication sharedApplication];

  if (@available(iOS 10.0, *)) {
    NSNumber *universalLinksOnly = call.arguments[@"universalLinksOnly"] ?: @0;
    NSDictionary *options = @{UIApplicationOpenURLOptionUniversalLinksOnly : universalLinksOnly};
    [application openURL:url
                  options:options
        completionHandler:^(BOOL success) {
          result(@(success));
        }];
  } else {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
    BOOL success = [application openURL:url];
#pragma clang diagnostic pop
    result(@(success));
  }
}
// ...
```

소스 코드를 통해, Android에서 브라우저를 열기 위해서는 Java 코드를 사용하고, iOS에서 사파리를 열기 위해선 Objective-C 코드를 사용하는 것을 볼 수 있다. 이는 `url_launcher` 패키지가 플랫폼에 따라 다른 작업이 필요하기 때문이다. `url_launcher` 패키지와 같이 Dart 외의 다른 코드가 포함되어 있는 경우에 해당 패키지를 플러그인이라고 한다.

## 패키지 vs 플러그인

결국 정리하면, 플러그인은 패키지에 속하기 때문에 결국 패키지나 마찬가지다.

하지만 굳이 구별하자면, Dart 코드로만 이루어진 패키지를 패키지라고 부르고, Java, Kotlin, Swift, JavaScript 등 다른 코드를 포함하고 있는 패키지를 플러그인이라고 부른다.
