// 필요한 HTML 요소들을 가져오자!
const qrContentInput = document.getElementById("qrContent") // QR 코드에 넣을 내용 입력창
const qrColorDarkInput = document.getElementById("qrColorDark") // QR 코드 색상 입력창
const qrColorLightInput = document.getElementById("qrColorLight") // 배경 색상 입력창
const generateBtn = document.getElementById("generateBtn") // QR 코드 생성 버튼
const qrcodeDiv = document.getElementById("qrcode") // QR 코드가 표시될 공간

// QRCode 라이브러리 선언
const QRCode = window.QRCode

// 'QR 코드 생성하기!' 버튼을 누르면 이 함수가 실행될 거야!
generateBtn.addEventListener("click", () => {
  const content = qrContentInput.value // 입력된 내용 가져오기
  const colorDark = qrColorDarkInput.value // 입력된 QR 코드 색상 가져오기
  const colorLight = qrColorLightInput.value // 입력된 배경 색상 가져오기

  // 내용이 없으면 QR 코드를 만들 수 없으니 경고 메시지를 띄우자!
  if (!content) {
    alert("QR 코드에 넣을 내용을 입력해주세요!")
    return // 함수를 여기서 끝내기
  }

  // 이전에 만들어진 QR 코드가 있다면 지워줘야 해.
  // 안 그러면 새 QR 코드가 이전 것 위에 겹쳐서 보일 수 있어!
  qrcodeDiv.innerHTML = ""

  // QR 코드 생성 라이브러리를 초기화하고 QR 코드를 생성하는 코드를 작성해봐!
  new QRCode(qrcodeDiv, {
    // 여기에 'new' 키워드를 꼭 붙여야 해!
    text: content, // 사용자가 입력한 내용
    width: 200, // QR 코드의 너비
    height: 200, // QR 코드의 높이
    colorDark: colorDark, // QR 코드의 색상
    colorLight: colorLight, // QR 코드 배경 색상
    correctLevel: QRCode.CorrectLevel.H, // QR 코드 오류 복원 레벨 (높을수록 복원력이 좋지만 복잡해져)
  })
  // 모르겠으면 qrcode.js 공식 문서를 찾아보면 'new QRCode(element, options)' 같은 걸 찾을 수 있을 거야!
  // 아니면 그냥 주석처리 해제하고 붙여넣기라도 해보셈
})
