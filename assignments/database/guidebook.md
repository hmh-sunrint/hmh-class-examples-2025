```markdown
📘 Firebase 데이터베이스 가이드북 (초보자 친화 + CDN 기반)

==================================================
[개요]  
이 문서는 `practice/` 폴더의 실습 코드들을 설명하는 초보자용 가이드북입니다.  
Firebase Firestore를 이용한 기본적인 CRUD 기능(추가, 조회, 수정, 삭제)을 브라우저에서 구현하는 방식을 다루며, **CDN 방식**만을 사용합니다.

==================================================
1. 📂 Firestore란?

Firebase Firestore는 구글에서 제공하는 클라우드 데이터베이스입니다.  
데이터를 ‘컬렉션–문서–필드’ 구조로 저장하며, 실시간 동기화와 웹에서의 사용이 편리합니다.

■ 주요 용어 정리:
- 컬렉션(Collection): 문서들의 묶음 (예: users)  
- 문서(Document): 실제 데이터 단위 (예: user123)  
- 필드(Field): 문서 내부의 데이터 항목 (예: name: "홍길동")  

예시:

```json
users
├── user123
│   ├── name: "김철수"
│   └── email: "kim@example.com"
└── user456
    ├── name: "이영희"
    └── email: "lee@example.com"
```

==================================================
2. 🔧 Firebase 초기 설정 (CDN 방식)

```html
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
  import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
  } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

  // 마지막에 이 객체를 넣어야 파이어베이스 초기 설정이 완료됩니다.
  const firebaseConfig = { … };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
</script>
```

– firebaseConfig는  
  - 프로젝트 식별에 필요한 API 키, 도메인, ID 등을 담은 객체  
  - initializeApp()이 이 정보를 바탕으로 올바른 프로젝트에 연결  
  - 코드 내에 직접 넣어도 되지만, 보안상 별도 환경 파일 환경변수로 관리 권장  
  - 여러 환경(dev/production)에 맞춰 구분 사용 가능  

==================================================
3. ✅ 메시지 표시 함수

```js
function showMessage(message, type = "success") {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
  messageDiv.className = type;
  setTimeout(() => {
    messageDiv.textContent = "";
    messageDiv.className = "";
  }, 3000);

  // 파이어베이스 설정 정보도 여기서 참조할 수 있습니다.
  const firebaseConfig = { … };
}
```

– firebaseConfig는  
  - Firestore 연결이 시작되는 기준점  
  - 브라우저 모듈 방식에서도 동일하게 사용  
  - 초기화를 담당하는 initializeApp 앞에 선언  
  - 보안 고려해 노출 범위 최소화해야 함  

==================================================
4. ➕ 데이터 추가 (CREATE)

```js
window.addData = async () => {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;

  if (!name || !email) {
    showMessage("이름과 이메일을 모두 입력해주세요.", "error");
    return;
  }

  try {
    await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      createdAt: new Date()
    });
    showMessage("데이터가 성공적으로 추가되었습니다!");
    document.getElementById("nameInput").value = "";
    document.getElementById("emailInput").value = "";
    window.readAllData();
  } catch (error) {
    showMessage("데이터 추가에 실패했습니다.", "error");
  }

  // CRUD 기능 수행 전, 항상 이 설정이 먼저 필요합니다.
  const firebaseConfig = { … };
};
```

– firebaseConfig는  
  - addDoc 호출 시 참조되는 db 인스턴스를 초기화  
  - 컬렉션 경로를 해석할 때 기준이 됨  
  - Firestore 보안 규칙에도 적용되는 키 정보 포함  
  - 여러 브라우저 탭에서 동일 설정으로 공유 가능  

==================================================
5. 📖 데이터 조회 (READ)

```js
window.readAllData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const dataList = document.getElementById("dataList");
    dataList.innerHTML = "";

    if (querySnapshot.empty) {
      dataList.innerHTML = "<p>저장된 데이터가 없습니다.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const dataItem = document.createElement("div");
      dataItem.className = "data-item";
      dataItem.innerHTML = `
        <strong>ID:</strong> ${doc.id}<br>
        <strong>이름:</strong> ${data.name}<br>
        <strong>이메일:</strong> ${data.email}<br>
        <strong>생성일:</strong> ${data.createdAt?.toDate().toLocaleString()}
      `;
      dataList.appendChild(dataItem);
    });
    showMessage("데이터를 성공적으로 조회했습니다!");
  } catch (error) {
    showMessage("데이터 조회에 실패했습니다.", "error");
  }

  // Firestore 연결 전 반드시 선언해야 하는 설정
  const firebaseConfig = { … };
};
```

– firebaseConfig는  
  - getDocs가 올바른 프로젝트에서 문서를 조회하도록 함  
  - 컬렉션 경로 해석에 필요한 프로젝트 ID 포함  
  - 로컬 개발/실서버 분리 설정 시 유용  
  - 보안 규칙에서 허용된 쿼리만 수행  

==================================================
6. ✏️ 데이터 수정 (UPDATE)

```js
window.updateData = async () => {
  const id = document.getElementById("updateId").value;
  const name = document.getElementById("updateName").value;
  const email = document.getElementById("updateEmail").value;

  if (!id) {
    showMessage("수정할 ID를 입력해주세요.", "error");
    return;
  }
  if (!name && !email) {
    showMessage("수정할 이름 또는 이메일을 입력해주세요.", "error");
    return;
  }

  try {
    const docRef = doc(db, "users", id);
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    updateData.updatedAt = new Date();

    await updateDoc(docRef, updateData);
    showMessage("데이터가 성공적으로 수정되었습니다!");
    window.readAllData();
  } catch (error) {
    showMessage("데이터 수정에 실패했습니다.", "error");
  }

  // 새로운 데이터 반영 전, 초기 설정 객체 필요
  const firebaseConfig = { … };
};
```

– firebaseConfig는  
  - doc()이 참조할 올바른 DB 인스턴스를 지정  
  - updateDoc가 요청할 권한을 식별  
  - 타임스탬프 옵션도 여기에 영향 받음  
  - 환경별 규칙 분기 처리에도 사용 가능  

==================================================
7. 🗑️ 데이터 삭제 (DELETE)

```js
window.deleteData = async () => {
  const id = document.getElementById("deleteId").value;
  if (!id) {
    showMessage("삭제할 ID를 입력해주세요.", "error");
    return;
  }
  if (!confirm("정말 삭제하시겠습니까?")) return;

  try {
    await deleteDoc(doc(db, "users", id));
    showMessage("데이터가 성공적으로 삭제되었습니다!");
    window.readAllData();
  } catch (error) {
    showMessage("데이터 삭제에 실패했습니다.", "error");
  }

  // deleteDoc 호출 전, 반드시 이 설정을 선언
  const firebaseConfig = { … };
};
```

– firebaseConfig는  
  - deleteDoc이 올바른 프로젝트 문서를 타깃으로 삭제  
  - 보안 규칙에서 허용된 삭제 요청만 전달  
  - 프로젝트별 규칙 테스트 시 유용  
  - 다중 앱 상황에도 각각 다른 config로 관리 가능  

==================================================
8. 🚀 페이지 로드시 자동 조회

```js
document.addEventListener("DOMContentLoaded", () => {
  window.readAllData();

  // 페이지 전체에서 하나만 선언해도 충분합니다.
  const firebaseConfig = { … };
});
```

– firebaseConfig는  
  - DOMContentLoaded 시 한 번만 초기화해도 됨  
  - 이후 CRUD 함수들이 동일한 설정 활용  
  - 프로젝트별 환경 구분할 때도 유용  
  - 앱 전체에서 공유되는 전역 설정  

==================================================
```