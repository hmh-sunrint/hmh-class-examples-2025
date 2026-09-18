// ====================================================================================================
// 1. 전역 변수 및 상수 정의
// ====================================================================================================

// PRODUCTS 배열: 키오스크에 판매될 모든 상품의 정보를 담고 있습니다.
// 과제 6, 7에 따라 상품 정보를 수정하고 새로운 상품을 추가했습니다.
const PRODUCTS = [
    {
      id: 'colaPopOriginal', // 첫 번째 상품은 그대로 유지
      name: '일반 콜팝',
      image: 'img/cola-pop.svg',
      description: [
        '콜라와 치킨의',
        '환상적인 만남!',
        '오늘이 아니면',
        '먹어볼 기회도 없다!',
      ],
      defaultPrice: 1500,
    },
    // 과제 6: 제품 2를 menu-item-2.svg 이미지에 맞게 수정
    {
      id: 'crispyCup', // 상품 ID를 의미있게 변경
      name: '크리스피 컵', // 이미지에 어울리는 상품명
      image: 'img/menu-item-2.svg', // 공개용 중립 예시 이미지 사용
      description: [
        '바삭한 토핑을 올린',
        '따뜻한 컵 메뉴!',
        '한 번 맛보면',
        '잊을 수 없는 맛!',
      ],
      defaultPrice: 2500, // 가격도 조정
    },
    // 과제 6: 제품 3을 menu-item-3.svg 이미지에 맞게 수정
    {
      id: 'friendSet', // 상품 ID를 의미있게 변경
      name: '친구 세트', // 이미지에 어울리는 상품명
      image: 'img/menu-item-3.svg', // 공개용 중립 예시 이미지 사용
      description: [
        '함께 나눠 먹는',
        '든든한 세트!',
        '음료와 간식의',
        '좋은 조합!',
      ],
      defaultPrice: 3500, // 세트 할인 가격
    },
    // 과제 7: 새로운 상품 추가 (주석 해제)
    {
      id: 'freshSandwich', // 새로운 상품 ID
      name: '샌드위치 세트', // 새로운 상품명
      image: 'img/menu-item-extra.svg', // 공개용 중립 예시 이미지 사용
      description: [
        '신선한 야채와',
        '가볍게 먹기 좋은',
        '든든한 세트!',
        '간식 시간 추천!',
      ],
      defaultPrice: 4000, // 새로운 상품 가격
    },
  ];

  // 주문된 각 상품의 수량을 저장하는 객체입니다.
  let orderQuantities = {};

  // 각 상품별 총 가격을 저장하는 객체입니다.
  let itemPrices = {};

  // 현재 주문의 전체 총 가격을 저장하는 변수입니다.
  let totalPrice = 0;

  // 사용자 비활동 감지 타이머 관련 변수들입니다.
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
   */
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  /**
   * 쿠키를 설정하는 함수입니다.
   */
  function setCookie(name, value) {
    document.cookie = name + "=" + (value || "") + "; path=/";
  }

  /**
   * 외부 라이브러리 없이 간단한 알림 메시지를 띄우는 함수입니다.
   */
  function jalert(msg) {
    window.alert(msg);
  }

  /**
   * 숫자를 한국 원화 형식으로 포맷하는 함수입니다.
   */
  function formatCurrency(amount) {
    return `₩ ${Number(amount).toLocaleString()}`;
  }

  /**
   * 주어진 상품 ID에 해당하는 상품 객체를 PRODUCTS 배열에서 찾아 반환합니다.
   */
  function getProductById(productId) {
    return PRODUCTS.find(product => product.id === productId);
  }

  // ====================================================================================================
  // 3. 초기화 및 UI 업데이트
  // ====================================================================================================

  /**
   * 페이지 로드 시 실행되는 초기화 함수입니다.
   */
  document.addEventListener('DOMContentLoaded', () => {
    console.log("[초기화] 페이지 로드 완료. 초기화 시작.");

    // 상품 카드 동적 생성
    const productCardsContainer = document.getElementById('product-cards-container');
    if (!productCardsContainer) {
      console.error("[초기화 오류] 'product-cards-container' 요소를 찾을 수 없습니다.");
      return;
    }

    PRODUCTS.forEach(product => {
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
      productCardsContainer.insertAdjacentHTML('beforeend', cardHtml);
      console.log(`[UI 생성] 상품 카드 '${product.name}' (ID: ${product.id}) 생성 완료.`);

      // 주문 수량과 가격 초기화
      orderQuantities[product.id] = 0;
      itemPrices[product.id] = 0;

      // 쿠키에서 상품 가격 로드 또는 기본 가격 설정
      const storedPrice = getCookie(`${product.id}_p`);
      if (storedPrice === null) {
        setCookie(`${product.id}_p`, product.defaultPrice);
        console.log(`[가격 초기화] 쿠키 '${product.id}_p'가 없어 기본 가격 ${product.defaultPrice}로 설정되었습니다.`);
      } else {
        console.log(`[가격 로드] 쿠키 '${product.id}_p'에서 가격 ${storedPrice}를 로드했습니다.`);
      }
    });

    // 초기 UI 텍스트 업데이트
    PRODUCTS.forEach(product => {
      const button = document.getElementById(`${product.id}_n`);
      if (button) {
        const priceFromCookie = Number(getCookie(`${product.id}_p`));
        button.innerText = `개당 | ${formatCurrency(priceFromCookie)}`;
      }
    });

    updateTotalPriceButton();

    // 이벤트 리스너 설정
    document.getElementById('checkoutButton').addEventListener('click', request_checkout);
    document.getElementById('total_price_button').addEventListener('click', request_checkout);
    document.getElementById('resetOrderButton').addEventListener('click', reset_order);

    // 상품 버튼 이벤트 리스너
    document.querySelectorAll('.card-body button[data-product-id]').forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = event.target.dataset.productId;
        request_order(productId);
      });
    });

    // 사용자 비활동 감지 타이머 시작
    setupInactivityTimers();

    console.log("[초기화] 모든 초기화 작업 완료.");
  });

  /**
   * 총 가격 버튼의 텍스트를 현재 총 주문 금액으로 업데이트하는 함수입니다.
   */
  function updateTotalPriceButton() {
    totalPrice = 0;
    PRODUCTS.forEach(product => {
      const productId = product.id;
      const quantity = orderQuantities[productId] || 0;
      const pricePerItem = Number(getCookie(`${productId}_p`));

      itemPrices[productId] = quantity * pricePerItem;
      totalPrice += itemPrices[productId];
    });

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
   */
  function setupInactivityTimers() {
    document.addEventListener('mousemove', resetTimers, false);
    document.addEventListener('keypress', resetTimers, false);
    document.addEventListener('click', resetTimers, false);
    resetTimers();
    console.log("[타이머] 사용자 비활동 감지 타이머 시작.");
  }

  /**
   * 사용자 활동이 감지될 때마다 타이머를 초기화하는 함수입니다.
   * 과제 8: 새로고침 타이머 시간 변경 - 1분(60초) 후 경고, 1분 20초(80초) 후 새로고침
   */
  function resetTimers() {
    inactivityTime = 0;
    clearTimeout(warningTimer);
    clearTimeout(refreshTimer);

    // 과제 8: 타이머 시간 변경
    // 60초 (1분) 후 showWarning 함수 실행 (주문 초기화)
    warningTimer = setTimeout(showWarning, 60000); // 60 * 1000 = 60000ms = 1분
    // 80초 (1분 20초) 후 refreshPage 함수 실행 (페이지 새로고침)
    refreshTimer = setTimeout(refreshPage, 80000); // 80 * 1000 = 80000ms = 1분 20초
  }

  /**
   * 비활동 경고를 표시하는 함수입니다.
   */
  function showWarning() {
    console.log("[타이머] 비활동 경고: 주문 초기화 모달 표시.");
    reset_order();
  }

  /**
   * 페이지를 새로고침하는 함수입니다.
   */
  function refreshPage() {
    console.log("[타이머] 비활동 시간 초과: 페이지 새로고침.");
    location.reload();
  }

  // ====================================================================================================
  // 5. 주문 처리 로직
  // ====================================================================================================

  /**
   * 상품 주문 요청을 처리하는 함수입니다.
   */
  function request_order(productId) {
    const product = getProductById(productId);
    if (!product) {
      jalert('알 수 없는 상품입니다. 다시 시도해주세요.');
      console.error(`[주문 오류] 알 수 없는 상품 ID: ${productId}`);
      return;
    }
    console.log(`[주문 요청] '${product.name}' (ID: ${productId}) 주문 모달 표시.`);

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
          fn: basicModal.close,
        },
        action: {
          title: "담기",
          fn: function () {
            const selectedValue = Number(document.getElementById("numberSelect").value);

            orderQuantities[productId] = selectedValue;
            const pricePerItem = Number(getCookie(`${productId}_p`));
            itemPrices[productId] = selectedValue * pricePerItem;

            console.log(`[주문 처리] '${product.name}' ${selectedValue}개 담기 완료. 총 가격: ${itemPrices[productId]}`);

            updateTotalPriceButton();
            jalert("주문이 추가 되었습니다!");
            basicModal.close();
          },
        },
      },
    });
  }

  /**
   * 결제 요청을 처리하는 함수입니다.
   */
  function request_checkout() {
    if (totalPrice === 0) {
      jalert("메뉴를 추가 해주세요!");
      console.log("[결제 요청] 주문된 메뉴가 없어 결제 진행 불가.");
      return;
    }
    console.log("[결제 요청] 결제 모달 표시.");

    let orderSummaryHtml = '';
    PRODUCTS.forEach(product => {
      const productId = product.id;
      const quantity = orderQuantities[productId] || 0;
      const price = itemPrices[productId] || 0;
      if (quantity > 0) {
        orderSummaryHtml += `
          <tr>
            <td>${product.name}</td>
            <td>수량 : ${quantity}개</td>
            <td>가격 : ${formatCurrency(price)}원</td>
          </tr>
        `;
      }
    });

    basicModal.show({
      body:
        `<h1>계산서</h1><hr>` +
        `<table style="width:100%">` +
        `<h3 style="font-size: 24px;"><strong>${orderSummaryHtml}</strong></h3>` +
        `</table><hr> <p></p> <h3>총 ${formatCurrency(totalPrice)}원</h3>`,
      buttons: {
        cancel: {
          title: "취소",
          fn: basicModal.close,
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
   */
  function reset_order() {
    console.log("[주문 초기화] 초기화 확인 모달 표시.");
    basicModal.show({
      body: `<h1>정말 주문을 초기화 하시겠습니까?</h1>`,
      buttons: {
        cancel: {
          title: "초기화",
          fn: function () {
            window.location.reload();
            basicModal.close();
            console.log("[주문 초기화] 페이지 새로고침으로 초기화 진행.");
          },
        },
        action: {
          title: "계속 보기",
          fn: function () {
            basicModal.close();
            console.log("[주문 초기화] 초기화 취소.");
          },
        },
      },
    });
  }

  /**
   * 주문 데이터만 초기화하고 UI를 업데이트하는 함수입니다.
   */
  function reset_order_data_only() {
    console.log("[주문 데이터 초기화] 주문 수량 및 가격 데이터 리셋.");
    PRODUCTS.forEach(product => {
      orderQuantities[product.id] = 0;
      itemPrices[product.id] = 0;
    });
    updateTotalPriceButton();
    console.log("[주문 데이터 초기화] 완료.");
  }
