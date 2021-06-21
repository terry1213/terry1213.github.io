---
title: "[Dart/Document] A tour of the Dart language - 16. Isolates"
categories:
- Dart
tags:
- Document
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)

# Isolates
대부분의 컴퓨터와 모바일 플랫폼은 멀티 코어 CPU를 가지고 있다. 다중 코어를 이점을 얻기 위해, 개발자는 전통적으로 동시에 실행되는 공유 메모리 쓰레드를 사용했다. 하지만 공유 상태(shared-state) 동시성은 에러가 발생하기 쉽고 복잡한 코드로 이어질 수 있다는 단점이 있다.

쓰레드를 사용하는 대신, 모든 Dart 코드는 isolate 내에서 실행된다. 각 isolate는 자체 메모리 힙(heap)을 가지고 있으며, 다른 isolate에서 해당 isolate의 상태에 접근 할 수 없다.
