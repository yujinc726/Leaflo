'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Target, 
  Lightbulb, 
  Users, 
  TreePine, 
  Sparkles,
  Award,
  Globe,
  Zap,
  Shield,
  ArrowRight,
  Leaf,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

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

// Team member card with glassmorphism
function TeamMemberCard({ member }: { member: typeof teamMembers[0] }) {
  const roleColors = {
    CEO: 'from-purple-500 to-indigo-600',
    CTO: 'from-blue-500 to-cyan-600',
    CIO: 'from-green-500 to-emerald-600',
    COO: 'from-orange-500 to-red-600',
    CCO: 'from-pink-500 to-rose-600'
  }
  
  const roleIcons = {
    CEO: Users,
    CTO: Zap,
    CIO: Shield,
    COO: Globe,
    CCO: Award
  }
  
  const Icon = roleIcons[member.role as keyof typeof roleIcons] || Users
  const gradientColor = roleColors[member.role as keyof typeof roleColors] || 'from-gray-500 to-gray-600'

  return (
    <Card3D>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-full"
      >
        {/* Gradient background decoration */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-5 rounded-2xl`}></div>
        
        <div className="relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full overflow-hidden">
          {/* Hover effect gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
          
          {/* Top decoration line */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientColor}`}></div>
           
          <div className="relative z-10">
            {/* Role badge and icon */}
            <div className="flex items-start justify-between mb-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${gradientColor} text-white text-sm font-semibold`}>
                <Icon className="w-4 h-4" />
                {member.role}
              </div>
              
              {/* Decorative icon - more visible */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColor} opacity-20 flex items-center justify-center`}>
                <Icon className={`w-6 h-6 text-gradient bg-gradient-to-br ${gradientColor} bg-clip-text`} style={{ WebkitTextFillColor: 'transparent' }} />
              </div>
            </div>
            
            {/* Name and department */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300 group-hover:from-emerald-600 group-hover:to-green-600">
                {member.name}
              </h3>
              <p className="text-gray-600 font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                {member.department}
              </p>
            </div>
            
            {/* Achievement section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-gray-700">주요 성과</span>
              </div>
              
              {/* Split achievements by comma and display as list */}
              <div className="space-y-2">
                {member.achievement.split(',').map((achievement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600 leading-relaxed">{achievement.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bottom gradient line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradientColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          </div>
        </div>
      </motion.div>
    </Card3D>
  )
}

// Mission value card
function MissionCard({ icon: Icon, title, description, delay = 0 }: { 
  icon: any, 
  title: string, 
  description: string, 
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay * 0.001 }}
    >
      <Card3D>
        <div className="relative p-10 rounded-3xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 group overflow-hidden h-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-300 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          
          <Icon className="w-16 h-16 text-emerald-600 mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
          
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </Card3D>
    </motion.div>
  )
}

// Technology step card
function TechStepCard({ step, title, description, features }: { 
  step: number, 
  title: string, 
  description: string,
  features: string[] 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: step * 0.1 }}
    >
      <div className="relative flex gap-6 group">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            {step}
          </div>
        </div>
        
        <div className="flex-1 pb-12">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-xl transition-all duration-300">
            <h4 className="text-xl font-bold text-gray-800 mb-3">{title}</h4>
            <p className="text-gray-600 mb-4">{description}</p>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        
        {step < 3 && (
          <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 to-transparent"></div>
        )}
      </div>
    </motion.div>
  )
}

const teamMembers = [
  {
    name: "노민수",
    role: "CEO",
    department: "연세대학교 대기과학과",
    achievement: "성남시청 청년정책협의체 위원, 한국장학재단 사회리더 대학생, 환경부 탄소중립서포터즈 5기 팀장"
  },
  {
    name: "김진세",
    role: "CTO",
    department: "연세대학교 전기전자공학",
    achievement: "드론 기반 상공 택배 조달 시스템 Fullstack 개발자, IoT 기반 자이로컨트롤러 마인크래프트 CTO, IoT 기반 물류 운반 안정화 시스템 CTO"
  },
  {
    name: "차유진",
    role: "CIO",
    department: "연세대학교 컴퓨터과학과 전공",
    achievement: "2021년 공군 행정 업무 자동화 기여 표창장, 2024년 넥슨 창의플랫폼 최우수상, 2025년 AGI Agent 해커톤 대회 우수상"
  },
  {
    name: "고희승",
    role: "COO",
    department: "연세대학교 컴퓨터과학과 전공",
    achievement: "에어캡 게임 기획팀, 연세대학교 YCC 학술부 임원, IHEI 워크스테이션 개발팀장"
  },
  {
    name: "신상현",
    role: "CCO",
    department: "환경디자인학과 졸업",
    achievement: "건축기사, 1급 소방안전관리자"
  }
]

// Interactive stat card - redesigned with softer colors and glassmorphism
function StatCard({ value, label, icon: Icon, color }: { 
  value: string, 
  label: string, 
  icon: any,
  color: string 
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible && numericValue) {
      const duration = 2000
      const steps = 60
      const increment = numericValue / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setCount(numericValue)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isVisible, numericValue])

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="group"
      >
        <div className="relative p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-300`}></div>
          
          {/* Decorative circle */}
          <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${color} opacity-10 blur-2xl group-hover:scale-110 transition-transform duration-500`}></div>
          
          <div className="relative z-10">
            {/* Icon with subtle background - increased opacity and darker icon */}
            <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${color} opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`w-7 h-7 text-gradient bg-gradient-to-br ${color} bg-clip-text`} style={{ WebkitTextFillColor: 'transparent' }} />
            </div>
            
            {/* Value with subtle gradient text */}
            <div className="text-4xl font-bold mb-2">
              <span className={`bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                {isVisible ? value.replace(/[0-9]+/, count.toString()) : '0'}
              </span>
            </div>
            
            {/* Label */}
            <p className="text-gray-600 font-medium">{label}</p>
          </div>
          
          {/* Progress bar at bottom */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200">
            <div 
              className={`h-full bg-gradient-to-r ${color} opacity-40 transition-all duration-2000 ease-out`}
              style={{ width: isVisible ? '100%' : '0%' }}
            ></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 backdrop-blur-sm text-emerald-700 text-sm font-medium mb-8">
              <Users className="w-4 h-4" />
              Team Aether
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <GradientText>팀 에테르</GradientText>,<br />
              <span className="text-gray-800">환경에 진심인 사람들이 모였다</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              우리는 기술과 열정으로 지속가능한 미래를 만들어가는 혁신가들입니다
            </p>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-emerald-400 flex justify-center">
            <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              우리의 <GradientText>미션</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              환경 문제를 혁신적인 기술로 해결하고, 경제적 가치를 창출합니다
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <MissionCard
              icon={TreePine}
              title="환경 보호"
              description="연간 30만톤의 낙엽 폐기물을 자원으로 전환하여 탄소중립에 기여합니다"
              delay={0}
            />
            <MissionCard
              icon={Lightbulb}
              title="기술 혁신"
              description="특허받은 펠릿 제조 기술로 목재 펠릿 대비 96%의 효율을 달성했습니다"
              delay={100}
            />
            <MissionCard
              icon={Target}
              title="가치 창출"
              description="지자체 비용 절감과 새로운 일자리 창출로 사회적 가치를 실현합니다"
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative bg-gradient-to-b from-transparent to-emerald-50/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 backdrop-blur-sm text-emerald-700 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Team Aether
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText>우리 팀</GradientText>을 소개합니다
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              각 분야의 전문가들이 모여 Leaflo의 비전을 실현합니다
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TeamMemberCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <GradientText>Technology</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              특허받은 3단계 솔루션으로 낙엽을 고품질 펠릿으로 전환합니다
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            <TechStepCard
              step={1}
              title="깨끗하게 분류"
              description="AI 기반 자동 분류 시스템으로 낙엽을 선별합니다"
              features={[
                "이물질 99.9% 제거",
                "낙엽 종류별 자동 분류",
                "실시간 품질 모니터링"
              ]}
            />
            
            <TechStepCard
              step={2}
              title="똑똑하게 섞습니다"
              description="최적의 배합비로 고효율 펠릿 원료를 만듭니다"
              features={[
                "발열량 최적화 배합",
                "수분 함량 자동 조절",
                "품질 균일성 보장"
              ]}
            />
            
            <TechStepCard
              step={3}
              title="단단하게 만듭니다"
              description="고압 압축 기술로 내구성 높은 펠릿을 생산합니다"
              features={[
                "ISO 17225 기준 충족",
                "목재 펠릿 대비 96% 효율",
                "친환경 무첨가물 공정"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-24 relative bg-gradient-to-b from-emerald-50/30 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              낙엽펠릿 <GradientText>이동 과정</GradientText>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: "수거", desc: "지자체 위탁 낙엽 수거" },
              { icon: Shield, title: "분류", desc: "AI 자동 분류 시스템" },
              { icon: Zap, title: "가공", desc: "고효율 펠릿 제조" },
              { icon: Globe, title: "공급", desc: "B2B/B2C 판매" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Card3D>
                  <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 hover:shadow-xl transition-all duration-300 text-center group">
                    <item.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </Card3D>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-emerald-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-24 relative bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
              숫자로 보는 <GradientText>임팩트</GradientText>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              데이터로 증명하는 Leaflo의 혁신적 가치
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <StatCard
              value="96%"
              label="목재 펠릿 대비 효율"
              icon={Zap}
              color="from-emerald-600 to-emerald-400"
            />
            <StatCard
              value="30만톤"
              label="연간 처리 가능량"
              icon={Leaf}
              color="from-blue-600 to-blue-400"
            />
            <StatCard
              value="840억원"
              label="시장 규모"
              icon={Globe}
              color="from-purple-600 to-purple-400"
            />
            <StatCard
              value="70%"
              label="처리비용 절감"
              icon={TrendingUp}
              color="from-amber-600 to-amber-400"
            />
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
                    함께 만들어가는 지속가능한 미래
                  </h2>
                  <p className="text-xl text-emerald-100 mb-10 max-w-3xl mx-auto">
                    Leaflo와 함께 환경을 보호하고 새로운 가치를 창출하세요
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/business">
                      <Button className="px-8 py-4 text-lg font-semibold rounded-2xl bg-white text-emerald-700 hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                        비즈니스 모델 보기
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button className="px-8 py-4 text-lg font-semibold rounded-2xl bg-transparent text-white border-2 border-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                        파트너십 문의
                      </Button>
                    </Link>
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
