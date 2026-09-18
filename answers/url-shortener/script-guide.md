# 🎬 Firebase 링크 단축 앱 미션 해설 가이드 (강사용)

안녕, 얘들아! 오늘은 우리가 함께 풀어본 Firebase 링크 단축 앱 미션의 정답을 하나씩 살펴보면서, 각 코드 조각이 어떤 역할을 하는지, 그리고 왜 그렇게 작성해야 하는지 자세히 알아보는 시간을 가질 거야.

## 🎯 진행 목표

*   `mission/` 폴더의 코드랑 `answer/` 폴더의 코드를 비교하면서 정답을 확인해볼 거야.
*   각 문제의 핵심 개념이랑 Firebase Firestore의 동작 원리를 이해할 거야.
*   실제 웹 앱 개발에서 데이터베이스가 어떻게 쓰이는지 파악해볼 거야.

## 📝 해설 진행 방식

각 문제 번호에 맞춰 `mission/script.js`랑 `answer/script.js`를 비교하면서 설명할 거야. 필요하다면 `index.html`이나 `404.html`, `app.js`도 같이 언급할게.

---

### **문제 1 (index.html): Contact 링크에 공개용 예시 이메일 주소를 사용해봐.**

*   **설명:** `index.html` 파일에서 `mailto:` 링크에 공개용 예시 주소를 넣는 문제였지? 공개 저장소에는 개인 이메일을 넣지 말고, 실제 배포 환경에서만 담당자가 관리하는 공식 연락처로 교체해야 해.
*   **코드:**
    \`\`\`html
    <!-- mission/index.html -->
    <a class="btn" href="mailto:contact@example.com" title="contact">Contact</a>

    <!-- answer/index.html -->
    <a class="btn" href="mailto:contact@example.com" title="contact">Contact</a>
    \`\`\`
*   **핵심:** HTML에서 링크를 만들 때 `href` 속성을 쓰고, 이메일 링크는 `mailto:` 접두사를 쓴다는 걸 기억해둬.

---

### **문제 2 (script.js): Firebase 모듈들을 import 해봐.**

*   **설명:** Firebase 기능을 쓰려면 해당 기능을 제공하는 모듈들을 불러와야 해. 마치 요리할 때 필요한 재료들을 미리 준비하는 것과 같아. `initializeApp`는 Firebase 앱을 시작하고, `getFirestore`, `doc`, `setDoc`, `getDoc` 같은 것들은 Firestore 데이터베이스 작업을 위한 함수들이야.
*   **코드:**
    \`\`\`javascript
    // mission/script.js
    // 문제 2: Firebase 모듈들을 import 하세요
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"
    import {
      getFirestore,
      doc,
      setDoc, // 힌트: 데이터를 저장하는 함수
      getDoc, // 힌트: 데이터를 읽는 함수
    } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
    // ... (나머지 코드)

    // answer/script.js
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"
    import {
      getFirestore,
      doc,
      setDoc,
      getDoc,
    } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
    // ... (나머지 코드)
    \`\`\`
*   **핵심:** `import` 문을 써서 외부 라이브러리나 모듈의 기능을 가져올 수 있어. Firebase는 웹에서 쓸 수 있도록 CDN(Content Delivery Network)을 통해 모듈을 제공해.

---

### **문제 3 (script.js): Firebase 설정을 너의 프로젝트 설정으로 바꿔봐.**

*   **설명:** 이 `firebaseConfig` 객체는 너의 Firebase 프로젝트 고유 정보야. 이 정보가 정확해야 우리 앱이 너의 데이터베이스랑 연결될 수 있어. Firebase 콘솔에서 프로젝트를 만들고 웹 앱을 등록하면 이 정보를 얻을 수 있어.
*   **코드:**
    \`\`\`javascript
    // mission/script.js
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY", // 너의 API 키
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // 너의 프로젝트 도메인
      projectId: "YOUR_PROJECT_ID", // 너의 프로젝트 ID
      // ... (나머지 필드)
    }

    // answer/script.js
    const firebaseConfig = {
      apiKey: "YOUR_ACTUAL_API_KEY", // 실제 너의 API 키
      authDomain: "your-project.firebaseapp.com", // 실제 너의 프로젝트 도메인
      projectId: "your-project-id", // 실제 너의 프로젝트 ID
      // ... (나머지 필드)
    }
    \`\`\`
*   **핵심:** `firebaseConfig`는 앱이랑 Firebase 프로젝트를 연결하는 '열쇠' 같다고 생각하면 돼. 이 정보는 외부에 보여도 괜찮지만, 실제 서비스에서는 환경 변수 같은 걸로 관리하는 게 더 안전해.

---

### **문제 4 (script.js): 익명 로그인 함수를 완성해봐.**

*   **설명:** 우리는 지금 간단한 링크 단축 앱이라 사용자가 회원가입 없이 바로 쓸 수 있도록 익명 로그인을 썼어. `signInAnonymously(auth)` 함수는 사용자가 누구인지 알 필요 없이 Firebase 서비스를 쓸 수 있게 해줘. 실제 앱에서는 이메일/비밀번호 로그인이나 구글 로그인 같은 걸 쓸 수 있어.
*   **코드:**
    \`\`\`javascript
    // mission/script.js
    signInAnonymously(auth)
      .then(() => {
        new jBox("Notice", {
          content: "반가워요! 축약하고 싶은 링크를 입력 해주세요.",
          color: "black",
          autoClose: 3000,
        })
      })
      .catch((error) => {
        // ... (에러 처리)
      })

    // answer/script.js
    signInAnonymously(auth)
      .then(() => {
        new jBox("Notice", {
          content: "반가워요! 축약하고 싶은 링크를 입력 해주세요.",
          color: "black",
          autoClose: 3000,
        })
      })
      .catch((error) => {
        const errorCode = error.code // 에러 코드
        const errorMessage = error.message // 에러 메시지
        new jBox("Notice", {
          content: "Authentication problem occured. Please Contact to solve problem.",
          color: "red",
          autoClose: 3000,
        })
      })
    \`\`\`
*   **핵심:** `signInAnonymously`는 Firebase Authentication의 한 기능으로, 사용자 인증 없이도 Firestore 같은 다른 Firebase 서비스에 접근할 수 있게 해줘. `then()`은 성공했을 때, `catch()`는 실패했을 때 실행되는 부분이야.

---

### **문제 5 (script.js): 버튼 클릭 이벤트를 연결해봐.**

*   **설명:** "생성" 버튼을 눌렀을 때 `upload` 함수가 실행되도록 연결하는 부분이야. 사용자의 행동에 반응해서 특정 기능을 실행하는 건 웹 앱의 기본이지.
*   **코드:**
    \`\`\`javascript
    // mission/script.js
    const button = document.getElementById("make")
    if (button) {
      button.addEventListener("click", upload) // 힌트: 이벤트 리스너 추가
    }

    // answer/script.js
    const button = document.getElementById("make")
    if (button) {
      button.addEventListener("click", upload)
    }
    \`\`\`
*   **핵심:** `addEventListener`는 특정 HTML 요소에 이벤트(여기서는 `click`)가 발생했을 때 실행될 함수(여기서는 `upload`)를 연결해 줘.

---

### **문제 6 (script.js): 링크가 비어있는지 확인하는 조건문을 완성해봐.**

*   **설명:** 사용자가 링크 입력 칸을 비워두고 "생성" 버튼을 눌렀을 때, 오류 메시지를 보여주는 건 아주 중요해. 사용자 경험을 좋게 만들고 불필요한 데이터베이스 작업을 막아줘.
*   **코드:**
    \`\`\`javascript
    // mission/script.js
    if (!link) { // 힌트: link 변수가 비어있는지 확인
      new jBox("Notice", {
        content: "링크 칸은 채워 두셔야 합니다!",
        color: "red",
        autoClose: 2000,
      })
      return
    }

    // answer/script.js
    if (!link) {
      new jBox("Notice", {
        content: "링크 칸은 채워 두셔야 합니다!",
        color: "red",
        autoClose: 2000,
      })
      return
    }
    \`\`\`
*   **핵심:** `!` 연산자는 '부정'을 의미해. `!link`는 `link` 변수가 비어있거나 `null`, `undefined`일 때 `true`가 돼. `return`은 함수를 즉시 종료시키는 역할을 해.

---

### **문제 7 (script.js): http:// 또는 https://가 없으면 추가하는 코드를 완성해봐.**

*   **설명:** 사용자가 `google.com`만 입력해도 `https://google.com`으로 만들어주는 편리한 기능이야. 웹 주소는 항상 `http`나 `https`로 시작해야 올바른 링크로 인식되니까.
*   **코드:**
    \`\`\`javascript
    // mission/script.js
    if (!/^https?:\/\//i.test(link)) { // 힌트: 정규표현식으로 http:// 또는 https:// 확인
      link = "http://" + link // 힌트: http:// 추가
    }

    // answer/script.js
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link
    }
    \`\`\`
*   **핵심:** `test()` 메서드는 정규표현식(`RegExp`)이 문자열에 일치하는지 확인하고 `true` 또는 `false`를 돌려줘. `^https?:\/\/`는 문자열이 `http://` 또는 `https://`로 시작하는지 확인하는 정규표현식이야.

---

### **문제 8 (script.js): 랜덤 숫자와 문자를 생성하는 코드를 완성해봐.**

*   **설명:** 단축 URL은 고유해야 하잖아? 그래서 이렇게 랜덤한 문자와 숫자를 조합해서 만들어. `Math.random()`은 0과 1 사이의 난수를 만들고, `Math.floor()`는 소수점 아래를 버려 정수로 만들어줘. `String.fromCharCode()`는 아스키 코드 값을 문자로 바꿔줘.
*   **코드:**
    \`\`\`javascript
    // mission/script.js
    const a = Math.floor(Math.random() * 1000) + 1000 // 힌트: 1000~1999 사이의 랜덤 숫자
    const b = String.fromCharCode(Math.floor(Math.random() * 26) + 65) // 힌트: A~Z 사이의 랜덤 대문자
    docid = b + a

    // answer/script.js
    const a = Math.floor(Math.random() * 999999) + 10000 // 10000~1009999 사이의 랜덤 숫자
    const b = String.fromCharCode(Math.floor(Math.random() * 26) + 65) // A~Z 사이의 랜덤 대문자
    docid = b + a
    \`\`\`
*   **핵심:** `Math.random()`이랑 `Math.floor()`를 조합해서 원하는 범위의 정수를 만들 수 있어. `String.fromCharCode()`랑 아스키 코드(A=65, Z=90)를 이용해 랜덤 문자를 만들 수 있어.

---

### **문제 9 (script.js): Firestore에서 문서를 가져오는 코드를 완성해봐.**

*   **설명:** 새로운 단축 URL ID를 만들기 전에, 혹시 이미 같은 ID가 있는지 확인하는 과정이야. 데이터 충돌을 막아주기 위해 중요해. `doc()` 함수로 특정 문서의 참조를 만들고, `getDoc()`으로 해당 문서를 가져와.
*   **코드:**
    \`\`\`javascript
    // mission/script.js
    const docRef = doc(db, "links", docid) // 힌트: 컬렉션 이름과 문서 ID로 문서 참조
    const docSnap = await getDoc(docRef) // 힌트: 문서 가져오기 함수

    // answer/script.js
    const docRef = doc(db, "link", docid) // 컬렉션 이름은 'link'
    const docSnap = await getDoc(docRef)
    \`\`\`
*   **핵심:** `doc(db, "컬렉션이름", "문서ID")`는 특정 문서의 위치를 가리키는 참조를 만들어. `getDoc(문서참조)`는 해당 문서의 스냅샷(현재 상태)을 비동기적으로 가져와. `docSnap.exists()`는 문서가 존재하는지 여부를 알려줘.

---

### **문제 10 (script.js): Firestore에 데이터를 저장하는 코드를 완성해봐.**

*   **설명:** 드디어 우리가 입력한 링크랑 생성된 단축 ID를 Firebase Firestore에 저장하는 부분이야. `setDoc` 함수를 써서 특정 ID로 문서를 만들고 그 안에 링크 정보를 넣는 거지.
*   **코드:**
    \`\`\`javascript
    // mission/script.js
    const docRef = doc(db, "links", docid) // 힌트: 컬렉션 이름과 문서 ID로 문서 참조

    try {
      await setDoc(docRef, { link: link }) // 힌트: 데이터 저장 함수
      // ... (나머지 코드)
    }

    // answer/script.js
    const docRef = doc(db, "link", docid) // 컬렉션 이름은 'link'

    try {
      await setDoc(docRef, { link: link })
      // ... (나머지 코드)
    }
    \`\`\`
*   **핵심:** `setDoc(문서참조, {데이터객체})`는 특정 문서 ID로 문서를 만들거나, 이미 있으면 덮어써. `addDoc`은 ID를 자동 생성하지만, `setDoc`은 우리가 직접 ID를 지정할 때 써.

---

### **문제 11 (app.js): Firebase 모듈들을 import 해봐.**

*   **설명:** `404.html`에서 실행되는 `app.js`도 Firebase Firestore를 써서 단축된 링크의 원본 URL을 찾아야 하니까, 필요한 Firebase 모듈들을 `import` 해야 해.
*   **코드:**
    \`\`\`javascript
    // mission/app.js
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"
    import {
      getFirestore,
      doc,
      getDoc, // 힌트: 데이터를 읽는 함수
    } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
    // ... (나머지 코드)

    // answer/app.js
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"
    import {
      getFirestore,
      doc,
      getDoc,
    } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
    // ... (나머기 코드)
    \`\`\`
*   **핵심:** `script.js`랑 마찬가지로, `app.js`도 Firebase 서비스를 쓰려면 필요한 모듈들을 불러와야 해.

---

### **문제 12 (app.js): Firebase 설정을 너의 프로젝트 설정으로 바꿔봐.**

*   **설명:** `app.js`도 `script.js`랑 똑같이 너의 Firebase 프로젝트 설정 정보가 필요해. 이 정보가 정확해야 `app.js`가 너의 Firestore 데이터베이스에 접근해서 원본 링크를 찾아올 수 있어.
*   **코드:**
    \`\`\`javascript
    // mission/app.js
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      // ... (나머지 필드)
    }

    // answer/app.js
    const firebaseConfig = {
      apiKey: "YOUR_ACTUAL_API_KEY",
      authDomain: "your-project.firebaseapp.com",
      projectId: "your-project-id",
      // ... (나머지 필드)
    }
    \`\`\`
*   **핵심:** Firebase 프로젝트 설정은 앱의 모든 부분에서 똑같이 써야 해.

---

### **문제 13 (app.js): Firestore에서 문서를 가져오는 코드를 완성해봐.**

*   **설명:** `app.js`의 `check` 함수는 URL에서 추출한 단축 코드를 써서 Firestore에서 해당 코드를 문서 ID로 가진 링크를 찾아와.
*   **코드:**
    \`\`\`javascript
    // mission/app.js
    const docRef = doc(db, "shortLinks", code) // 힌트: 컬렉션 이름과 코드(ID)로 문서 참조
    const docSnap = await getDoc(docRef) // 힌트: 문서 가져오기 함수

    // answer/app.js
    const docRef = doc(db, "link", code) // 컬렉션 이름은 'link'
    const docSnap = await getDoc(docRef)
    \`\`\`
*   **핵심:** `script.js`에서 `link` 컬렉션에 데이터를 저장했으니까, `app.js`에서도 똑같이 `link` 컬렉션을 참조해야 해.

---

### **문제 14 (app.js): 문서가 존재하는지 확인하는 조건문을 완성해봐.**

*   **설명:** `getDoc`으로 문서를 가져온 후에, 해당 문서가 실제로 존재하는지 확인해야 해. 존재하지 않는 단축 코드일 경우 오류를 막기 위함이야.
*   **코드:**
    \`\`\`javascript
    // mission/app.js
    if (docSnap.exists()) { // 힌트: 문서가 존재하는지 확인
      var link = docSnap.data().link
      // ... (나머지 코드)
    }

    // answer/app.js
    if (docSnap.exists()) {
      var link = docSnap.data().link
      // ... (나머지 코드)
    }
    \`\`\`
*   **핵심:** `docSnap.exists()`는 문서가 존재하면 `true`, 존재하지 않으면 `false`를 돌려줘.

---

### **문제 15 (app.js): 원본 링크로 이동하는 코드를 완성해봐.**

*   **설명:** Firestore에서 원본 링크를 성공적으로 가져왔다면, 이제 사용자를 그 링크로 이동시켜야 해. `window.location.href` 속성을 쓰면 현재 브라우저의 URL을 바꿀 수 있어.
*   **코드:**
    \`\`\`javascript
    // mission/app.js
    window.location.href = link // 힌트: 원본 링크로 이동

    // answer/app.js
    window.location.href = link
    \`\`\`
*   **핵심:** `window.location.href = "URL"`은 브라우저를 해당 URL로 리다이렉트(재이동)시켜.

---

### **문제 16 (app.js): 익명 로그인 함수를 완성해봐.**

*   **설명:** `script.js`랑 마찬가지로, `app.js`도 Firestore에 접근하려면 Firebase 인증이 필요해. 여기서는 익명 로그인을 쓸 거야.
*   **코드:**
    \`\`\`javascript
    // mission/app.js
    signInAnonymously(auth)
      .then(() => {
        // ... (성공 처리)
      })
      .catch((error) => {
        // ... (에러 처리)
      })

    // answer/app.js
    signInAnonymously(auth)
      .then(() => {
        new jBox("Notice", {
          content: "곧 이동이 완료됩니다...",
          color: "black",
          autoClose: 3000,
        })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        new jBox("Notice", {
          content: "Authentication problem occured. Please Contact to solve problem.",
          color: "red",
          autoClose: 3000,
        })
      })
    \`\`\`
*   **핵심:** Firebase 서비스를 쓰기 전에는 항상 인증 과정을 거쳐야 해. 익명 로그인은 가장 간단한 형태의 인증이야.

---

### **문제 17 (app.js): URL에서 단축 코드를 추출하는 코드를 완성해봐.**

*   **설명:** `404.html` 페이지로 접속했을 때의 URL은 `your-project.web.app/단축코드` 형태가 될 거야. 이 URL에서 `/`를 기준으로 나눠서 단축 코드를 추출해야 해.
*   **코드:**
    \`\`\`javascript
    // mission/app.js
    const code = fullUrl.split("/")[4] // 힌트: 배열의 몇 번째 인덱스?

    // answer/app.js
    const code = fullUrl.split("/")[3]
    \`\`\`
*   **핵심:** `split("/")`는 URL 문자열을 `/` 기준으로 나눠서 배열로 만들어줘. `https://your-project.web.app/ABC12345` 같은 URL에서 `split("/")[3]`은 `ABC12345`를 돌려줘. (인덱스는 0부터 시작: `https:`, ``, `your-project.web.app`, `ABC12345`)

---

### **문제 18 (app.js): localStorage에서 링크를 가져오는 코드를 완성해봐.**

*   **설명:** 한번 방문했던 링크는 다시 Firebase에 물어보지 않고 브라우저에 저장해두면 더 빠르게 이동할 수 있어. 이게 `localStorage`의 역할이야. `localStorage.getItem()`을 써서 저장된 데이터를 가져와.
*   **코드:**
    \`\`\`javascript
    // mission/app.js
    const storedLink = localStorage.getItem(code) // 힌트: 저장된 데이터 가져오기 함수를 써봐!

    // answer/app.js
    const storedLink = localStorage.getItem(code)
    \`\`\`
*   **핵심:** `localStorage`는 브라우저에 데이터를 영구적으로 저장할 수 있는 공간이야. `localStorage.setItem("키", "값")`으로 저장하고, `localStorage.getItem("키")`로 가져와.

---

##  마무리

오늘 우리는 Firebase Firestore를 이용한 링크 단축 앱의 모든 코드를 살펴봤어. 데이터베이스의 CRUD 원리, Firebase의 초기 설정, 그리고 웹 앱에서 데이터를 어떻게 다루고 활용하는지 이해하는 데 도움이 되었길 바라!

궁금한 점이 있다면 언제든지 물어봐!
