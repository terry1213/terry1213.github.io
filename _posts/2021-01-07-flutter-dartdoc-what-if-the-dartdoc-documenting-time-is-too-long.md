---
title: "[Flutter] Dartdoc 실행이 너무 오래 걸린다면? (What if the dartdoc documenting time is
  too long?)"
categories:
- Flutter
tags:
- Tip
---

> 2021.06.21 업데이트: Flutter가 버전 2가 정식적으로 릴리즈하면서 해당 문제는 해결되었다.

`dartdoc`을 통한 문서화 작업을 할 때, 작성하던 주석을 직접 문서로 보고 싶을 때가 있다. 그럴 때마다 dartdoc을 실행시켜서 내가 작성한 주석이 어떻게 나오는지 확인한다.

특히 `dartdoc`은 정보가 많이 없고 `dartdoc`을 사용한 예시도 거의 찾을 수 없기 때문에, 기능을 본인이 직접 알아내야하는 경우가 많다. 따라서 dartdoc을 실행할 일이 굉장히 많아진다.

그런데 여기서 문제가 생긴다.

## 문제

**시간이 너무 오래걸린다.**

`dartdoc`을 한번 실행할 때마다 빠르면 20분에서 늦으면 30분 정도가 걸린다. 그렇게 큰 프로젝트도 아닌데 정말 시간이 오래 걸린다. 심할 때는 한 두줄 바꾼 걸 확인하기 위해 30분 기다리게 되는 것이다.

## 해결 방법
워낙 `dartdoc` 자체에 대한 정보도 적다보니까 이 문제에 대한 정보는 하나도 없었다. 스택오버플로우, dartdoc API 문서, dartdoc 깃헙까지 찾아봤지만  아무 것도 찾을 수 없었다.

그런데 알고보니 해결 방법이 정말 간단했다. 자포자기의 심정으로 시도했던 마지막 방법이 성공했다.

우선 `flutter --version`을 통해 flutter 버젼을 확인해봤다.

{% highlight console%}
Flutter 1.22.5 • channel stable • https://github.com/flutter/flutter.git
Framework • revision 7891006299 (4주 전) • 2020-12-10 11:54:40 -0800
Engine • revision ae90085a84
Tools • Dart 2.10.4
{% endhighlight %}

채널은 **stable**이고 버젼은 **1.22.5**이다.

이미 **1.22.5**은  **stable**에서 최신 버전이다.

더 높은 버전을 사용하기 위해 `flutter channel beta`를 사용해서 채널을 beta로 바꾼다.

{% highlight console%}
Switching to flutter channel 'beta'...
git: https://github.com/flutter/flutter URL에서
git:    fdab8546a0..655cd1e2a6  master     -> origin/master
git: 'beta' 브랜치로 전환합니다
git: 브랜치가 'origin/beta'에 맞게 업데이트된 상태입니다.
Successfully switched to flutter channel 'beta'.
To ensure that you're on the latest build from this channel, run 'flutter upgrade'
{% endhighlight %}

채널 전환 후 `flutter upgrade`를 통해 최신 버젼으로 업그레이드한다.

{% highlight console%}
Downloading Dart SDK from Flutter engine 92ae191c17a53144bf4d62f3863c110be08e3fd3...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  174M  100  174M    0     0   852k      0  0:03:29  0:03:29 --:--:-- 1591k
Building flutter tool...
Flutter is already up to date on channel beta
Flutter 1.25.0-8.2.pre • channel beta • https://github.com/flutter/flutter.git
Framework • revision b0a2299859 (2일 전) • 2021-01-05 12:34:13 -0800
Engine • revision 92ae191c17
Tools • Dart 2.12.0 (build 2.12.0-133.2.beta)
{% endhighlight %}

**1.25.0-8.2.pre** 버젼이 되었다.

이 상태에서 `dartdoc`을 실행하니 20분~30분 걸렸던 작업이 단 3분 만에 끝났다\...

만약 같은 이유로 고생하고 있는 사람이 있다면 이 글을 보고 해결할 수 있길 바란다.
## 원인
어떤 문서나 다른 사람의 글을 통해서 문제를 해결한 것이 아니라서 정확한 원인은 모르겠다.

하지만 추측을 해보면 flutter가 beta 버젼에서 웹을 지원하는 것과 연관이 있지 않을까 싶다. 결국 `dartdoc`도 웹이니까 말이다.

정확한 원인을 모르고 넘어가는 게 찝찝하긴 하지만 그래도 문제가 해결되어서 다행이다. 정확한 원인은 좀 더 알아봐야겠다.
