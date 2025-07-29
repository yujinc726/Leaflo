"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Leaf, ArrowRight, Recycle, TrendingUp, Users, CheckCircle, Star, Zap } from "lucide-react"
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

// Simple Animated Icon Component
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
      <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform duration-200 hover:-translate-y-1">
        <Icon className="w-8 h-8 text-emerald-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

// Value Card Component
function ValueCard({
  icon: Icon,
  title,
  description,
  highlight,
  delay = 0,
}: {
  icon: any;
  title: string;
  description: string;
  highlight: string;
  delay?: number;
}) {
  const { elementRef, isVisible } = useIntersectionObserver()

  return (
    <div
      ref={elementRef}
      className={`relative bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-50 to-green-50 rounded-full -mr-10 -mt-10 opacity-60"></div>
      
      <div className="relative">
        <div className="w-14 h-14 mb-6 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center">
          <Icon className="w-7 h-7 text-emerald-600" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
        
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full">
          <Star className="w-4 h-4 text-emerald-600 mr-2" />
          <span className="text-emerald-700 font-semibold text-sm">{highlight}</span>
        </div>
      </div>
    </div>
  )
}

// Section Title Component
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

// Impact Stat Component
function ImpactStat({
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
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      <div className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
        {value}
      </div>
      <p className="text-emerald-100 font-medium">{label}</p>
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
            버려지던 낙엽을 고효율 바이오매스 펠릿으로 전환하여
            <br />
            <span className="text-emerald-700 font-semibold">지속가능한 미래를 만들어가는 Leaflo입니다.</span>
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

      {/* Leaflo의 혁신적 가치 Section - 새로운 디자인 */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Leaflo의 혁신적 가치"
            subtitle="버려지던 낙엽을 혁신적인 기술로 고부가가치 에너지원으로 전환합니다"
          />

          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon={Recycle}
              title="순환경제 실현"
              description="연간 30만톤의 낙엽 폐기물을 100% 재활용하여 새로운 가치를 창출합니다"
              highlight="30만톤 낙엽 재활용"
              delay={0}
            />
            <ValueCard
              icon={Zap}
              title="검증된 효율성"
              description="ISO 17225 시리즈 기준으로 기존 목재펠릿 대비 96% 효율을 달성했습니다"
              highlight="96% 효율 달성"
              delay={100}
            />
            <ValueCard
              icon={TrendingUp}
              title="블루오션 시장"
              description="경쟁자 없는 840억원 규모의 새로운 시장을 개척하고 선도합니다"
              highlight="840억원 시장 규모"
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="왜 Leaflo인가요?"
            subtitle="환경 보호와 경제적 가치를 동시에 실현하는 차세대 바이오매스 솔루션입니다."
          />

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <AnimatedIcon
              icon={Leaf}
              title="친환경 기술"
              description="100% 천연 낙엽을 활용한 친환경 에너지 솔루션으로 지구를 보호합니다"
              delay={0}
            />
            <AnimatedIcon
              icon={Users}
              title="이중 수익 구조"
              description="지자체 위탁사업과 펠릿 판매를 통한 안정적이고 지속가능한 수익 모델입니다"
              delay={100}
            />
            <AnimatedIcon
              icon={CheckCircle}
              title="혁신적인 솔루션"
              description="폐기물을 자원으로 전환하는 순환경제 모델을 통해 지속가능한 미래를 만듭니다"
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

      {/* Impact Stats Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-600 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle
            title="Leaflo의 임팩트"
            subtitle="데이터로 입증된 혁신적 가치와 시장 잠재력"
            className="text-white"
          />

          <div className="grid md:grid-cols-4 gap-8">
            <ImpactStat
              value="96%"
              label="목재 펠릿 대비 효율성"
              delay={0}
            />
            <ImpactStat
              value="30만톤"
              label="연간 낙엽 수거 가능량"
              delay={100}
            />
            <ImpactStat
              value="840억원"
              label="시장 규모"
              delay={200}
            />
            <ImpactStat
              value="70%"
              label="처리비용 절감 효과"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <SectionTitle
            title="지속가능한 미래를 함께 만들어가요"
            subtitle="Leaflo와 함께 버려지던 낙엽을 에너지원으로 전환하여 환경을 보호하고 새로운 가치를 창출해보세요."
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/business">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg group transition-all duration-200 hover:scale-102 hover:-translate-y-1"
              >
                비즈니스 모델 알아보기
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent transition-all duration-200 hover:scale-102 hover:-translate-y-1"
              >
                파트너십 문의
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
