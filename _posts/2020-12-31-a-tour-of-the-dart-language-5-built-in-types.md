---
title: A tour of the Dart language [5. Built-in types]
categories:
- Dart
tags:
- Mobile
---

[목차로 돌아가기](/dart/a-tour-of-the-dart-language/)
# Built-in types
다트 언어는 다음 타입들에 대해 특별한 지원을 해준다.

* numbers
* strings
* booleans
* lists (arrays라고도 부른다.)
* sets
* maps
* runes (string에서 유니코드 문자를 표현하기 위해)
* symbols

위의 모든 타입들의 오브젝트(object)는 literal을 사용해서 initialize할 수 있다. 예를 들어 `'this is a string' `는 string literal 이고 `true`는 boolean literal이다.

Dart에서 모든 변수는 오브젝트-class의 instance-를 가리키기 때문에 variable를 initialize하기 위해 constructor를 사용할 수 있다. 몇몇 built-in type들은 각자 constructor를 가지고 있다. 예를 들어 `Map()`은 map을 생성하기 위한 constructor이다.

## Numbers

Dart의 숫자에는 두가지가 있다.

`int`
integer 값은 64 비트(bit)를 넘을 수 없고 플랫폼에 따라 다르다. Dart VM에서는 -2<sup>63</sup> 부터 2<sup>63</sup> – 1 까지의 값이 가능하다. 자바 스크립트로 컴파일 되는 Dart의 경우  -2<sup>53</sup> 부터 2<sup>53</sup> – 1 까지의 값을 가질 수 있는 자바스크립트 numbers를 사용한다.

double
소수점을 가진 숫자이다. IEEE 754 표준에 의해 지정되었다.

`int`와 `double` 모두 num의 서브타입(subtype)이다. num 타입은 기본연산자인 +, -, /, * 과 `abs()`, `ceil()`, `floor()` 등 여러 method를 포함한다. (>> 같은 bitwise operator들은 `int` class에 정의되어 있다.) 만약 num이나 num의 서브타입인 int, double에 찾는 것이 없다면 dart:math 라이브러리에는 있을 것이다.

Integer는 소수점(decimal point)이 없는 숫자이다.

{% highlight dart %}
var x = 1;
var hex = 0xDEADBEEF;
{% endhighlight %}

만약 숫자에 소수점이 있다면 double이다.

{% highlight dart %}
var y = 1.1;
var exponents = 1.42e5;
{% endhighlight %}

Dart 2.1부터 필요할 경우에는 integer literal이 자동으로 double로 전환된다.

{% highlight dart %}
double z = 1; //  double z = 1.0 와 같다.
{% endhighlight %}

> **Version note**: Dart 2.1 전까지는 위의 예시처럼 사용하면 에러가 발생했다.
 
아래는 string과 숫자 간 변경하는 방법들이다.
 
{% highlight dart %}
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
{% endhighlight %}

int 타입은 shift(<<, >>), AND(&), OR(\|) 같은 bitwise operator들을 사용할 수 있다.

{% highlight dart %}
assert((3 << 1) == 6); // 0011 << 1 == 0110
assert((3 >> 1) == 1); // 0011 >> 1 == 0001
assert((3 | 4) == 7); // 0011 | 0100 == 0111
{% endhighlight %}

literal number는 컴파일 타임(compile-time) 상수(constant)이다. 많은 산술 식들도 그 안에 연산자들(operands)이 컴파일 타임 상수이기 때문에 컴파일 타임 상수이다.

## Strings
Dart의 문자열(string)은 UTF-16 코드 단위의 나열이다. 문자열을 생성하기 위해서는 작은 따옴표나 큰 따옴표를 사용한다.

{% highlight dart %}
var s1 = 'Single quotes work well for string literals.';
var s2 = "Double quotes work just as well.";
var s3 = 'It\'s easy to escape the string delimiter.';
var s4 = "It's even easier to use the other delimiter.";
{% endhighlight %}

`${expression}`을 사용해서  안에 expression 값을 넣을 수 있다. 만약에 expression이 identifier라면 {}를 빼도 된다. 오브젝트에 해당하는 문자열을 가져오기 위해 Dart는 오브젝트의 `toString()` 메소드(method)를 부른다.

{% highlight dart %}
var s = 'string interpolation';

assert('Dart has $s, which is very handy.' ==
    'Dart has string interpolation, ' +
        'which is very handy.');
assert('That deserves all caps. ' +
        '${s.toUpperCase()} is very handy!' ==
    'That deserves all caps. ' +
        'STRING INTERPOLATION is very handy!');
{% endhighlight %}

> **Note**: `==` operator는 좌우의 오브젝트가 같은지를 확인한다. 두 문자열이 같은 sequence of code units를 포함하고 있다면 같다고 본다.

String literal을 단순히 붙여 놓거나 `+` 연산자를 사용해서 string을 이어 붙일 수 있다.

{% highlight dart %}
var s1 = 'String '
    'concatenation'
    " works even over line breaks.";
assert(s1 ==
    'String concatenation works even over '
        'line breaks.');

var s2 = 'The + operator ' + 'works, as well.';
assert(s2 == 'The + operator works, as well.');
{% endhighlight %}

큰 따옴표나 작은 따옴표 3개를 연속해서 사용하면 multi-line 문자열을 사용할 수 있다.

{% highlight dart %}
var s1 = '''
You can create
multi-line strings like this one.
''';

var s2 = """This is also a
multi-line string.""";
{% endhighlight %}

`r`을 문자열 앞에 붙여서 raw string을 생성할 수 있다.

{% highlight dart %}
var s = r'In a raw string, not even \n gets special treatment.';
{% endhighlight %}
 
Literal string은 컴파일 타임 상수이다.

{% highlight dart %}
// 아래의 것들은 const string에 사용될 수 있다.
const aConstNum = 0;
const aConstBool = true;
const aConstString = 'a constant string';

// 아래의 것들은 const string에 사용될 수 없다.
var aNum = 0;
var aBool = true;
var aString = 'a string';
const aConstList = [1, 2, 3];

const validConstString = '$aConstNum $aConstBool $aConstString';
// const invalidConstString = '$aNum $aBool $aString $aConstList';
{% endhighlight %}

## Booleans
Boolean 값을 표현하기 위해 `bool` 타입을 사용한다. Bool 타입에는 두 개의 오브젝트가 있다. boolean literal인 `true`, `false` 이다. 둘 다 컴파일 타임 상수다.

Dart의 type safety는 `if (nonbooleanValue)` 나 `assert (nonbooleanValue)` 와 같은 코드를 사용하지 못하는 것을 의미한다. 대신에 아래와 같이 값을 확인한다.

{% highlight dart %}
// 빈 문자열 확인.
var fullName = '';
assert(fullName.isEmpty);

// 0 확인.
var hitPoints = 0;
assert(hitPoints <= 0);

// null 확인.
var unicorn;
assert(unicorn == null);

// NaN 확인.
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);
{% endhighlight %}

## Lists
모든 프로그래밍 언어의 가장 대중적인 컬렉션(collection)은 array이다. Dart에서 array는 List 오브젝트이다.

Dart의 list literal은 자바스크립트의 array literal 같이 생겼다.

{% highlight dart %}
var list = [1, 2, 3];
{% endhighlight %}

> **Note**: Dart는 위의 예시의 리스트가 List\<int\> 타입을 가지고 있다고 추론한다. 만약 integer가 아닌 오브젝트를 이 리스트에 추가하려고 한다면, error가 발생할 것이다.

Dart 컬렉션 literal에서는 마지막 아이템 뒤에 쉼표를 넣을 수 있다. 이는 컬렉션에 영향을 주지는 않지만 복사-붙여 넣기 에러를 예방한다.

{% highlight dart %}
var list = [
  'Car',
  'Boat',
  'Plane',
];
{% endhighlight %}

list는 zero-based indexing 을 사용한다. 첫번째 아이템의 index는 0이고 마지막 아이템의 인덱스(index)는 `list.length – 1`이 된다. list의 길이를 가져오는 방법과 list 값에 접근하는 방법은 자바스크립트와 같으니 익숙할 것이다.

{% highlight dart %}
var list = [1, 2, 3];
assert(list.length == 3);
assert(list[1] == 2);

list[1] = 1;
assert(list[1] == 1);
{% endhighlight %}

list를 컴파일 타임 변수로 생성하기 위해서는 list literal 앞에 `const`를 붙인다.

Dart 2.3 는 **spread operator** (`...`) 와 **null-aware spread operator** (`…?`) 을 제공한다.

spread operator (`…`)는 한 list의 모든 값을 다른 리스트에 삽입하기 위해 사용할 수 있다.

{% highlight dart %}
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);
{% endhighlight %}

만약 spread operator 의 오른쪽 부분이 null 값을 가질 수도 있다면 null-aware spread operator 를 통해 이를 예방할 수 있다.

{% highlight dart %}
var list;
var list2 = [0, ...?list];
assert(list2.length == 1);
{% endhighlight %}

Dart 2.3 은 또한 **collection if** 와 **collection for**을 제공한다. 이것을 사용하면 조건문(conditionals)과 반목문(repetition)을 사용하여 collection을 생성할 수 있다.

아래는 **collection if**를 사용하는 예시이다.

{% highlight dart %}
var nav = [
  'Home',
  'Furniture',
  'Plants',
  if (promoActive) 'Outlet'
];
{% endhighlight %}

아래는 **collection for**를 사용하는 예시이다.

{% highlight dart %}
var listOfInts = [1, 2, 3];
var listOfStrings = [
  '#0',
  for (var i in listOfInts) '#$i'
];
assert(listOfStrings[1] == '#1');
{% endhighlight %}

## Sets
중복되지 않는 아이템들을 순서 없이 모아둔 것이 set이다. Dart는 set literal 과 Set 타입을 제공한다.

> **Version note**: Set 타입은 항상 Dart의 핵심 부분이었지만 set literal은 Dart 2.2에서 소개되었다.

아래는 set literal을 사용해서 set을 생성한 예시이다.

{% highlight dart %}
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
{% endhighlight %}

> **Note**: Dart는 `halogens`가 `Set<String>` 타입을 가지고 있다고 추론한다. 만약 다른 타입의 값을 추가하려고 한다면 에러가 발생할 것이다.

아래는 빈 set을 생성하는 두가지 방법이다. 3번째 줄은 set이 아니라 map을 만드는 방법이다.

{% highlight dart %}
var names = <String>{};
// Set<String> names = {}; // 이것도 가능하다.
// var names = {}; // set이 아니라 map.
{% endhighlight %}

> **Set or map?** map literal 구문은 set literal 구문과 비슷하다. map literal이 먼저이므로 `{}` 기본적으로 `Map` 타입으로 설정된다. 만약 {}이나 변수에 타입 명시하는 것을 잊었다면 Dart는 `Map<dynamic, dynamic>` 타입의 오브젝트를 생성한다.
	
`add()` 와 `addAll()` method를 통해 set에 아이템을 추가할 수 있다.

{% highlight dart %}
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
{% endhighlight %}

`.length `를 통해 set 안에 있는 아이템의 길이를 가져올 수 있다.

{% highlight dart %}
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
assert(elements.length == 5);
{% endhighlight %}

컴파일 타임 상수로 set을 만들기 위해서는 set literal 앞에 const를 추가한다. `const` 이기 때문에 새로 아이템을 추가하려고 하면 에러가 발생할 것이다.

{% highlight dart %}
final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
};
// constantSet.add('helium'); // 이 줄은 에러를 일으킬 것이다.
{% endhighlight %}

Dart 2.3 부터 list 에서와 마찬가지로 set에서도 spread operators (`...`, `...?`)와  collection if, for 를 사용할 수 있다.

## Map

일반적으로 map은 key와 value를 연결하는 object이다. key와 value 모두 아무 타입의 object가 들어갈 수 있다. 각 key는 유니크 해야하지만 value는 중복해서 사용할 수 있다. Dart에서 map은 map literal과 Map type에 의해서 제공된다.

아래는 map literal을 사용해서 만든 간단한 Dart map들이다.

{% highlight dart %}
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
{% endhighlight %}
	
> **Note**: 위의 코드에서 `gifts`는 `Map<String, String>` 타입을 가지고 `nobleGases`는 `Map<int, String>` 타입을 가진다. 만약 map에 틀린 타입의 값을 추가하려고 하면 에러가 발생할 것이다.

Map constructor를 사용하는 방법도 있다. 이 방법을 사용해도 위의 object와 같은 object를 만들 수 있다.

{% highlight dart %}
var gifts = Map();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var nobleGases = Map();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
{% endhighlight %}

> **Note**: `Map()` 뿐만 아니라 `new Map()`을 볼 때도 있을 것이다. Dart 2부터 `new` 키워드는 선택사항이다.
	
자바스크립트에서처럼 새로운 key-value 쌍을 기존의 map에 추가할 수 있다.

{% highlight dart %}
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds'; // key-value 쌍을 추가.
{% endhighlight %}

자바스크립트에서와 같은 방법으로 map에서 value를 가져올 수 있다.

{% highlight dart %}
var gifts = {'first': 'partridge'};
assert(gifts['first'] == 'partridge');
{% endhighlight %}

만약 map에 없는 key에 접근하려고 하면 null 값이 리턴된다.

{% highlight dart %}
var gifts = {'first': 'partridge'};
assert(gifts['fifth'] == null);
{% endhighlight %}
	
`.length`를 사용하면 key-value 쌍의 개수를 알 수 있다.

{% highlight dart %}
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';
assert(gifts.length == 2);
{% endhighlight %}

map literal 앞에 `const`를 붙이면 컴파일 타임 상수인 map을 생성할 수 있다.
{% highlight dart %}
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};

// constantMap[2] = 'Helium'; // 이 줄은 에러를 일으킬 것이다.
{% endhighlight %}

Dart 2.3부터 map은 list와 마찬가지로 spread operator(`…` , `…?`)와 collection if와 for를 지원한다.

## Runes and grapheme clusters

Dart에서 rune은 string의 유니코드(Unicode) 부분을 구분해준다. Dart 2.6부터 Unicode grapheme clusters라고도 불리는 사용자 인식 문자를 보거나 조작하기 위해 문자 패키지(characters package)를 사용한다.

유니코드는 전세계에서 사용되는 문자, 숫자, 기호에 대해 고유한 숫자 값을 정의하고 있다. Dart string은 UTF-16 코드 단위의 sequence이기 때문에 string 내에서 유니코드 부분을 구분하려면 특별한 syntax가 필요하다. 유니코드 부분을 구분하는 일반적인 방법은 `\uXXXX`이다. XXXX에서 X 하나가 16진수를 나타내므로 16진수가 총 4개 들어가는 것이다. 예를 들어 하트(♥)는 `\u2665`이다. 16진수를 4개보다 많거나 적게 사용하고자 하면 해당 값을 {} 괄호로 감싸야 한다. 예를 들어 웃는 이모티콘(😆)은 `\n{1f606}`이다.

만약 각각의 유니코드 문자를(character)를 읽거나 써야하는 경우에는 문자 패키지에서 문자열에 정의된 `characters` getter를 사용하면 된다. return 된 Character 오브젝트는 grapheme clusters의 sequence 같은 string이다. 아래는 character API를 사용하는 예시이다.

{% highlight dart %}
import 'package:characters/characters.dart';
...
var hi = 'Hi 🇩🇰';
print(hi);
print('The end of the string: ${hi.substring(hi.length - 1)}');
print('The last character: ${hi.characters.last}\n');
{% endhighlight %}

output은 다음과 같을 것이다.

{% highlight console %}
$ dart bin/main.dart
Hi 🇩🇰
The end of the string: ???
The last character: 🇩🇰
{% endhighlight %}

## Symbols

Symbol 오브젝트는 Dart 프로그램에서 선언된 operator나 identifier를 나타낸다. symbol을 사용할 일이 없을 수도 있다. 하지만 symbol은 indentifier의 이름을 통해서 indentifier를 참조하는 API에서는 매우 유용하다. minification는 identifier 이름을 변경하지만 identifier symbol을 변경하지 않기 때문이다.

identifier를 위한 symbol를 가져오기 위해, symbol literal을 사용한다. symbol literal은 identifier 앞에 `#`을 붙이면 된다.

{% highlight dart %}
#radix
#bar
{% endhighlight %}

symbol literal은 compile-time constant이다.
