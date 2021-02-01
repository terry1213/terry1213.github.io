---
title: "[프로그래머스] 타겟 넘버 - 깊이/너비 우선 탐색(DFS/BFS) Level 2"
categories:
- Programmers
tags:
- JavaScript
- 코딩문제
---

## 문제 설명

n개의 음이 아닌 정수가 있습니다. 이 수를 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.

```
-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3
```

사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.

## 제한사항

* 주어지는 숫자의 개수는 2개 이상 20개 이하입니다.
* 각 숫자는 1 이상 50 이하인 자연수입니다.
* 타겟 넘버는 1 이상 1000 이하인 자연수입니다.

## 입출력 예

| numbers         	| target 	| return 	|
|-----------------	|--------	|--------	|
| [1, 1, 1, 1, 1] 	| 3      	| 5      	|

## 접근 방식 및 풀이

재귀 함수(Recursive Function)를 사용하여 풀었다.

맨 앞의 숫자부터 차례대로 계산을 진행하기 위해 `i`을 `0`으로 설정하여 `cal` 함수를 부른다.

`cal`함수의 계산은 이렇다. `i`번째 숫자를 `cur`에 더하는 경우와 빼는 경우 두가지로 나누어 다음 숫자인 `i+1`으로 넘긴다. 이렇게 `cal` 함수 호출을 반복하여 마지막 숫자까지 오면 지금까지 계산한 숫자가 `target`과 같은지를 확인한다. 만약 `target`과 같다면 target을 만드는 방법 중 하나이므로 이를 카운트한다. 이런 식으로 계산하면 각 숫자마다 더하는 경우와 빼는 경우를 고려했기 때문에 모든 경우에 대해서 확인을 할 수 있다. 결국 target을 만드는 모든 방법의 수를 구할 수 있는 것이다.

## 코드

문제 풀이에 사용한 언어: 자바스크립트(JavaScript)

``` javascript
function solution(numbers, target) {
    return cal(numbers, target, 0, 0);
}

function cal(numbers, target, i, cur){
    if(i == numbers.length)
        return cur == target ? 1 : 0;
    
    return cal(numbers, target, i + 1, cur + numbers[i]) + cal(numbers, target, i + 1, cur - numbers[i]);
}
```
