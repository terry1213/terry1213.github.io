---
title: "[Dart] A tour of the Dart language - 7. Operators"
categories:
- Dart
tags:
- Document
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)
# Operators

Dart는 다음 표에 나와있는 operator들을 지원한다. 여러 연산자들은 클래스 맴버로 구현할 수 있다.

| Description              	| Operator                                                       	|
|--------------------------	|----------------------------------------------------------------	|
| unary postfix            	| expr++    expr--    ()    []    .    ?.                        	|
| unary prefix             	| -expr    !expr    ~expr    ++expr    --expr      await expr    	|
| multiplicative           	| *    /    %  ~/                                                	|
| additive                 	| +    -                                                         	|
| shift                    	| <<    >>    >>>                                                	|
| bitwise AND              	| &                                                              	|
| bitwise XOR              	| ^                                                              	|
| bitwise OR               	| \|                                                             	|
| relational and type test 	| >=    >    <=    <    as    is    is!                          	|
| equality                 	| ==    !=                                                       	|
| logical AND              	| &&                                                             	|
| logical OR               	| \|\|                                                           	|
| if null                  	| ??                                                             	|
| conditional              	| expr1 ? expr2 : expr3                                          	|
| cascade                  	| ..                                                             	|
| assignment               	| =    *=    /=   +=   -=   &=   ^=   etc.                       	|

operator를 사용하면 expression을 만들 수 있다. 아래는 operator expression의 몇가지 예이다.

{% highlight dart %}
a++
a + b
a = b
a == b
c ? a : b
a is T
{% endhighlight %}

operator 표에서 각 operator는 다음 줄의 operator보다 우선 순위가 높다. 예를 들어 `%` operator는 `==` operator보다 우선 순위가 높고 `==` operator는 `&&` operator보다 우선 순위가 높다. 이런 우선 순위는 아래 두 줄의 코드가 똑같이 실행된다는 것을 말한다.

{% highlight dart %}
// 괄호는 가독성을 높여준다.
if ((n % i == 0) && (d % i == 0)) ...

// 읽기는 더 힘들지만 위와 같다.
if (n % i == 0 && d % i == 0) ...
{% endhighlight %}

## Arithmetic operators
Dart는 다음 표에서 볼 수 있듯이 일반적인 arithmetic operator를 지원해준다.

| Operator 	| Meaning                                                                  	|
|----------	|--------------------------------------------------------------------------	|
| +        	| Add                                                                      	|
| –        	| Subtract                                                                 	|
| -expr    	| Unary minus, also known as negation (reverse the sign of the expression) 	|
| *        	| Multiply                                                                 	|
| /        	| Divide                                                                   	|
| ~/       	| Divide, returning an integer result                                      	|
| %        	| Get the remainder of an integer division (modulo)                        	|

아래는 arithmetic operator의 예시이다.

{% highlight dart %}
assert(2 + 3 == 5);
assert(2 - 3 == -1);
assert(2 * 3 == 6);
assert(5 / 2 == 2.5); // Result is a double
assert(5 ~/ 2 == 2); // Result is an int
assert(5 % 2 == 1); // Remainder

assert('5/2 = ${5 ~/ 2} r ${5 % 2}' == '5/2 = 2 r 1');
{% endhighlight %}

Dart는 prefix, postfix increment operator와  prefix, postfix decrement operator를 모두 지원한다.

| Operator 	| Meaning                                     	|
|----------	|---------------------------------------------	|
| ++var    	| var = var + 1 (expression value is var + 1) 	|
| var++    	| var = var + 1 (expression value is var)     	|
| --var    	| var = var – 1 (expression value is var – 1) 	|
| var--    	| var = var – 1 (expression value is var)     	|

아래는 prefix, postfix increment operator와  prefix, postfix decrement operator의 예시이다.

{% highlight dart %}
var a, b;

a = 0;
b = ++a; // b에 값을 할당하기 전에 increment 된다.
assert(a == b); // 1 == 1

a = 0;
b = a++; // b에 값을 할당한 후에 increment 된다.
assert(a != b); // 1 != 0

a = 0;
b = --a; // b에 값을 할당하기 전에 decrement 된다.
assert(a == b); // -1 == -1

a = 0;
b = a--; // b에 값을 할당한 후에 decrement 된다.
assert(a != b); // -1 != 0
{% endhighlight %}

## Equality and relational operators
아래의 표에는 equality와 reational operator가 나와있다.

| Operator 	| Meaning                     	|
|----------	|-----------------------------	|
| ==       	| Equal; see discussion below 	|
| !=       	| Not equal                   	|
| >        	| Greater than                	|
| <        	| Less than                   	|
| >=       	| Greater than or equal to    	|
| <=       	| Less than or equal to       	|

x 오브젝트와 y 오브젝트가 동일한 것을 나타내는지 테스트하기 위해서 `==` operator를 사용한다. (드물게 두 오브젝트가 정확히 같은 오브젝트인지 확인해야 하는 경우에는 identical() 함수를 대신 사용한다.) `==` operator가 어떻게 작동하는 방식은 아래와 같다.

1. 만약 x나 y가 null일 때, 둘 다 null 이라면 true를, 하나만 null이라면 false를 리턴한다.
2.  `x.==(y)` 메소드의 결과를 리턴한다. (여기서 `==` 같은 operator는 첫번째 operand에서 호출된다는 것을 알 수 있다.)

아래는 equality와 reational operator의 사용 예시이다.

{% highlight dart %}
assert(2 == 2);
assert(2 != 3);
assert(3 > 2);
assert(2 < 3);
assert(3 >= 3);
assert(2 <= 3);
{% endhighlight %}

## Type test operators
`as`, `is`, `is!` operator는 런테임에 타입을 체크하는 간편한 방법이다.

| Operator 	| Meaning                                          	|
|----------	|--------------------------------------------------	|
| as       	| Typecast (also used to specify library prefixes) 	|
| is       	| True if the object has the specified type        	|
| is!      	| False if the object has the specified type       	|

`obj`가 `T`에 의해 명시된 인터페이스를 구현한다면 `obj is T` 의 결과는 true가 된다. 예를 들어 `obj is Object`는 항상 true이다.

`as` operator는 object를 특정한 타입으로 cast하기 위해서 사용한다. 이때 object가 확실히 해당 타입인 경우에만 사용해라.

{% highlight dart %}
(emp as Person).firstName = 'Bob';
{% endhighlight %}

만약 object가 `T` 타입인지 확신하지 못한다면, object를 사용하기 전에 `is T`를 통해 타입을 확인해라.

{% highlight dart %}
if (emp is Person) {
  // 타입 확인
  emp.firstName = 'Bob';
}
{% endhighlight %}

> Note: 위의 두 코드는 같지 않다. 만약 `emp`가 null이거나 `Person`이 아니라면 첫번째 예시는 exception을 던지지만 두번째 예시는 아무것도 하지 않는다.

## Assignment operators
이전에 이미 봤듯이 `=` operator를 통해 값을 할당할 수 있다. 만약 할당될 변수가 null일 때만 할당을 하고 싶다면 `??=` operator를 사용한다.

{% highlight dart %}
// a에 값을 할당.
a = value;
// 만약 b가 nul이라면 값을 할당, 아니라면 b는 그대로 둔다.
b ??= value;
{% endhighlight %}

`+=` 같은 compound assignment operator는 할당(assignment)와 operation을 결합한 것이다.

| =  	| –= 	| /=  	| %=  	| >>= 	| ^=  	|
| += 	| *= 	| ~/= 	| <<= 	| &=  	| \|= 	|

compound assignment operator는 아래와 같이 작동한다.

|                     	| Compound assignment 	| Equivalent expression 	|
|---------------------	|---------------------	|-----------------------	|
| For an operator op: 	| a op= b             	| a = a op b            	|
| Example:            	| a += b              	| a = a + b             	|

아래의 예시는 assignment operator와 compound assignment operator를 사용한다.

{% highlight dart %}
var a = 2; // =를 사용해서 할당.
a *= 3; //  할당하고 곱한다. a = a * 3
assert(a == 6);
{% endhighlight %}

## Logical operators
logical operator를 사용해 boolean expression을 반전시키거나 결합할 수 있다.

| Operator 	| Meaning                                                                  	|
|----------	|--------------------------------------------------------------------------	|
| !expr    	| inverts the following expression (changes false to true, and vice versa) 	|
| \|\|     	| logical OR                                                               	|
| &&       	| logical AND                                                              	|

아래는 logical operator를 사용한 예시이다.

{% highlight dart %}
var a = 2; // =를 사용해서 할당.
if (!done && (col == 0 || col == 3)) {
  // 코드...
}
{% endhighlight %}

## Bitwise and shift operators
Dart에서 숫자의 각 비트를 조작할 수 있다. 일반적으로 이런 bitwise operator와 shift operator를 integer와 사용한다.

| Operator 	| Meaning                                               	|
|----------	|-------------------------------------------------------	|
| &        	| AND                                                   	|
| \|       	| OR                                                    	|
| ^        	| XOR                                                   	|
| ~expr    	| Unary bitwise complement (0s become 1s; 1s become 0s) 	|
| <<       	| Shift left                                            	|
| >>       	| Shift right                                           	|

아래는 bitwise operator와 shift operator의 예시이다.

{% highlight dart %}
final value = 0x22;
final bitmask = 0x0f;

assert((value & bitmask) == 0x02); // AND
assert((value & ~bitmask) == 0x20); // AND NOT
assert((value | bitmask) == 0x2f); // OR
assert((value ^ bitmask) == 0x2d); // XOR
assert((value << 4) == 0x220); // Shift left
assert((value >> 4) == 0x02); // Shift right
{% endhighlight %}

## Conditional expressions
Dart에는 if-else statement를 대신해서 간결하게 사용할 수 있는 두가지 operator가 있다.

`condition ? expr1 : expr2`

만약 condition이 true라면 expr1의 값을 리턴하고, false라면 expr2의 값을 리턴한다.

`expr1 ?? expr2`

만약 expr1이 null이 아니라면 expr의 값을 리턴하고, null이라면 expr2의 값을 리턴한다.

booleam expression에 기반해서 값을 할당하고 싶다면 `?:`을 사용해라.

{% highlight dart %}
var visibility = isPublic ? 'public' : 'private';
{% endhighlight %}

만약 null 확인을 위한 boolean expression 테스트라면 `??`을 사용해라.

{% highlight dart %}
String playerName(String name) => name ?? 'Guest';
{% endhighlight %}

위의 예시는 간결하진 않은 두가지 다른 방법으로도 쓰일 수 있다.

{% highlight dart %}
// :? opereator를 사용하는 거보다 살짝 긴 버전.
String playerName(String name) => name != null ? name : 'Guest';

// if-else statement를 사용하는 많이 긴 버전.
String playerName(String name) {
  if (name != null) {
    return name;
  } else {
    return 'Guest';
  }
}
{% endhighlight %}

## Cascade notation (..)
cascade(`..`)는 같은 오브젝트에 대해서 operation의 나열을 만들 수 있게 한다. 함수 호출에 더해서 같은 오브젝트에 있는 field들에 접근할 수 있다. 이를 통해 일시적인 변수를 만드는 작업을 생략할 수 있고 유동적인 코드를 작성할 수 있다.

아래의 예시를 보자.

{% highlight dart %}
querySelector('#confirm') // 오브젝트를 가져온다.
  ..text = 'Confirm' // 가져온 오브젝트의 맴버를 사용한다.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
{% endhighlight %}

첫 메소드 호출인 `querySelector()`는 selector 오브젝트를 리턴한다. cascade 표기 이후에 나오는 코드는 이 selector 오브젝트에서 실행되고 리턴될 수 있는 후속 값들은 무시한다.

위의 예시는 아래 예시와 같다.

{% highlight dart %}
var button = querySelector('#confirm');
button.text = 'Confirm';
button.classes.add('important');
button.onClick.listen((e) => window.alert('Confirmed!'));
{% endhighlight %}

cascade를 nest할 수도 있다.

{% highlight dart %}
final addressBook = (AddressBookBuilder()
      ..name = 'jenny'
      ..email = 'jenny@example.com'
      ..phone = (PhoneNumberBuilder()
            ..number = '415-555-0100'
            ..label = 'home')
          .build())
    .build();
{% endhighlight %}

실제 오브젝트를 리턴하는 함수에 cascade를 사용해야한다는 것을 명심해라. 예를 들어 아래와 같은 코드는 실패한다.

{% highlight dart %}
var sb = StringBuffer();
sb.write('foo')
  ..write('bar'); // Error: 'write'메소드는 'void'에 정의되어있지 않다.
{% endhighlight %}

sb.write()는 void를 리턴한다. void에는 cascade를 사용할 수 없다.

> **Note**: 엄밀히 따지면 cascade를 위한 `..` 표기는 operator가 아니다. 단지 Dart syntax의 일부이다.

## Other operators
남은 operator 대부분은 다른 예시들에서 볼 수 있다.

| Operator 	| Name                      	| Meaning                                                                                                                                                                   	|
|----------	|---------------------------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| ()       	| Function application      	| Represents a function call                                                                                                                                                	|
| []       	| List access               	| Refers to the value at the specified index in the list                                                                                                                    	|
| .        	| Member access             	| Refers to a property of an expression; example: foo.bar selects property bar from expression foo                                                                          	|
| ?.       	| Conditional member access 	| Like ., but the leftmost operand can be null; example: foo?.bar selects property bar from expression foo unless foo is null (in which case the value of foo?.bar is null) 	|
