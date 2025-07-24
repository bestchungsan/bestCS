"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";

interface FormData {
  // 의뢰인 정보
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  apartmentName: string;
  clientType: string;

  // 미납 관리비 정보
  unpaidPeriod: string;
  unpaidAmount: string;
  unpaidDetails: string[];

  // 개인정보 동의
  privacyConsent: boolean;
}

const initialFormData: FormData = {
  clientName: "",
  clientPhone: "",
  clientEmail: "",
  apartmentName: "",
  clientType: "",
  unpaidPeriod: "",
  unpaidAmount: "",
  unpaidDetails: [],
  privacyConsent: false,
};

export default function RequestPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // EmailJS 초기화
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    } else {
      console.error("EmailJS public key is not set");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      
      if (name === "unpaidDetails") {
        setFormData(prev => ({
          ...prev,
          unpaidDetails: checked
            ? [...prev.unpaidDetails, value]
            : prev.unpaidDetails.filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyConsent) {
      alert("개인정보 처리방침에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // 환경 변수 확인
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      
      if (!serviceId || !templateId) {
        console.error("EmailJS 환경 변수가 설정되지 않았습니다.");
        throw new Error("EmailJS configuration missing");
      }

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


      // EmailJS로 전송할 데이터 준비
      const templateParams = {
        // 의뢰인 정보
        clientName: formData.clientName,
        clientPhone: formData.clientPhone,
        clientEmail: formData.clientEmail,
        email: formData.clientEmail, // EmailJS 템플릿 호환성을 위해 추가
        apartmentName: formData.apartmentName,
        clientType: translateClientType(formData.clientType),
        
        // 미납 관리비 정보
        unpaidPeriod: formData.unpaidPeriod,
        unpaidAmount: parseInt(formData.unpaidAmount).toLocaleString(),
        unpaidDetails: formData.unpaidDetails.map(item => translateUnpaidDetail(item)).join(', '),
        
        // 접수 정보
        submittedAt: new Date().toLocaleString('ko-KR'),
      };

      // EmailJS로 이메일 전송
      console.log("Sending email with params:", templateParams);
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData(initialFormData);
      } else {
        throw new Error('전송 실패');
      }
    } catch (error) {
      console.error("이메일 전송 실패:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formatted = formatPhoneNumber(value);
    setFormData(prev => ({
      ...prev,
      [name]: formatted
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo2.png"
                alt="베스트청산 로고"
                width={30}
                height={30}
              />
              <h1 className="ml-2 text-md font-bold text-blue-600">
                BESTChungSan
              </h1>
            </Link>
            <Link 
              href="/"
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              홈으로
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              관리비 추심 의뢰서
            </h1>
            <p className="text-gray-600 leading-relaxed">
              미납 관리비 추심을 위한 정보를 입력해주세요.<br />
              전문가가 검토 후 빠른 시일 내에 연락드리겠습니다.
            </p>
          </div>

          {submitStatus === "success" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-700 font-medium">
                  의뢰서가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.
                </span>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-700 font-medium">
                  전송 중 오류가 발생했습니다. 다시 시도해주세요.
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 의뢰인 정보 */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                의뢰인 정보
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handlePhoneChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="010-1234-5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    아파트/단지명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="apartmentName"
                    value={formData.apartmentName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="○○아파트"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    의뢰인 구분 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="management_office">관리사무소</option>
                    <option value="management_committee">관리조합</option>
                    <option value="management_company">관리회사</option>
                    <option value="individual">개인</option>
                  </select>
                </div>

              </div>
            </div>


            {/* 미납 관리비 정보 */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                미납 관리비 정보
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    미납 기간 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="unpaidPeriod"
                    value={formData.unpaidPeriod}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2023년 1월 ~ 2024년 12월"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    *대략적인 정보만 작성 가능
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    미납 금액 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="unpaidAmount"
                    value={formData.unpaidAmount}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1,000,000원"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    *대략적인 정보만 작성 가능
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    미납 내역 (해당사항 모두 선택) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: "management_fee", label: "관리비" },
                      { value: "repair_fund", label: "수선충당금" },
                      { value: "utility_fee", label: "공용요금" },
                      { value: "late_fee", label: "연체료" },
                      { value: "special_fee", label: "특별부담금" },
                      { value: "other", label: "기타" }
                    ].map((item) => (
                      <label key={item.value} className="flex items-center">
                        <input
                          type="checkbox"
                          name="unpaidDetails"
                          value={item.value}
                          checked={formData.unpaidDetails.includes(item.value)}
                          onChange={handleInputChange}
                          className="mr-2 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>


            {/* 개인정보 처리방침 동의 */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                개인정보 처리방침
              </h2>
              
              <div className="bg-white rounded-lg p-4 max-h-32 overflow-y-auto text-sm text-gray-600 mb-4">
                <p>
                  베스트청산은 관리비 추심 서비스 제공을 위해 다음과 같이 개인정보를 수집·이용합니다.<br />
                  <br />
                  수집항목: 이름, 연락처, 이메일, 아파트/단지명, 직책, 채무자 정보, 미납 관리비 정보<br />
                  이용목적: 관리비 추심 서비스 제공, 상담 및 업무 연락<br />
                  보유기간: 서비스 완료 후 3년<br />
                  <br />
                  귀하는 개인정보 제공 동의를 거부할 권리가 있으나, 거부 시 서비스 이용이 제한될 수 있습니다.
                </p>
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleInputChange}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  개인정보 수집·이용에 동의합니다. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-12 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    전송 중...
                  </>
                ) : (
                  <>
                    <span>📧</span>
                    의뢰서 제출하기
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}