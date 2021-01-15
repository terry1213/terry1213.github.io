---
title: "[Flutter] Firebase Cloud Function 정리"
categories:
- Flutter
- Firebase
tags:
- Mobile
---

# Cloud Function

Firebase의 Cloud Function은 Firebase 기능과 HTTPS 요청에 의해 발생한 이벤트에 반응하는 백엔드 코드를 서버 없이 실행시키는 프레임워크이다.  Google cloud에 저장된 JavaScript 혹은 TypeScript 코드에 대해 따로 관리하고 서버를 구축할 필요가 없다.

## 주요 기능

| -------- | -------- |
| Firebase 플랫폼 통합 | Cloud Function을 통해 Firebase의 다양한 곳에서 발생하는 이벤트에 대해 반응할 수 있다.     |
| 유지보수 불필요 | 명령어 하나로 JavaScript, TypeScript 코드를 서버에 배포할 수 있다. 그러면 Firebase가 자동으로 유저의 사용 패턴에 맞춰서 리소스를 확장한다. 증명서, 서버 구성, 새로운 서버 준비, 이전 서버 해제 등을 생각할 필요가 없다.|
| 코드 비공개  | Cloud Function은 클라이언트 쪽으로부터 완전히 독립되므로 비공개 상태로 동작한다. |

## 동작 방법

작성한 function을 배포하고 나면 Google 서버는 즉시 function을 관리하기 시작한다. 앱에서 HTTP 요청을 보내 직접 function을 실행하기도 하고, backgournd function의 경우에는 Google 서버가 이벤트를 듣고 있다가 발생한 이벤트에 해당하는 function을 실행한다.

### background function의 생명 주기

1. 새로운 function의 코드를 작성할 때, 이벤트 제공자(Cloud Firestore 등)를 선택하고 function을 실행할 조건을 정의한다.
2. function을 배포한다.
	1.  Firebase CLI로 function 코드의 .zip 파일을 생성한 후, Firebase 프로젝트의 Storage 버킷('gcf-sources'로 시작하는)에 업로드한다.
	2.  Cloud Build는 function 코드를 검색하고 function 소스를 빌드한다.
	3.  빌드된 function 코드의 컨테이너 이미지가 프로젝트의 비공개 Container Registry 저장소에 업로드되며 function이 준비작업이 끝난다.
3. 이벤트 제공자가 이벤트를 생성하면 그에 해당하는 function을 호출한다.
4. function이 여러 이벤트를 처리하는 중이라면 Google은 작업 속도를 높이기 위해 인스턴스를 더 생성한다. function이 처리할 이벤트가 없게 되면 인스턴스를 정리한다.
5. 업데이트된 코드를 배포하여 함수를 업데이트하면, Storage 및 Container Registry(빌드 관련)이 정리되고 이전 버전의 인스턴스는 새 인스턴스로 교체된다.
6. function를 삭제하면 Storage 및 Container Registry(빌드 관련)이 정리되고 모든 인스턴스 및 zip 파일이 삭제된다. function과 이벤트 제공자 간의 연결이 끊어진다.

background function를 직접  HTTP 요청 또는 클라이언트의 호출을 통해서도 사용할 수 있다.

## 구현 단계

|1단계|Cloud Functions 설정|Firebase CLI를 설치하고 Firebase 프로젝트의 Cloud Functions를 초기화한다.|
|2단계|function 작성|이벤트를 처리할 function을 JavaScript 혹은 TypeScript로 작성한다.|
|3단계|function 테스트|로컬 에뮬레이터를 통해 function을 테스트한다.|
|4단계|배포 및 모니터링|Firebase CLI를 사용하여 프로젝트에 결제를 사용 설정하고 함수를 배포한다. Firebase Console을 사용하여 로그를 확인하고 검색할 수 있다.|
