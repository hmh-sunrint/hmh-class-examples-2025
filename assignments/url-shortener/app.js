// 문제 11: Firebase 모듈들을 import 하세요
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"
import {
  getFirestore,
  doc,
  getDoc, // 힌트: 데이터를 읽는 함수
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js"
import jBox from "jbox" // jBox 모듈 import

// 문제 12: Firebase 설정을 여러분의 프로젝트 설정으로 변경하세요
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function check(code) {
  // 문제 13: Firestore에서 문서를 가져오는 코드를 완성하세요
  const docRef = doc(db, "shortLinks", code) // 컬렉션 이름
  const docSnap = await getDoc(docRef) // 문서 가져오기 함수

  // 문제 14: 문서가 존재하는지 확인하는 조건문을 완성하세요
  if (docSnap.exists()) {
    var link = docSnap.data().link
    console.log(link)
    localStorage.setItem(code, link)
    document.getElementById("err").innerText = link + "로 이동중입니다..."
    // 문제 15: 원본 링크로 이동하는 코드를 완성하세요
    window.location.href = link
  }
}

const auth = getAuth()
// 문제 16: 익명 로그인 함수를 완성하세요
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
// 문제 17: URL에서 단축 코드를 추출하는 코드를 완성하세요
const code = fullUrl.split("/")[4] // 힌트: 배열의 몇 번째 인덱스?
console.log(code)

// 문제 18: localStorage에서 링크를 가져오는 코드를 완성하세요
const storedLink = localStorage.getItem(code) // 힌트: 저장된 데이터 가져오기
if (storedLink) {
  console.log("Link found in local storage: " + storedLink)
  document.getElementById("err").innerText = "You're about to be redirected to: " + storedLink
  window.location.href = storedLink
} else {
  check(code)
}
