---
title: "[Apache Tomcat] 아파치 톰캣 서버 포트 변경하는 방법 (How to change the port number)"
categories:
- Apache
tags:
- Web
- Server
---

아파치 톰캣 서버에서 포트를 변경하는 방법에 대해서 정리해보고자 한다. 

아파치 톰캣에서는 기본적으로 **8080** 포트를 사용한다. 예를 들어 현재 운영하는 아파치 톰캣 서버의 주소가 http://yourApacheTomcatServer.com/ 라고 가정해보자. 만약 주소창에 저렇게만 치면 접속이 되지 않을 것이다. http://yourApacheTomcatServer.com:8080 이라고 뒤에 포트 번호를 적어야 연결이 될 것이다.

그런데 생각해보면 저렇게 뒤에 포트 넘버를 적어야 접속이 되는 사이트는 없다. 그럼 다른 사이트들는 포트를 사용하지 않는 것일까? 아니다. http 접속은 80 포트, https 접속은 443 포트가 기본 포트인데 다른 사이트들은 이 기본 포트들을 사용하기 때문에 따로 명시하지 않는 것이다. 실제로 https://www.naver.com 뒤에 :443을 붙이고 접속하면 기본 포트이기 때문에 :443이 자동으로 없어지며 접속된다.

## 포트 변경 (Apache Tomcat 8.5 사용)

우리의 사이트도 보기 싫은 :8080 딱지를 떼보자.

우선 아파치 톰캣이 설치되어 있는 디렉토리로 들어간다.

![Example1](/assets/apache tomcat/change port number/Example1.png){: width="490" height="100"}

`conf` 디렉토리로 들어간다.

![Example2](/assets/apache tomcat/change port number/Example2.png)

`conf` 디렉토리 안에 있는 `server.xml` 파일을 연다.

![Example3](/assets/apache tomcat/change port number/Example3.png){: width="400" height="100"}

 `server.xml` 파일에서 위와 같은 부분을 찾아서 `port`를 `80`으로 바꿔준다.

## 변경 확인

파일 저장 후 나와서 아파치 톰캣 서버를 재시작한다.

`http://yourApacheTomcatServer.com/`로 접속 시 정상적으로 사이트가 뜬다면 포트 넘버가 성공적으로 변경된 것이다.
