// DOM 요소들 선택
const card = document.querySelector(".card")
const front = document.querySelector(".front")
const back = document.querySelector(".back")

// 클릭 카운터 변수
let count = 0

// 카드 클릭 이벤트 리스너
card.addEventListener("click", () => {
  count++

  // 첫 번째 클릭일 때의 조건을 작성하세요 (count === 1)
  if (count === 1) {
    // 앞면에 'front-visible' 클래스를 추가하세요
    front.classList.add("front-visible")
    // 뒷면에 'back-visible' 클래스를 추가하세요
    back.classList.add("back-visible")
    count++
  } else {
    // 앞면에서 'front-visible' 클래스를 제거하세요
    front.classList.remove("front-visible")
    // 뒷면에서 'back-visible' 클래스를 제거하세요
    back.classList.remove("back-visible")
    count = 0
  }
})

// QR코드 공유 기능
const share = document.querySelector(".sharebtn")
const Swal = window.Swal // SweetAlert2 라이브러리 사용

share.addEventListener("click", () => {
  // 현재 페이지 URL 가져오기
  var url = window.location.href

  // SweetAlert2를 사용해서 QR코드 팝업을 띄우세요
  Swal.fire({
    imageUrl: "https://api.qrserver.com/v1/create-qr-code/?data=" + url + "&size=70x70",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "닫기",
  })
})

// 전체화면 기능
const shareBtn = document.querySelector(".share-btn")
const svgBox = document.querySelector("#svgbox")

// 전체화면 지원 여부 확인
if (!document.fullscreenEnabled) {
  console.log("전체화면을 지원하지 않는 기기입니다.")
  alert("전체화면을 지원하지 않는 기기입니다.")
} else {
  // 가로 모드 확인
  if (window.innerHeight > window.innerWidth) {
    alert("화면을 가로로 돌려주세요.")
    window.location.reload()
  }

  // 화면 회전 이벤트 리스너
  window.addEventListener(
    "orientationchange",
    () => {
      if (window.orientation == 0) {
        alert("화면을 가로로 돌려주세요.")
        window.location.reload()
      }
    },
    false,
  )

  // 전체화면 요청
  var elem = document.getElementById("fullscreen")
  elem.addEventListener("click", () => {
    var el = document.documentElement,
      rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen
    rfs.call(el)
  })

  // 전체화면 상태 확인 함수를 완성하세요
  function isFullScreen() {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      document.webkitIsFullScreen ||
      document.mozFullScreen
    )
  }

  // 전체화면일 때 카드 표시/숨김 함수를 완성하세요
  function showCard() {
    if (isFullScreen() === true) {
      // 전체화면일 때: 카드 보이기, 안내문구 숨기기
      document.querySelector(".card").style.display = "block"
      document.querySelector("#clickbait").style.display = "none"
      document.querySelector(".sharebtn").style.display = "block"
    }
    if (isFullScreen() === undefined || isFullScreen() === false) {
      // 전체화면이 아닐 때: 카드 숨기기, 안내문구 보이기
      document.querySelector(".card").style.display = "none"
      document.querySelector("#clickbait").style.display = "block"
      document.querySelector(".sharebtn").style.display = "none"
    }
  }

  // 0.1초마다 전체화면 상태 확인
  setInterval(() => {
    showCard()
  }, 100)
}
