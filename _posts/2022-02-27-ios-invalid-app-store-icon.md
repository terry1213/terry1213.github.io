---
title: "[IOS] Invalid App Store Icon 에러"
categories:
- IOS
tags:
- Error
---

## 문제

앱을 App Store Connect에 올리는 도중에 다음과 같은 에러가 발생했다.

```
Invalid App Store Icon. The App Store Icon in the asset catalog in 'Runner.app' can't be transparent nor contain an alpha channel.
```

## 원인

해당 에러가 발생한 이유는 앱 아이콘에 투명한 부분이 있기 때문이다.

`{project-name}/ios/Runner/Assets.xcassets/AppIcon.appiconset/`에 위치한 아이콘을 확인해보자. 아마 아이콘 이미지 배경이 투명할 것이다.

## 해결 방법

기존 투명한 배경이 들어간 아이콘 대신에 배경이 들어간 아이콘 이미지를 넣어야한다. 하나하나 바꿀 필요 없이 배경을 넣은 아이콘 이미지 하나를 준비하여 <https://appicon.co/>를 통해 생성하도록 하자. 기존 아이콘 이미지들을 전부 삭제하고, 새로 생성한 아이콘 이미지들을 넣어주면 된다.
