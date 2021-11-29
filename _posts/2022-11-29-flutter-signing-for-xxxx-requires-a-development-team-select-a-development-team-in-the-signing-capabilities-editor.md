---
title: '[Flutter] Signing for "xxxx" requires a development team. Select a development
  team in the Signing & Capabilities editor. 에러'
categories:
- Flutter
- Xcode
tags:
- Error
---

Xcode 업데이트 하는 건 정말 귀찮고 짜증난다. Xcode를 사용해본 사람이라면 공감할 것이다.
이번에 14 버전이 나오고 업데이트를 미뤘지만, 이제는 해야할 것 같아서 어제 업데이트를 했다.

하고 나서 개발을 진행하려고 앱 빌드를 했는데, Xcode에서 아래와 같은 빌드 에러가 떴다.

``` dart
Signing for "xxxx" requires a development team. Select a development team in the Signing & Capabilities editor.
```

## 원인

에러 원인은 말 그대로 `xxxx`에 개발팀을 설정해주지 않아서 그렇다. 나의 경우에는 `GoogleSignIn-GoogleSignIn`에서 문제가 생겼다. 원래는 이런 에러가 뜬 적이 없는데 14 버전에서부터 문제가 있는 듯하다.

처음에는 직접 `GoogleSignIn-GoogleSignIn`에 개발팀을 설정해주면 될 것 같아서 그렇게 해결했다. 하지만 이렇게 하니까 다음날에 또 같은 에러가 발생했다. 그래서 다른 방법을 찾았다.

## 해결방안

`/ios/Podfile` 파일을 열어서 하단에 다음과 같이 적어주자.

```
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
		  if config.build_settings['WRAPPER_EXTENSION'] == 'bundle'
        config.build_settings['DEVELOPMENT_TEAM'] = '개발팀 아이디'
      end
    end
  end
end
```

`개발팀 아이디`에는 현재 프로젝트에 사용하고 있는 개발팀 아이디를 넣어주면 된다. 이렇게 하면 문제가 발생했던 `GoogleSignIn-GoogleSignIn`에도 개발팀 설정이 자동으로 들어가게 되어서 문제 없이 빌드가 되었다.

## 참고

* <https://github.com/CocoaPods/CocoaPods/issues/11196#issuecomment-1058716826>{:target="_blank"}
