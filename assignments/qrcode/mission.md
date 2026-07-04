# 📘 QR 코드 생성기 실습 가이드 (상세 버전)

이 가이드는 `index.html`, `style.css`, `script.js` 세 가지 파일을 사용하여 자신만의 QR 코드 생성기를 만들는 방법을 단계별로 설명합니다. 각 파일의 역할과 해석이 포함되어 있습니다.

---

## 📝 프로젝트 파일 목록

이 프로젝트는 다음 세 가지 해싌 파일로 구성됩니다:

1. **`index.html`**: 웹 페이지의 기본 구조와 내용을 정의합니다.
2. **`style.css`**: 웹 페이지의 시각적 디자인을 관리합니다.
3. **`script.js`**: QR 코드 생성 로직과 사용자 인프트와의 사항을 처리합니다.

---

## 🎯 미션 1단계: HTML에 QR 코드 라이브러리 추가하기

QR 코드를 쉽게 생성하기 위해 `qrcode.js` 라이브러리를 CDN방송법을 통해 HTML에 추가합니다.

### 📍 목표

`index.html` 파일의 `<head>` 태그 안에 `qrcode.js` 라이브러리의 CDN 링크를 추가합니다.

### 🛠️ 작업 순서

1. `index.html` 파일을 열고
2. `<head>` 태그 안에 있는 `<!-- TODO: 여기에 QR 코드 생성 라이브러리(qrcode.js)의 CDN 링크를 넣어줘! -->` 주석을 찾고
3. 관련 `<script src="..."></script>` 형태로 CDN 링크를 추가

### 📌 최종 추가 예시

<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

### ✅ 이유

각 브라우저에서 QR 코드를 생성하려면 `qrcode.js` 라이브러리가 필요합니다. CDN방송법을 통해 방문 없이 다운로드 및 설치 가능해 번개적입니다.

---

## 🎯 미션 2단계: `script.js` 기능 완성하기

`script.js`는 사용자의 입력에 따라 QR 코드를 생성하는 것이 주요 로직입니다.

### 📍 목표

각 바퀴 클릭이 일어날 때 QR 코드를 생성하는 코드를 작성합니다.

### 🛠️ 작업 순서

1. `script.js` 파일을 열고
2. `generateBtn.addEventListener("click", () => { ... });` 불러오기 위해 TODO 주석을 찾으시고, 관련 QRCode 생성 코드를 추가

### 📌 추가 예시

```javascript
qrcodeDiv.innerHTML = "";

new QRCode(qrcodeDiv, {
    text: content,
    width: 200,
    height: 200,
    colorDark: colorDark,
    colorLight: colorLight,
    correctLevel: QRCode.CorrectLevel.H
});
```

### 📌 해석

* `qrcodeDiv.innerHTML = "";`: 이전에 생성된 QR 코드를 지우고 복습을 바로날 수 있게 해줍니다.
* `new QRCode(...)`: QR 코드 개체를 생성합니다.

  * `text`: QR 코드에 포함될 내용
  * `width`, `height`: QR 생성 크기
  * `colorDark`, `colorLight`: QR 생성의 가루
  * `correctLevel`: 오류 복구 수준 (H = High)

### ✅ 실행 테스트

1. `index.html`을 브라우저에서 열기
2. 입력장에 URL 또는 텍스트 입력
3. 색상을 선택
4. "QR 코드 생성하기!" 버튼 클릭
5. QR 코드가 표시되면 성공!

### 🔍 오류 경우

* 입력이 비어있는지 확인
* 개발자 도구 Console에 오류메시지 확인
* CDN 링크 잘 추가되었는지 확인
* `new` 키워드 바로 사용했는지 확인

---

## 🌟 선택 과제 (도전해보세요!)

* QR 코드에 로고 사진 넣기
* 버튼 애니메이션 효과 넣기
* QR 코드 크기조절 기능 추가
* 오류 메시지 UI 개정