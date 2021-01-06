---
title: "[Dart][Flutter]Effective Dart: Documentation 정리"
categories:
- Dart
- Flutter
tags:
- Mobile
---

[Dart 공식 문서 원본 이동](https://dart.dev/guides/language/effective-dart/documentation){:target="_blank"} 
# Effective Dart: Documentation
우리는 직접 작성한 코드가 남들이 보고 이해하기에 편할 것이라고 생각할 수 있다. 하지만 이는 우리 머리 속에 이미 코드의 문맥이 있기 때문에 하는 착각이다. 우리의 코드를 처음 보는 사람은 그런 맥락을 가지고 있지 않다. 심지어 몇 일 뒤의 우리도 맥락을 잊어버리곤 한다. 그렇기 때문에 정확하고 간결한 주석이 매우 중요하다. 주석을 다는 과정은 그다지 많은 시간을 필요로 하지 않기 때문에 우리의 몇 초로 다른 여러 사람들의 몇 시간을 아낄 수 있다.

물론 모든 주석이 도움이 되지는 않는다. 하지만 실제로는 대부분이 써야할 만큼의 주석을 쓰지 않는다.

## 주석 (Comments)

이제부터 나올 내용은 **문서 생성 시에 포함하지 않을 주석**에 대한 팁들이다.



### 문장 형태로 작성해라.

`good`
{% highlight dart %}
// Not if there is nothing before it.
if (_chunks.isEmpty) return false;
{% endhighlight %}

첫 단어가 대소문자를 구분하는 식별자(identifier)인 경우를 제외하고는 주석의 **첫 글자**는 **대문자**로 쓴다. 주석은 **마침표**(".")로 끝낸다. 느낌표나 물음표도 괜찮다. 이 사항들은 모든 주석(문서 주석, inline stuff, TODO)에 적용된다. 주석이 완전한 문장이 아니더라도 마찬가지다.

### 블록 주석을 문서화 용도로 사용하지말라.

`good`
{% highlight dart %}
greet(name) {
  // Assume we have a valid name.
  print('Hi, $name!');
}
{% endhighlight %}

`bad`
{% highlight dart %}
greet(name) {
  /* Assume we have a valid name. */
  print('Hi, $name!');
}
{% endhighlight %}

코드의 일부를 잠깐 주석 처리하기 위해서 블록 주석(`/* ... */`)을 사용할 수 있지만 해당 용도를 제외하고는 전부 `//`를 사용해야한다.

## 문서 주석(Doc comments)

문서 주석은 굉장히 편리하다. 이는 dartdoc이  문서 주석을 알아서 파싱해주고 깔끔한 doc 페이지로 만들어주기 때문이다. 문서 주석은 선언 앞에 나오고  `///` 구문을 사용하는 모든 주석을 말한다.

### 멤버와 타입을 문서화하기 위해 `///`을 사용해라.

일반적인 주석 대신에 문서 주석을 사용하면 dartdoc이 해당 주석을 찾아서 문서를 생성할 수 있다.

`good`
{% highlight dart %}
/// The number of characters in this chunk when unsplit.
int get length => ...
{% endhighlight %}

`bad`
{% highlight dart %}
// The number of characters in this chunk when unsplit.
int get length => ...
{% endhighlight %}

역사적인 이유로, dartdoc은 두가지 종류의 문서 주석을 지원한다. `///`(C# 스타일)과 `/** … */ `(JavaDoc 스타일)이다. 이 중에 `///`를 사용하는 것이 더 좋다. `/**`과 `*/`를 사용하게 되면 의미 없는 두 줄이 생기기 때문이다. 또한 문서 주석이 `*`를 사용해 리스트 항목을 표시하는 경우에는 `///` 쪽이 더 읽기 편하다.

JavaDoc 스타일을 사용하는 코드가 있을 경우 해당 코드를 변경하는 것이 좋다.

### 공적 API에 대한 문서 주석 작성을 선호해라.
모든 라이브러리, 최상위(top-level) 변수, 타입, 멤버 하나하나를 문서화 해야하는 것은 아니지만 **대부분의 것들**을 문서화 해야한다.

### 라이브러리 단계의 문서 주석 작성을 고려해라.
클래스가 유일한 프로그램 구성 단위인 Java 같은 언어와 다르게, Dart에서는 라이브러리는 그 자체로 사용자가 직접 작업하고 import 하는 독립체이다. 따라서 라이브러리 단계의 주석은 사용자에게 제공하는 주요 개념과 기능을 소개하기에 적합하다. 라이브러리 단계의 주석을 작성할 때 아래의 항목들을 고려해야한다.

* 해당 라이브러리가 무엇을 위한 것인지에 대한 **한 줄 요약**.
* 해당 라이브러리에 사용된 **용어**에 대한 설명.
* API를 사용한 완성된 **코드 샘플** 몇 개.
* 가장 중요하고 자주 사용된 **클래스와 함수에 대한 링크**.
* 라이브러리와 관련된 도메인의 **외부 참조에 대한 링크**.

파일의 시작 부분에 있는 라이브러리 지시문 바로 위에 문서 주석를 넣음으로 라이브러리를 문서화한다. 만약 라이브러리가 라이브러리 지시문을 포함하고 있지 않으면 문서 주석을 달 수 있게 하나를 추가하면 된다.

### 사적 API에 대한 문서 주석 작성을 선호해라.

문서 주석은 라이브러리 공적 API의 외부 소비자만을 위한 것이 아니다. 그것들은 라이브러리 내의 다른 부분에서 호출되는 내부 멤버를 이해하는 것에도 도움을 준다.

### 한 문장 요약으로 문서 주석을 시작해라.

마침표로 끝나는, 간단하고 사용자 중심의 설명으로 문서 주석을 시작해라. 완전한 문장이 아니어도 괜찮다. 하지만 해당 문장 읽는 사람으로 하여금 이 주석을 계속 읽어야 할지 아니면 그들이 원하는 것을 다른 곳에서 찾아야 할지 결정할 수 있도록 충분한 내용을 제공해야 한다.

`good`
{% highlight dart %}
/// Deletes the file at [path] from the file system.
void delete(String path) {
  ...
}
{% endhighlight %}

`bad`
{% highlight dart %}
/// Depending on the state of the file system and the user's permissions,
/// certain operations may or may not be possible. If there is no file at
/// [path] or it can't be accessed, this function throws either [IOError]
/// or [PermissionError], respectively. Otherwise, this deletes the file.
void delete(String path) {
  ...
}
{% endhighlight %}

### 문서 주석의 첫 문장을 나머지 부분과 분리해라.

바로 이전에 말한 **한 줄 요약 문장을 나머지 내용과 분리**해야 한다. 만약 한 문장 이상으로 설명이 필요하면 한 줄을 띄고 나머지 내용을 쓴다.

이렇게 하는 것은 문서를 요약하는 컴팩트한 첫 문장을 쓰는 것에 도움이 된다. 또한 dartdoc과 같은 툴은 클래스와 멤버 목록을 보여줄 때 분리된 첫 문장을 짧은 요약으로 사용한다.

`good`
{% highlight dart %}
/// Deletes the file at [path].
///
/// Throws an [IOError] if the file could not be found. Throws a
/// [PermissionError] if the file is present but could not be deleted.
void delete(String path) {
  ...
}
{% endhighlight %}

`bad`
{% highlight dart %}
/// Deletes the file at [path]. Throws an [IOError] if the file could not
/// be found. Throws a [PermissionError] if the file is present but could
/// not be deleted.
void delete(String path) {
  ...
}
{% endhighlight %}

### 중복된 내용을 적지 말아라.

사용자가 클래스에 대한 문서 주석을 읽으면 클래스의 이름과 해당 클래스가 구현하는 인터페이스를 정확히 볼 수 있다. 코드만 보고도 알 수 있는 것들을 문서 주석에 적을 필요가 없다. 대신, 읽는 사람이 모르는 부분을 설명하는 것에 집중해야 한다.

`good`
{% highlight dart %}
class RadioButtonWidget extends Widget {
  /// Sets the tooltip to [lines], which should have been word wrapped using
  /// the current font.
  void tooltip(List<String> lines) {
    ...
  }
}
{% endhighlight %}

`bad`
{% highlight dart %}
class RadioButtonWidget extends Widget {
  /// Sets the tooltip for this radio button widget to the list of strings in
  /// [lines].
  void tooltip(List<String> lines) {
    ...
  }
}
{% endhighlight %}

### 함수나 메소드 주석은 3인칭 동사로 시작하는 편이 좋다. 

문서 주석은 코드가 무엇을 하는지에 집중해야 한다.

`good`
{% highlight dart %}
/// Returns 'true' if every element satisfies the [predicate].
bool all(bool predicate(T element)) => ...

/// Starts the stopwatch if not already running.
void start() {
  ...
}
{% endhighlight %}

### 변수, getter, setter 주석은 명사구로 시작하는 편이 좋다. 

문서 주석은 property가 무엇인지를 강조해야한다. 계산을 하거나 다른 작업을 하는 getter에도 마찬가지다. 호출자가 신경 쓰는 것은 단지 작업의 결과이지 작업 자체가 아니다.

`good`
{% highlight dart %}
/// The current day of the week, where '0' is Sunday.
int weekday;

/// The number of checked buttons on the page.
int get checkedCount => ...
{% endhighlight %}

만약 property가 getter와 setter를 둘 다 가지고 있다면 그 중 하나에만 문서 주석을 생성해라. Dartdoc은 getter와 setter를 하나의 필드로 여긴다. 만약 getter와 setter 모두 문서 주석을 가진다면 dartdoc은 setter의 문서 주석을 무시한다.

### 라이브러리, 타입 주석은 명사구로 시작하는 편이 좋다.
클래스에 대한 문서 주석은 프로그램에서 가장 중요한 경우가 많다. 그것들은 타입의 불변성을 설명하고, 해당 클래스가 사용하는 용어를 확립하며, 클래스 멤버에 대한 다른 문서 주석에 문맥을 제공한다. 여기서의 작은 노력이 다른 모든 맴버에 대한 문서화 작업을 쉽게 만든다.

`good`
{% highlight dart %}
/// A chunk of non-breaking output text terminated by a hard or soft newline.
///
/// ...
class Chunk { ... }
{% endhighlight %}

### 문서 주석에 코드 예시 담는 것을 고려해라.

`good`
{% highlight dart %}
/// Returns the lesser of two numbers.
///
/// ```dart
/// min(5, 3) == 3
/// ```
num min(num a, num b) => ...
{% endhighlight %}

간단한 코드 샘플을 제공한다면 사용자가 API를 이해하고 배우기 더 쉬워질 것이다.

### \[\] 괄호를 사용해서 in-scope 식별자를 참조해라.

만약 변수, 메소드, 타입 이름을 \[\] 괄호로 감싼다면 dartdoc은 해당 부분을 그것과 관련된 API 문서와 연결할 것이다. () 괄호는 선택 사항이지만 메소드나 생성자를 참조할 때 () 괄호를 사용하면 더 분명해진다.

`good`
{% highlight dart %}
/// Throws a [StateError] if ...
/// similar to [anotherMethod()], but ...
{% endhighlight %}

특정 클래스의 멤버를 연결하고 싶다면 `.`를 통해 클래스 이름과 멤버 이름을 나눠서 쓴다.

`good`
{% highlight dart %}
/// Similar to [Duration.inDays], but handles fractional days.
{% endhighlight %}

`.`구문은 named 생성자를 참조하는 것에도 사용된다. Unnamed 생성자를 사용할 때는 클래스 이름 뒤에 `()` 괄호를 붙인다.

`good`
{% highlight dart %}
/// To create a point, call [Point()] or use [Point.polar()] to ...
{% endhighlight %}

### 파라미터를 설명하고, 값을 리턴하고, 예외를 위해 산문체를 사용해라.
다른 언어에서는 상세 태그 및 섹션을 사용해서 파라미터와 메소드의 리턴 값을 설명한다.

`bad`
{% highlight dart %}
/// Defines a flag with the given name and abbreviation.
///
/// @param name The name of the flag.
/// @param abbr The abbreviation for the flag.
/// @returns The new flag.
/// @throws ArgumentError If there is already an option with
///     the given name or abbreviation.
Flag addFlag(String name, String abbr) => ...
{% endhighlight %}

Dart에서는 위의 것들을 메소드 설명에 통합하고 parameter는 \[\] 괄호를 사용해서 하이라이트 처리한다.

`good`
{% highlight dart %}
/// Defines a flag.
///
/// Throws an [ArgumentError] if there is already an option named [name] or
/// there is already an option using abbreviation [abbr]. Returns the new flag.
Flag addFlag(String name, String abbr) => ...
{% endhighlight %}

### 메타데이터 표시 전에 문서 주석을 달아라.

`good`
{% highlight dart %}
/// A button that can be flipped on and off.
@Component(selector: 'toggle')
class ToggleComponent {}
{% endhighlight %}

`bad`
{% highlight dart %}
@Component(selector: 'toggle')
/// A button that can be flipped on and off.
class ToggleComponent {}
{% endhighlight %}

## 마크다운 (Markdown)

문서 주석에서 대부분의 마크다운 형식을 사용할 수 있으며 dartdoc은 markdown package를 사용해서 이를 처리할 것이다.

마크다운에 대한 설명은 이미 매우 많이 존재한다. 세계적으로 유명하기 때문에 마크다운을 선택했다. 다음은 지원하는 기능을 보여주는 간단한 예시이다.

{% highlight dart %}
/// This is a paragraph of regular text.
///
/// This sentence has *two* _emphasized_ words (italics) and **two**
/// __strong__ ones (bold).
///
/// A blank line creates a separate paragraph. It has some `inline code`
/// delimited using backticks.
///
/// * Unordered lists.
/// * Look like ASCII bullet lists.
/// * You can also use `-` or `+`.
///
/// 1. Numbered lists.
/// 2. Are, well, numbered.
/// 1. But the values don't matter.
///
///     * You can nest lists too.
///     * They must be indented at least 4 spaces.
///     * (Well, 5 including the space after `///`.)
///
/// Code blocks are fenced in triple backticks:
///
/// ```
/// this.code
///     .will
///     .retain(its, formatting);
/// ```
///
/// The code language (for syntax highlighting) defaults to Dart. You can
/// specify it by putting the name of the language after the opening backticks:
///
/// ```html
/// <h1>HTML is magical!</h1>
/// ```
///
/// Links can be:
///
/// * https://www.just-a-bare-url.com
/// * [with the URL inline](https://google.com)
/// * [or separated out][ref link]
///
/// [ref link]: https://google.com
///
/// # A Header
///
/// ## A subheader
///
/// ### A subsubheader
///
/// #### If you need this many levels of headers, you're doing it wrong
{% endhighlight %}

### 마크다운을 과도하게 사용하지 말아라.
의심될 경우 해당 포맷을 사용하지 않는다. 포맷은 내용을 대체하기 위해서가 아니라 내용을 강조하기 위해 존재한다. 내용이 제일 중요하다.

### 모맷을 만들기 위해 HTML 사용하지 말아라.
테이블 같은 것들을 사용하는 것이 유용할 때가 있지만, 마크다운으로 표현하기 너무 복잡하다면 사용하지 않는 것이 좋다.

### 코드 블럭을 사용할 때는 backtick fence을 선호해라.

마크다운에는 코드 블럭을 구분하는 두가지 방법이 있다. 각 라인을 4칸을 들여쓰기 하거나 triple-backtick “fence” 두 줄로 감싸는 것이다. 첫번째 방법은 마크다운의 리스트와 같이 이미 들여쓰기가 다른 용도로 사용된 경우나, 코드 블록이 들여쓰여진 코드를 포함하고 있는 경우에 깨지기 쉽다.

backtick 구문은 이런 문제를 방지해준다.

`good`
{% highlight dart %}
/// You can use [CodeBlockExample] like this:
///
/// ```
/// var example = CodeBlockExample();
/// print(example.isItGreat); // "Yes."
/// ```
{% endhighlight %}

`bad`
{% highlight dart %}
/// You can use [CodeBlockExample] like this:
///
///     var example = CodeBlockExample();
///     print(example.isItGreat); // "Yes."
{% endhighlight %}

## 작성 (Writing)
이 섹션에는 문서를 위한 몇가지 가이드라인이 나와있다.

### 간결하게 작성해라.
명확하고 정확하면서도 간결해야 한다.

### 명확하기 않은 약어는 사용하지마라.
많은 사람들이 “i.e.”, “e.g.” and “et al.”의 의미를 모른다. 모든 사람이 알고 있을 거라고 생각할 수 있겠지만 생각하는 만큼 많이 알지 못한다.
### 멤버 인스턴스를 참조할 때 the보다 this를 사용하는 편이 좋다.
클래스의 멤버에 대해 문서화 작업을 할 때 멤버를 부른 오브젝트를 역참조 해야할 때가 있다. 이때 "the"를 사용하는 것은 모호할 수 있다.

`good`
{% highlight dart %}
class Box {
  /// The value this wraps.
  var _value;

  /// True if this box contains a value.
  bool get hasValue => _value != null;
}
{% endhighlight %}
