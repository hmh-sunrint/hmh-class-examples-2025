
# 택배 무인보관함 키오스크 미션 체크리스트 (`test_mission.md`)

## 1. 파일 및 구조 테스트
- [ ] `index.html`, `script.js`, `style.css` 파일이 `mission/` 폴더에 존재하는가?
- [ ] 주요 함수와 변수(`packages`, `storageBoxes`, `TOTAL_BOXES`, 등)가 전역에서 선언되어 있는가?

## 2. 초기화 및 전역 변수 테스트
- [ ] `DOMContentLoaded` 이벤트에서 `initializeStorage`, `loadData`, `updateTime` 함수가 정상적으로 호출되는가?
- [ ] `TOTAL_BOXES` 값이 48로 설정되어 있는가?
- [ ] `ADMIN_PASSWORD`가 코드에 존재하는가?

## 3. 보관함 초기화 테스트
- [ ] `initializeStorage()` 함수가 48개의 보관함 객체를 생성하고, 각 보관함이 비어있는 상태로 초기화되는가?
- [ ] 초기화 후 `storageBoxes` 배열의 길이가 48인가?

## 4. 로컬 스토리지 테스트
- [ ] `loadData()` 함수가 localStorage에서 데이터를 정상적으로 불러오는가?
- [ ] `saveData()` 함수가 `packages`와 `storageBoxes`를 localStorage에 저장하는가?
- [ ] localStorage에 데이터가 없을 때 `initializeStorage()`가 호출되는가?

## 5. 화면 전환 테스트
- [ ] `showScreen(screenId)` 함수가 올바른 화면만 표시하고, 나머지는 숨기는가?
- [ ] `storageScreen` 진입 시 `renderStorageGrid()`가 호출되는가?
- [ ] `adminScreen` 진입 시 `renderAdminScreen()`이
