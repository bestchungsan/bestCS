# EmailJS 템플릿 설정 가이드 (업데이트 버전)

## EmailJS 대시보드에서 템플릿 수정하기

1. [EmailJS](https://dashboard.emailjs.com/) 대시보드에 로그인
2. "Email Templates" 탭으로 이동
3. 기존 템플릿 선택 또는 새 템플릿 생성

## 템플릿 설정

### Subject (제목)
```
새로운 관리비 추심 의뢰 - {{clientName}}
```

### To Email (받는 사람)
```
your-email@example.com (실제 관리자 이메일로 변경)
```

### Reply To (답장 받을 이메일)
```
{{clientEmail}}
```

### Content (내용)
```
===== 의뢰인 정보 =====
이름: {{clientName}}
연락처: {{clientPhone}}
이메일: {{clientEmail}}
아파트명: {{apartmentName}}
구분: {{clientType}}

===== 미납 정보 =====
기간: {{unpaidPeriod}}
금액: {{unpaidAmount}}원
내역: {{unpaidDetails}}

접수 시간: {{submittedAt}}
```

## 사용되는 변수들

- `{{clientName}}` - 의뢰인 이름
- `{{clientPhone}}` - 의뢰인 연락처
- `{{clientEmail}}` - 의뢰인 이메일
- `{{apartmentName}}` - 아파트/단지명
- `{{clientType}}` - 의뢰인 구분 (관리사무소, 관리조합, 관리회사, 개인)
- `{{unpaidPeriod}}` - 미납 기간
- `{{unpaidAmount}}` - 미납 금액 (콤마 포함)
- `{{unpaidDetails}}` - 미납 내역 (콤마로 구분)
- `{{submittedAt}}` - 접수 시간

## 제거된 필드들

다음 필드들은 더 이상 사용되지 않으므로 템플릿에서 제거해주세요:
- 직책 (clientPosition)
- 채무자 이름 (debtorName)
- 채무자 동호수 (debtorUnit)
- 채무자 연락처 (debtorPhone)
- 이전 추심 시도 (previousAttempts)
- 특이사항 (specialNotes)
- 관련 서류 (hasDocuments)

## 저장 및 테스트

1. 템플릿 저장
2. "Test" 버튼으로 테스트 이메일 발송
3. 정상 수신 확인