---
title: 완주하지 못한 선수 [프로그래머스] [해시] [Level 1]
categories:
- Programmers
tags:
- 코딩문제
- JavaScript
---

## 문제 설명

수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.

마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

## 제한사항

* 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
* completion의 길이는 participant의 길이보다 1 작습니다.
* 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
* 참가자 중에는 동명이인이 있을 수 있습니다.

## 입출력 예



| participant | completion | return |
| -------- | -------- | -------- |
| ["leo", "kiki", "eden"]     | ["eden", "kiki"]     | "leo"     |
| -------- | -------- | -------- |
| ["marina", "josipa", "nikola", "vinko", "filipa"] | ["josipa", "filipa", "marina", "nikola" | "vinko" |
| -------- | -------- | -------- |
| ["mislav", "stanko", "mislav", "ana"] | ["stanko", "ana", "mislav"] | "mislav" |


## 입출력 예 설명

예제 #1 <br>
leo는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #2 <br>
vinko는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

예제 #3 <br>
mislav는 참여자 명단에는 두 명이 있지만, 완주자 명단에는 한 명밖에 없기 때문에 한명은 완주하지 못했습니다.

## 알고리즘

해시: 해시는 **Key-value쌍**으로 데이터를 저장하는 자료구조

## 접근 방식 및 풀이

완주하지 못한 선수는 한명뿐이다. 그렇기 때문에 계산 과정은 굉장히 쉬워진다.

우선 참여자 명단과 완주자 명단을 알파벳 순서로 정렬한다. 그리고 처음 선수부터 하나하나씩 비교하여 양쪽 이름이 같으면 다음으로 넘어간다. 만약 양쪽 이름이 다르면 그때 참여자 명단에 쪽의 선수가 완주하지 못한 선수다. 순서대로 정렬했기 때문에 해당 선수가 완주를 했다면 같은 순서에 완주자 명단에도 해당 선수의 이름이 있어야 하기 때문이다.

## 코드
문제 풀이에 사용한 언어: 자바스크립트(JavaScript)

{% highlight javascript %}
function solution(participant, completion) {
    participant.sort(); // 정렬
    completion.sort(); // 정렬
    
    for(var i = 0; i < participant.length; i++){
        if(participant[i] != completion[i]) // 만약 정렬된 두 명단의 선수가 다르다면
            return participant[i]; // 해당 선수가 완주하지 못한 선수
    }
}
{% endhighlight %}
