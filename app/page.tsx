"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Leaf, DollarSign, Lightbulb, ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"

// 기본 애니메이션 variants
const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Simple Animated Icon Component
function AnimatedIcon({
  icon: Icon,
  title,
  description,
}: { icon: any; title: string; description: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="text-center"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <motion.div
        className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        <Icon className="w-8 h-8 text-emerald-600" />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLElement>(null)

  // Subtle parallax effect
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -20])

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
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-200 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-5, -15, -5],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={scaleIn}
            className="mb-6"
          >
            <Leaf className="w-16 h-16 text-emerald-600 mx-auto" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            variants={fadeInUp}
          >
            낙엽이{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">에너지</span>
            가 되는
            <br />
            혁신적인 순간
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-600 leading-relaxed"
            variants={fadeInUp}
          >
            버려지던 낙엽을 지속가능한 바이오매스 자원으로.
            <br />
            <span className="text-emerald-700 font-semibold">Leaflo는 혁신으로 미래를 만듭니다.</span>
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/about">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg group transition-all duration-300"
                >
                  Leaflo 자세히 알아보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </motion.div>
            </Link>

            <Link href="/business">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent transition-all duration-300"
                >
                  비즈니스 모델 보기
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Simple scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2.5, 
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">왜 Leaflo인가요?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              매년 버려지는 수많은 낙엽을 혁신적인 기술로 고효율 바이오매스 팰릿으로 전환하여 환경 보호와 경제적 가치를
              동시에 실현합니다.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-12 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <AnimatedIcon
              icon={Leaf}
              title="친환경 기술"
              description="100% 천연 낙엽을 활용한 친환경 에너지 솔루션으로 지구를 보호합니다"
            />
            <AnimatedIcon
              icon={DollarSign}
              title="비용 효율성"
              description="기존 연료 대비 경제적이고 효율적인 에너지원을 제공합니다"
            />
            <AnimatedIcon
              icon={Lightbulb}
              title="혁신적인 솔루션"
              description="폐기물을 자원으로 전환하는 순환경제 모델을 구현합니다"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
            className="text-center"
          >
            <Link href="/about">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 text-lg font-semibold rounded-xl shadow-lg group transition-all duration-300"
                >
                  더 자세히 알아보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">3가지 수익 모델</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              지속가능하고 다양한 수익 구조로 안정적인 성장을 실현합니다
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">A. 펠릿 제품 판매</h3>
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
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">B. 지자체 위탁계약</h3>
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
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-2xl flex items-center justify-center">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">C. 탄소저감 크레딧</h3>
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
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
            className="text-center"
          >
            <Link href="/business">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 text-lg font-semibold rounded-xl shadow-lg group transition-all duration-300"
                >
                  비즈니스 모델 자세히 보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Leaflo의 임팩트</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              환경 보호와 경제적 가치 창출을 동시에 실현하는 혁신적 솔루션
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">90%</div>
              <p className="text-emerald-100">지자체 처리비용 절감</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">21-30톤</div>
              <p className="text-emerald-100">B2B 손익분기점</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">74%</div>
              <p className="text-emerald-100">B2C 이익률 (소매가)</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">1만원/톤</div>
              <p className="text-emerald-100">탄소배출권 현재가</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
