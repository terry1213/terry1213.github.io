---
title: "[Flutter/Web] GitHub Pages에 Flutter Web 올리는 방법"
categories:
- Flutter
tags:
- Web
---

최근 Flutter Web 작업을 다수 맡아서 진행하게 되었다. 하다보니 재미있어서 따로 공부를 시작했고, 간단하게 포트폴리오를 Flutter Web으로 만들어 봤다.

포트폴리오를 만들고 나니 어디에 올릴까 고민이 생겼다. 기존의 Flutter Web 작업물은 전부 Firebase에 올렸는데, 포트폴리오를 Firebase에 올리는 건\... 좀 아닌 거 같았다.

포트폴리오도 현재 이 블로그처럼 GitHub Pages에 올리면 좋을 것 같아서 찾아보니, Flutter Web도 GitHub Pages에 올리는 방법이 있었다. 그런데 과정이 좀 복잡해서 나중에 잊고 또 고생하지 않도록 정리해두려고 한다.

## GitHub Pages에 Flutter Web 올리는 방법

### 1. `.github/workflows` 디렉토리 생성

![](/assets/flutter/Web/github-pages/Example1.png){: width="350" height="500"}

git repository의 최상위 디렉토리에 `.github/workflows` 디렉토리를 생성한다.

### 2. `workflows` 디렉토리에 `yaml` 파일 생성

![](/assets/flutter/Web/github-pages/Example2.png){: width="350" height="500"}

workflows 디렉토리에 `yaml` 파일을 생성한다. 예시에선 `publish.yaml`으로 만들었다.

아래 내용을 복사해서 `yaml` 파일을 붙여넣는다.

``` yaml
name: Publish to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: subosito/flutter-action@v1
      - uses: erickzanardo/flutter-gh-pages@v3
      // 여기까지는 필수.
			
        with:
          workingDir: [ 'flutter project directory' ] 
```

* `branches`
	* GitHub Pages에 올릴 branch 이름이 들어간다. 만약 `main` 브랜치가 아닌 다른 브랜치를 사용하고 있다면 해당 브랜치 이름을 입력한다.
* `workingDir`
	* Flutter 프로젝트가 위치한 디렉토리를 입력한다. 현재 예시처럼 Flutter 프로젝트가 git repository의 최상위 디렉토리에 위치한 경우에는 사용하지 않는다.

### 3. `index.html`에서 base url 수정

`web` 디렉토리에 위치한 `index.html`에서 base url을 수정해야한다. 

``` html
<base href="/">
```

위와 같은 부분을 찾아서 아래처럼 레포지토리 이름을 입력한다.

``` html
<base href="/{repository}/"> 
<!-- 예시의 경우에는 <base href="/flutter_web_github_page/"> -->
```

> 이 작업을 하는 이유는 이후에 접속 url이 `https://{user_name}.github.io/{repository_name}/` 형식으로 만들어지기 때문이다. <br> base url을 변경하지 않으면 `https://{user_name}.github.io/{repository_name}/`로 접속해도 서버에선 `https://{user_name}.github.io/`에서 작업을 하기 때문에 에러가 발생한다.

### 4. Git Repository에 변경 사항 커밋

현재까지 변경한 부분들을 Git Repository에 커밋한다.

![](/assets/flutter/Web/github-pages/Example3.png){: width="300" height="300"}

커밋하고 몇 분 후 Git Repository에 `gh-pages`라는 브랜치가 새로 생긴 것을 확인할 수 있다. 만약에 생성되지 않았다면 시간이 더 필요한 것이니 조금만 더 기다리면 된다.

### 5. GitHub Pages 설정

마지막으로 GitHub Pages 설정 작업이 필요하다. 

![](/assets/flutter/Web/github-pages/Example4.png){: width="800" height="600"}

**Settings - Pages** 메뉴로 들어간다. **Source** 부분의 **branch**를 방금 새로 생성된 `gh-pages`로 선택하고 **Save**한다.

## 확인

모든 작업이 끝났다. 접속해서 확인해볼 시간이다.

url은 `https://{user_name}.github.io/{repository_name}/` 형식으로 생성된다.

예시의 경우는 <https://terry1213.github.io/flutter_web_github_page/>{:target="_blank"}로  접속하면 된다. 클릭해서 한번 확인해보자.

![](/assets/flutter/Web/github-pages/Example5.png){: width="900" height="700"}


위의 사진처럼 Flutter Web이 Github Pages에 성공적으로 올라간 것을 확인할 수 있다.


## 참고

* <https://dev.to/janux_de/automatically-publish-a-flutter-web-app-on-github-pages-3m1f>{:target="_blank"}
