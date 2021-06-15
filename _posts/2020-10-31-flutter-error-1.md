---
title: '[Flutter] "/path/to/Runner.app: resource fork, Finder information, or similar
  detritus not allowed" 에러'
categories:
- Flutter
tags:
- Error
---

Flutter를 통해 개발하다보면 현재까지 개발한 어플이 어떻게 돌아갈지 궁금할 때가 있다. 그럴 때마다 어플을 빌드하고 시뮬레이터를 통해 돌려봐야한다. 그런데 가끔 빌드 과정에서 다음과 같은 에러가 뜰 때가 있다.

## 에러 내용

![/path/to/Runner.app: resource fork, Finder information, or similar detritus not allowed](/assets/flutter/Error/resource fork, Finder information, or similar detritus not allowed.png)

## 원인

해당 에러는 iOS 10, macOS Sierra, watchOS 3, and tvOS 10 과 함께 보안 강화가 되고 나서부터 생기는 에러이다. 이는 우리가 실행시키고자 하는  Runner.app에 할당된 attribute들 때문이다. 현재 할당되어 있는 attribute들은 아래의 명령어를 통해 확인할 수 있다.

{% highlight shell %}
xattr -lr /path/to/Runner.app
{% endhighlight %}

여기서 l은 선택한 파일(지금의 경우는 Runner.app)의 attribute를 나열해주는 기능이다. r은 선택한 파일이 디렉토리일 경우에 같은 과정을 하위 파일에서도 반복하는 기능이다. 

위의 명령어는 단지 Runner.app에 할당된 attribute들을 확인하는 과정이므로 꼭 실행하지 않아도 된다.

## 해결 방법

해결 방법은 간단하다. 아래의 명령어를 통해 할당되어 있는 attribute들을 없애면 된다. 

{% highlight shell %}
xattr -cr /path/to/Runner.app
{% endhighlight %}

여기서 c는 선택한 파일의 attrubute를 삭제하는 기능을 나타낸다.

 위와 같은 과정 이후 어플을 다시 실행해보면 정상적으로 빌드되는 것을 볼 수 있다.
