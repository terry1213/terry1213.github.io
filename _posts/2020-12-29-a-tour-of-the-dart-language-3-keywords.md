---
title: "[Dart] A tour of the Dart language - 3. Keywords"
categories:
- Dart
tags:
- Mobile
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)
# Keywords

아래 테이블의 단어들은 Dart 언어가 다른 단어와 다르게 생각한다.

| abstract <sup>2</sup>  	| else         	| import <sup>2</sup>    	| super     	|
| as <sup>2</sup>        	| enum         	| in          	| switch    	|
| assert      	| export <sup>2</sup>     	| interface <sup>2</sup> 	| sync <sup>1</sup>    	|
| async <sup>1</sup>     	| extends      	| is          	| this      	|
| await <sup>3</sup>     	| extension <sup>2</sup>  	| library <sup>2</sup>   	| throw     	|
| break       	| external <sup>2</sup>   	| mixin <sup>2</sup>     	| true      	|
| case        	| factory <sup>2</sup>    	| new         	| try       	|
| catch       	| false        	| null        	| typedef <sup>2</sup> 	|
| class       	| final        	| on <sup>1</sup>        	| var       	|
| const       	| finally      	| operator <sup>2</sup>  	| void      	|
| continue    	| for          	| part <sup>2</sup>      	| while     	|
| covariant <sup>2</sup> 	| Function <sup>2</sup>   	| rethrow     	| with      	|
| default     	| get <sup>2</sup>        	| return      	| yield 3   	|
| deferred <sup>2</sup>  	| hide <sup>1</sup>       	| set <sup>2</sup>       	|           	|
| do          	| if           	| show <sup>1</sup>      	|           	|
| dynamic <sup>2</sup>   	| implements <sup>2</sup> 	| static <sup>2</sup>    	|           	|

해당 키워드들을 identifier로 사용하는 것을 피해야 한다. 하지만 만약 필요하다면 표시된 키워드들은 identifier로 사용할 수 있다.

* 1번 표시가 되어 있는 단어는 contextual keyword이다. 이 단어들은 특정 장소에서만 의미를 갖는다. 때문에 모든 곳에서 identifier로 사용할 수 있다.
* 2번 표시가 되어 있는 단어는 built-in identifier이다. JavaScript 코드를 Dart로 가져오는 작업을 단순화하기 위해 사용되는 이 단어들은 대부분의 장소에서  identifier로 사용할 수 있다. 하지만 클래스나 타입 이름, 그리고 import prefix로 사용할 수 없다.
* 3번 표시가 되어 있는 단어는 Dart의 1.0 릴리스 이후에 추가된 비동기 지원(asynchrony support)에 관련된 더 새롭고 제한된 reserved word이다. `async`, `async*`, `sync`가 표시된 function body에선 `await` 이나 `yeild`를 identifier로 사용할 수 없다.
