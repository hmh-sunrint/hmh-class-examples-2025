# Security Check

검토일: 2026-09-18

## 공개용 구성 기준

1. 학생 제출물은 포함하지 않았습니다.
   - `PC22-...제출물.zip` 형식의 제출물 파일은 공개용 repo 구성에서 제외했습니다.

2. 정답은 별도 폴더로 분리했습니다.
   - 과제: `assignments/`
   - 정답: `answers/`

3. 실제 Firebase 설정값은 제거했습니다.
   - `assignments/text-and-voice/index2.html`
   - `assignments/text-and-voice/result.html`
   - 위 파일에 있던 실제 Firebase web config는 `YOUR_*` 샘플값으로 치환했습니다.

4. 남아 있는 Firebase 설정값은 샘플값입니다.
   - `YOUR_API_KEY`
   - `YOUR_ACTUAL_API_KEY`
   - `your-api-key`
   - `YOUR_PROJECT_ID`

5. URL shortener의 Contact 링크는 공개용 예시 주소만 사용합니다.
   - 개인 이메일 대신 `contact@example.com`을 사용합니다.
   - 공개 저장소에서는 학생이나 담당자의 실제 이메일로 교체하지 않도록 안내합니다.

6. 키오스크 공개본에서 제출 연락처와 식별정보 예시를 정리했습니다.
   - 원본 README와 답안 가이드의 제출용 이메일 주소를 제거했습니다.
   - 화면 예시는 실제 이름·학번 대신 수업용 별칭을 사용합니다.
   - 이름·학번·연락처는 공개 저장소, Issue, Commit 메시지에 올리지 않도록 안내합니다.

7. 출처를 확인하지 못한 키오스크 PNG 5개는 공개본에 포함하지 않았습니다.
   - 원본 이미지와 참조를 제거했습니다.
   - 공개본에는 직접 만든 중립 SVG 4개만 포함했습니다.

8. 함께 배포하는 제3자 코드의 버전과 라이선스를 확인했습니다.
   - Bootstrap 4.0.0, MIT
   - basicModal 3.3.9, MIT
   - 고지: `guides/2025_키오스크_제3자_고지.md`
   - 라이선스 전문: `guides/LICENSES/`

## 공개 전 확인 명령

```bash
rg --pcre2 -n -g '!SECURITY_CHECK.md' "AIza[0-9A-Za-z_-]{20,}|private_key|client_email|service_account|ghp_[A-Za-z0-9]{20,}|gho_[A-Za-z0-9]{20,}|sk-(?:proj-)?[A-Za-z0-9_-]{20,}|PC[0-9]{2}-|제출물\\.zip" .
rg --pcre2 -n -g '!SECURITY_CHECK.md' "[A-Za-z0-9._%+-]+@(?!example\\.com\\b)[A-Za-z0-9.-]+\\.[A-Za-z]{2,}" .
find assignments/kiosk answers/kiosk -type f -name '*.png' -print
```

첫 번째 명령에서 실제 키, 서비스 계정이나 학생 제출물 파일명이 나오면 공개 전 제거해야 합니다. 두 번째 명령은 `example.com` 이외의 이메일 주소를 찾으며, 세 번째 명령과 함께 아무 파일도 출력하지 않아야 합니다.
