import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 네이버 SMTP 설정
const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NAVER_EMAIL, // 네이버 이메일 주소
    pass: process.env.NAVER_APP_PASSWORD, // 애플리케이션 비밀번호
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

// 의뢰인 구분 번역
const translateClientType = (type: string): string => {
  const types: Record<string, string> = {
    management_office: '관리사무소',
    management_committee: '관리위원회',
    management_company: '위탁관리회사',
    individual: '개인',
  };
  return types[type] || type;
};

// 기존 추심 시도 번역
const translatePreviousAttempts = (attempt: string): string => {
  const attempts: Record<string, string> = {
    none: '없음',
    phone: '전화연락',
    letter: '우편발송',
    visit: '방문',
    legal: '법적조치',
    multiple: '복합시도',
  };
  return attempts[attempt] || attempt;
};

// 미납 항목 번역
const translateUnpaidDetail = (detail: string): string => {
  const details: Record<string, string> = {
    management_fee: '일반관리비',
    repair_fund: '수선충당금',
    utility_fee: '전기료',
    late_fee: '연체료',
    special_fee: '특별징수금',
    other: '기타',
  };
  return details[detail] || detail;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // 이메일 내용 생성
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
    .section { margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px; }
    .section-title { font-weight: bold; color: #0066cc; margin-bottom: 10px; font-size: 18px; }
    .field { margin: 8px 0; }
    .label { font-weight: bold; display: inline-block; width: 120px; }
    .value { color: #555; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>새로운 관리비 청산 의뢰서</h1>
    </div>
    
    <div class="section">
      <div class="section-title">📋 의뢰인 정보</div>
      <div class="field"><span class="label">의뢰인명:</span> <span class="value">${formData.clientName}</span></div>
      <div class="field"><span class="label">연락처:</span> <span class="value">${formData.clientPhone}</span></div>
      <div class="field"><span class="label">이메일:</span> <span class="value">${formData.clientEmail}</span></div>
      <div class="field"><span class="label">아파트명:</span> <span class="value">${formData.apartmentName}</span></div>
      <div class="field"><span class="label">의뢰인 구분:</span> <span class="value">${translateClientType(formData.clientType)}</span></div>
      <div class="field"><span class="label">직책:</span> <span class="value">${formData.clientPosition || '미입력'}</span></div>
    </div>
    
    <div class="section">
      <div class="section-title">📍 채무자 정보</div>
      <div class="field"><span class="label">채무자명:</span> <span class="value">${formData.debtorName}</span></div>
      <div class="field"><span class="label">동/호수:</span> <span class="value">${formData.debtorUnit}</span></div>
      <div class="field"><span class="label">연락처:</span> <span class="value">${formData.debtorPhone || '미입력'}</span></div>
    </div>
    
    <div class="section">
      <div class="section-title">💰 미납 관리비 정보</div>
      <div class="field"><span class="label">미납 기간:</span> <span class="value">${formData.unpaidPeriod}</span></div>
      <div class="field"><span class="label">미납 금액:</span> <span class="value">${parseInt(formData.unpaidAmount).toLocaleString()}원</span></div>
      <div class="field"><span class="label">미납 항목:</span> <span class="value">${formData.unpaidDetails.map((item: string) => translateUnpaidDetail(item)).join(', ')}</span></div>
    </div>
    
    <div class="section">
      <div class="section-title">📝 기타 정보</div>
      <div class="field"><span class="label">기존 추심 시도:</span> <span class="value">${translatePreviousAttempts(formData.previousAttempts)}</span></div>
      <div class="field"><span class="label">특이사항:</span> <span class="value">${formData.specialNotes || '없음'}</span></div>
      <div class="field"><span class="label">관련 서류 보유:</span> <span class="value">${formData.hasDocuments ? '있음' : '없음'}</span></div>
    </div>
    
    <div class="footer">
      <p>접수일시: ${new Date().toLocaleString('ko-KR')}</p>
      <p>베스트청산 관리비 청산 의뢰 시스템</p>
    </div>
  </div>
</body>
</html>
    `;

    // 이메일 전송
    const info = await transporter.sendMail({
      from: `"베스트청산 의뢰 시스템" <${process.env.NAVER_EMAIL}>`,
      to: process.env.RECEIVER_EMAIL, // 수신 이메일 주소
      subject: `[베스트청산] 새로운 관리비 청산 의뢰 - ${formData.apartmentName} ${formData.debtorUnit}`,
      html: emailContent,
    });

    console.log('Email sent:', info.messageId);

    return NextResponse.json({ 
      success: true, 
      message: '의뢰서가 성공적으로 제출되었습니다.' 
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '의뢰서 제출 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    );
  }
}