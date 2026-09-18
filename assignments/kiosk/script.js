// ====================================================================================================
// 1. 전역 변수 및 상수 정의
// ====================================================================================================

// PRODUCTS 배열: 키오스크에 판매될 모든 상품의 정보를 담고 있습니다.
// 각 상품은 고유한 'id', 'name', 'image' 경로, 상세 'description' 배열, 그리고 'defaultPrice'를 가집니다.
// 개발자는 이 'id' 값을 자유롭게 변경할 수 있으며, 스크립트의 다른 부분은 이 'id'를 동적으로 참조합니다.
// 이 배열을 수정하여 상품을 추가하거나, 기존 상품의 정보를 변경할 수 있습니다.
const PRODUCTS = [
    {
      id: 'colaPopOriginal', // 상품의 고유 ID (개발자가 자유롭게 변경 가능)
      name: '일반 콜팝',
      image: 'img/cola-pop.svg', // 이미지 파일은 public/img 폴더에 있어야 합니다.
      description: [
        '콜라와 치킨의',
        '환상적인 만남!',
        '오늘이 아니면',
        '먹어볼 기회도 없다!',
      ],
      defaultPrice: 1500, // 기본 가격
    },
    {
      id: '상품ID2', // 상품의 고유 ID (개발자가 자유롭게 변경 가능)
      name: '제품2',
      image: 'img/menu-item-2.svg',
      description: [
        '설명1',
        '설명2',
        '설명3',
        '설명4',
      ],
      defaultPrice: 2000,
    },
    {
      id: '상품ID3', // 상품의 고유 ID (개발자가 자유롭게 변경 가능)
      name: '제품3',
      image: 'img/menu-item-3.svg',
      description: [
        '설명1',
        '설명2',
        '설명3',
        '설명4',
      ],
      defaultPrice: 3000,
    },
    // 여기에 새로운 상품을 추가할 수 있습니다.
    // 예:
    // {
    //   id: 'newSnack',
    //   name: '새로운 간식',
    //   image: 'img/menu-item-extra.svg',
    //   description: [
    //     '바삭하고 맛있는',
    //     '새로운 간식!',
    //   ],
    //   defaultPrice: 1000,
    // },
  ];

  // 주문된 각 상품의 수량을 저장하는 객체입니다.
  // 키는 PRODUCTS 배열의 'id' 값이며, 값은 해당 상품의 주문 수량입니다.
  // 예: { colaPopOriginal: 2, menuItem2: 1, friendshipSet: 0 }
  let orderQuantities = {};

  // 각 상품별 총 가격을 저장하는 객체입니다.
  // 키는 PRODUCTS 배열의 'id' 값이며, 값은 해당 상품의 총 가격입니다.
  // 예: { colaPopOriginal: 3000, menuItem2: 2000, friendshipSet: 0 }
  let itemPrices = {};

  // 현재 주문의 전체 총 가격을 저장하는 변수입니다.
  let totalPrice = 0;

  // 사용자 비활동 감지 타이머 관련 변수들입니다.
  // 일정 시간 동안 사용자 입력이 없으면 페이지를 새로고침합니다.
  let inactivityTime = 0;
  let warningTimer; // 경고창을 띄우기 위한 타이머 ID
  let refreshTimer; // 페이지를 새로고침하기 위한 타이머 ID

  // 로컬 basicModal 라이브러리 전역 객체
  const basicModal = window.basicModal;

  // ====================================================================================================
  // 2. 유틸리티 함수 (도우미 함수)
  // ====================================================================================================

  /**
   * 쿠키에서 특정 이름의 값을 읽어오는 함수입니다.
   * @param {string} name - 읽어올 쿠키의 이름 (예: 'colaPopOriginal_p')
   * @returns {string|null} 쿠키 값 또는 없으면 null
   */
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';'); // 모든 쿠키를 세미콜론으로 분리하여 배열로 만듭니다.
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length); // 쿠키 문자열 앞의 공백 제거
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length); // 이름이 일치하면 값 반환
    }
    return null; // 해당 이름의 쿠키가 없으면 null 반환
  }

  /**
   * 쿠키를 설정하는 함수입니다.
   * @param {string} name - 설정할 쿠키의 이름 (예: 'colaPopOriginal_p')
   * @param {string|number} value - 설정할 쿠키의 값
   */
  function setCookie(name, value) {
    // path=/ 는 웹사이트의 모든 경로에서 이 쿠키에 접근할 수 있도록 합니다.
    document.cookie = name + "=" + (value || "") + "; path=/";
  }

  /**
   * 외부 라이브러리 없이 간단한 알림 메시지를 띄우는 함수입니다.
   * @param {string} msg - 표시할 메시지 내용
   */
  function jalert(msg) {
    window.alert(msg);
  }

  /**
   * 숫자를 한국 원화 형식으로 포맷하는 함수입니다. (예: 1500 -> ₩ 1,500)
   * @param {number} amount - 포맷할 숫자 금액
   * @returns {string} 포맷된 문자열
   */
  function formatCurrency(amount) {
    return `₩ ${Number(amount).toLocaleString()}`;
  }

  /**
   * 주어진 상품 ID에 해당하는 상품 객체를 PRODUCTS 배열에서 찾아 반환합니다.
   * @param {string} productId - 찾을 상품의 ID
   * @returns {object|undefined} 해당 상품 객체 또는 찾지 못하면 undefined
   */
  function getProductById(productId) {
    return PRODUCTS.find(product => product.id === productId);
  }

  // ====================================================================================================
  // 3. 초기화 및 UI 업데이트
  // ====================================================================================================

  /**
   * 페이지 로드 시 실행되는 초기화 함수입니다.
   * 상품 정보 로드, UI 업데이트, 이벤트 리스너 설정 등을 담당합니다.
   */
  document.addEventListener('DOMContentLoaded', () => {
    console.log("[초기화] 페이지 로드 완료. 초기화 시작.");

    // 3.1. 상품 카드 동적 생성 및 정보 초기화
    // PRODUCTS 배열에 정의된 상품 정보를 기반으로 HTML 요소를 동적으로 생성하고 업데이트합니다.
    const productCardsContainer = document.getElementById('product-cards-container');
    if (!productCardsContainer) {
      console.error("[초기화 오류] 'product-cards-container' 요소를 찾을 수 없습니다.");
      return;
    }

    PRODUCTS.forEach(product => {
      // 각 상품에 대한 카드 HTML 구조를 생성합니다.
      const cardHtml = `
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal" id="product-${product.id}-name">${product.name}</h4>
          </div>
          <div class="card-body">
            <img style="width: 150px" src="${product.image}" id="product-${product.id}-image" alt="${product.name} 이미지" />
            <ul class="list-unstyled mt-3 mb-4" id="product-${product.id}-description">
              ${product.description.map(line => `<li>${line}</li>`).join('')}
            </ul>
            <button
              type="button"
              class="btn btn-lg btn-block btn-outline-primary"
              data-product-id="${product.id}"
              id="${product.id}_n"
            >
              개당 | ₩ 0
            </button>
          </div>
        </div>
      `;
      productCardsContainer.insertAdjacentHTML('beforeend', cardHtml); // 컨테이너에 카드 추가
      console.log(`[UI 생성] 상품 카드 '${product.name}' (ID: ${product.id}) 생성 완료.`);

      // 각 상품의 주문 수량과 가격을 0으로 초기화합니다.
      orderQuantities[product.id] = 0;
      itemPrices[product.id] = 0;

      // 쿠키에서 상품 가격을 로드하거나, 없으면 기본 가격으로 설정합니다.
      // 쿠키 이름은 '상품ID_p' 형식으로 동적으로 생성됩니다 (예: 'colaPopOriginal_p').
      const storedPrice = getCookie(`${product.id}_p`);
      if (storedPrice === null) {
        setCookie(`${product.id}_p`, product.defaultPrice);
        console.log(`[가격 초기화] 쿠키 '${product.id}_p'가 없어 기본 가격 ${product.defaultPrice}로 설정되었습니다.`);
      } else {
        console.log(`[가격 로드] 쿠키 '${product.id}_p'에서 가격 ${storedPrice}를 로드했습니다.`);
      }
    });

    // 3.2. 초기 UI 텍스트 업데이트
    // 각 상품 버튼의 가격 텍스트를 쿠키에서 로드한 가격으로 업데이트합니다.
    PRODUCTS.forEach(product => {
      const button = document.getElementById(`${product.id}_n`);
      if (button) {
        const priceFromCookie = Number(getCookie(`${product.id}_p`));
        button.innerText = `개당 | ${formatCurrency(priceFromCookie)}`;
      }
    });

    // 총 가격 버튼의 텍스트를 초기화합니다.
    updateTotalPriceButton();

    // 3.3. 이벤트 리스너 설정
    // '결제 하기' 버튼 클릭 이벤트
    document.getElementById('checkoutButton').addEventListener('click', request_checkout);
    // '총 가격 | 계산하기' 버튼 클릭 이벤트
    document.getElementById('total_price_button').addEventListener('click', request_checkout);
    // '주문 초기화' 버튼 클릭 이벤트
    document.getElementById('resetOrderButton').addEventListener('click', reset_order);

    // 각 상품의 '주문' 버튼에 클릭 이벤트를 추가합니다.
    // data-product-id 속성을 사용하여 어떤 상품 버튼이 클릭되었는지 식별합니다.
    document.querySelectorAll('.card-body button[data-product-id]').forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = event.target.dataset.productId; // 클릭된 버튼의 상품 ID를 가져옵니다.
        request_order(productId); // 해당 상품 ID로 주문 요청 함수를 호출합니다.
      });
    });

    // 3.4. 사용자 비활동 감지 타이머 시작
    // 페이지 로드 후 바로 타이머를 시작합니다.
    setupInactivityTimers();

    console.log("[초기화] 모든 초기화 작업 완료.");
  });

  /**
   * 총 가격 버튼의 텍스트를 현재 총 주문 금액으로 업데이트하는 함수입니다.
   * 이 함수는 주문 수량이나 상품 가격이 변경될 때마다 호출되어야 합니다.
   */
  function updateTotalPriceButton() {
    // orderQuantities와 itemPrices를 기반으로 totalPrice를 다시 계산합니다.
    totalPrice = 0;
    PRODUCTS.forEach(product => {
      const productId = product.id;
      const quantity = orderQuantities[productId] || 0; // 해당 상품의 주문 수량 (없으면 0)
      const pricePerItem = Number(getCookie(`${productId}_p`)); // 현재 설정된 상품 가격을 쿠키에서 가져옵니다.

      itemPrices[productId] = quantity * pricePerItem; // 상품별 총 가격을 업데이트합니다.
      totalPrice += itemPrices[productId]; // 전체 총 가격에 더합니다.
    });

    // '총 가격 | 계산하기' 버튼의 텍스트를 업데이트합니다.
    const totalButton = document.getElementById("total_price_button");
    if (totalButton) {
      totalButton.innerText = `${formatCurrency(totalPrice)} | 계산하기`;
    }
    console.log(`[UI 업데이트] 현재 총 주문 금액: ${formatCurrency(totalPrice)}`);
  }

  // ====================================================================================================
  // 4. 사용자 비활동 감지 및 페이지 새로고침 로직
  // ====================================================================================================

  /**
   * 사용자 활동이 없을 때 타이머를 설정하고 관리하는 함수입니다.
   * 일정 시간 후 경고를 띄우고, 그 후 페이지를 새로고침합니다.
   */
  function setupInactivityTimers() {
    // 마우스 움직임과 키보드 입력 이벤트를 감지하여 타이머를 초기화합니다.
    document.addEventListener('mousemove', resetTimers, false);
    document.addEventListener('keypress', resetTimers, false);
    document.addEventListener('click', resetTimers, false); // 클릭 이벤트도 추가
    resetTimers(); // 초기 타이머 시작
    console.log("[타이머] 사용자 비활동 감지 타이머 시작.");
  }

  /**
   * 사용자 활동이 감지될 때마다 타이머를 초기화하는 함수입니다.
   * 기존 타이머를 취소하고 새로운 타이머를 설정합니다.
   */
  function resetTimers() {
    inactivityTime = 0; // 비활동 시간 초기화
    clearTimeout(warningTimer); // 기존 경고 타이머 취소
    clearTimeout(refreshTimer); // 기존 새로고침 타이머 취소

    // 새로운 타이머 설정:
    // 200초 (3분 20초) 후 showWarning 함수 실행 (주문 초기화)
    warningTimer = setTimeout(showWarning, 200000);
    // 210초 (3분 30초) 후 refreshPage 함수 실행 (페이지 새로고침)
    refreshTimer = setTimeout(refreshPage, 210000);
    // console.log("[타이머] 타이머 초기화 및 재설정."); // 디버깅을 위해 너무 자주 출력될 수 있으므로 주석 처리
  }

  /**
   * 비활동 경고를 표시하는 함수입니다.
   * 여기서는 주문 초기화 모달을 띄웁니다.
   */
  function showWarning() {
    console.log("[타이머] 비활동 경고: 주문 초기화 모달 표시.");
    // 주문 초기화 모달을 띄워 사용자에게 비활동을 알립니다.
    reset_order();
  }

  /**
   * 페이지를 새로고침하는 함수입니다.
   * 비활동 시간이 너무 길어지면 자동으로 페이지를 초기 상태로 되돌립니다.
   */
  function refreshPage() {
    console.log("[타이머] 비활동 시간 초과: 페이지 새로고침.");
    location.reload(); // 현재 페이지를 새로고침합니다.
  }

  // ====================================================================================================
  // 5. 주문 처리 로직
  // ====================================================================================================

  /**
   * 상품 주문 요청을 처리하는 함수입니다.
   * 사용자가 상품을 선택하면 수량을 입력받는 모달을 띄웁니다.
   * @param {string} productId - 주문할 상품의 ID (PRODUCTS 배열의 'id' 값)
   */
  function request_order(productId) {
    const product = getProductById(productId); // 선택된 상품의 정보를 PRODUCTS 배열에서 가져옵니다.
    if (!product) {
      jalert('알 수 없는 상품입니다. 다시 시도해주세요.');
      console.error(`[주문 오류] 알 수 없는 상품 ID: ${productId}`);
      return;
    }
    console.log(`[주문 요청] '${product.name}' (ID: ${productId}) 주문 모달 표시.`);

    // basicModal을 사용하여 수량 선택 모달을 띄웁니다.
    basicModal.show({
      body:
        `<h1>${product.name}</h1><p></p>` +
        `<img style="width: 330px" src="${product.image}" alt="${product.name} 이미지" /><p>` +
        `<label for="numberSelect">메뉴 수량을 선택 해주세요:</label>` +
        `<select id="numberSelect" name="numbers">` +
        `<option value="1">1</option>` +
        `<option value="2">2</option>` +
        `<option value="3">3</option>` +
        `<option value="4">4</option>` +
        `<option value="5">5</option>` +
        `</select></p>`,
      buttons: {
        cancel: {
          title: "취소",
          fn: basicModal.close, // '취소' 버튼 클릭 시 모달 닫기
        },
        action: {
          title: "담기",
          fn: function () {
            // '담기' 버튼 클릭 시 실행되는 로직
            const selectedValue = Number(document.getElementById("numberSelect").value); // 선택된 수량 가져오기

            // 선택된 상품의 수량과 가격을 업데이트합니다.
            orderQuantities[productId] = selectedValue;
            // 현재 상품의 가격은 쿠키에서 가져옵니다. 쿠키 이름은 동적으로 생성됩니다.
            const pricePerItem = Number(getCookie(`${productId}_p`));
            itemPrices[productId] = selectedValue * pricePerItem;

            console.log(`[주문 처리] '${product.name}' ${selectedValue}개 담기 완료. 총 가격: ${itemPrices[productId]}`);

            updateTotalPriceButton(); // 총 가격 버튼 텍스트 업데이트
            jalert("주문이 추가 되었습니다!"); // 주문 추가 알림
            basicModal.close(); // 모달 닫기
          },
        },
      },
    });
  }

  /**
   * 결제 요청을 처리하는 함수입니다.
   * 현재 주문 내역을 보여주고, 결제를 진행할지 묻는 모달을 띄웁니다.
   */
  function request_checkout() {
    if (totalPrice === 0) {
      jalert("메뉴를 추가 해주세요!"); // 주문된 메뉴가 없으면 알림
      console.log("[결제 요청] 주문된 메뉴가 없어 결제 진행 불가.");
      return;
    }
    console.log("[결제 요청] 결제 모달 표시.");

    // 주문 내역을 HTML 테이블 형식으로 만듭니다.
    let orderSummaryHtml = '';
    PRODUCTS.forEach(product => {
      const productId = product.id;
      const quantity = orderQuantities[productId] || 0;
      const price = itemPrices[productId] || 0;
      if (quantity > 0) { // 수량이 0보다 큰 상품만 표시
        orderSummaryHtml += `
          <tr>
            <td>${product.name}</td>
            <td>수량 : ${quantity}개</td>
            <td>가격 : ${formatCurrency(price)}원</td>
          </tr>
        `;
      }
    });

    // basicModal을 사용하여 계산서 모달을 띄웁니다.
    basicModal.show({
      body:
        `<h1>계산서</h1><hr>` +
        `<table style="width:100%">` +
        `<h3 style="font-size: 24px;"><strong>${orderSummaryHtml}</strong></h3>` +
        `</table><hr> <p></p> <h3>총 ${formatCurrency(totalPrice)}원</h3>`,
      buttons: {
        cancel: {
          title: "취소",
          fn: basicModal.close, // '취소' 버튼 클릭 시 모달 닫기
        },
        action: {
          title: "데모 결제",
          fn: function () {
            basicModal.show({
              body:
                `<h1>교육용 데모 결제</h1><hr>` +
                `<p>${formatCurrency(totalPrice)}원 주문을 확인했습니다.</p>` +
                `<p>실제 결제, 송금, 계좌 연결 또는 외부 전송은 수행하지 않습니다.</p>`,
              buttons: {
                cancel: {
                  title: "취소",
                  fn: basicModal.close,
                },
                action: {
                  title: "데모 완료",
                  fn: function () {
                    basicModal.close();
                    reset_order_data_only();
                    jalert("교육용 데모 결제가 완료되었습니다.");
                    console.log("[데모 결제 완료] 주문 데이터 초기화.");
                  },
                },
              },
            });
          },
        },
      },
    });
  }

  /**
   * 주문 내역을 초기화하는 함수입니다.
   * 사용자에게 초기화 여부를 확인하는 모달을 띄웁니다.
   */
  function reset_order() {
    console.log("[주문 초기화] 초기화 확인 모달 표시.");
    basicModal.show({
      body: `<h1>정말 주문을 초기화 하시겠습니까?</h1>`,
      buttons: {
        cancel: {
          title: "초기화",
          fn: function () {
            window.location.reload(); // '초기화' 버튼 클릭 시 페이지 새로고침 (모든 상태 초기화)
            basicModal.close();
            console.log("[주문 초기화] 페이지 새로고침으로 초기화 진행.");
          },
        },
        action: {
          title: "계속 보기",
          fn: function () {
            basicModal.close(); // '계속 보기' 버튼 클릭 시 모달 닫기
            console.log("[주문 초기화] 초기화 취소.");
          },
        },
      },
    });
  }

  /**
   * 주문 데이터만 초기화하고 UI를 업데이트하는 함수입니다.
   * 페이지를 새로고침하지 않고 주문 상태를 리셋할 때 사용됩니다.
   * (예: 결제 완료 후)
   */
  function reset_order_data_only() {
    console.log("[주문 데이터 초기화] 주문 수량 및 가격 데이터 리셋.");
    PRODUCTS.forEach(product => {
      orderQuantities[product.id] = 0;
      itemPrices[product.id] = 0;
    });
    updateTotalPriceButton(); // 총 가격 버튼 업데이트
    console.log("[주문 데이터 초기화] 완료.");
  }
