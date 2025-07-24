"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// 애니메이션 훅
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return [ref, isVisible] as const;
}

function useItemAnimation() {
  const [itemsVisible, setItemsVisible] = useState<boolean[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const items = element.querySelectorAll(".animate-item");
    setItemsVisible(new Array(items.length).fill(false));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((_, index) => {
            setTimeout(() => {
              setItemsVisible((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return [ref, itemsVisible] as const;
}

export default function Home() {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [goldTimeRef, goldTimeVisible] = useScrollAnimation();
  const [extinctionRef, extinctionVisible] = useScrollAnimation();
  const [damageCardsRef, damageCardsVisible] = useItemAnimation();
  const [serviceCardsRef, serviceCardsVisible] = useItemAnimation();
  const [consultRef, consultItemsVisible] = useItemAnimation();
  const [faqRef, faqItemsVisible] = useItemAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  return (
    <main className="min-h-screen bg-white break-keep">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/logo2.png"
                alt="베스트청산 로고 - 관리비 추심 전문 컨설팅"
                width={30}
                height={30}
              />
              <h1 className="ml-2 text-md font-bold text-blue-600">
                BESTChungSan
              </h1>
            </div>
            <nav
              className="hidden md:flex space-x-8"
              role="navigation"
              aria-label="주요 메뉴"
            >
              <a
                href="#service"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="관리비 추심 서비스 안내"
              >
                서비스안내
              </a>
              <a
                href="#why-need"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="미납관리비 방치 시 손해"
              >
                왜필요한가요
              </a>
              <a
                href="#faq"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="자주 묻는 질문"
              >
                자주묻는질문
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="관리비 추심 상담 및 의뢰"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("footer")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                상담문의
              </a>
            </nav>
            <div className="flex space-x-4">
              <button
                className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                aria-label="관리비 추심 상담 문의"
              >
                상담하기
              </button>
              <Link
                href="/request"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="관리비 추심 의뢰하기"
              >
                의뢰하기
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section
        className="relative py-40 min-h-[500px] overflow-hidden"
        aria-label="메인 소개"
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/4351.jpg"
            alt="아파트 건물 배경 이미지 - 관리비 추심 전문 컨설팅 베스트청산"
            fill
            style={{
              objectFit: "cover",
              filter: "brightness(0.5) contrast(1.1)",
            }}
            priority
            quality={90}
            onLoad={() => console.log("Image loaded!")}
            onError={(e) => console.error("Image error:", e)}
          />
        </div>
        {/* <div className="absolute inset-0 bg-black bg-opacity-30 z-10" /> */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-lg font-semibold mb-4">
            빠르고 확실한 관리비추심
          </p>
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            밀린 관리비
            <br />
            <span className="text-white">내 돈은 당연히 받아야 합니다</span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            추심은 전문가에게 맡겨야 합니다.
          </p>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
            이제 베스트청산이 당신의 채권을 추심해드립니다
          </p>
          <div
            ref={heroRef}
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <button
              className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 hover:scale-105 transform"
              aria-label="카카오톡으로 관리비 추심 상담하기"
            >
              <span>💬</span> 카카오톡으로 상담하기
            </button>
            <Link
              href="/request"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 hover:scale-105 transform"
              aria-label="지금 관리비 추심 의뢰하기"
            >
              <span>▶</span> 지금 관리비추심 의뢰하기
            </Link>
          </div>
        </div>
      </section>

      {/* 골드타임 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-lg font-semibold mb-4">
            <span className="text-blue-600">골든타임</span>을 놓치지 마세요
          </p>
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 leading-tight">
            <span className="text-black">법적조치</span>와{" "}
            <span className="text-black">추심활동</span>이
            <br />
            <span className="text-black-">유기적으로 융합</span>되어야 합니다
          </h3>

          <div
            ref={goldTimeRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
          >
            <div
              className={`flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg transition-all duration-700 delay-200 ${
                goldTimeVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0 mt-1">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-700 leading-relaxed">
                법무법인을 통해 채무자의 재산을 조회하고 법적 절차를 진행합니다.
              </p>
            </div>

            <div
              className={`flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg transition-all duration-700 delay-400 ${
                goldTimeVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0 mt-1">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-700 leading-relaxed">
                전문 변호사와 추심전문인력이 사건초기부터 최적의 추심방법을
                찾습니다.
              </p>
            </div>

            <div
              className={`flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg transition-all duration-700 delay-600 ${
                goldTimeVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0 mt-1">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-700 leading-relaxed">
                법무법인에 접근이 허용된 개인정보와 신용정보 데이터를 함께
                이용합니다.
              </p>
            </div>

            <div
              className={`flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg transition-all duration-700 delay-800 ${
                goldTimeVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0 mt-1">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-700 leading-relaxed">
                법적 절차와 납부 안내를 함께 진행하며, 회수된 금액에서 수수료로
                정산됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 소멸시효 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-lg font-semibold mb-4">
            채권은 일정시간이 지나면 소멸됩니다
          </p>
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="text-blue-600">체계적</span>이고{" "}
            <span className="text-blue-600">정당한 방법</span>으로
            <br />
            관리 및 법적 절차를 진행합니다
          </h3>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            전문가가 채무자의 상황을 파악해 법적 절차 지원과 납부 안내를
            이어갑니다.
          </p>

          {/* 채권의 소멸시효 카드 */}
          <div
            ref={extinctionRef}
            className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-xl mx-auto transition-all duration-1000 ${
              extinctionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col items-center mb-6">
              <span className="text-3xl mb-3">⚠️</span>
              <h4 className="text-xl font-bold text-gray-900">
                채권의 소멸시효
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* 3년차 카드 */}
              <div className="bg-gray-50 rounded-xl px-4 py-6 text-center">
                <div className="inline-flex items-center justify-center bg-orange-100 rounded-lg px-4 py-2 mb-4">
                  <span className="text-orange-600 text-lg font-bold">
                    3년차
                  </span>
                </div>
                <div className="space-y-1 text-gray-700 text-md">
                  <p>임금, 퇴직금</p>
                  <p>임대료</p>
                  <p>관리비</p>
                  <p>공사대금</p>
                  <p>약속어음</p>
                </div>
              </div>

              {/* 10년차 카드 */}
              <div className="bg-gray-50 rounded-xl px-4 py-6 text-center">
                <div className="inline-flex items-center justify-center bg-blue-100 rounded-lg px-4 py-2 mb-4">
                  <span className="text-blue-600 text-lg font-bold">
                    10년차
                  </span>
                </div>
                <div className="space-y-1 text-gray-700 text-md">
                  <p>민사채권</p>
                  <p>판결문</p>
                  <p className="text-sm text-gray-500 mt-3">
                    일반적인 금전채권 및<br />
                    법원 판결에 의한 채권
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mt-8 max-w-2xl mx-auto">
            <p className="text-gray-700 text-center leading-relaxed">
              <span className="">베스트청산</span>은 판결의 시효나 소멸시효까지
              놓치지 않도록 챙겨드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* 미납관리비 심각성 섹션 */}
      <section id="why-need" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gray-600 text-lg font-semibold mb-4">
              미납관리비를 방치하면 이런 손해가 발생합니다
            </p>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              단순히 돈을 못 받는 것이 아닙니다.
              <br />
              관리단 전체에 <span className="text-blue-600">중대한 영향</span>을
              미칩니다.
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              관리비는 단순한 관리비용이 아니라, 공동전기료·수도료 등 공과금도
              포함됩니다.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              미납을 방치할 경우 공용 전기·수도 단절 등 직접적 피해로 이어질 수
              있으므로 반드시 적시에 정리하셔야 합니다.
            </p>
          </div>

          <div ref={damageCardsRef} className="grid md:grid-cols-2 gap-8 mb-16">
            <div
              className={`animate-item bg-gray-50 rounded-2xl p-8 transition-all duration-700 ${
                damageCardsVisible[0]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="pr-2">
                  <span className="text-gray-600 text-3xl">💰</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 leading-tight">
                  재무적 손해
                </h4>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">•</span>
                  <span className="leading-relaxed">
                    공용시설 유지관리 예산 부족으로{" "}
                    <span className="text-gray-700">시설 노후화 가속</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">•</span>
                  <span className="leading-relaxed">
                    장기수선충당금 적립 차질로 대형 수리 시{" "}
                    <span className="text-gray-700">특별부담금 발생</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">•</span>
                  <span className="leading-relaxed">
                    성실 납부 세대에 부담 전가로{" "}
                    <span className="text-gray-700">관리비 인상 압박</span>
                  </span>
                </li>
              </ul>
            </div>

            <div
              className={`animate-item bg-gray-50 rounded-2xl p-8 transition-all duration-700 ${
                damageCardsVisible[1]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="pr-4">
                  <span className="text-gray-600 text-3xl">🏢</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 leading-tight">
                  운영적 손해
                </h4>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">•</span>
                  <span className="leading-relaxed">
                    미화, 경비, 설비 유지보수 등 서비스 질 저하
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">•</span>
                  <span className="leading-relaxed">
                    긴급 보수 및 고장 대응 지연으로 주민 불편 증가
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">•</span>
                  <span className="leading-relaxed">
                    관리운영 전반에 대한 주민 불만 증대
                  </span>
                </li>
              </ul>
            </div>

            <div
              className={`animate-item bg-gray-50 rounded-2xl p-8 transition-all duration-700 ${
                damageCardsVisible[2]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="pr-4">
                  <span className="text-gray-600 text-3xl">⚖️</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 leading-tight">
                  법적·행정적 손해
                </h4>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">•</span>
                  <span className="leading-relaxed">
                    집합건물법 제24조상 관리단의{" "}
                    <span className="text-gray-700">채권 보전 의무</span> 미이행
                    시 <span className="text-gray-700">법적 책임</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">•</span>
                  <span className="leading-relaxed">
                    외부회계감사 및 행정감사에서 지적 위험
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">•</span>
                  <span className="leading-relaxed">
                    소송·추심 미숙으로 인한 시간 및 비용 낭비
                  </span>
                </li>
              </ul>
            </div>

            <div
              className={`animate-item bg-gray-50 rounded-2xl p-8 transition-all duration-700 ${
                damageCardsVisible[3]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="pr-4">
                  <span className="text-gray-600 text-3xl">👥</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 leading-tight">
                  공동체 신뢰 손해
                </h4>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">•</span>
                  <span className="leading-relaxed">
                    <span className="text-gray-700">도덕적 해이 확산</span>으로
                    전체 납부율 저하
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">•</span>
                  <span className="leading-relaxed">
                    세대 간 갈등 심화 및 관리주체 신뢰도 저하
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">•</span>
                  <span className="leading-relaxed">
                    <span className="text-gray-700">아파트 가치 하락</span>으로
                    재산 손실 발생
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 안내 섹션 */}
      <section id="service" className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              미납 관리비가 있다면,
              <br />
              <span className="text-gray-700">바로 추심이 가능</span>합니다
            </h3>
          </div>

          <div
            ref={serviceCardsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            <div
              className={`animate-item text-center p-6 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-700 ${
                serviceCardsVisible[0]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-4xl mb-4">📄</div>
              <h4 className="font-semibold text-gray-900 leading-relaxed">
                관리비 고지서
              </h4>
            </div>
            <div
              className={`animate-item text-center p-6 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-700 ${
                serviceCardsVisible[1]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-4xl mb-4">📋</div>
              <h4 className="font-semibold text-gray-900 leading-relaxed">
                입주자 명부
              </h4>
            </div>
            <div
              className={`animate-item text-center p-6 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-700 ${
                serviceCardsVisible[2]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-4xl mb-4">🏢</div>
              <h4 className="font-semibold text-gray-900 leading-relaxed">
                관리규약
              </h4>
            </div>
            <div
              className={`animate-item text-center p-6 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-700 ${
                serviceCardsVisible[3]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-4xl mb-4">⚖️</div>
              <h4 className="font-semibold text-gray-900 leading-relaxed">
                법적 근거
              </h4>
            </div>
          </div>

          <div className="relative bg-gray-50  p-8  ">
            <div className="absolute inset-0 w-full h-full rounded-2xl ">
              <Image
                src="/2147626311.jpg"
                alt="회의 하는 사진"
                fill
                style={{
                  objectFit: "cover",
                  filter: "brightness(0.3) contrast(1.1)",
                  borderRadius: "20px",
                }}
                priority
                quality={90}
                onLoad={() => console.log("Image loaded!")}
                onError={(e) => console.error("Image error:", e)}
              />
            </div>
            <div className="relative z-20 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 leading-tight">
                베스트청산에서
                <br />
                <span className="">원스톱</span>으로 진합하세요
              </h3>
              <p className="text-center text-white mb-8 max-w-4xl mx-auto leading-relaxed text-base md:text-lg">
                필요한 법적 절차 지원과 납부 안내를 원스톱으로 지원합니다.
                <br />
                원스톱으로 진행되지 않는다면, 따로따로 비용이 들며 골든타임을
                놓칠 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 법률상담 & 실제추심 섹션 */}
      <section className="py-20 bg-gray-50">
        <div
          ref={consultRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* 법률 상담 카드 */}
            <div
              className={`animate-item group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-1000 border border-gray-100 ${
                consultItemsVisible[0]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-95"
              }`}
            >
              <div className="absolute top-0 left-8 -mt-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-6">
                <h4
                  className={`text-2xl font-bold text-gray-900 mb-3 transition-all duration-700 ${
                    consultItemsVisible[0]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  법률 상담
                </h4>
                {/* 법률 상담 카드 */}
                <div className="space-y-4">
                  <div
                    className={`animate-item flex items-start gap-4 p-4 bg-blue-50 rounded-xl transition-all duration-700 ${
                      consultItemsVisible[1]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">
                        <span className="">전문 법무팀</span> 연계
                      </h5>
                      <p className="text-sm text-gray-600">
                        제휴 변호사를 통해 법률 상담을 지원합니다
                      </p>
                    </div>
                  </div>

                  <div
                    className={`animate-item flex items-start gap-4 p-4 bg-blue-50 rounded-xl transition-all duration-700 ${
                      consultItemsVisible[2]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">
                        <span className="">추심 가능성</span> 판단
                      </h5>
                      <p className="text-sm text-gray-600">
                        전문적 검토를 통한 회수 가능성 분석
                      </p>
                    </div>
                  </div>

                  <div
                    className={`animate-item flex items-start gap-4 p-4 bg-blue-50 rounded-xl transition-all duration-700 ${
                      consultItemsVisible[3]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">
                        법적 절차 안내
                      </h5>
                      <p className="text-sm text-gray-600">
                        단계별 법적 절차 및 필요 서류 안내
                      </p>
                    </div>
                  </div>

                  <div
                    className={`animate-item flex items-start gap-4 p-4 bg-blue-50 rounded-xl transition-all duration-700 ${
                      consultItemsVisible[4]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">
                        관련 법령 해석
                      </h5>
                      <p className="text-sm text-gray-600">
                        집합건물법 등 관련 법령의 명확한 해석
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 실제 추심 카드 */}
            <div
              className={`animate-item group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-1000 border border-gray-100 ${
                consultItemsVisible[5]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-95"
              }`}
            >
              <div className="absolute top-0 left-8 -mt-6">
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-6">
                <h4
                  className={`text-2xl font-bold text-gray-900 mb-3 transition-all duration-700 ${
                    consultItemsVisible[5]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  실제 추심
                </h4>

                <div className="space-y-4">
                  <div
                    className={`animate-item flex items-start gap-4 p-4 bg-green-50 rounded-xl transition-all duration-700 ${
                      consultItemsVisible[6]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">
                        <span className="">전문 상담팀</span> 운영
                      </h5>
                      <p className="text-sm text-gray-600">
                        숙련된 전문가의 직접 입주자 연락 및 협상
                      </p>
                    </div>
                  </div>

                  <div
                    className={`animate-item flex items-start gap-4 p-4 bg-green-50 rounded-xl transition-all duration-700 ${
                      consultItemsVisible[7]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">
                        체계적 납부 관리
                      </h5>
                      <p className="text-sm text-gray-600">
                        단계적 독촉 및 맞춤형 납부 안내 서비스
                      </p>
                    </div>
                  </div>

                  <div
                    className={`animate-item flex items-start gap-4 p-4 bg-green-50 rounded-xl transition-all duration-700 ${
                      consultItemsVisible[8]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">
                        맞춤형 분할 협의
                      </h5>
                      <p className="text-sm text-gray-600">
                        개별 상황을 고려한 현실적 분할 납부 방안
                      </p>
                    </div>
                  </div>

                  <div
                    className={`animate-item flex items-start gap-4 p-4 bg-green-50 rounded-xl transition-all duration-700 ${
                      consultItemsVisible[9]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">
                        <span className="">강제집행</span> 절차
                      </h5>
                      <p className="text-sm text-gray-600">
                        필요시 신속한 법적 조치 및 강제집행 진행
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section id="faq" className="mt-20 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mt-20 pt-20 mb-16">
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              자주묻는질문
            </h3>
          </div>

          <div ref={faqRef} className="max-w-3xl mx-auto space-y-6">
            <div
              className={`animate-item bg-gray-50 rounded-xl p-6 transition-all duration-700 ${
                faqItemsVisible[0]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h4 className="font-semibold text-gray-900 mb-3 leading-tight">
                Q. 관리비 추심에는 어떤 업무가 포함되나요?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                법적 검토부터 납부 안내, 필요 시 변호사를 통한 법적 절차까지
                지원합니다.
              </p>
            </div>

            <div
              className={`animate-item bg-gray-50 rounded-xl p-6 transition-all duration-700 ${
                faqItemsVisible[1]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h4 className="font-semibold text-gray-900 mb-3 leading-tight">
                Q. 정말 받을 때까지 회수해 주나요?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                네, 법적 절차와 안내를 통해 끝까지 관리비 회수를 지원합니다.
                모든 절차는 법령이 정한 기간(소멸시효) 내에서 진행됩니다.
              </p>
            </div>

            <div
              className={`animate-item bg-gray-50 rounded-xl p-6 transition-all duration-700 ${
                faqItemsVisible[2]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h4 className="font-semibold text-gray-900 mb-3 leading-tight">
                Q. 소멸시효는 어떻게 관리하나요?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                관리비 채권의 3년 소멸시효를 놓치지 않도록 적절한 시기에 법적
                조치를 취하여 시효를 중단시킵니다.
              </p>
            </div>

            <div
              className={`animate-item bg-gray-50 rounded-xl p-6 transition-all duration-700 ${
                faqItemsVisible[3]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h4 className="font-semibold text-gray-900 mb-3 leading-tight">
                Q. 회수 실패 시에도 비용을 납부해야 하나요?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                아니요. 성공보수 방식으로 실제 회수에 성공한 금액에 대해서만
                수수료를 납부하시면 됩니다.
              </p>
            </div>

            <div
              className={`animate-item bg-gray-50 rounded-xl p-6 transition-all duration-700 ${
                faqItemsVisible[4]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h4 className="font-semibold text-gray-900 mb-3 leading-tight">
                Q. 어떤 서류가 필요한가요?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                관리비 고지서, 입주자 명부, 관리규약 등 관련 서류가 필요하며,
                상담 시 자세히 안내해드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-blue-600">
        <div
          ref={ctaRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            ctaVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h3
            className={`text-2xl md:text-4xl font-bold text-white mb-4 leading-tight transition-all duration-700 delay-200 ${
              ctaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            관리비 추심도 얼마든지 <span className="text-yellow-300">간편</span>
            하고
            <br />
            <span className="text-yellow-300">합리적인 요금</span>으로 진행할 수
            있습니다
          </h3>
          <p
            className={`text-lg md:text-xl text-blue-100 mb-8 leading-relaxed transition-all duration-700 delay-400 ${
              ctaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-yellow-200">전국 어디서나</span> •{" "}
            <span className="text-yellow-200">전문가가 직접 처리</span> •{" "}
            <span className="text-yellow-200">성공보수 방식</span>
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-600 ${
              ctaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 hover:scale-105 transform">
              <span>💬</span> 카카오톡으로 상담하기
            </button>
            <Link
              href="/request"
              className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              <span>▶</span> 지금 관리비추심 의뢰하기
            </Link>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4 leading-tight text-white">
                베스트청산
              </h4>
              <p className="text-gray-400 mb-4 leading-relaxed">
                전문가가 직접 처리하는 관리비 추심 서비스
              </p>
              <div className="text-sm text-gray-400 leading-relaxed">
                <p>대표: 임아연</p>
                <p>사업자등록번호: 118-87-03556</p>
              </div>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4 leading-tight text-white">
                베스트청산 고객센터
              </h5>
              <div className="text-gray-400 leading-relaxed">
                <p className="text-2xl font-bold text-white mb-2">
                  031-313-9990
                </p>
                <p>평일 09:00~18:00 (점심 12:00~13:00)</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 베스트청산. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
