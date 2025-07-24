# EmailJS 템플릿 설정 가이드

## 1. EmailJS 계정 설정

1. [EmailJS](https://www.emailjs.com/) 웹사이트에 접속하여 계정을 생성합니다.
2. 로그인 후 대시보드로 이동합니다.

## 2. Email Service 생성

1. 대시보드에서 "Email Services" 탭을 클릭합니다.
2. "Add New Service" 버튼을 클릭합니다.
3. Gmail, Outlook 등 원하는 이메일 서비스를 선택합니다.
4. 서비스 이름을 입력하고 연결을 완료합니다.
5. Service ID를 복사해둡니다.

## 3. Email Template 생성

1. 대시보드에서 "Email Templates" 탭을 클릭합니다.
2. "Create New Template" 버튼을 클릭합니다.
3. 템플릿 정보를 다음과 같이 설정합니다:

### Template 설정

**Template Name**: 관리비 추심 의뢰서

**Subject**: [관리비 추심 의뢰] {{apartmentName}} - {{clientName}}

**From Name**: {{clientName}}

**From Email**: {{clientEmail}}

**Reply To**: {{clientEmail}}

**To Email**: (관리자 이메일 주소 입력)

### Template Content

`emailjs-template.html` 파일의 내용을 복사하여 붙여넣습니다.

### Template Variables

다음 변수들이 자동으로 매핑됩니다:
- `{{clientName}}` - 의뢰인 이름
- `{{clientPhone}}` - 의뢰인 연락처
- `{{clientEmail}}` - 의뢰인 이메일
- `{{apartmentName}}` - 아파트/단지명
- `{{clientType}}` - 의뢰인 구분 (관리사무소, 관리조합, 관리회사, 개인)
- `{{unpaidPeriod}}` - 미납 기간
- `{{unpaidAmount}}` - 미납 금액 (콤마 포함 형식)
- `{{unpaidDetails}}` - 미납 내역 (콤마로 구분된 목록)
- `{{submittedAt}}` - 제출 일시

## 4. 환경 변수 설정

`.env.local` 파일에 다음 정보를 입력합니다:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Public Key 찾기
1. EmailJS 대시보드에서 "Account" 탭을 클릭합니다.
2. "General" 섹션에서 "Public Key"를 확인합니다.

## 5. 테스트

1. 개발 서버를 실행합니다: `npm run dev`
2. `/request` 페이지에서 양식을 작성하고 제출합니다.
3. 설정한 이메일 주소로 이메일이 도착하는지 확인합니다.

## 주의사항

- 무료 계정은 월 200건의 이메일 전송 제한이 있습니다.
- 스팸 방지를 위해 EmailJS는 IP 기반 rate limiting을 적용합니다.
- 프로덕션 환경에서는 환경 변수를 안전하게 관리해야 합니다.