'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Package,
  Building2,
  Shield,
  DollarSign,
  TrendingUp,
  Truck,
  Target,
  ChartBar,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Zap,
  Users,
  Rocket,
  Calendar,
  Award
} from 'lucide-react'
import Link from 'next/link'

// Gradient text component
function GradientText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}

// 3D Card component
function Card3D({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div
      className={`relative transform-gpu transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>{count.toLocaleString()}{suffix}</span>
  )
}

// Business model card - redesigned with softer design
function ModelCard({ 
  title, 
  icon: Icon, 
  features, 
  gradient,
  delay = 0 
}: { 
  title: string, 
  icon: any, 
  features: { label: string, value: string }[], 
  gradient: string,
  delay?: number 
}) {
  // Define solid colors for each gradient - using solid backgrounds
  const solidColors = {
    'from-emerald-600 to-emerald-400': 'bg-emerald-500',
    'from-blue-600 to-blue-400': 'bg-blue-500',
    'from-purple-600 to-purple-400': 'bg-purple-500'
  }

  const iconBg = solidColors[gradient as keyof typeof solidColors] || 'bg-gray-500'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.001 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <div className="relative h-full p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
        {/* Subtle gradient accent */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-60`}></div>
        
        {/* Decorative background circle */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${gradient} opacity-5 blur-3xl group-hover:scale-110 transition-transform duration-500`}></div>
        
        <div className="relative z-10">
          {/* Icon section - solid color background with white icon */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          </div>
          
          {/* Features list */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient} opacity-90 mt-2 flex-shrink-0`}></div>
                <div className="text-gray-700">
                  <span className="font-medium text-gray-800">{feature.label}:</span>
                  <span className="ml-2 text-gray-600">{feature.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Market stat card - redesigned with minimal style
function MarketStatCard({ 
  title, 
  value, 
  description, 
  icon: Icon,
  color 
}: { 
  title: string, 
  value: string, 
  description: string, 
  icon: any,
  color: string 
}) {
  // Define solid colors for each gradient - using solid backgrounds
  const solidColors = {
    'from-emerald-600 to-emerald-400': 'bg-emerald-500',
    'from-blue-600 to-blue-400': 'bg-blue-500',
    'from-purple-600 to-purple-400': 'bg-purple-500',
    'from-amber-600 to-amber-400': 'bg-amber-500'
  }

  const iconBg = solidColors[color as keyof typeof solidColors] || 'bg-gray-500'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-300 h-full overflow-hidden">
        {/* Subtle gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-300`}></div>
        
        <div className="relative z-10">
          {/* Icon - solid background with white icon */}
          <div className={`w-12 h-12 mb-4 rounded-xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          {/* Content */}
          <h4 className="text-sm font-medium text-gray-600 mb-2">{title}</h4>
          <div className={`text-3xl font-bold mb-3 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
            {value}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
        
        {/* Bottom accent line */}
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color} opacity-40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
      </div>
    </motion.div>
  )
}

// Milestone card
function MilestoneCard({ 
  year, 
  title, 
  metrics,
  isActive = false 
}: { 
  year: string, 
  title: string, 
  metrics: string[],
  isActive?: boolean 
}) {
  return (
    <div className={`relative ${isActive ? 'z-10' : 'z-0'}`}>
      <Card3D>
        <div className={`p-6 rounded-2xl border-2 ${
          isActive 
            ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-400 shadow-xl' 
            : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-emerald-300'
        } transition-all duration-300`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isActive 
                ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{year}</div>
              <div className="text-sm text-gray-600">{title}</div>
            </div>
          </div>
          
          <ul className="space-y-2">
            {metrics.map((metric, index) => (
              <li key={index} className="flex items-start gap-2">
                <Sparkles className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  isActive ? 'text-emerald-500' : 'text-gray-400'
                }`} />
                <span className="text-sm text-gray-700">{metric}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card3D>
    </div>
  )
}

export default function BusinessPage() {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-40 right-40 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-40 left-40 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 backdrop-blur-sm text-emerald-700 text-sm font-medium mb-8">
              <Rocket className="w-4 h-4" />
              혁신적인 비즈니스 모델
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <GradientText>이중 수익 구조</GradientText>로<br />
              <span className="text-gray-800">지속가능한 성장</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              낙엽 처리 위탁 수익과 펠릿 판매 수익을 동시에 창출하는
              <br />
              <span className="font-semibold text-gray-800">Dual-Revenue Engine</span>
            </p>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-emerald-400 flex justify-center">
            <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 animate-float">
          <DollarSign className="w-16 h-16 text-emerald-200 opacity-20" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float animation-delay-2000">
          <TrendingUp className="w-16 h-16 text-green-200 opacity-20" />
        </div>
      </motion.section>

      {/* Business Models Section */}
      <section className="py-24 relative bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText>3가지 수익 모델</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              다각화된 수익 구조로 안정적이고 지속가능한 성장을 실현합니다
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <ModelCard
              title="낙엽 펠릿 판매 (B2B/B2C)"
              icon={Package}
              features={[
                { label: "B2B 제조비", value: "450,000원/톤" },
                { label: "B2B 판매가", value: "373원/kg" },
                { label: "B2C 판매가", value: "600~870원/kg" },
                { label: "손익분기점", value: "21~30톤" }
              ]}
              gradient="from-emerald-600 to-emerald-400"
              delay={0}
            />
            
            <ModelCard
              title="지자체 위탁 계약 (B2G)"
              icon={Building2}
              features={[
                { label: "기존 처리비", value: "30~50만원/톤" },
                { label: "절감 효과", value: "최대 70%" },
                { label: "수익 구조", value: "이중 수익" },
                { label: "계약 형태", value: "장기 위탁" }
              ]}
              gradient="from-blue-600 to-blue-400"
              delay={100}
            />
            
            <ModelCard
              title="ESG 탄소 크레딧"
              icon={Shield}
              features={[
                { label: "현재 가격", value: "1만원/톤CO₂" },
                { label: "저감 효과", value: "소각 대비 80%" },
                { label: "시장 전망", value: "연 20% 성장" },
                { label: "구매처", value: "대기업 ESG" }
              ]}
              gradient="from-purple-600 to-purple-400"
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Market Analysis Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              시장 분석 & <GradientText>성장 잠재력</GradientText>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
            <MarketStatCard
              title="TAM (전체 시장)"
              value="840억원"
              description="국내 전체 낙엽 처리 시장 규모"
              icon={Globe}
              color="from-emerald-600 to-emerald-400"
            />
            
            <MarketStatCard
              title="SAM (유효 시장)"
              value="420억원"
              description="도시 지역 낙엽 처리 시장"
              icon={Target}
              color="from-blue-600 to-blue-400"
            />
            
            <MarketStatCard
              title="SOM (목표 시장)"
              value="84억원"
              description="5년 내 점유 가능 시장"
              icon={ChartBar}
              color="from-purple-600 to-purple-400"
            />
            
            <MarketStatCard
              title="시장 성장률"
              value="15%+"
              description="연평균 예상 성장률"
              icon={TrendingUp}
              color="from-amber-600 to-amber-400"
            />
                      </div>

          {/* Competitive Advantages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-10 rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                <GradientText>경쟁 우위</GradientText>
              </h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: Zap, title: "특허 기술", desc: "96% 효율 펠릿 제조" },
                  { icon: Users, title: "독점 계약", desc: "지자체 장기 위탁" },
                  { icon: Award, title: "품질 인증", desc: "ISO 17225 충족" },
                  { icon: Shield, title: "ESG 가치", desc: "탄소중립 기여" }
                ].map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
                    </div>
                  </div>
                </motion.div>
              </div>
      </section>

      {/* Milestone Roadmap */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText>성장 로드맵</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              단계적 확장 전략을 통한 지속가능한 성장
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-300 via-green-400 to-lime-500"></div>
            
            <div className="space-y-12">
              {[
                {
                  year: "2025",
                  title: "사업 시작",
                  metrics: ["파일럿 플랜트 구축", "지자체 1곳 계약", "매출 5억원 달성"],
                  isActive: true
                },
                {
                  year: "2026",
                  title: "시장 확대",
                  metrics: ["생산량 1,000톤 달성", "지자체 3곳 확대", "매출 15억원 목표"]
                },
                {
                  year: "2027",
                  title: "본격 성장",
                  metrics: ["자동화 시스템 도입", "B2C 시장 진출", "매출 30억원 돌파"]
                },
                {
                  year: "2028",
                  title: "시장 리더",
                  metrics: ["생산량 10,000톤", "전국 10개 지자체", "매출 55억원 달성"]
                }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="flex-1">
                    {index % 2 === 0 && (
                      <div className="flex justify-end">
                        <MilestoneCard {...milestone} />
                      </div>
                    )}
                  </div>
                  
                  <div className="relative z-20">
                    <div className={`w-6 h-6 rounded-full ${
                      milestone.isActive 
                        ? 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/50' 
                        : 'bg-white border-4 border-emerald-300'
                    }`}></div>
                    </div>
                  
                  <div className="flex-1">
                    {index % 2 === 1 && (
                      <MilestoneCard {...milestone} />
                    )}
                  </div>
                </motion.div>
              ))}
                  </div>
                </div>
              </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card3D>
              <div className="relative rounded-3xl bg-gradient-to-br from-emerald-600 via-green-600 to-lime-600 p-16 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <Sparkles className="w-20 h-20 text-white/80 mx-auto mb-6" />
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    함께 성장할 파트너를 찾습니다
                  </h2>
                  <p className="text-xl text-emerald-100 mb-10 max-w-3xl mx-auto">
                    Leaflo와 함께 지속가능한 미래를 만들어갈 투자자와 파트너를 모집합니다
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/contact">
                      <Button className="px-10 py-5 text-lg font-semibold rounded-2xl bg-white text-emerald-700 hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 shadow-2xl group">
                        투자 문의하기
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Button 
                      className="px-10 py-5 text-lg font-semibold rounded-2xl bg-transparent text-white border-2 border-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                      onClick={() => window.open('/business-plan.pdf', '_blank')}
                    >
                      사업계획서 다운로드
                    </Button>
                  </div>
                </div>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
