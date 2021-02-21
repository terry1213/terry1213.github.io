---
title: "[HTML/Markdown] 펼치기/접기 \\<details> 태그"
categories:
- Blog
---

블로그 글을 쓰다보니까 글 쓰는 재주와 능력이 없어서 그런지 자꾸 글이 지저분해진다. 그래서 더 깔끔하게 보일 수 있는 방법이 없을까 고민하다가 `<details>` 태그를 사용해 글을 펼쳤다 접을 수 있게 해두면 조금은 괜찮아지지 않을까 생각했다.(나의 글 쓰는 능력 자체를 개선하기는 힘들 거 같아서\...ㅎㅎㅎ)

## 사용법

### 기본 사용법

``` html
<details>
 <summary> 펼치기/접기 </summary>

 <p> 내부 내용 </p>
 <!--원하는 내용을 넣으면 된다!-->

</details>
```

<details>
 <summary> 펼치기/접기 </summary>
 
 <p> 상세 내용 </p>
	
</details>

<br>

내부 내용에는 아무거나 넣을 수 있다. 테이블을 사용할 수도 있고 markdown을 사용할 수도 있다. 블로그 글을 쓸 때는 특히 markdown을 넣을 일이 많다.

### Markdown

markdown을 사용할 때는 아래와 같이 `<details>` 대신에 `<details markdown="1">`을 사용하면 된다.

``` html
<details markdown="1">
 <summary> 펼치기/접기 </summary>

## 내부 내용 제목

* 항목 1
* 항목 2

</details>
```

<details markdown="1">
 <summary> 펼치기/접기 </summary>

## 내부 내용 제목
{:.no_toc}

* 항목 1
* 항목 2

</details>
