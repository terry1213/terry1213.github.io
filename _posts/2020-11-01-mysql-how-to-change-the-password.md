---
title: "[MySQL] 비밀번호 변경 방법 (How to change the password)"
categories:
- MySQL
tags:
- Database
---

이번에는 MySQL 비밀번호 변경 방법에 대해서 정리해보자.

필자는 학부생이라서 조그마한 프로젝트들만 진행해봤을 뿐이다. 현업에 대해서는 하나도 모르지만 필자가 했던 프로젝트들에선 MySQL을 정말 많이 사용했었다. 그런데 한동안 MySQL을 사용하지 않다가 오랜만에 사용하려고 하면 매번 계정의 비밀번호가 기억이 나질 않는다. 사실 이 글을 쓰게 된 계기도 이번에 오랜만에 기존 프로젝트 데이터베이스에 접속하려는데 비밀번호를 잊어버려서 고생했기 때문이다.

## MySQL 비밀번호 변경

{% highlight shell %}
mysql -u root -p
{% endhighlight %}

mysql 에 root 계정으로 접속한다.

{% highlight sql %}
USE mysql
{% endhighlight %}

mysql 데이터베이스를 선택한다.

{% highlight sql %}
SHOW TABLES;
{% endhighlight %}

![Example1](/assets/mysql/change password/Example1.png){: width="150" height="150"}

많은 테이블 중에 user 테이블에서 비밀번호를 변경할 수 있다.

{% highlight sql %}
ALTER user '비밀번호를 변경할 계정의 아이디'@'localhost' IDENTIFIED WITH mysql_native_password BY '변경할 비밀번호';
{% endhighlight %}

이렇게 입력하면 비밀번호가 변경되게 된다.

{% highlight sql %}
FLUSH PRIVILEGES;
{% endhighlight %}

변경이 되었다고 바로 나가면 안 된다. "FLUSH PRIVILEGES;"를 통해 변경사항을 저장을 하고 나가야 한다.

{% highlight sql %}
exit
{% endhighlight %}

여기까지 진행하면 비밀번호 변경이 완료되었다. 변경한 비밀번호로 접속이 되는지 확인해보자.
