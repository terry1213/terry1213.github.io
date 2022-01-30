---
title: "[Flutter/Decoding Flutter] ViewInsets, ViewPadding, Padding"
categories:
- Flutter
tags:
- DecodingFlutter
---

## Decoding Flutter 유튜브 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/ceCo8U0XHqw?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

<br>

ViewInsets, ViewPadding, Padding. 이름만 봐서는 세가지 모두 비슷해보인다. 이 세가지가 어떤 역할을 하는지와 어떻게 다른지에 대해 알아보자.

## ViewInsets

ViewInsets는 시스템 UI로 인해 **완전히** 가려지는 부분을 의미한다. 대표적으로 키보드로 인해 가려지는 부분이 여기에 속한다.

일반적인 경우에는 값이 0이지만, 키보드가 올라오면 키보드 높이만큼 값이 올라간다.

## ViewPadding

ViewPadding은 시스템 UI로 인해 **부분적으로** 가려지는 부분을 의미한다. 시스템 상태바나 노치로 인해 가려지는 부분이 여기에 속한다.

## Padding

Padding은 ViewPadding과 굉장히 비슷하다. 시스템 UI로 인해 부분적으로 가려지는 부분을 의미하고, 시스템 상태바나 노치로 인해 가려지는 부분이 여기에 속한다. 여기까지는 ViewPadding의 설명과 정확히 동일하다. 실제로 일반적인 경우에는 Padding과 ViewPadding의 값이 똑같다.

하지만 이 둘 값에 차이가 생기는 경우가 있다. 바로 키보드가 올라왔을 때다.

예를 들어 viewPadding.bottom과 padding.bottom의 값이 둘 다 20이었다고 생각해보자. ViewPadding의 경우, 키보드가 올라와도 자신의 값을 고정적으로 가지고 있기 때문에 그대로 20이다. 하지만 Padding은 키보드가 올라오면 값이 0으로 변하게 된다.

왜 그럴까?

![](/assets/flutter/DecodingFlutter/ViewPadding-ViewInsets-Padding/Example1.png)

이는 Padding은 ViewPadding과 ViewInsets의 값에 따라서 결정되기 때문이다.

위의 그림을 보면 알 수 있겠지만 Padding = ViewPadding - ViewInsets이다. 평소에는 ViewInsets이 0이기 때문에 Padding과 ViewPadding이 같은 값을 가진다. 하지만 키보드가 올라와서 ViewInsets가 0보다 커지게 되면 Padding은 ViewPadding과 달라지게 된다.

>  Padding은 0 미만이 될 수는 없다. 따라서 ViewInsets가 켜저서 ViewPadding - ViewInsets 값이 마이너스가 되면, Padding은 0이 된다.
