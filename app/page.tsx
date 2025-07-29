"use client"

import { useRef, useMemo } from "react"
import { motion, useScroll, useTransform, cubicBezier } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Leaf, DollarSign, Lightbulb, ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"

// Custom easing curves for smoother animations
const smoothEase = cubicBezier(0.25, 0.46, 0.45, 0.94)
const gentleEase = cubicBezier(0.23, 1, 0.32, 1)

// Simple Animated Icon Component
function AnimatedIcon({
  icon: Icon,
  delay = 0,
  title,
  description,
}: { icon: any; delay?: number; title: string; description: string }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: gentleEase,
        type: "tween"
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5, 
        transition: { 
          duration: 0.3,
          ease: smoothEase,
          type: "tween"
        } 
      }}
      style={{ willChange: "transform" }}
    >
      <motion.div
        className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ 
          duration: 0.3,
          ease: smoothEase,
          type: "tween"
        }}
        style={{ willChange: "transform" }}
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

  // Optimized parallax effect with reduced intensity
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -30])

  // Pre-generate floating element positions for better performance
  const floatingElements = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 1.5 + 4, // 4-5.5 seconds (longer for smoother feel)
      delay: Math.random() * 3,
    })), []
  )

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, willChange: "transform" }}
      >
        {/* Clean Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50" />

        {/* Optimized floating elements */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-1 h-1 bg-emerald-200 rounded-full opacity-60"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
              willChange: "transform, opacity",
            }}
            animate={{
              y: [-10, -25, -10],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: smoothEase,
              repeatType: "loop",
              type: "tween"
            }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.2, 
              ease: gentleEase,
              type: "tween"
            }}
            className="mb-6"
            style={{ willChange: "transform, opacity" }}
          >
            <Leaf className="w-16 h-16 text-emerald-600 mx-auto" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.4, 
              ease: gentleEase,
              type: "tween"
            }}
            style={{ willChange: "transform, opacity" }}
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
            transition={{ 
              duration: 1, 
              delay: 0.7, 
              ease: gentleEase,
              type: "tween"
            }}
            style={{ willChange: "transform, opacity" }}
          >
            버려지던 낙엽을 지속가능한 바이오매스 자원으로.
            <br />
            <span className="text-emerald-700 font-semibold">Leaflo는 혁신으로 미래를 만듭니다.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              delay: 1, 
              ease: gentleEase,
              type: "tween"
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ willChange: "transform, opacity" }}
          >
            <Link href="/about">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  duration: 0.3,
                  ease: smoothEase,
                  type: "tween"
                }}
                style={{ willChange: "transform" }}
              >
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg group"
                  style={{ transition: "background-color 0.3s ease" }}
                >
                  Leaflo 자세히 알아보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1" 
                    style={{ transition: "transform 0.3s ease" }} />
                </Button>
              </motion.div>
            </Link>

            <Link href="/business">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  duration: 0.3,
                  ease: smoothEase,
                  type: "tween"
                }}
                style={{ willChange: "transform" }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent"
                  style={{ transition: "background-color 0.3s ease" }}
                >
                  비즈니스 모델 보기
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Optimized scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: smoothEase,
            repeatType: "loop",
            type: "tween"
          }}
          style={{ willChange: "transform" }}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              ease: gentleEase,
              type: "tween"
            }}
            viewport={{ once: true }}
            className="text-center mb-16"
            style={{ willChange: "transform, opacity" }}
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
              delay={0.2}
              title="친환경 기술"
              description="100% 천연 낙엽을 활용한 친환경 에너지 솔루션으로 지구를 보호합니다"
            />
            <AnimatedIcon
              icon={DollarSign}
              delay={0.4}
              title="비용 효율성"
              description="기존 연료 대비 경제적이고 효율적인 에너지원을 제공합니다"
            />
            <AnimatedIcon
              icon={Lightbulb}
              delay={0.6}
              title="혁신적인 솔루션"
              description="폐기물을 자원으로 전환하는 순환경제 모델을 구현합니다"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.8, 
              ease: gentleEase,
              type: "tween"
            }}
            viewport={{ once: true }}
            className="text-center"
            style={{ willChange: "transform, opacity" }}
          >
            <Link href="/about">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  duration: 0.3,
                  ease: smoothEase,
                  type: "tween"
                }}
                style={{ willChange: "transform" }}
              >
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 text-lg font-semibold rounded-xl shadow-lg group"
                  style={{ transition: "background-color 0.3s ease" }}
                >
                  더 자세히 알아보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1" 
                    style={{ transition: "transform 0.3s ease" }} />
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              ease: gentleEase,
              type: "tween"
            }}
            viewport={{ once: true }}
            className="text-center mb-16"
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">3가지 수익 모델</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              지속가능하고 다양한 수익 구조로 안정적인 성장을 실현합니다
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: DollarSign,
                title: "A. 펠릿 제품 판매",
                bgColor: "bg-emerald-100",
                iconColor: "text-emerald-600",
                content: [
                  { label: "B2B 산업용", value: "373원/kg | 21-30톤에서 손익분기", bgClass: "bg-emerald-50", textClass: "text-emerald-700" },
                  { label: "B2C 생활용", value: "600-870원/kg | 캠핑·난로·고양이모래", bgClass: "bg-blue-50", textClass: "text-blue-700" }
                ]
              },
              {
                icon: Building2,
                title: "B. 지자체 위탁계약",
                bgColor: "bg-blue-100",
                iconColor: "text-blue-600",
                content: [
                  { label: "이중 수익 구조", value: "위탁비 수입 + 펠릿 판매 수익", bgClass: "bg-blue-50", textClass: "text-blue-700" },
                  { label: "지자체 혜택", value: "톤당 30-50만원 처리비용 절감", bgClass: "bg-green-50", textClass: "text-green-700" }
                ]
              },
              {
                icon: Leaf,
                title: "C. 탄소저감 크레딧",
                bgColor: "bg-green-100",
                iconColor: "text-green-600",
                content: [
                  { label: "탄소배출권 판매", value: "현재 1만원/톤 | 상승 전망", bgClass: "bg-green-50", textClass: "text-green-700" },
                  { label: "ESG 경영 기여", value: "대기업 ESG 목표 달성 지원", bgClass: "bg-amber-50", textClass: "text-amber-700" }
                ]
              }
            ].map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2 + 0.2, 
                  ease: gentleEase,
                  type: "tween"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  transition: { 
                    duration: 0.4,
                    ease: smoothEase,
                    type: "tween"
                  } 
                }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                style={{ willChange: "transform" }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 ${model.bgColor} rounded-2xl flex items-center justify-center`}>
                  <model.icon className={`w-8 h-8 ${model.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{model.title}</h3>
                <div className="space-y-3 text-gray-600">
                  {model.content.map((item, itemIndex) => (
                    <div key={itemIndex} className={`${item.bgClass} p-3 rounded-lg`}>
                      <p className={`font-semibold ${item.textClass}`}>{item.label}</p>
                      <p className="text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.8, 
              ease: gentleEase,
              type: "tween"
            }}
            viewport={{ once: true }}
            className="text-center"
            style={{ willChange: "transform, opacity" }}
          >
            <Link href="/business">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  duration: 0.3,
                  ease: smoothEase,
                  type: "tween"
                }}
                style={{ willChange: "transform" }}
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 text-lg font-semibold rounded-xl shadow-lg group"
                  style={{ transition: "background-color 0.3s ease" }}
                >
                  비즈니스 모델 자세히 보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1" 
                    style={{ transition: "transform 0.3s ease" }} />
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              ease: gentleEase,
              type: "tween"
            }}
            viewport={{ once: true }}
            className="text-center mb-16"
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Leaflo의 임팩트</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              환경 보호와 경제적 가치 창출을 동시에 실현하는 혁신적 솔루션
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "90%", label: "지자체 처리비용 절감" },
              { value: "21-30톤", label: "B2B 손익분기점" },
              { value: "74%", label: "B2C 이익률 (소매가)" },
              { value: "1만원/톤", label: "탄소배출권 현재가" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15 + 0.3, 
                  ease: gentleEase,
                  type: "tween"
                }}
                viewport={{ once: true }}
                className="text-center"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <p className="text-emerald-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
