// 전역 변수들
let packages = []; // 택배 데이터 저장
let storageBoxes = []; // 보관함 상태 저장
const ADMIN_PASSWORD = "admin123"; // 관리자 비밀번호
const TOTAL_BOXES = 48; // 전체 보관함 개수

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeStorage();
    loadData();
    updateTime();
    setInterval(updateTime, 1000); // 1초마다 시간 업데이트
});

/**
 * 보관함 초기화 함수
 * 전체 보관함을 빈 상태로 초기화
 */
function initializeStorage() {
    storageBoxes = [];
    for (let i = 1; i <= TOTAL_BOXES; i++) {
        storageBoxes.push({
            id: i,
            isEmpty: true,
            size: null,
            packageId: null
        });
    }
    saveData();
}

/**
 * 로컬 스토리지에서 데이터 불러오기
 */
function loadData() {
    const savedPackages = localStorage.getItem('packages');
    const savedBoxes = localStorage.getItem('storageBoxes');
    
    if (savedPackages) {
        packages = JSON.parse(savedPackages);
    }
    
    if (savedBoxes) {
        storageBoxes = JSON.parse(savedBoxes);
    } else {
        initializeStorage();
    }
}

/**
 * 로컬 스토리지에 데이터 저장하기
 */
function saveData() {
    localStorage.setItem('packages', JSON.stringify(packages));
    localStorage.setItem('storageBoxes', JSON.stringify(storageBoxes));
}

/**
 * 현재 시간 업데이트 함수
 */
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('ko-KR');
    document.getElementById('currentTime').textContent = timeString;
}

/**
 * 화면 전환 함수
 * @param {string} screenId - 보여줄 화면의 ID
 */
function showScreen(screenId) {
    // 모든 화면 숨기기
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.add('hidden'));
    
    // 선택된 화면 보이기
    document.getElementById(screenId).classList.remove('hidden');
    
    // 특정 화면에 대한 추가 처리
    if (screenId === 'storageScreen') {
        renderStorageGrid();
    } else if (screenId === 'adminScreen') {
        renderAdminScreen();
    }
}

/**
 * 택배 찾기 함수
 * 입력된 번호와 비밀번호로 택배 찾기
 */
function pickupPackage() {
    const number = document.getElementById('pickupNumber').value.trim();
    const password = document.getElementById('pickupPassword').value.trim();
    
    // 입력값 검증
    if (!number || !password) {
        showNotification('택배 번호와 비밀번호를 모두 입력해주세요.');
        return;
    }
    
    // 택배 찾기
    const packageIndex = packages.findIndex(pkg => 
        pkg.trackingNumber === number && pkg.password === password
    );
    
    if (packageIndex === -1) {
        showNotification('택배 번호 또는 비밀번호가 올바르지 않습니다.');
        return;
    }
    
    const foundPackage = packages[packageIndex];
    
    // 보관함에서 제거
    const boxIndex = storageBoxes.findIndex(box => box.packageId === foundPackage.id);
    if (boxIndex !== -1) {
        storageBoxes[boxIndex].isEmpty = true;
        storageBoxes[boxIndex].size = null;
        storageBoxes[boxIndex].packageId = null;
    }
    
    // 택배 목록에서 제거
    packages.splice(packageIndex, 1);
    
    // 데이터 저장
    saveData();
    
    // 성공 메시지 및 화면 전환
    showNotification(`${foundPackage.recipient}님의 택배가 수령되었습니다.`);
    
    // 입력 필드 초기화
    document.getElementById('pickupNumber').value = '';
    document.getElementById('pickupPassword').value = '';
    
    setTimeout(() => {
        showScreen('mainScreen');
    }, 2000);
}

/**
 * 택배 맡기기 함수
 * 새로운 택배를 보관함에 저장
 */
function depositPackage() {
    const name = document.getElementById('recipientName').value.trim();
    const phone = document.getElementById('recipientPhone').value.trim();
    const size = document.getElementById('packageSize').value;
    
    // 입력값 검증
    if (!name || !phone) {
        showNotification('받는 사람 정보를 모두 입력해주세요.');
        return;
    }
    
    // 전화번호 형식 검증
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
        showNotification('전화번호 형식이 올바르지 않습니다. (010-0000-0000)');
        return;
    }
    
    // 빈 보관함 찾기
    const emptyBox = storageBoxes.find(box => box.isEmpty);
    if (!emptyBox) {
        showNotification('사용 가능한 보관함이 없습니다.');
        return;
    }
    
    // 새 택배 생성
    const newPackage = {
        id: Date.now(), // 고유 ID로 현재 시간 사용
        trackingNumber: generateTrackingNumber(),
        password: generatePassword(),
        recipient: name,
        phone: phone,
        size: size,
        depositTime: new Date().toISOString(),
        boxId: emptyBox.id
    };
    
    // 보관함 상태 업데이트
    emptyBox.isEmpty = false;
    emptyBox.size = size;
    emptyBox.packageId = newPackage.id;
    
    // 택배 목록에 추가
    packages.push(newPackage);
    
    // 데이터 저장
    saveData();
    
    // 성공 메시지
    showNotification(`택배가 ${emptyBox.id}번 보관함에 저장되었습니다.\n택배번호: ${newPackage.trackingNumber}\n비밀번호: ${newPackage.password}`);
    
    // 입력 필드 초기화
    document.getElementById('recipientName').value = '';
    document.getElementById('recipientPhone').value = '';
    document.getElementById('packageSize').value = 'small';
    
    setTimeout(() => {
        showScreen('mainScreen');
    }, 3000);
}

/**
 * 택배 번호 생성 함수
 * @returns {string} 생성된 택배 번호
 */
function generateTrackingNumber() {
    const prefix = 'PKG';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
}

/**
 * 비밀번호 생성 함수
 * @returns {string} 4자리 숫자 비밀번호
 */
function generatePassword() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * QR코드 스캔 시뮬레이션 함수
 */
function simulateQRScan() {
    // 시뮬레이션을 위해 랜덤하게 성공/실패 결정
    const isSuccess = Math.random() > 0.3; // 70% 성공률
    
    if (isSuccess && packages.length > 0) {
        // 랜덤한 택배 선택
        const randomPackage = packages[Math.floor(Math.random() * packages.length)];
        
        // 택배 정보 표시
        showNotification(`QR코드 인식 성공!\n받는 사람: ${randomPackage.recipient}\n택배번호: ${randomPackage.trackingNumber}`);
        
        // 자동으로 택배 찾기 화면으로 이동하고 정보 입력
        setTimeout(() => {
            showScreen('pickupScreen');
            document.getElementById('pickupNumber').value = randomPackage.trackingNumber;
            document.getElementById('pickupPassword').focus();
        }, 2000);
    } else {
        showNotification('QR코드를 인식할 수 없습니다. 다시 시도해주세요.');
    }
}

/**
 * 보관함 그리드 렌더링 함수
 */
function renderStorageGrid() {
    const grid = document.getElementById('storageGrid');
    grid.innerHTML = '';
    
    storageBoxes.forEach(box => {
        const boxElement = document.createElement('div');
        boxElement.className = 'storage-box';
        boxElement.textContent = box.id;
        
        if (box.isEmpty) {
            boxElement.classList.add('empty');
            boxElement.title = '빈 보관함';
        } else {
            boxElement.classList.add('occupied', box.size);
            const pkg = packages.find(p => p.id === box.packageId);
            if (pkg) {
                boxElement.title = `${pkg.recipient} (${pkg.size})`;
            }
        }
        
        grid.appendChild(boxElement);
    });
}

/**
 * 관리자 로그인 모달 표시
 */
function showAdminLogin() {
    document.getElementById('adminModal').classList.remove('hidden');
    document.getElementById('adminPassword').focus();
}

/**
 * 관리자 로그인 모달 숨기기
 */
function hideAdminLogin() {
    document.getElementById('adminModal').classList.add('hidden');
    document.getElementById('adminPassword').value = '';
}

/**
 * 관리자 로그인 처리
 */
function adminLogin() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        hideAdminLogin();
        showScreen('adminScreen');
    } else {
        showNotification('관리자 비밀번호가 올바르지 않습니다.');
        document.getElementById('adminPassword').value = '';
    }
}

/**
 * 관리자 화면 렌더링
 */
function renderAdminScreen() {
    // 통계 업데이트
    const totalBoxes = TOTAL_BOXES;
    const usedBoxes = storageBoxes.filter(box => !box.isEmpty).length;
    const emptyBoxes = totalBoxes - usedBoxes;
    
    document.getElementById('totalBoxes').textContent = totalBoxes;
    document.getElementById('usedBoxes').textContent = usedBoxes;
    document.getElementById('emptyBoxes').textContent = emptyBoxes;
    
    // 택배 목록 렌더링
    const packageList = document.getElementById('packageList');
    packageList.innerHTML = '';
    
    if (packages.length === 0) {
        packageList.innerHTML = '<p style="text-align: center; color: #666;">보관 중인 택배가 없습니다.</p>';
        return;
    }
    
    packages.forEach(pkg => {
        const item = document.createElement('div');
        item.className = 'package-item';
        
        const depositDate = new Date(pkg.depositTime).toLocaleDateString('ko-KR');
        
        item.innerHTML = `
            <div class="package-info">
                <strong>${pkg.recipient}</strong> (${pkg.phone})<br>
                <small>택배번호: ${pkg.trackingNumber} | 보관함: ${pkg.boxId}번 | ${depositDate}</small>
            </div>
            <div class="package-status stored">보관중</div>
        `;
        
        packageList.appendChild(item);
    });
}

/**
 * 알림 메시지 표시 함수
 * @param {string} message - 표시할 메시지
 */
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.classList.remove('hidden');
    
    // 3초 후 자동으로 숨기기
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// 엔터 키 이벤트 처리
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const activeScreen = document.querySelector('.screen:not(.hidden)');
        
        if (activeScreen.id === 'pickupScreen') {
            pickupPackage();
        } else if (activeScreen.id === 'depositScreen') {
            depositPackage();
        }
    }
});

// 관리자 모달에서 엔터 키 처리
document.getElementById('adminPassword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adminLogin();
    }
});