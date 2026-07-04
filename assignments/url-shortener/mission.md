# 📝 Firebase 링크 단축 앱 미션: 코드 과제 설명서

안녕! 이제 `mission/` 폴더에 있는 코드들을 직접 완성해 볼 시간이야. 각 문제마다 자세한 설명과 힌트를 줄 테니, 잘 읽고 따라와 봐! 필요하면 `template/` 폴더의 파일들을 참고해도 좋아.

## 🎯 시작하기 전에

*   **Firebase 프로젝트 설정 정보 준비:** `YOUR_API_KEY`, `YOUR_PROJECT_ID` 같은 정보들을 미리 준비해두면 편해. Firebase 콘솔에서 웹 앱을 등록하면 이 정보들을 얻을 수 있어.

---

### **문제 1 (index.html): Contact 링크를 너의 이메일 주소로 바꿔봐.**

*   **어디를 봐야 해?** `mission/index.html` 파일을 열어봐.
*   **뭘 해야 해?** `Contact`라고 쓰여있는 링크를 찾아서 `href` 속성 안에 있는 `mailto:____@gmail.com` 부분을 너의 실제 이메일 주소로 바꿔줘.
*   **힌트:** `mailto:` 뒤에 바로 이메일 주소를 쓰면 돼.
*   **예시:** `mailto:my-awesome-email@gmail.com`

---

### **문제 2 (script.js): Firebase 모듈들을 import 해봐.**

*   **어디를 봐야 해?** `mission/script.js` 파일 맨 위를 봐.
*   **뭘 해야 해?** Firebase 기능을 쓰려면 필요한 모듈들을 불러와야 해. `initializeApp`, `getFirestore`, `doc`, `setDoc`, `getDoc` 같은 함수들을 `import` 문으로 불러와야 해.
*   **힌트:** `https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js`랑 `https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js`에서 가져오면 돼.
*   **코드 조각:**
    ```javascript
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"
    import {
      getFirestore,
      doc,
      setDoc, // 힌트: 데이터를 저장하는 함수
      getDoc, // 힌트: 데이터를 읽는 함수
    } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
    ```

---

### **문제 3 (script.js): Firebase 설정을 너의 프로젝트 설정으로 바꿔봐.**

*   **어디를 봐야 해?** `mission/script.js` 파일에서 `firebaseConfig` 객체를 찾아봐.
*   **뭘 해야 해?** `YOUR_API_KEY`, `YOUR_PROJECT_ID` 같은 플레이스홀더들을 너의 실제 Firebase 프로젝트 정보로 바꿔줘.
*   **힌트:** Firebase 콘솔에서 웹 앱을 등록할 때 나오는 코드 블록을 그대로 복사해서 붙여넣으면 돼.
*   **코드 조각:**
    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY", // 너의 API 키를 여기에!
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // 너의 프로젝트 도메인을 여기에!
      projectId: "YOUR_PROJECT_ID", // 너의 프로젝트 ID를 여기에!
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID",
    }
    ```

---

### **문제 4 (script.js): 익명 로그인 함수를 완성해봐.**

*   **어디를 봐야 해?** `mission/script.js` 파일에서 `document.addEventListener("DOMContentLoaded", ...)` 안에 있는 `signInAnonymously(auth)` 부분을 찾아봐.
*   **뭘 해야 해?** `signInAnonymously(auth)` 함수를 호출해서 익명 로그인을 시도하게 해. 성공하면 `then()` 블록이, 실패하면 `catch()` 블록이 실행되게 해봐.
*   **힌트:** `signInAnonymously` 함수는 `auth` 객체를 인자로 받아.
*   **코드 조각:**
    ```javascript
    signInAnonymously(auth)
      .then(() => {
        // 로그인 성공 시 실행될 코드
      })
      .catch((error) => {
        // 로그인 실패 시 실행될 코드
      })
    ```

---

### **문제 5 (script.js): "생성" 버튼 클릭 이벤트를 연결해봐.**

*   **어디를 봐야 해?** `mission/script.js` 파일에서 `document.addEventListener("DOMContentLoaded", ...)` 안에 있는 버튼 관련 코드를 찾아봐.
*   **뭘 해야 해?** `id="make"`인 버튼을 클릭했을 때 `upload` 함수가 실행되도록 이벤트 리스너를 추가해줘.
*   **힌트:** `addEventListener` 함수를 사용해봐. 첫 번째 인자는 이벤트 종류(`"click"`), 두 번째 인자는 실행할 함수(`upload`)야.
*   **코드 조각:**
    ```javascript
    const button = document.getElementById("make")
    if (button) {
      button.addEventListener("click", upload) // 여기에 코드를 넣어봐!
    }
    ```

---

### **문제 6 (script.js): 링크가 비어있는지 확인하는 조건문을 완성해봐.**

*   **어디를 봐야 해?** `mission/script.js` 파일의 `upload` 함수 안을 봐.
*   **뭘 해야 해?** `link` 변수가 비어있는 문자열인지 확인하는 조건문을 만들어줘. 만약 비어있다면, `jBox`로 경고 메시지를 띄우고 함수를 `return`해서 더 이상 진행되지 않게 해.
*   **힌트:** `!` 연산자를 사용하면 변수가 비어있는지 쉽게 확인할 수 있어.
*   **코드 조각:**
    ```javascript
    if (!link) { // 여기에 조건문을 완성해봐!
      new jBox("Notice", {
        content: "링크 칸은 채워 두셔야 합니다!",
        color: "red",
        autoClose: 2000,
      })
      return // 함수를 여기서 끝내!
    }
    ```

---

### **문제 7 (script.js): http:// 또는 https://가 없으면 추가하는 코드를 완성해봐.**

*   **어디를 봐야 해?** `mission/script.js` 파일의 `upload` 함수 안, 링크 유효성 검사 바로 아래를 봐.
*   **뭘 해야 해?** `link` 변수가 `http://`나 `https://`로 시작하는지 확인하고, 만약 아니라면 `https://`를 `link` 변수 앞에 붙여줘.
*   **힌트:** `test()` 메서드와 정규표현식 `^https?:\/\//i`를 사용해봐. `i`는 대소문자 구분을 안 한다는 뜻이야.
*   **코드 조각:**
    ```javascript
    if (!/^https?:\/\//i.test(link)) { // 여기에 조건문을 완성해봐!
      link = "https://" + link // 여기에 코드를 넣어봐!
    }
    ```

---

### **문제 8 (script.js): 랜덤 숫자와 문자를 생성하는 코드를 완성해봐.**

*   **어디를 봐야 해?** `mission/script.js` 파일의 `randomnumber` 함수 안을 봐.
*   **뭘 해야 해?** `docid`를 만들 때 쓸 랜덤 숫자 `a`와 랜덤 대문자 `b`를 생성하는 코드를 완성해줘.
*   **힌트:**
    *   `Math.random()`은 0 이상 1 미만의 난수를 만들어.
    *   `Math.floor()`는 소수점 아래를 버려.
    *   `String.fromCharCode()`는 아스키 코드 값을 문자로 바꿔줘. 대문자 'A'는 65, 'Z'는 90이야.
*   **코드 조각:**
    ```javascript
    const a = Math.floor(Math.random() * 999999) + 10000 // 힌트: 10000부터 999999까지의 랜덤 숫자
    const b = String.fromCharCode(Math.floor(Math.random() * 26) + 65) // 힌트: A부터 Z까지의 랜덤 대문자
    docid = b + a
    ```

---

### **문제 9 (script.js): Firestore에서 문서를 가져오는 코드를 완성해봐.**

*   **어디를 봐야 해?** `mission/script.js` 파일의 `randomnumber` 함수 안, `while` 반복문 안을 봐.
*   **뭘 해야 해?** `doc(db, "links", docid)`로 Firestore 문서 참조를 만들고, `getDoc()` 함수로 해당 문서를 가져와서 `docSnap` 변수에 저장해봐. 컬렉션 이름은 `link`로 해.
*   **힌트:** `await` 키워드를 사용해서 비동기 작업이 끝날 때까지 기다려야 해.
*   **코드 조각:**
    ```javascript
    const docRef = doc(db, "link", docid) // 힌트: 컬렉션 이름은 'link'로 해!
    const docSnap = await getDoc(docRef) // 힌트: 문서 가져오기 함수를 써봐!
    ```

---

### **문제 10 (script.js): Firestore에 데이터를 저장하는 코드를 완성해봐.**

*   **어디를 봐야 해?** `mission/script.js` 파일의 `handlelinkupload` 함수 안을 봐.
*   **뭘 해야 해?** `doc(db, "links", docid)`로 Firestore 문서 참조를 만들고, `setDoc()` 함수를 사용해서 `docRef`에 `link` 데이터를 저장해봐. 컬렉션 이름은 `link`로 해.
*   **힌트:** `setDoc` 함수는 첫 번째 인자로 문서 참조를, 두 번째 인자로 저장할 데이터를 객체 형태로 받아.
*   **코드 조각:**
    ```javascript
    const docRef = doc(db, "link", docid) // 힌트: 컬렉션 이름은 'link'로 해!

    try {
      await setDoc(docRef, { link: link }) // 힌트: 데이터 저장 함수를 써봐!
      // ... (나머지 코드)
    }
    ```

---

### **문제 11 (app.js): Firebase 모듈들을 import 해봐.**

*   **어디를 봐야 해?** `mission/app.js` 파일 맨 위를 봐.
*   **뭘 해야 해?** `script.js`와 비슷하게, `app.js`에서도 Firebase 기능을 쓰려면 필요한 모듈들을 `import` 해야 해. `initializeApp`, `getFirestore`, `doc`, `getDoc` 같은 함수들을 불러와야 해.
*   **힌트:** `jBox`도 `import` 해야 해.
*   **코드 조각:**
    ```javascript
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"
    import {
      getFirestore,
      doc,
      getDoc, // 힌트: 데이터를 읽는 함수
    } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
    import jBox from "https://cdn.jsdelivr.net/npm/jbox@1.0.0/dist/jBox.all.min.js" // jBox 모듈 import
    ```

---

### **문제 12 (app.js): Firebase 설정을 너의 프로젝트 설정으로 바꿔봐.**

*   **어디를 봐야 해?** `mission/app.js` 파일에서 `firebaseConfig` 객체를 찾아봐.
*   **뭘 해야 해?** `script.js`에서 했던 것처럼, `YOUR_API_KEY`, `YOUR_PROJECT_ID` 같은 플레이스홀더들을 너의 실제 Firebase 프로젝트 정보로 바꿔줘.
*   **힌트:** `script.js`에 넣었던 정보랑 똑같이 넣어주면 돼.
*   **코드 조각:**
    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID",
    }
    ```

---

### **문제 13 (app.js): Firestore에서 문서를 가져오는 코드를 완성해봐.**

*   **어디를 봐야 해?** `mission/app.js` 파일의 `check` 함수 안을 봐.
*   **뭘 해야 해?** `doc(db, "shortLinks", code)`로 Firestore 문서 참조를 만들고, `getDoc()` 함수로 해당 문서를 가져와서 `docSnap` 변수에 저장해봐. 컬렉션 이름은 `link`로 해.
*   **힌트:** `script.js`에서 데이터를 저장할 때 썼던 컬렉션 이름이랑 똑같이 해야 해.
*   **코드 조각:**
    ```javascript
    const docRef = doc(db, "link", code) // 힌트: 컬렉션 이름은 'link'로 해!
    const docSnap = await getDoc(docRef) // 힌트: 문서 가져오기 함수를 써봐!
    ```

---

### **문제 14 (app.js): 문서가 존재하는지 확인하는 조건문을 완성해봐.**

*   **어디를 봐야 해?** `mission/app.js` 파일의 `check` 함수 안, `docSnap`을 가져온 바로 다음 줄을 봐.
*   **뭘 해야 해?** `docSnap` 변수가 가리키는 문서가 실제로 존재하는지 확인하는 조건문을 만들어줘.
*   **힌트:** `docSnap` 객체에는 문서 존재 여부를 알려주는 속성이 있어.
*   **코드 조각:**
    ```javascript
    if (docSnap.exists()) { // 힌트: 문서가 존재하는지 확인하는 코드를 넣어봐!
      var link = docSnap.data().link
      // ... (나머지 코드)
    }
    ```

---

### **문제 15 (app.js): 원본 링크로 이동하는 코드를 완성해봐.**

*   **어디를 봐야 해?** `mission/app.js` 파일의 `check` 함수 안, `if (docSnap.exists())` 블록 안을 봐.
*   **뭘 해야 해?** `link` 변수에 저장된 원본 링크로 브라우저를 이동시키는 코드를 넣어줘.
*   **힌트:** `window.location.href` 속성을 사용하면 돼.
*   **코드 조각:**
    ```javascript
    window.location.href = link // 힌트: 원본 링크로 이동하는 코드를 넣어봐!
    ```

---

### **문제 16 (app.js): 익명 로그인 함수를 완성해봐.**

*   **어디를 봐야 해?** `mission/app.js` 파일에서 `const auth = getAuth();` 바로 아래를 봐.
*   **뭘 해야 해?** `script.js`에서 했던 것처럼, `signInAnonymously(auth)` 함수를 호출해서 익명 로그인을 시도하게 해.
*   **힌트:** `then()`과 `catch()` 블록도 같이 완성해줘.
*   **코드 조각:**
    ```javascript
    signInAnonymously(auth)
      .then(() => {
        // 로그인 성공 시 실행될 코드
      })
      .catch((error) => {
        // 로그인 실패 시 실행될 코드
      })
    ```

---

### **문제 17 (app.js): URL에서 단축 코드를 추출하는 코드를 완성해봐.**

*   **어디를 봐야 해?** `mission/app.js` 파일에서 `const fullUrl = window.location.href;` 바로 아래를 봐.
*   **뭘 해야 해?** `fullUrl` 변수에서 단축 코드를 추출해서 `code` 변수에 저장해줘. Firebase 호스팅 URL 형식 (`your-project.web.app/단축코드`)을 고려해야 해.
*   **힌트:** `fullUrl.split("/")`를 사용해서 URL을 `/` 기준으로 나눈 배열에서 몇 번째 요소가 단축 코드인지 찾아봐.
*   **코드 조각:**
    ```javascript
    const code = fullUrl.split("/")[3] // 힌트: 배열의 몇 번째 인덱스일까?
    ```

---

### **문제 18 (app.js): localStorage에서 링크를 가져오는 코드를 완성해봐.**

*   **어디를 봐야 해?** `mission/app.js` 파일 맨 아래를 봐.
*   **뭘 해야 해?** `localStorage.getItem()` 함수를 사용해서 `code`를 키로 하는 저장된 링크가 있는지 확인하고 `storedLink` 변수에 저장해봐.
*   **힌트:** `localStorage`는 브라우저에 데이터를 저장하는 공간이야.
*   **코드 조각:**
    ```javascript
    const storedLink = localStorage.getItem(code) // 힌트: 저장된 데이터 가져오기 함수를 써봐!
    ```

---

## ✨ 미션 완료 후

*   모든 문제를 해결하고 앱이 정상적으로 작동하는지 꼭 테스트해봐.
*   새로운 링크를 단축해보고, 그 단축 URL로 접속했을 때 원래 링크로 잘 이동하는지 확인해봐.
*   Firebase 콘솔의 Firestore Database에서 네가 추가한 데이터들이 잘 저장되고 있는지 확인해봐.

이 미션을 통해 너는 실제 웹 앱 개발에서 Firebase Firestore가 어떻게 쓰이는지 깊이 이해하게 될 거야. 포기하지 말고 끝까지 해내자! 화이팅!
