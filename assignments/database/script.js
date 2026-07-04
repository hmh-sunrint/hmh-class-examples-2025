// Firebase 모듈 import (CDN 기반)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"

// Firebase 설정 (자신의 프로젝트 값으로 바꾸세요)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
}

// Firebase 초기화
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// 메시지 표시 함수
function showMessage(message, type = "success") {
  const messageDiv = document.getElementById("message")
  messageDiv.textContent = message
  messageDiv.className = type
  setTimeout(() => {
    messageDiv.textContent = ""
    messageDiv.className = ""
  }, 3000)
}

// 1. 데이터 추가 (CREATE)
window.addData = async () => {
  const name = document.getElementById("nameInput").value
  const email = document.getElementById("emailInput").value

  if (!name || !email) {
    showMessage("이름과 이메일을 모두 입력해주세요.", "error")
    return
  }

  try {
    await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      createdAt: new Date(),
    })
    showMessage("데이터가 성공적으로 추가되었습니다!")
    document.getElementById("nameInput").value = ""
    document.getElementById("emailInput").value = ""
    window.readAllData()
  } catch (error) {
    console.error("데이터 추가 오류:", error)
    showMessage("데이터 추가에 실패했습니다.", "error")
  }
}

// 2. 데이터 조회 (READ)
window.readAllData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"))
    const dataList = document.getElementById("dataList")
    dataList.innerHTML = ""

    if (querySnapshot.empty) {
      dataList.innerHTML = "<p>저장된 데이터가 없습니다.</p>"
      return
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const dataItem = document.createElement("div")
      dataItem.className = "data-item"
      dataItem.innerHTML = `
        <strong>ID:</strong> ${doc.id}<br>
        <strong>이름:</strong> ${data.name}<br>
        <strong>이메일:</strong> ${data.email}<br>
        <strong>생성일:</strong> ${data.createdAt?.toDate().toLocaleString()}
      `
      dataList.appendChild(dataItem)
    })
    showMessage("데이터를 성공적으로 조회했습니다!")
  } catch (error) {
    console.error("데이터 조회 오류:", error)
    showMessage("데이터 조회에 실패했습니다.", "error")
  }
}

// 3. 데이터 수정 (UPDATE)
window.updateData = async () => {
  const id = document.getElementById("updateId").value
  const name = document.getElementById("updateName").value
  const email = document.getElementById("updateEmail").value

  if (!id) {
    showMessage("수정할 ID를 입력해주세요.", "error")
    return
  }

  if (!name && !email) {
    showMessage("수정할 이름 또는 이메일을 입력해주세요.", "error")
    return
  }

  try {
    const docRef = doc(db, "users", id)
    const updateData = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    updateData.updatedAt = new Date()

    await updateDoc(docRef, updateData)
    showMessage("데이터가 성공적으로 수정되었습니다!")
    document.getElementById("updateId").value = ""
    document.getElementById("updateName").value = ""
    document.getElementById("updateEmail").value = ""
    window.readAllData()
  } catch (error) {
    console.error("데이터 수정 오류:", error)
    showMessage("데이터 수정에 실패했습니다. ID를 확인해주세요.", "error")
  }
}

// 4. 데이터 삭제 (DELETE)
window.deleteData = async () => {
  const id = document.getElementById("deleteId").value

  if (!id) {
    showMessage("삭제할 ID를 입력해주세요.", "error")
    return
  }

  if (!confirm("정말로 이 데이터를 삭제하시겠습니까?")) {
    return
  }

  try {
    await deleteDoc(doc(db, "users", id))
    showMessage("데이터가 성공적으로 삭제되었습니다!")
    document.getElementById("deleteId").value = ""
    window.readAllData()
  } catch (error) {
    console.error("데이터 삭제 오류:", error)
    showMessage("데이터 삭제에 실패했습니다. ID를 확인해주세요.", "error")
  }
}

// 5. 페이지 로드시 데이터 자동 조회

document.addEventListener("DOMContentLoaded", () => {
  window.readAllData()
})
