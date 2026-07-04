// 답안 11: Firebase 모듈들 import
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"
import {
  getFirestore,
  doc,
  getDoc, // 데이터를 읽는 함수
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js"
import jBox from "https://cdn.jsdelivr.net/npm/jbox@1.0.0/dist/jBox.all.min.js" // jBox 선언

// 답안 12: Firebase 설정 (실제 프로젝트 설정으로 변경 필요)
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
  measurementId: "G-XXXXXXXXXX",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function check(code) {
  // 답안 13: Firestore에서 문서 가져오기
  const docRef = doc(db, "link", code)
  const docSnap = await getDoc(docRef)

  // 답안 14: 문서가 존재하는지 확인
  if (docSnap.exists()) {
    var link = docSnap.data().link
    console.log(link)
    localStorage.setItem(code, link)
    document.getElementById("err").innerText = link + "로 이동중입니다..."
    // 답안 15: 원본 링크로 이동
    window.location.href = link
  }
}

const auth = getAuth()
// 답안 16: 익명 로그인 함수
signInAnonymously(auth)
  .then(() => {
    new jBox("Notice", {
      content: "곧 이동이 완료됩니다...",
      color: "black",
      autoClose: 3000,
    })
  })
  .catch((error) => {
    new jBox("Notice", {
      content: "Authentication problem occured. Please Contact to solve problem.",
      color: "red",
      autoClose: 3000,
    })
  })

console.log("ready")
const fullUrl = window.location.href
console.log(fullUrl)
// 답안 17: URL에서 단축 코드 추출
const code = fullUrl.split("/")[3]
console.log(code)

// 답안 18: localStorage에서 링크 가져오기
const storedLink = localStorage.getItem(code)
if (storedLink) {
  console.log("Link found in local storage: " + storedLink)
  document.getElementById("err").innerText = "You're about to be redirected to: " + storedLink
  window.location.href = storedLink
} else {
  check(code)
}
