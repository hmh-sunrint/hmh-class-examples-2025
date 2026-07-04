# 🚀 Firebase 데이터베이스 실습 개발 흐름도 (숙제 과정)

안녕! 오늘은 Firebase Firestore 데이터베이스의 가장 기본적인 기능인 **CRUD (Create - 생성, Read - 읽기, Update - 수정, Delete - 삭제)**를 직접 해볼 거야. 이걸 해보면 웹 앱에서 데이터를 어떻게 다루는지 확실히 알게 될 거야!

## 🎯 목표

`practice/` 폴더에 있는 `index.html`, `style.css`, `script.js` 파일을 써서:
1.  Firebase 프로젝트랑 웹 앱을 연결해봐.
2.  데이터를 추가하고 (Create)
3.  추가된 데이터를 읽고 (Read)
4.  기존 데이터를 수정하고 (Update)
5.  원하는 데이터를 삭제하는 (Delete) 과정을 직접 경험해봐!

## 🛠️ 준비물

*   웹 브라우저 (크롬, 파이어폭스 같은 거)
*   텍스트 에디터 (VS Code 같은 거)
*   **너의 Firebase 프로젝트 설정 정보** (API 키, 프로젝트 ID 같은 거)

## 📝 실습 과정

### 1단계: Firebase 프로젝트 연결하기

1.  **`practice/script.js` 파일 열기:** 텍스트 에디터로 `practice/script.js` 파일을 열어봐.
2.  **Firebase 설정 업데이트:** 파일 맨 위에 있는 `firebaseConfig` 객체를 너의 Firebase 프로젝트 설정 정보로 바꿔줘야 해.
    *   Firebase 콘솔 (console.firebase.google.com)에 접속해서 너의 프로젝트를 선택해.
    *   프로젝트 개요에서 "웹 앱에 Firebase 추가" 또는 "앱 추가" 버튼을 눌러서 웹 앱을 등록해봐.
    *   등록 과정에서 나오는 `firebaseConfig` 객체 내용을 복사해서 `script.js` 파일의 `firebaseConfig`에 그대로 붙여넣어.
    *   **중요:** `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`, `measurementId` 같은 값들을 정확히 입력해야 해!

### 2단계: 웹 앱 실행하고 데이터 추가 (CREATE)

1.  **`practice/index.html` 파일 열기:** `practice/index.html` 파일을 웹 브라우저로 직접 열어봐. (파일을 더블 클릭하거나, 브라우저 주소창에 `file:///경로/practice/index.html` 이렇게 입력하면 돼.)
2.  **"데이터 추가" 섹션 활용:**
    *   "이름을 입력하세요" 칸에 너의 이름을 써봐.
    *   "이메일을 입력하세요" 칸에 너의 이메일 주소를 써봐.
    *   `데이터 추가` 버튼을 클릭해봐.
3.  **결과 확인:**
    *   화면 아래에 "데이터가 성공적으로 추가되었습니다!" 메시지가 나오는지 확인해.
    *   Firebase 콘솔의 Firestore Database 탭으로 가서 `users` 컬렉션이 생겼는지, 그리고 네가 추가한 데이터가 문서로 잘 저장되었는지 확인해봐.

### 3단계: 데이터 조회 (READ)

1.  **"데이터 조회" 섹션 활용:**
    *   `모든 데이터 조회` 버튼을 클릭해봐.
2.  **결과 확인:**
    *   `dataList` 영역에 Firebase에 저장된 모든 사용자 데이터가 목록으로 잘 나오는지 확인해.
    *   각 데이터의 ID, 이름, 이메일, 생성일이 제대로 표시되는지 확인해봐.

### 4단계: 데이터 수정 (UPDATE)

1.  **"데이터 수정" 섹션 활용:**
    *   수정하고 싶은 데이터의 **ID**를 `dataList`에서 확인해서 "수정할 ID" 칸에 입력해. (예: `ABC123xyz`)
    *   "새 이름" 또는 "새 이메일" 칸에 바꾸고 싶은 내용을 입력해. (둘 중 하나만 입력해도 돼.)
    *   `데이터 수정` 버튼을 클릭해봐.
2.  **결과 확인:**
    *   "데이터가 성공적으로 수정되었습니다!" 메시지가 나오는지 확인해.
    *   `dataList`가 새로고침 되면서 바뀐 내용이 잘 반영되었는지 확인해.
    *   Firebase 콘솔에서도 해당 문서의 내용이 바뀌었는지 확인해봐.

### 5단계: 데이터 삭제 (DELETE)

1.  **"데이터 삭제" 섹션 활용:**
    *   삭제하고 싶은 데이터의 **ID**를 `dataList`에서 확인해서 "삭제할 ID" 칸에 입력해.
    *   `데이터 삭제` 버튼을 클릭해봐.
    *   확인 팝업이 나오면 `확인`을 클릭해.
2.  **결과 확인:**
    *   "데이터가 성공적으로 삭제되었습니다!" 메시지가 나오는지 확인해.
    *   `dataList`에서 해당 데이터가 사라졌는지 확인해.
    *   Firebase 콘솔에서도 해당 문서가 삭제되었는지 확인해봐.

## 💡 숙제 및 추가 미션

*   `practice/script.js` 파일을 열어서 각 함수 (`addData`, `readAllData`, `updateData`, `deleteData`)가 어떻게 작동하는지 주석을 읽으면서 이해해봐.
*   `style.css` 파일을 수정해서 웹 페이지 디자인을 너만의 스타일로 바꿔봐.
*   새로운 데이터 필드 (예: `phone`, `address`)를 추가하고, 이걸 HTML이랑 JavaScript 코드에 반영해서 CRUD 작업을 해봐.
*   `dataList`에 표시되는 데이터 순서를 바꿔봐. (힌트: Firebase Firestore 쿼리 옵션을 찾아봐!)

이 실습을 통해 너는 Firebase Firestore를 이용한 데이터베이스의 기초를 탄탄하게 다질 수 있을 거야! 궁금한 점이 있다면 언제든지 물어봐!
