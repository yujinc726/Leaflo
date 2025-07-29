"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { 
  DollarSign, 
  Building2, 
  Leaf, 
  TrendingUp, 
  Users, 
  Target, 
  BarChart3, 
  ArrowRight,
  Zap,
  CheckCircle,
  Calendar,
  Award
} from "lucide-react"
import Link from "next/link"

// Animated Counter Component
function AnimatedCounter({ 
  end, 
  suffix = "", 
  prefix = "", 
  duration = 1200 
}: { 
  end: number; 
  suffix?: string; 
  prefix?: string; 
  duration?: number;
}) {
  const [count, setCount] = useState(0)

  const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4)

  const animate = () => {
    const startTime = Date.now()
    const animateFrame = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)
      
      setCount(Math.floor(easedProgress * end))
      
      if (progress < 1) {
        requestAnimationFrame(animateFrame)
      }
    }
    animateFrame()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={animate}
      className="text-3xl font-bold text-emerald-600"
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.div>
  )
}

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <BarChart3 className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Leaflo의 3가지 수익 모델
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              이중 수익 구조(Dual-Revenue Engine)를 통한 지속가능하고 안정적인 비즈니스 모델로
              <br />
              840억원 규모의 블루오션 시장을 선도합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Market Analysis Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">경쟁자 없는 블루 오션</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              TAM/SAM/SOM 분석을 통한 체계적인 시장 접근 전략
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">TAM</h3>
                <AnimatedCounter end={1.7} suffix="조원" />
                <div className="mt-4 space-y-2 text-sm text-gray-600 text-left">
                  <p><strong>1) 가치창출 시장: 1.7조원</strong></p>
                  <p>[국내 연간 목재 펠릿 수요량 465만톤 X 펠릿 단가 373원/kg]</p>
                  <p><strong>2) 비용절감 시장: 840억원</strong></p>
                  <p>[국내 연간 낙엽 발생량 21만톤 X 톤당 처리비용 40만원]</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">SAM</h3>
                <AnimatedCounter end={2000} suffix="억원" />
                <div className="mt-4 space-y-2 text-sm text-gray-600 text-left">
                  <p><strong>1) 가치창출 시장: 2000억원</strong></p>
                  <p>[수도권 내 상업/소매용 펠릿 시장의 10%]</p>
                  <p><strong>2) 비용절감 시장: 27억원</strong></p>
                  <p>[수도권 연간 낙엽 발생량 1.5만톤 X 처리비용 18만원]</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">SOM</h3>
                <AnimatedCounter end={7.5} suffix="억원" />
                <div className="mt-4 space-y-2 text-sm text-gray-600 text-left">
                  <p><strong>1) 펠릿 판매 매출: 7.5억원</strong></p>
                  <p>[2000톤 X 373원/kg]</p>
                  <p><strong>2) 낙엽 수거 계약 매출: 3.6억원</strong></p>
                  <p>[2000톤 X 18만원/톤]</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Models Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">이중 수익 구조 (Dual-Revenue Engine)</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              지자체 위탁사업과 바이오매스 수요자를 연결하는 혁신적인 비즈니스 모델
            </p>
          </motion.div>

          {/* Business Model A */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16"
          >
            <Card className="shadow-lg border-0 overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
                <CardTitle className="flex items-center text-2xl">
                  <DollarSign className="w-8 h-8 mr-3" />
                  A. 낙엽 펠릿 제품 판매 (B2B / B2C)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-4"
                  >
                    <h4 className="text-xl font-bold text-gray-800">B2B - 산업용 연료</h4>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="font-semibold text-emerald-700 mb-2">직접 공장등에 목재펠릿, 바이오매스 연료로 판매</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 제조비: 450,000원/톤 (수거·분류·건조·가공 포함)</li>
                        <li>• 판매가격: <strong className="text-emerald-600">373원/kg</strong></li>
                        <li>• 손익분기점: <strong className="text-emerald-600">21-30톤</strong></li>
                        <li>• 출처: 산림바이오매스에너지협회</li>
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-4"
                  >
                    <h4 className="text-xl font-bold text-gray-800">B2C - 생활용 연료</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-semibold text-blue-700 mb-2">일반인등에게 판매 (캠핑연료, 난로연료, 고양이모래 등)</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 제조비: 500,000원/톤 (포장 소매 2-20kg 단위)</li>
                        <li>• 도매가: <strong className="text-blue-600">600원/kg</strong></li>
                        <li>• 소매가: <strong className="text-blue-600">870원/kg</strong></li>
                        <li>• 출처: 포항시, 단양군 등 산림조합</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Business Model B */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mb-16"
          >
            <Card className="shadow-lg border-0 overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="flex items-center text-2xl">
                  <Building2 className="w-8 h-8 mr-3" />
                  B. 지자체 수거/위탁 계약 (B2G)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-4"
                  >
                    <h4 className="text-xl font-bold text-gray-800">이중 수익 구조</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-semibold text-blue-700 mb-2">지자체로부터 낙엽 수거 및 처리 위탁 사업비 지원</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 낙엽 1톤 당 처리 비용: <strong className="text-blue-600">180,000원</strong></li>
                        <li>• 위탁 사업비 수입 + 펠릿 제품 별도 수익화 가능</li>
                        <li>• 지자체: 기존 소각 대비 <strong className="text-blue-600">70% 비용 절감</strong></li>
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h4 className="text-xl font-bold text-gray-800">지자체 혜택</h4>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-semibold text-green-700 mb-2">기존 일반쓰레기 소각 처리 대비 대폭 절감</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 기존: 1톤당 처리비용 30-50만원 (소각)</li>
                        <li>• Leaflo: 1톤당 18만원 (위탁비)</li>
                        <li>• 추가 환경 개선 효과 및 ESG 목표 달성</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Business Model C */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mb-16"
          >
            <Card className="shadow-lg border-0 overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardTitle className="flex items-center text-2xl">
                  <Leaf className="w-8 h-8 mr-3" />
                  C. ESG·탄소저감 크레딧 수익
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h4 className="text-xl font-bold text-gray-800">탄소배출권 판매</h4>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-semibold text-green-700 mb-2">낙엽을 연료화하면 소각 대비 탄소저감 효과 인증</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 현재 가격: <strong className="text-green-600">1만원/톤</strong></li>
                        <li>• 탄소저감량 계산 후 탄소배출권 플랫폼 등록</li>
                        <li>• 친환경 정책 강화로 <strong className="text-green-600">가격 상승 전망</strong></li>
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-4"
                  >
                    <h4 className="text-xl font-bold text-gray-800">ESG 경영 기여</h4>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="font-semibold text-purple-700 mb-2">대기업의 ESG 목표 달성을 지원</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 대기업 탄소배출권 구매 수요 증가</li>
                        <li>• 환경 친화적 공급망 구축 기여</li>
                        <li>• 지속가능경영 목표 달성 파트너십</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>

                {/* Carbon Reduction Steps */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8"
                >
                  <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">탄소저감 인증 과정</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { step: 1, title: "탄소저감량 측정", desc: "소각 대비 CO₂ 감축량 정확한 계산" },
                      { step: 2, title: "제3자 검증", desc: "국가 공인 검증기관을 통한 엄격한 검토" },
                      { step: 3, title: "크레딧 등록", desc: "탄소배출권 거래소에 정식 등록" },
                      { step: 4, title: "수익 창출", desc: "대기업 및 기관에 크레딧 판매" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="text-center bg-white p-4 rounded-lg shadow-sm"
                      >
                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                          {item.step}
                        </div>
                        <h5 className="font-semibold text-gray-800 mb-2">{item.title}</h5>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Milestone Roadmap Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Milestone</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              체계적인 단계별 성장 계획으로 2028년 55억원 목표 매출을 달성합니다
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Phase 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-emerald-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Phase 1: 기반 구축 및 검증 (2025)</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-emerald-700 mb-2">파일럿 실증 및 초기 시장 진입</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 수도권 2개 이상 지자체와 MOU 체결</li>
                    <li>• 파일럿 생산 공정 설계 및 구축</li>
                    <li>• 연간 처리량 20톤 달성</li>
                  </ul>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={1100} suffix="만원" prefix="목표 매출: " />
                </div>
              </div>
            </motion.div>

            {/* Phase 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Phase 2: Scale-Up 및 수익화 (2026)</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-blue-700 mb-2">BEP 달성 및 안정적 생산 체계 구축</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 수도권 5개 이상 지자체와 협력 확대</li>
                    <li>• 연간 처리량 300톤 달성 (BEP 돌파)</li>
                  </ul>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={1.6} suffix="억원" prefix="목표 매출: " />
                </div>
              </div>
            </motion.div>

            {/* Phase 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Phase 3: 시장 확장 (2027)</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-green-700 mb-2">SOM 점유 및 사업 고도화</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 수도권 10개 이상 지자체 및 대규모 B2B 고객사 확보</li>
                    <li>• 연간 처리량 2,000톤 달성</li>
                  </ul>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={11.1} suffix="억원" prefix="목표 매출: " />
                </div>
              </div>
            </motion.div>

            {/* Phase 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-amber-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Phase 4: 시장 선도 (2028+)</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-amber-700 mb-2">유기성 폐기물 자원 시장의 Key Player</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 전국 단위 공급망 및 협력 체계 구축</li>
                    <li>• B2C 시장 본격 진출</li>
                    <li>• 연간 처리량 10,000톤 돌파</li>
                  </ul>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={55} suffix="억원" prefix="목표 매출: " />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              함께 성장할 파트너를 찾습니다
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              840억원 규모의 블루오션 시장에서 Leaflo와 함께 지속가능한 미래를 만들어가세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg group transition-all duration-200 hover:scale-102 hover:-translate-y-1"
                >
                  파트너십 문의하기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent transition-all duration-200 hover:scale-102 hover:-translate-y-1"
                >
                  팀 소개 보기
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
