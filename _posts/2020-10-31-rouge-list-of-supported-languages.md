---
title: "[Rouge] 지원하는 언어 리스트 (List of supported languages)"
categories:
- Blog
tags:
- Rouge
- Jekyll
---

블로그를 작성할 때 자주 사용하는 것이 Rouge이다. Rouge를 통해 다양한 언어의 코드를 보기 좋게 하이라이트(highlight) 할 수 있기 때문이다. 그런데 내가 지금까지 블로그에 사용했던 언어 종류만 봐도 C, JavaScript, Swift, Dart, Shell 5가지가 된다. 새로운 언어를 사용할 때마다 이 언어를 Rouge에서 지원해주는지 검색하는 과정이 귀찮았다.

여러번 찾다보니 Rouge 측에서 제공해주는 Wiki가 있다는 것을 알게 되었다.

[Rouge가 지원하는 언어 리스트](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers){:target="_blank"}

위 링크를 통해 들어가면 Rouge가 제공하는 모든 언어들을 볼 수 있다. Rouge 측에서 리스트를 수정할 때도 있기 때문에 따로 이 게시글에는 적어두지 않지만 JavaScript를 예를 들어서 설명하겠다.

javascript: JavaScript, the browser scripting language [aliases: js]

에서 : 를 기준으로 오른쪽에 있는 설명을 보고 해당 언어를 사용하고 싶다면 :의 왼쪽 부분을 복사해서 아래의 색칠된 부분에 넣는다.

![Example1](/assets/jekyll/Rouge/Example1.png){: width="200" height="100"}

그럼 아래와 같은 결과를 볼 수 있다.

{% highlight javascript %}
var language = "JavaScript"
{% endhighlight %}
