# 2025 HMH Class Examples

HMH 2025 수업자료와 방학과제 예제 공개용 모음입니다.

## 폴더 구조

1. `assignments/`
   - 학생에게 배포할 과제/실습 자료입니다.
   - 각 프로젝트별 `mission`, 문제 파일, 가이드 문서를 모았습니다.

2. `answers/`
   - 정답과 예시 구현입니다.
   - 과제와 같은 이름으로 맞춰 두었으니 `assignments/<name>`과 `answers/<name>`을 같이 보면 됩니다.

3. `guides/`
   - 과제 순서와 운영 참고자료입니다.

## 포함 자료

1. `card-snap`
   - 카드 스냅 웹 예제
   - 과제: `assignments/card-snap`
   - 정답: `answers/card-snap`

2. `postbox-kiosk`
   - 택배 키오스크 예제
   - 과제: `assignments/postbox-kiosk`
   - 정답: `answers/postbox-kiosk`

3. `qrcode`
   - QR 코드 생성 예제
   - 과제: `assignments/qrcode`
   - 정답: `answers/qrcode`

4. `url-shortener`
   - URL 단축기 예제
   - 과제: `assignments/url-shortener`
   - 정답: `answers/url-shortener`

5. `html-basic`
   - HTML 기초 1-10번 과제
   - 과제: `assignments/html-basic`
   - 정답: `answers/html-basic`

6. `database`
   - 데이터베이스/Firebase 실습 가이드
   - 현재는 별도 정답 폴더 없이 과제 자료에 포함했습니다.

7. `text-and-voice`
   - 텍스트/음성 처리 예제
   - 현재는 별도 정답 폴더 없이 과제 자료에 포함했습니다.

8. `kiosk`
   - 메뉴 주문 키오스크 2차시 과제와 모범답안
   - 과제: `assignments/kiosk`
   - 정답: `answers/kiosk`
   - 진행순서: `guides/2025_키오스크_수업_진행순서.txt`
   - 제3자 코드 고지: `guides/2025_키오스크_제3자_고지.md`

## 공개 전 정리 기준

- 학생 제출물 zip은 포함하지 않았습니다.
- 실제 Firebase API key가 들어 있던 `text-and-voice` 예제는 샘플값으로 바꿨습니다.
- URL shortener와 database 예제의 Firebase 설정은 원래부터 샘플값 형태입니다.
- URL shortener의 Contact 링크는 개인 이메일 대신 `contact@example.com`을 사용합니다.
- 키오스크 자료의 제출용 이메일 주소는 제거했습니다.
- 출처와 재배포 권리를 확인하지 못한 키오스크 PNG 5개는 자체 제작한 중립 SVG로 교체했습니다.
- 키오스크의 Bootstrap 4.0.0과 basicModal 3.3.9는 MIT 라이선스 전문과 출처를 `guides/`에 함께 보존했습니다.
- 공개자료이지만, 운영 DB에 연결하려면 각자 Firebase 프로젝트 설정을 새로 넣어야 합니다.
