"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Leaf, DollarSign, Lightbulb, ArrowRight, Building2, TrendingUp, Zap, Target } from "lucide-react"
import Link from "next/link"

// Intersection Observer 훅
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [hasAnimated, options])

  return { elementRef, isVisible }
}

// Simple Animated Icon Component - Intersection Observer 추가
function AnimatedIcon({
  icon: Icon,
  title,
  description,
  delay = 0,
}: { icon: any; title: string; description: string; delay?: number }) {
  const { elementRef, isVisible } = useIntersectionObserver()

  return (
    <div
      ref={elementRef}
      className={`text-center transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      <div
        className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform duration-200 hover:-translate-y-1"
      >
        <Icon className="w-8 h-8 text-emerald-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

// Business Card Component - Intersection Observer 추가
function BusinessCard({
  icon: Icon,
  title,
  children,
  delay = 0,
  iconBg,
  iconColor,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
  delay?: number;
  iconBg: string;
  iconColor: string;
}) {
  const { elementRef, isVisible } = useIntersectionObserver()

  return (
    <div
      ref={elementRef}
      className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-700 hover:-translate-y-2 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      <div className={`w-16 h-16 mx-auto mb-6 ${iconBg} rounded-2xl flex items-center justify-center`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h3>
      {children}
    </div>
  )
}

// Stat Item Component - Intersection Observer 추가
function StatItem({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const { elementRef, isVisible } = useIntersectionObserver()

  return (
    <div
      ref={elementRef}
      className={`text-center transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      <div className="text-4xl font-bold mb-2">{value}</div>
      <p className="text-emerald-100">{label}</p>
    </div>
  )
}

// Section Title Component - 섹션 제목용
function SectionTitle({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  const { elementRef, isVisible } = useIntersectionObserver()

  return (
    <div
      ref={elementRef}
      className={`text-center mb-16 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{title}</h2>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLElement>(null)
  
  // Hero 애니메이션을 위한 상태
  const [heroVisible, setHeroVisible] = useState(false)

  // Subtle parallax effect
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -15])

  // Hero 섹션 애니메이션 시작
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY }}
      >
        {/* Clean Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50" />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div
            className={`mb-6 transition-all duration-700 ease-out ${
              heroVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}
          >
            <Leaf className="w-16 h-16 text-emerald-600 mx-auto" />
          </div>

          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transition-all duration-700 ease-out ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: heroVisible ? '100ms' : '0ms' }}
          >
            낙엽이{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">에너지</span>
            가 되는
            <br />
            혁신적인 순간
          </h1>

          <p
            className={`text-xl md:text-2xl mb-8 text-gray-600 leading-relaxed transition-all duration-700 ease-out ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: heroVisible ? '200ms' : '0ms' }}
          >
            연간 30만톤의 버려지던 낙엽을 <span className="text-emerald-700 font-semibold">96% 효율</span>의 바이오매스 펠릿으로.
            <br />
            <span className="text-emerald-700 font-semibold">840억원 규모</span>의 블루오션 시장에서 <span className="text-emerald-700 font-semibold">Leaflo가 혁신을 만듭니다.</span>
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ease-out ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: heroVisible ? '300ms' : '0ms' }}
          >
            <Link href="/about">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg group transition-all duration-200 hover:scale-102 hover:-translate-y-1"
              >
                Leaflo 자세히 알아보기
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>

            <Link href="/business">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent transition-all duration-200 hover:scale-102 hover:-translate-y-1"
              >
                비즈니스 모델 보기
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Key Facts Section - 새로운 섹션 추가 */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Leaflo의 혁신적 가치"
            subtitle="데이터로 입증된 Leaflo 펠릿의 우수성과 시장 잠재력"
            className="text-white"
          />

          <div className="grid md:grid-cols-4 gap-8">
            <StatItem
              value="96%"
              label="목재 펠릿 대비 효율성<br/>(ISO 17225 시리즈 기준)"
              delay={0}
            />
            <StatItem
              value="30만톤"
              label="연간 낙엽 수거량<br/>(전국 기준)"
              delay={100}
            />
            <StatItem
              value="840억원"
              label="버려지는 시장 가치<br/>(경기정책연구소)"
              delay={200}
            />
            <StatItem
              value="70%"
              label="현재 버려지는 낙엽 비율<br/>(재활용 가능 자원)"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="왜 Leaflo인가요?"
            subtitle="버려지던 낙엽을 에너지원으로 전환하여 환경 보호와 경제적 가치를 동시에 실현하는 차세대 바이오매스 솔루션입니다."
          />

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <AnimatedIcon
              icon={Zap}
              title="검증된 효율성"
              description="에테르 펠릿은 기존 목재펠릿 대비 96% 효율로 ±5% 이내 동일 연료로 간주됩니다"
              delay={0}
            />
            <AnimatedIcon
              icon={TrendingUp}
              title="블루오션 시장"
              description="경쟁자 없는 840억원 규모의 낙엽 활용 시장에서 선도적 위치를 확보합니다"
              delay={100}
            />
            <AnimatedIcon
              icon={Target}
              title="이중 수익 구조"
              description="지자체 위탁사업과 펠릿 판매를 통한 Dual-Revenue Engine으로 안정적 수익을 보장합니다"
              delay={200}
            />
          </div>

          <div className="text-center">
            <Link href="/about">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 text-lg font-semibold rounded-xl shadow-lg group transition-all duration-200 hover:scale-102 hover:-translate-y-1"
              >
                더 자세히 알아보기
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Business Model Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="3가지 수익 모델"
            subtitle="이중 수익 구조(Dual-Revenue Engine)로 지속가능하고 다양한 수익을 창출합니다"
          />

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <BusinessCard
              icon={Building2}
              title="B2G 지자체 위탁"
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
              delay={0}
            >
              <div className="space-y-3 text-gray-600">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-700">낙엽 처리 위탁사업</p>
                  <p className="text-sm">톤당 18만원 수거 처리비</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-semibold text-green-700">비용 절감 효과</p>
                  <p className="text-sm">기존 소각 대비 70% 절감</p>
                </div>
              </div>
            </BusinessCard>

            <BusinessCard
              icon={DollarSign}
              title="B2B/B2C 펠릿 판매"
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
              delay={100}
            >
              <div className="space-y-3 text-gray-600">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="font-semibold text-emerald-700">B2B 산업용</p>
                  <p className="text-sm">373원/kg | 발전소·산업용 보일러</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-semibold text-amber-700">B2C 생활용</p>
                  <p className="text-sm">870원/kg | 캠핑·난로·고양이모래</p>
                </div>
              </div>
            </BusinessCard>

            <BusinessCard
              icon={Leaf}
              title="ESG·탄소저감 크레딧"
              iconBg="bg-green-100"
              iconColor="text-green-600"
              delay={200}
            >
              <div className="space-y-3 text-gray-600">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-semibold text-green-700">탄소배출권 판매</p>
                  <p className="text-sm">현재 1만원/톤 | 상승 전망</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="font-semibold text-purple-700">ESG 경영 지원</p>
                  <p className="text-sm">대기업 환경 목표 달성 기여</p>
                </div>
              </div>
            </BusinessCard>
          </div>

          <div className="text-center">
            <Link href="/business">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 text-lg font-semibold rounded-xl shadow-lg group transition-all duration-200 hover:scale-102 hover:-translate-y-1"
              >
                비즈니스 모델 자세히 보기
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Section - 새로운 섹션 추가 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Our Technology: 3-Step Solution"
            subtitle="검증된 기술력으로 낙엽을 고품질 바이오매스 펠릿으로 전환합니다"
          />

          <div className="grid md:grid-cols-3 gap-8">
            <BusinessCard
              icon={() => <span className="text-2xl font-bold">1</span>}
              title="깨끗하게 분류"
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
              delay={0}
            >
              <div className="text-gray-600 text-center">
                <p className="mb-3">트럼멜 스크린과 자석 선별기로 낙엽 외의 자 이물질을 완벽히 제거합니다.</p>
                <p className="text-sm">다단 침전 세척 방식으로 흙, 미세먼지 등 외부(Ash)의 직접적인 원인이 되는 잔류물을 제거합니다.</p>
              </div>
            </BusinessCard>

            <BusinessCard
              icon={() => <span className="text-2xl font-bold">2</span>}
              title="똑똑하게 섞습니다"
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
              delay={100}
            >
              <div className="text-gray-600 text-center">
                <p className="mb-3">정제된 원료의 성분과 상태를 NIR(근적외선) 분석 데이터 기반으로 실시간 진단합니다.</p>
                <p className="text-sm">진단 결과에 따라 최적의 연소 효율과 성형성을 구현할 수 있는 천연 유래바인더를 가장 이상적인 비율로자동 블렌딩합니다.</p>
              </div>
            </BusinessCard>

            <BusinessCard
              icon={() => <span className="text-2xl font-bold">3</span>}
              title="단단하게 만듭니다"
              iconBg="bg-green-100"
              iconColor="text-green-600"
              delay={200}
            >
              <div className="text-gray-600 text-center">
                <p className="mb-3">해머밀로 원료 입자를 균일하게 분쇄한 뒤, 저온 벨트 건조기를 통해 최소한의 에너지로 함수율을 7~11%까지 정밀하게 조절합니다.</p>
                <p className="text-sm">고온·고압의 링타이(Ring-die) 펠릿밀에서 고밀도 펠릿으로 압축하고 카운터플로우 쿨러를 금속 냉각 및 미세 가루 제거를 통해 최종 제품을 완성합니다.</p>
              </div>
            </BusinessCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
