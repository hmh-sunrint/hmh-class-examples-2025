// 전역 변수들
let packages = []; // 택배 데이터 저장
let storageBoxes = []; // 보관함 상태 저장
const ADMIN_PASSWORD = "admin123"; // 관리자 비밀번호
const TOTAL_BOXES = 48; // 전체 보관함 개수

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // TODO: 초기화 함수들을 호출해보셈
    // initializeStorage(), loadData(), updateTime() 등이 필요해
});

/**
 * 보관함 초기화 함수
 * TODO: 전체 보관함을 빈 상태로 초기화하는 코드를 작성해보셈
 */
function initializeStorage() {
    // 힌트: for문을 사용해서 TOTAL_BOXES만큼 반복하면 돼
    // 각 보관함은 { id, isEmpty, size, packageId } 구조로 만들면 돼
}

/**
 * 로컬 스토리지에서 데이터 불러오기
 * TODO: localStorage.getItem()을 사용해서 데이터를 불러와보셈
 */
function loadData() {
    // 힌트: 'packages'와 'storageBoxes' 키로 저장된 데이터를 불러오면 돼
    // JSON.parse()를 사용해서 문자열을 객체로 변환해야 해
}

/**
 * 로컬 스토리지에 데이터 저장하기
 * TODO: localStorage.setItem()을 사용해서 데이터를 저장해보셈
 */
function saveData() {
    // 힌트: JSON.stringify()를 사용해서 객체를 문자열로 변환해야 해
}

/**
 * 현재 시간 업데이트 함수
 * TODO: 현재 시간을 화면에 표시하는 코드를 작성해보셈
 */
function updateTime() {
    // 힌트: new Date().toLocaleString('ko-KR')을 사용하면 돼
}

/**
 * 화면 전환 함수
 * TODO: 모든 화면을 숨기고 선택된 화면만 보이게 하는 코드를 작성해보셈
 */
function showScreen(screenId) {
    // 힌트: querySelectorAll('.screen')으로 모든 화면을 선택하고
    // forEach로 반복해서 'hidden' 클래스를 추가하면 돼
    // 그 다음에 선택된 화면에서만 'hidden' 클래스를 제거하면 돼
}

/**
 * 택배 찾기 함수
 * TODO: 입력된 번호와 비밀번호로 택배를 찾는 코드를 작성해보셈
 */
function pickupPackage() {
    // 힌트: document.getElementById()로 입력값을 가져오고
    // packages 배열에서 find()나 findIndex()로 택배를 찾으면 돼
    // 찾은 택배는 배열에서 제거하고 보관함도 비워야 해
}

/**
 * 택배 맡기기 함수
 * TODO: 새로운 택배를 보관함에 저장하는 코드를 작성해보셈
 */
function depositPackage() {
    // 힌트: 입력값 검증 -> 빈 보관함 찾기 -> 새 택배 객체 생성 -> 저장
    // generateTrackingNumber()와 generatePassword() 함수를 사용하면 돼
}

/**
 * 택배 번호 생성 함수
 * TODO: 고유한 택배 번호를 생성하는 코드를 작성해보셈
 */
function generateTrackingNumber() {
    // 힌트: 'PKG' + 현재시간 + 랜덤숫자 조합으로 만들면 돼
    // Date.now()와 Math.random()을 활용해보셈
}

/**
 * 비밀번호 생성 함수
 * TODO: 4자리 숫자 비밀번호를 생성하는 코드를 작성해보셈
 */
function generatePassword() {
    // 힌트: Math.floor(1000 + Math.random() * 9000)을 사용하면 돼
}

/**
 * QR코드 스캔 시뮬레이션 함수
 * TODO: QR코드 스캔을 시뮬레이션하는 코드를 작성해보셈
 */
function simulateQRScan() {
    // 힌트: Math.random()으로 성공/실패를 결정하고
    // 성공하면 랜덤한 택배 정보를 보여주면 돼
}

/**
 * 보관함 그리드 렌더링 함수
 * TODO: 보관함 상태를 시각적으로 표시하는 코드를 작성해보셈
 */
function renderStorageGrid() {
    // 힌트: storageBoxes 배열을 forEach로 반복하면서
    // 각 보관함의 상태에 따라 다른 CSS 클래스를 적용하면 돼
}

/**
 * 관리자 관련 함수들
 * TODO: 관리자 로그인과 관리자 화면 관련 함수들을 작성해보셈
 */
function showAdminLogin() {
    // 관리자 로그인 모달 표시
}

function adminLogin() {
    // 비밀번호 확인 후 관리자 화면으로 이동
}

function renderAdminScreen() {
    // 통계와 택배 목록 표시
}

/**
 * 알림 메시지 표시 함수
 * TODO: 사용자에게 메시지를 보여주는 코드를 작성해보셈
 */
function showNotification(message) {
    // 힌트: notification 요소를 찾아서 텍스트를 설정하고
    // 'hidden' 클래스를 제거했다가 3초 후에 다시 추가하면 돼
}