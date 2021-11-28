---
title: "[Jekyll] 링크 클릭 시 새로운 탭으로 열리게 하기 (How to open a link in a new tab)"
categories:
- Blog
tags:
- Tip
---

블로그에 게시글을 쓰다 보면 외부 사이트에 대해서 링크를 달아야할 경우가 종종 있다. 실시간으로 내용이 수정되는 소스의 경우와, 타인이 직접 정성들여 정리한 소스의 경우가 그렇다. 이런 경우에는 해당 소스를 본인의 블로그에 직접 복사해서 쓸 순 없다.

## 링크 달기

사실 Jekyll에서 링크를 다는 법은 아주 간단하다.

![Example1](/assets/jekyll/How to open a link in a new tab/Example1.png){: width="400" height="100"}

상단 메뉴 중에 사슬 모양으로 되어 있는 버튼을 클릭한다.

![Example2](/assets/jekyll/How to open a link in a new tab/Example2.png){: width="80" height="100"}

클릭하면 위와 같은 라인이 생긴다. 여기서 왼쪽에는 링크를 걸어놓을 텍스트, 오른쪽에는 링크를 적으면 된다.

![Example3](/assets/jekyll/How to open a link in a new tab/Example3.png){: width="280" height="100"}

예를들어 필자의 블로그의 '태그별 게시글 목록'으로 링크를 걸어보았다. 그럼 실제 게시글에선 아래와 같이 보인다.

[태그별 게시글 목록으로 이동](/tags/)

## 새로운 탭으로 열리게 하기

그런데 다른 사람의 게시글에서 어떤 링크를 클릭했을 때 기존 탭에서 이동되는 경우가 많다. 게시글과 해당 링크를 번갈아가면서 봐야하는 경우가 훨씬 많기 때문에 기존 탭에서 이동이 된다면 계속 뒤로가기와 앞으로가기 버튼을 눌러야한다는 불편함이 생긴다. 그래서 필자는 링크를 새로운 탭으로 열리게 하는 것을 더 선호한다. 링크를 새로운 탭으로 열리게 하는 것도 간단하다.

![Example4](/assets/jekyll/How to open a link in a new tab/Example4.png){: width="350" height="100"}

기존 링크 뒤에 `{:target="\_blank"}`를 붙이기만 하면 끝이다.

[태그별 게시글 목록으로 이동](/tags/){:target="_blank"}

이 링크는 클릭했을 때 새로운 탭에서 열리는 것을 알 수 있다.
