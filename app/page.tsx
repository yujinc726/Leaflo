"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Leaf, DollarSign, Lightbulb, ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"

// 개선된 애니메이션 설정
const ANIMATION_DURATION = 0.5
const STAGGER_DELAY = 0.1
const HOVER_DURATION = 0.2

// Simple Animated Icon Component
function AnimatedIcon({
  icon: Icon,
  title,
  description,
  delay = 0,
}: { icon: any; title: string; description: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: ANIMATION_DURATION, 
        delay: delay,
        ease: "easeOut"
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        y: -4,
        transition: { duration: HOVER_DURATION }
      }}
      className="text-center"
    >
      <motion.div
        className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: HOVER_DURATION }
        }}
      >
        <Icon className="w-8 h-8 text-emerald-600" />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}

// Business Card Component
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: ANIMATION_DURATION, 
        delay: delay,
        ease: "easeOut"
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        y: -6,
        transition: { duration: HOVER_DURATION }
      }}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className={`w-16 h-16 mx-auto mb-6 ${iconBg} rounded-2xl flex items-center justify-center`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h3>
      {children}
    </motion.div>
  )
}

// Stat Item Component
function StatItem({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: ANIMATION_DURATION, 
        delay: delay,
        ease: "easeOut"
      }}
      viewport={{ once: true, amount: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl font-bold mb-2">{value}</div>
      <p className="text-emerald-100">{label}</p>
    </motion.div>
  )
}

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLElement>(null)

  // Subtle parallax effect
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -15])

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

        {/* Subtle floating elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-200 rounded-full opacity-30"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [-3, -12, -3],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6"
          >
            <Leaf className="w-16 h-16 text-emerald-600 mx-auto" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            낙엽이{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">에너지</span>
            가 되는
            <br />
            혁신적인 순간
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            버려지던 낙엽을 지속가능한 바이오매스 자원으로.
            <br />
            <span className="text-emerald-700 font-semibold">Leaflo는 혁신으로 미래를 만듭니다.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/about">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ duration: HOVER_DURATION }}
              >
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg group transition-colors duration-200"
                >
                  Leaflo 자세히 알아보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </Link>

            <Link href="/business">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ duration: HOVER_DURATION }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent transition-colors duration-200"
                >
                  비즈니스 모델 보기
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Simple scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 6, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className="w-6 h-10 border-2 border-emerald-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-emerald-600 rounded-full mt-2" />
          </div>
        </motion.div>
      </motion.section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">왜 Leaflo인가요?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              매년 버려지는 수많은 낙엽을 혁신적인 기술로 고효율 바이오매스 팰릿으로 전환하여 환경 보호와 경제적 가치를
              동시에 실현합니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <AnimatedIcon
              icon={Leaf}
              title="친환경 기술"
              description="100% 천연 낙엽을 활용한 친환경 에너지 솔루션으로 지구를 보호합니다"
              delay={0}
            />
            <AnimatedIcon
              icon={DollarSign}
              title="비용 효율성"
              description="기존 연료 대비 경제적이고 효율적인 에너지원을 제공합니다"
              delay={STAGGER_DELAY}
            />
            <AnimatedIcon
              icon={Lightbulb}
              title="혁신적인 솔루션"
              description="폐기물을 자원으로 전환하는 순환경제 모델을 구현합니다"
              delay={STAGGER_DELAY * 2}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center"
          >
            <Link href="/about">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ duration: HOVER_DURATION }}
              >
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 text-lg font-semibold rounded-xl shadow-lg group transition-colors duration-200"
                >
                  더 자세히 알아보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Business Model Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">3가지 수익 모델</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              지속가능하고 다양한 수익 구조로 안정적인 성장을 실현합니다
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <BusinessCard
              icon={DollarSign}
              title="A. 펠릿 제품 판매"
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
              delay={0}
            >
              <div className="space-y-3 text-gray-600">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="font-semibold text-emerald-700">B2B 산업용</p>
                  <p className="text-sm">373원/kg | 21-30톤에서 손익분기</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-700">B2C 생활용</p>
                  <p className="text-sm">600-870원/kg | 캠핑·난로·고양이모래</p>
                </div>
              </div>
            </BusinessCard>

            <BusinessCard
              icon={Building2}
              title="B. 지자체 위탁계약"
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
              delay={STAGGER_DELAY}
            >
              <div className="space-y-3 text-gray-600">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-700">이중 수익 구조</p>
                  <p className="text-sm">위탁비 수입 + 펠릿 판매 수익</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-semibold text-green-700">지자체 혜택</p>
                  <p className="text-sm">톤당 30-50만원 처리비용 절감</p>
                </div>
              </div>
            </BusinessCard>

            <BusinessCard
              icon={Leaf}
              title="C. 탄소저감 크레딧"
              iconBg="bg-green-100"
              iconColor="text-green-600"
              delay={STAGGER_DELAY * 2}
            >
              <div className="space-y-3 text-gray-600">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-semibold text-green-700">탄소배출권 판매</p>
                  <p className="text-sm">현재 1만원/톤 | 상승 전망</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-semibold text-amber-700">ESG 경영 기여</p>
                  <p className="text-sm">대기업 ESG 목표 달성 지원</p>
                </div>
              </div>
            </BusinessCard>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center"
          >
            <Link href="/business">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ duration: HOVER_DURATION }}
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 text-lg font-semibold rounded-xl shadow-lg group transition-colors duration-200"
                >
                  비즈니스 모델 자세히 보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Leaflo의 임팩트</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              환경 보호와 경제적 가치 창출을 동시에 실현하는 혁신적 솔루션
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <StatItem
              value="90%"
              label="지자체 처리비용 절감"
              delay={0}
            />
            <StatItem
              value="21-30톤"
              label="B2B 손익분기점"
              delay={STAGGER_DELAY}
            />
            <StatItem
              value="74%"
              label="B2C 이익률 (소매가)"
              delay={STAGGER_DELAY * 2}
            />
            <StatItem
              value="1만원/톤"
              label="탄소배출권 현재가"
              delay={STAGGER_DELAY * 3}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
