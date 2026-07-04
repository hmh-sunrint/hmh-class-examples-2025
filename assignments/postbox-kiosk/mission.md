## 코드 해설 및 가이드 (guide.md)

```markdown
# 택배 무인보관함 키오스크 코드 해설 및 가이드

## 1. 전역 변수와 초기화

```javascript
let packages = []; // 택배 데이터 저장
let storageBoxes = []; // 보관함 상태 저장
const ADMIN_PASSWORD = "admin123"; // 관리자 비밀번호
const TOTAL_BOXES = 48; // 전체 보관함 개수

document.addEventListener('DOMContentLoaded', function() {
    initializeStorage();
    loadData();
    updateTime();
    setInterval(updateTime, 1000);
});
```

**핵심 코드 해설:**

- `let packages = []`: 택배 정보들을 담는 배열이야. 각 택배는 객체 형태로 저장돼
- `let storageBoxes = []`: 48개 보관함의 상태를 관리하는 배열이야
- `DOMContentLoaded`: HTML이 완전히 로드된 후에 실행되는 이벤트야. 페이지가 준비되면 초기화 함수들을 호출해
- `setInterval(updateTime, 1000)`: 1초마다 시간을 업데이트하는 타이머를 설정해


## 2. 보관함 초기화 시스템

```javascript
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
```

**핵심 코드 해설:**

- `for (let i = 1; i <= TOTAL_BOXES; i++)`: 1번부터 48번까지 보관함을 만들어
- `isEmpty: true`: 처음엔 모든 보관함이 비어있어
- `size: null`: 택배가 없으면 크기 정보도 없어
- `packageId: null`: 어떤 택배가 들어있는지 연결 정보도 없어


## 3. 로컬 스토리지 데이터 관리

```javascript
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

function saveData() {
    localStorage.setItem('packages', JSON.stringify(packages));
    localStorage.setItem('storageBoxes', JSON.stringify(storageBoxes));
}
```

**핵심 코드 해설:**

- `localStorage.getItem()`: 브라우저에 저장된 데이터를 가져와
- `JSON.parse()`: 문자열로 저장된 데이터를 다시 객체로 변환해
- `JSON.stringify()`: 객체를 문자열로 변환해서 저장해
- 로컬 스토리지는 브라우저를 껐다 켜도 데이터가 남아있어


## 4. 화면 전환 시스템

```javascript
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.add('hidden'));
    
    document.getElementById(screenId).classList.remove('hidden');
    
    if (screenId === 'storageScreen') {
        renderStorageGrid();
    } else if (screenId === 'adminScreen') {
        renderAdminScreen();
    }
}
```

**핵심 코드 해설:**

- `querySelectorAll('.screen')`: 모든 화면 요소들을 선택해
- `forEach()`: 배열의 각 요소에 대해 반복 실행해
- `classList.add('hidden')`: CSS 클래스를 추가해서 화면을 숨겨
- `classList.remove('hidden')`: CSS 클래스를 제거해서 화면을 보여줘
- 특정 화면으로 이동할 때 추가 처리가 필요하면 if문으로 처리해


## 5. 택배 찾기 로직

```javascript
function pickupPackage() {
    const number = document.getElementById('pickupNumber').value.trim();
    const password = document.getElementById('pickupPassword').value.trim();
    
    if (!number || !password) {
        showNotification('택배 번호와 비밀번호를 모두 입력해주세요.');
        return;
    }
    
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
    
    packages.splice(packageIndex, 1);
    saveData();
}
```

**핵심 코드 해설:**

- `value.trim()`: 입력값의 앞뒤 공백을 제거해
- `!number || !password`: 둘 중 하나라도 비어있으면 true야
- `findIndex()`: 조건에 맞는 첫 번째 요소의 인덱스를 찾아. 없으면 -1을 반환해
- `pkg.trackingNumber === number && pkg.password === password`: 택배번호와 비밀번호가 모두 일치해야 해
- `splice(packageIndex, 1)`: 배열에서 해당 인덱스의 요소 1개를 제거해


## 6. 택배 맡기기 로직

```javascript
function depositPackage() {
    const name = document.getElementById('recipientName').value.trim();
    const phone = document.getElementById('recipientPhone').value.trim();
    const size = document.getElementById('packageSize').value;
    
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
        showNotification('전화번호 형식이 올바르지 않습니다. (010-0000-0000)');
        return;
    }
    
    const emptyBox = storageBoxes.find(box => box.isEmpty);
    if (!emptyBox) {
        showNotification('사용 가능한 보관함이 없습니다.');
        return;
    }
    
    const newPackage = {
        id: Date.now(),
        trackingNumber: generateTrackingNumber(),
        password: generatePassword(),
        recipient: name,
        phone: phone,
        size: size,
        depositTime: new Date().toISOString(),
        boxId: emptyBox.id
    };
    
    emptyBox.isEmpty = false;
    emptyBox.size = size;
    emptyBox.packageId = newPackage.id;
    
    packages.push(newPackage);
    saveData();
}
```

**핵심 코드 해설:**

- `/^010-\d{4}-\d{4}$/`: 정규표현식으로 전화번호 형식을 검증해. 010-0000-0000 형태만 허용해
- `find()`: 조건에 맞는 첫 번째 요소를 찾아. 없으면 undefined를 반환해
- `Date.now()`: 현재 시간을 밀리초로 반환해. 고유한 ID로 사용해
- `new Date().toISOString()`: 현재 시간을 ISO 형식 문자열로 변환해
- 새 택배 객체를 만들고 배열에 추가한 다음, 보관함 상태도 업데이트해


## 7. 택배번호와 비밀번호 생성

```javascript
function generateTrackingNumber() {
    const prefix = 'PKG';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
}

function generatePassword() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
```

**핵심 코드 해설:**

- `Date.now().toString().slice(-6)`: 현재 시간의 마지막 6자리를 가져와
- `Math.random() * 1000`: 0부터 999까지의 랜덤 숫자를 만들어
- `padStart(3, '0')`: 3자리가 안 되면 앞에 0을 붙여서 3자리로 만들어
- `Math.floor(1000 + Math.random() * 9000)`: 1000부터 9999까지의 4자리 숫자를 만들어
- 택배번호는 'PKG' + 시간 + 랜덤숫자 조합으로 고유성을 보장해


## 8. QR코드 스캔 시뮬레이션

```javascript
function simulateQRScan() {
    const isSuccess = Math.random() > 0.3; // 70% 성공률
    
    if (isSuccess && packages.length > 0) {
        const randomPackage = packages[Math.floor(Math.random() * packages.length)];
        
        showNotification(`QR코드 인식 성공!\n받는 사람: ${randomPackage.recipient}\n택배번호: ${randomPackage.trackingNumber}`);
        
        setTimeout(() => {
            showScreen('pickupScreen');
            document.getElementById('pickupNumber').value = randomPackage.trackingNumber;
            document.getElementById('pickupPassword').focus();
        }, 2000);
    } else {
        showNotification('QR코드를 인식할 수 없습니다. 다시 시도해주세요.');
    }
}
```

**핵심 코드 해설:**

- `Math.random() > 0.3`: 30% 확률로 실패, 70% 확률로 성공해
- `Math.floor(Math.random() * packages.length)`: 택배 배열에서 랜덤한 인덱스를 선택해
- `setTimeout()`: 2초 후에 실행할 함수를 예약해
- `focus()`: 해당 입력 필드에 커서를 위치시켜
- 실제 QR코드 스캔 대신 시뮬레이션으로 랜덤하게 성공/실패를 결정해


## 9. 보관함 시각화

```javascript
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
```

**핵심 코드 해설:**

- `innerHTML = ''`: 기존 내용을 모두 지워
- `createElement('div')`: 새로운 div 요소를 만들어
- `className`: CSS 클래스를 설정해
- `textContent`: 요소의 텍스트 내용을 설정해
- `title`: 마우스를 올렸을 때 보이는 툴팁을 설정해
- `appendChild()`: 부모 요소에 자식 요소를 추가해
- 보관함 상태에 따라 다른 CSS 클래스를 적용해서 색상을 구분해


## 10. 관리자 화면 렌더링

```javascript
function renderAdminScreen() {
    const totalBoxes = TOTAL_BOXES;
    const usedBoxes = storageBoxes.filter(box => !box.isEmpty).length;
    const emptyBoxes = totalBoxes - usedBoxes;
    
    document.getElementById('totalBoxes').textContent = totalBoxes;
    document.getElementById('usedBoxes').textContent = usedBoxes;
    document.getElementById('emptyBoxes').textContent = emptyBoxes;
    
    const packageList = document.getElementById('packageList');
    packageList.innerHTML = '';
    
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
```

**핵심 코드 해설:**

- `filter(box => !box.isEmpty)`: 비어있지 않은 보관함들만 필터링해
- `.length`: 배열의 길이를 구해서 사용 중인 보관함 개수를 계산해
- `new Date(pkg.depositTime).toLocaleDateString('ko-KR')`: ISO 문자열을 한국 날짜 형식으로 변환해
- `innerHTML`: HTML 코드를 직접 삽입해서 복잡한 구조를 만들어
- 템플릿 리터럴(``)을 사용해서 변수를 HTML에 삽입해


## 11. 알림 시스템

```javascript
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}
```

**핵심 코드 해설:**

- 알림 요소를 찾아서 메시지를 설정하고 보여줘
- 3초 후에 자동으로 숨겨져
- CSS 애니메이션과 함께 사용하면 부드러운 효과를 만들 수 있어


## 학습 포인트

1. **DOM 조작**: `getElementById`, `querySelector`, `createElement` 등으로 HTML 요소를 다뤄
2. **배열 메서드**: `find`, `findIndex`, `filter`, `forEach` 등으로 데이터를 처리해
3. **로컬 스토리지**: 브라우저에 데이터를 저장하고 불러와
4. **이벤트 처리**: 버튼 클릭, 키보드 입력 등의 사용자 행동에 반응해
5. **정규표현식**: 입력값의 형식을 검증해
6. **타이머**: `setTimeout`, `setInterval`로 시간 지연과 반복을 처리해


```css
/* 전체 레이아웃 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.kiosk-container {
    width: 800px;
    height: 600px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    overflow: hidden;
    position: relative;
}
```
