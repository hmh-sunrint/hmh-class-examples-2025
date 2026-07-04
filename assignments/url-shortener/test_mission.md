
# Firebase 링크 단축 앱 미션 체크리스트 (`test_mission.md`)

## 1. 파일 준비 테스트
- [ ] `index.html`, `script.js`, `app.js` 파일이 `mission/` 폴더에 존재하는가?

## 2. Contact 링크 테스트
- [ ] `index.html`에서 Contact 링크의 `href`가 실제 이메일 주소(`mailto:...@gmail.com`)로 변경되어 있는가?

## 3. Firebase 모듈 import 테스트
- [ ] `script.js`와 `app.js`에서 `initializeApp`, `getFirestore`, `doc`, `setDoc`, `getDoc` 등 Firebase 모듈이 올바르게 import되어 있는가?
- [ ] `app.js`에서 jBox 모듈이 import되어 있는가?

## 4. Firebase 설정 테스트
- [ ] `script.js`와 `app.js`의 `firebaseConfig` 객체에 실제 프로젝트 정보가 입력되어 있는가?

## 5. 익명 로그인 테스트
- [ ] `script.js`와 `app.js`에서 `signInAnonymously(auth)` 함수가 정상적으로 호출되고, 성공/실패 처리(`then`, `catch`)가 구현되어 있는가?

## 6. 버튼 이벤트 테스트
- [ ] `script.js`에서 `id="make"` 버튼 클릭 시 `upload` 함수가 실행되는가?

## 7. 링크 입력값 검증 테스트
- [ ] `script.js`의 `upload` 함수에서 링크가 비어있을 때 경고 메시지가 출력되고 함수가 종료되는가?

## 8. 링크 프로토콜 자동 추가 테스트
- [ ] `script.js`의 `upload` 함수에서 입력값에 `http://` 또는 `https://`가 없으면 자동으로 `https://`가 추가되는가?

## 9. 랜덤 코드 생성 테스트
- [ ] `script.js`의 `randomnumber` 함수에서 10000~999999 범위의 숫자와 A~Z 대문자가 조합된 코드가 생성되는가?

## 10. Firestore 문서 중복 체크 테스트
- [ ] `script.js`의 `randomnumber` 함수에서 Firestore의 `link` 컬렉션에 동일 코드가 없을 때만 코드가 사용되는가?

## 11. Firestore 저장 테스트
- [ ] `script.js`의 `handlelinkupload` 함수에서 Firestore의 `link` 컬렉션에 링크 데이터가 정상적으로 저장되는가?

## 12. 단축 URL 접속 테스트
- [ ] 단축 URL로 접속 시 `app.js`에서 Firestore의 `link` 컬렉션에서 원본 링크를 정상적으로 가져오는가?
- [ ] 문서가 존재하지 않을 때 에러 메시지가 출력되는가?

## 13. 원본 링크 이동 테스트
- [ ] 단축 URL 접속 시 원본 링크로 브라우저가 정상적으로 이동하는가?

## 14. URL 코드 추출 테스트
- [ ] `app.js`에서 `window.location.href`에서 단축 코드가 올바르게 추출되는가?

## 15. localStorage 캐시 테스트
- [ ] `app.js`에서 localStorage에 저장된 링크가 있을 경우 해당 링크로 이동하는가?

## 16. 콘솔 오류 테스트
- [ ] 모든 동작 과정에서 F12 Console에 오류 메시지가 없는가?

## 17. Firestore 데이터 확인 테스트
- [ ] Firebase 콘솔의 Firestore Database에서 단축 링크 데이터가 정상적으로 저장/조회되는가?