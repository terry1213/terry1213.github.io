---
title: "[Android Studio] Arctic Fox로 업데이트한 이후, 단축키가 되지 않는 문제"
categories:
- AndroidStudio
tags:
- Error
---

오랜만에 안드로이드 스튜디오 버전을 업데이트했다. 업데이트를 잘 마치고 작업하던 중, 갑자기 단축키가 되지 않는 문제가 발생했다.

## 해결 방법

![](/assets/androidstudio/shortcut-error-version-update/Example1.png)

`Android Studio` > `Preferences` 로 들어간다.

![](/assets/androidstudio/shortcut-error-version-update/Example2.png)

`Keymap` 을 선택하면, 화면 상단을 보면 `IntelliJ IDEA Classic`이 선택되어 있다. 현재 본인은 Mac 단축키를 사용하고 싶기 때문에 `macOS`를 선택해주었다.

마지막으로 하단에 `OK` 버튼을 눌러주니 단축키가 다시 잘 작동하기 시작했다.

## 원인

결국 해당 문제는 버전 업데이트로 인해 단축키 모드가  `IntelliJ IDEA Classic`로 설정되어서 발생했다. 단축키가 아예 사용이 안 되던 문제는 아니었기 때문에 단순히 단축키 모드만 변경하여 해결할 수 있었다.
