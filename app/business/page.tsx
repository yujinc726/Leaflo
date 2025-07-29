"use client"

import React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Factory, Home, Building2, DollarSign, TreePine, Recycle, TrendingUp, Leaf, Award } from "lucide-react"

// Counter Animation Component
function AnimatedCounter({ end, duration = 1200, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  React.useEffect(() => {
    if (!isInView) return

    let startTime: number
    const startCount = 0

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // 부드러운 easing 적용
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * (end - startCount) + startCount))

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-emerald-800 mb-6">Leaflo의 3가지 수익 모델</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              낙엽 펠릿 제품 판매, 지자체 위탁계약, ESG·탄소저감 크레딧을 통한 지속가능한 수익 구조
            </p>
          </motion.div>
        </div>
      </section>

      {/* Business Models */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Module 1: B2B/B2C 펠릿 제품 판매 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-20"
          >
            <Card className="p-8 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-emerald-800 mb-4">A. 낙엽 펠릿 제품 판매</h2>
                <p className="text-lg text-gray-600">B2B 및 B2C 시장을 대상으로 한 다양한 펠릿 제품</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* B2B Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 bg-white border border-emerald-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center mb-4">
                      <Factory className="w-8 h-8 text-emerald-600 mr-3" />
                      <h3 className="text-2xl font-bold text-emerald-700">B2B 산업용</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <p className="text-gray-700 mb-2">
                          <strong>대상:</strong> 공장, 제조업체, 바이오매스 연료 사용 기업
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>제조비:</strong> 450,000원/톤 (수거·분류·건조·가공 포함)
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>판매가격:</strong> <span className="text-emerald-600 font-bold">373원/kg</span>
                        </p>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <p className="text-amber-800 font-semibold mb-1">💡 손익분기점</p>
                        <p className="text-gray-700">21-30톤에서 손익분기점 달성 후 지속적인 수익 창출</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* B2C Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 bg-white border border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center mb-4">
                      <Home className="w-8 h-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-blue-700">B2C 생활용</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-700 mb-2">
                          <strong>대상:</strong> 캠핑연료, 난로연료, 고양이모래 사용자
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>제조비:</strong> 500,000원/톤 (포장비 포함)
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>도매가:</strong> <span className="text-blue-600 font-bold">600원/kg</span>
                        </p>
                        <p className="text-gray-700">
                          <strong>소매가:</strong> <span className="text-blue-600 font-bold">870원/kg</span>
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-green-800 font-semibold mb-1">📦 포장 단위</p>
                        <p className="text-gray-700">2kg ~ 20kg 소포장으로 개인고객 맞춤 판매</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { value: 25, label: "월 평균 손익분기점", suffix: "톤", color: "text-emerald-600" },
                  { value: 74, label: "B2C 이익률 (소매가 기준)", suffix: "%", color: "text-blue-600" },
                  { value: 20, label: "B2C 이익률 (도매가 기준)", suffix: "%", color: "text-amber-600" },
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Module 2: 지자체 수거/위탁 계약 (B2G) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-20"
          >
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-800 mb-4">B. 지자체 수거/위탁 계약 (B2G)</h2>
                <p className="text-lg text-gray-600">지자체와의 상생 파트너십을 통한 이중 수익 구조</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h4 className="text-xl font-bold text-blue-700 mb-3 flex items-center">
                        <Building2 className="w-6 h-6 mr-2" />
                        지자체 혜택
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• 기존 소각/매립 비용 대폭 절감</li>
                        <li>• 환경 친화적 폐기물 처리</li>
                        <li>• 지역 환경 개선 및 ESG 실현</li>
                      </ul>
                    </div>

                    <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                      <h4 className="text-xl font-bold text-emerald-700 mb-3 flex items-center">
                        <Leaf className="w-6 h-6 mr-2" />
                        Leaflo 혜택
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• 안정적인 원료 공급 확보</li>
                        <li>• 지자체 위탁비 수익</li>
                        <li>• 펠릿 제품 별도 판매 수익</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <motion.div 
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-200"
                  >
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">기존 처리비용</h4>
                    <div className="text-3xl font-bold text-red-500 mb-1">
                      <AnimatedCounter end={40} suffix="만원" />
                    </div>
                    <p className="text-gray-600">톤당 소각/매립 비용</p>
                  </motion.div>

                  <div className="flex items-center justify-center">
                    <div className="text-4xl text-emerald-600">→</div>
                  </div>

                  <motion.div 
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-emerald-100 p-6 rounded-lg shadow-lg text-center border border-emerald-200 hover:shadow-xl transition-shadow duration-200"
                  >
                    <h4 className="text-lg font-semibold text-emerald-800 mb-2">이중 수익 구조</h4>
                    <div className="space-y-2">
                      <div className="text-emerald-700">
                        <span className="font-bold">위탁비 + 펠릿 판매비</span>
                      </div>
                      <div className="text-2xl font-bold text-emerald-600">
                        최대 <AnimatedCounter end={90} suffix="%" /> 비용 절감
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <div className="mt-8 bg-blue-100 p-6 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-semibold text-center text-lg">
                  💡 Win-Win 모델: 지자체는 처리비용 절감, Leaflo는 안정적 수익 창출
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Module 3: ESG·탄소저감 크레딧 수익 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-green-800 mb-4">C. ESG·탄소저감 크레딧 수익</h2>
                <p className="text-lg text-gray-600">소각 대비 탄소저감 효과를 통한 탄소배출권 수익</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h4 className="text-xl font-bold text-green-700 mb-3 flex items-center">
                        <TreePine className="w-6 h-6 mr-2" />
                        탄소저감 과정
                      </h4>
                      <div className="space-y-3 text-gray-700">
                        {[
                          "낙엽 소각 → 펠릿 연료화",
                          "탄소저감량 계산 및 인증",
                          "탄소배출권 플랫폼 등록",
                          "대기업 판매 및 수익 창출"
                        ].map((step, index) => (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center"
                          >
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span>{step}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <Award className="w-6 h-6 text-green-600" />
                        <h4 className="text-lg font-bold text-green-700">미래 성장 가능성</h4>
                      </div>
                      <p className="text-gray-700">
                        친환경 사업을 중시하는 현 정부 정책에 따라 탄소배출권 가격 상승 전망
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <motion.div 
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-200"
                  >
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">현재 탄소배출권 가격</h4>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      <AnimatedCounter end={1} suffix="만원" />
                    </div>
                    <p className="text-gray-600">톤당 탄소배출권 가격</p>
                  </motion.div>

                  <motion.div 
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-green-100 p-6 rounded-lg shadow-lg text-center border border-green-200 hover:shadow-xl transition-shadow duration-200"
                  >
                    <h4 className="text-lg font-semibold text-green-800 mb-2">연간 예상 수익</h4>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-green-600">
                        연간 <AnimatedCounter end={100} suffix="톤" /> CO₂ 저감 시
                      </div>
                      <div className="text-3xl font-bold text-emerald-600">
                        <AnimatedCounter end={100} suffix="만원" /> 추가 수익
                      </div>
                    </div>
                  </motion.div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-amber-800 font-semibold text-center">
                      📈 탄소배출권 가격 상승 시 수익 배수 효과 기대
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg border border-green-200">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-green-800 mb-4">ESG 경영 및 지속가능성 기여</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-center space-x-2">
                      <Recycle className="w-6 h-6 text-green-600" />
                      <span className="text-green-700 font-semibold">순환경제 실현</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <TreePine className="w-6 h-6 text-green-600" />
                      <span className="text-green-700 font-semibold">탄소중립 기여</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
