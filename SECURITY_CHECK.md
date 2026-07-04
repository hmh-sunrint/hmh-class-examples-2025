# Security Check

검토일: 2026-07-04

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

## 공개 전 확인 명령

```bash
rg -n "AIza|private_key|client_email|service_account|ghp_|gho_|sk-|PC[0-9]{2}-|제출물\\.zip" .
```

위 명령에서 실제 키, 서비스 계정, 학생 제출물 파일명이 나오면 공개 전 제거해야 합니다.

