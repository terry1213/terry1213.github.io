---
title: "[Jekyll] Magnific Popup을 통한 이미지 확대 기능 추가"
categories:
- Blog
tags:
- Tip
---

블로그에 글을 올리다 보니 몇몇 사진의 경우 확대해서 볼 수 있으면 좋겠다고 생각했다. 링크를 사용해서 간편하게 구현할 수 있지만 보는 입장에선 불편할 것 같았다. 그래서 다른 url로 이동하지 않고 게시글 내에서 확대할 수 있게 하는 방법을 찾다보니 Magnific Popup라는 것을 알게되었다.

## Magnific Popup 적용 방법

## 1. `jquery.magnific-popup.js`, `jquery.js` 파일 추가하기

### js 파일들(`jquery.magnific-popup.js`, `jquery.js`)이 이미 있는 경우

현재 나는 jekyll의 theme으로 minimal mistakes를 사용하고 있다. minimal mistakes의 경우에는 `assets/js/plugins` 디렉토리에 `jquery.magnific-popup.js` 파일과, `assets/js/vender/jquery`에 `jquery-3.5.1.js` 파일이 이미 존재한다. 혹시 자신이 사용하고 있는 theme에서 기본적으로 `jquery.magnific-popup.js`과 `jquery.js` 파일을 포함하고 있을 수 있으니 확인해보자.

해당 파일들이 이미 있어도 해야할 과정이 있다. `_config.yml` 파일의 `exclude:`을 확인해야 한다. minimal mistakes에 경우, `assets/js/plugins` 디렉토리와 `assets/js/vender` 디렉토리가 `exclude:`에 명시되어 있다. 컴파일러가 블로그 빌드 시에 `exclude:`에 적혀있는 파일과 디렉토리는 읽지 않기 때문에 해당 부분을 주석 처리했다.

``` yaml
exclude:
#  - assets/js/plugins
#  - assets/js/vendor
```

### js 파일(`jquery.magnific-popup.js`, `jquery.js`)이 없는 경우

[Magnific-Popup github 페이지](https://github.com/dimsemenov/Magnific-Popup){:target="_blank"} 에서 zip 파일을 다운 받아서 `dist` 디렉토리의 `jquery.magnific-popup.js` 파일과 `libs/jquery` 디렉토리의  `jquery.js` 파일을 본인 블로그의 `assets/js` 디렉토리에 추가한다.
## 2. `magnific-popup-setting.js` 생성

`assets/js` 디렉토리에 `magnific-popup-setting.js` 파일을 생성한다. 그리고 아래와 같은 코드를 넣는다.

``` javascript
$(document).ready(function() {

    // 2.1. id가 magnific인 경우에만 magnific-popup 적용.
    $('.page__content img[id="magnific"]').wrap( function(){
		
        // 2.2. magnific-popup 옵션 설정.
        $(this).magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            showCloseBtn: false,
            items: {
              src: $(this).attr('src')
            },
        });
				
        // 2.3. p 태그 높이를 내부 컨텐츠 높이에 자동으로 맞추기.
        $(this).parent('p').css('overflow', 'auto');
				
        // 2.4. 이미지를 감쌀 태그 설정.
        return '<a href="' + $(this).attr('src') + '" style="width:' + $(this).attr('width') +'px; float: left;"><figure> </figure>' + '<figcaption style="text-align: center;" class="caption">' + $(this).attr('alt') + '</figcaption>' + '</a>';
    });
});
```

위의 코드를 그대로 사용하는 것이 아니라 본인이 사용하고자 하는 목적과 기능에 맞게 코드를 수정해야 한다.

### 2.1. id가 magnific인 경우에만 magnific-popup 적용

내 경우에는 magnific-popup을 모든 이미지에 사용할 것이 아니라서 `img[id="magnific"]`을 사용했다. 이렇게 할 경우 `id`가 `magnific` 경우에만 magnific-popup가 적용된다. 만약 모든 이미지에 적용하고 싶다면 `[id="magnific"]`를 지운다.

### 2.2. magnific-popup  옵션 설정.

자신의 사용 목적에 맞게 magnific-popup 의 옵션을 설정한다.  옵션의 상세한 정보는 [여기서](https://dimsemenov.com/plugins/magnific-popup/documentation.html#options){:target="_blank"} 확인할 수 있다.

### 2.3. `p` 태그 높이를 내부 컨텐츠 높이에 자동으로 맞추기.

여러 이미지를 일렬로 배치할 때 이 부분을 넣지 않으면 남는 공간에 글자까지 들어와버리기 때문에 추가했다. 여러 이미지를 일렬로 배치할 필요가 없다면 해당 줄을 지운다.

### 2.4. 이미지를 감쌀 태그 설정.

`a` 태그를 사용해서 이미지를 감싼다. 이 때 여러 이미지를 일렬로 배치하기 위해 `float`를 `left`로 설정했다. 여러 이미지를 일렬로 배치할 필요가 없다면 `float: left;`를 지운다.

이미지의 `alt`을 바탕으로 `figcaption`가 생성되도록 했다. 또한 생성된 `figcaption`를 이미지 중간에 배치시키기 위해 `text-align`를 `center`로 설정했다. `figcaption`을 자동으로 생성하고 싶지 않다면 `figcaption` 태그 부분을 지운다.

## 3. `default.html` 파일에서 `script` 태그를 통한  js 파일들 참조.

`_layouts` 디렉토리에 있는 `default.html` 파일에 아래와 같은 코드를 추가한다.

``` html
<script src="assets/js/jquery.js"></script>
<script src="assets/js/jquery.magnific-popup.js"></script>
<script src="assets/js/magnific-popup-setting.js"></script>
```

## 4. 게시글에 이미지 추가

### 4.1. markdown 버전 설정 방법

``` markdown
<!--#magnific 추가--> 
![관람차](/assets/jekyll/magnific-popup/관람차.JPG){: #magnific width="220"}
![야경](/assets/jekyll/magnific-popup/야경.JPG){: #magnific width="400"}

<!--#magnific 없음--> 
![관람차](/assets/jekyll/magnific-popup/관람차.JPG){: width="220"}
![야경](/assets/jekyll/magnific-popup/야경.JPG){: width="400"}
```

이제 게시글에 평소처럼 이미지를 추가하되 magnific-popup을 적용할 곳에는 `#magnific`을 적어주면 된다.

### 4.2. html 버전 설정 방법

``` html
<!--magnific 설정--> 
<img src="/assets/jekyll/magnific-popup/관람차.JPG" width="220" id="magnific" alt="관람차">
<img src="/assets/jekyll/magnific-popup/야경.JPG" width="400" id="magnific" alt="야경">

<!--magnific 미설정--> 
<img src="/assets/jekyll/magnific-popup/관람차.JPG" width="220">
<img src="/assets/jekyll/magnific-popup/야경.JPG" width="400">
```

> img 태그를 사용해서 이미지를 올리는 경우에 어떻게 하는지 궁금해하시는 분이 계셔서 추가했습니다.

## 5. 적용 확인

### 5.1. markdown 버전 확인

![관람차](/assets/jekyll/magnific-popup/관람차.JPG){: #magnific width="220"}
![야경](/assets/jekyll/magnific-popup/야경.JPG){: #magnific width="400"}

### 5.2. html 버전 확인

<img src="/assets/jekyll/magnific-popup/관람차.JPG" width="220" id="magnific" alt="관람차">
<img src="/assets/jekyll/magnific-popup/야경.JPG" width="400" id="magnific" alt="야경">

### 5.3. 미설정 확인

![관람차](/assets/jekyll/magnific-popup/관람차.JPG){: width="220"}
![야경](/assets/jekyll/magnific-popup/야경.JPG){: width="400"}

`#magnific`을 적은 위의 두 이미지는 클릭하면 확대가 되며 이미지 하단에 `figcaption`이 생성되었다. `#magnific`를 추가 하지 않은 아래의 두 이미지는 클릭해도 아무 일도 일어나지 않는다.
