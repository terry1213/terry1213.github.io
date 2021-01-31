---
title: "[프로그래머스] H-Index - 정렬 Level 2"
categories:
- Programmers
tags:
- JavaScript
- 코딩문제
---

## 문제 설명

H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다. 어느 과학자의 H-Index를 나타내는 값인 h를 구하려고 합니다. 위키백과1에 따르면, H-Index는 다음과 같이 구합니다.

어떤 과학자가 발표한 논문 `n`편 중, `h`번 이상 인용된 논문이 `h`편 이상이고 나머지 논문이 `h`번 이하 인용되었다면 h의 최댓값이 이 과학자의 H-Index입니다.

어떤 과학자가 발표한 논문의 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때, 이 과학자의 H-Index를 return 하도록 solution 함수를 작성해주세요.

## 제한사항

* 과학자가 발표한 논문의 수는 1편 이상 1,000편 이하입니다.
* 논문별 인용 횟수는 0회 이상 10,000회 이하입니다.

## 입출력 예

| citations       	| return 	|
|-----------------	|--------	|
| [3, 0, 6, 1, 5] 	| 3      	|

## 입출력 예 설명

이 과학자가 발표한 논문의 수는 5편이고, 그중 3편의 논문은 3회 이상 인용되었습니다. 그리고 나머지 2편의 논문은 3회 이하 인용되었기 때문에 이 과학자의 H-Index는 3입니다.

## 접근 방식 및 풀이

우선 `.sort((a,b) => b - a)`를 사용해서 많이 인용된 논문 순으로 정렬한다. 정렬된 `citations`의 앞에서부터 차례로 `citations[i]`(`i+1`번째 숫자)가 `i+1` 이상인지를 확인한다. `citations[i]`가 `i+1` 이상이라면 `i+1`를 `hIndex`에 저장한다. 하지만 아직 더 높은 `hIndex`가 나올 수 있으므로 다음으로 넘어간다. 이런 식으로 반복하다가 `citations[i]`가 `i+1`보다 작은 경우가 나온다면, 해당 시점 직전에 저장한 `hIndex`가 정답이되므로 계산을 중지한다.

## 코드

문제 풀이에 사용한 언어: 자바스크립트(JavaScript)

``` javascript
function solution(citations) {
    var hIndex = 0;
    citations.sort((a,b) => b - a);
    
    for(let i = 0; i < citations.length; i++){
        if(i + 1 <= citations[i])
            hIndex = i + 1;
        else
            break;
    }
    
    return hIndex;
}
```
