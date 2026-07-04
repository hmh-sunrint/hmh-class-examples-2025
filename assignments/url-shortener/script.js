// 문제 2: Firebase 모듈들을 import 하세요
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"
import {
  getFirestore,
  doc,
  setDoc, // 힌트: 데이터를 저장하는 함수
  getDoc, // 힌트: 데이터를 읽는 함수
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js"

// 문제 3: Firebase 설정을 여러분의 프로젝트 설정으로 변경하세요
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // 여러분의 API 키
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // 여러분의 프로젝트 도메인
  projectId: "YOUR_PROJECT_ID", // 여러분의 프로젝트 ID
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// 단축 URL 생성 완료 시 보여줄 모달
function showurl(docid) {
  const baseUrl = window.location.origin
  new jBox("Modal", {
    title: "업로드 완료!",
    content: `
      Shorten Link: <a href="${baseUrl}/${docid}">${baseUrl}/${docid}</a><br><br>
      <button class="btn btn-primary" onclick="navigator.clipboard.writeText('${baseUrl}/${docid}');">Copy To Clipboard</button>
      <button class="btn btn-danger" onclick="window.location.reload();">Close</button>
    `,
  }).open()
}

document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth()
  // 문제 4: 익명 로그인 함수를 완성하세요
  signInAnonymously(auth)
    .then(() => {
      new jBox("Notice", {
        content: "반가워요! 축약하고 싶은 링크를 입력 해주세요.",
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

  const button = document.getElementById("make")
  if (button) {
    // 문제 5: 버튼 클릭 이벤트를 연결하세요
    button.addEventListener("click", upload)
  }
})

async function upload() {
  let link = document.getElementById("link").value.trim()

  // 문제 6: 링크가 비어있는지 확인하는 조건문을 완성하세요
  if (!link) {
    new jBox("Notice", {
      content: "링크 칸은 채워 두셔야 합니다!",
      color: "red",
      autoClose: 2000,
    })
    return
  }

  // 문제 7: http:// 또는 https://가 없으면 추가하는 코드를 완성하세요
  if (!/^https?:\/\//i.test(link)) {
    link = "http://" + link
  }

  const docid = await randomnumber()
  await handlelinkupload(docid, link)
}

async function randomnumber() {
  let docExists = true
  let docid = null
  while (docExists) {
    // 문제 8: 랜덤 숫자와 문자를 생성하는 코드를 완성하세요
    const a = Math.floor(Math.random() * 1000) + 1000
    const b = String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    docid = b + a

    // 문제 9: Firestore에서 문서를 가져오는 코드를 완성하세요
    const docRef = doc(db, "links", docid) // 컬렉션 이름
    const docSnap = await getDoc(docRef) // 문서 가져오기 함수

    if (!docSnap.exists()) {
      docExists = false
    }
  }
  return docid
}

async function handlelinkupload(docid, link) {
  const loadingModal = new jBox("Modal", {
    title: "링크 축약 중입니다...",
    content: "",
    closeOnEsc: false,
    closeOnClick: false,
    closeButton: false,
  })
  loadingModal.open()

  // 문제 10: Firestore에 데이터를 저장하는 코드를 완성하세요
  const docRef = doc(db, "links", docid) // 컬렉션 이름

  try {
    await setDoc(docRef, { link: link }) // 데이터 저장 함수
    loadingModal.close()
    showurl(docid)
  } catch (error) {
    console.error("Error writing document: ", error)
    loadingModal.close()
    new jBox("Notice", {
      content: "Failed to upload. If this problem continues, please contact us.",
      color: "red",
      autoClose: 2000,
    })
  }
}
