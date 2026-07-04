// 답안 2: Firebase 모듈들 import
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"
import {
  getFirestore,
  doc,
  setDoc, // 데이터를 저장하는 함수
  getDoc, // 데이터를 읽는 함수
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js"

// 답안 3: Firebase 설정 (실제 프로젝트 설정으로 변경 필요)
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
  // 답안 4: 익명 로그인 함수
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
    // 답안 5: 버튼 클릭 이벤트 연결
    button.addEventListener("click", upload)
  }
})

async function upload() {
  let link = document.getElementById("link").value.trim()

  // 답안 6: 링크가 비어있는지 확인
  if (!link) {
    new jBox("Notice", {
      content: "링크 칸은 채워 두셔야 합니다!",
      color: "red",
      autoClose: 2000,
    })
    return
  }

  // 답안 7: http:// 또는 https:// 추가
  if (!/^https?:\/\//i.test(link)) {
    link = "https://" + link
  }

  const docid = await randomnumber()
  await handlelinkupload(docid, link)
}

async function randomnumber() {
  let docExists = true
  let docid = null
  while (docExists) {
    // 답안 8: 랜덤 숫자와 문자 생성
    const a = Math.floor(Math.random() * 999999) + 10000
    const b = String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    docid = b + a

    // 답안 9: Firestore에서 문서 가져오기
    const docRef = doc(db, "link", docid)
    const docSnap = await getDoc(docRef)

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

  // 답안 10: Firestore에 데이터 저장
  const docRef = doc(db, "link", docid)

  try {
    await setDoc(docRef, { link: link })
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
