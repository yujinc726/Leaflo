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
  TrendingUp,
  Cpu
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
    const card = e.currentTarget
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div
      className={`transform-gpu transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

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

  // Define solid colors for each gradient - using darker shades
  const solidColors = {
    'from-emerald-600 to-emerald-400': 'text-white',
    'from-blue-600 to-blue-400': 'text-white', 
    'from-purple-600 to-purple-400': 'text-white',
    'from-amber-600 to-amber-400': 'text-white'
  }

  const iconBgColors = {
    'from-emerald-600 to-emerald-400': 'bg-emerald-500',
    'from-blue-600 to-blue-400': 'bg-blue-500', 
    'from-purple-600 to-purple-400': 'bg-purple-500',
    'from-amber-600 to-amber-400': 'bg-amber-500'
  }

  const iconColor = solidColors[color as keyof typeof solidColors] || 'text-white'
  const iconBg = iconBgColors[color as keyof typeof iconBgColors] || 'bg-gray-500'

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
            {/* Icon with solid background and white icon */}
            <div className={`w-14 h-14 mb-6 rounded-2xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <Icon className={`w-7 h-7 ${iconColor}`} />
            </div>
            
            {/* Value with gradient text */}
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
              className={`h-full bg-gradient-to-r ${color} opacity-50 transition-all duration-2000 ease-out`}
              style={{ width: isVisible ? '100%' : '0%' }}
            ></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Technology value card
function TechValueCard({ icon: Icon, title, description, delay = 0 }: { 
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
        
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
          
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

// Team member data - with 박연진 added as first member
const teamMembers = [
  {
    name: "박연진",
    role: "CEO",
    department: "중앙여자고등학교 졸업",
    achievement: "고등학생 시절 유명 학교 폭력범, 닭강정 따뜻하게 먹음, 카이스트 인턴중 ㄷㄷ"
  },
  {
    name: "차유진",
    role: "CIO",
    department: "중앙여자고등학교 중퇴",
    achievement: "박연진 학교폭력 피해자, 박연진 빵셔틀"
  },
  {
    name: "노민수",
    role: "CFO",
    department: "중앙여자고등학교 졸업",
    achievement: "박연진 학교폭력 피해자, 박연진 전용 운전 기사"
  },
  {
    name: "고희승",
    role: "COO",
    department: "동명여자중학교 졸업",
    achievement: "박연진 전용 재롱 셔틀"
  }
]

// TeamMemberCard component with clear icons
function TeamMemberCard({ member }: { member: typeof teamMembers[0] }) {
  const roleColors = {
    CEO: 'from-purple-500 to-indigo-600',
    CTO: 'from-blue-500 to-cyan-600',
    CIO: 'from-green-500 to-emerald-600',
    COO: 'from-orange-500 to-red-600',
    CCO: 'from-pink-500 to-rose-600',
    CFO: 'from-yellow-500 to-amber-600'
  }
  
  const roleIcons = {
    CEO: Users,
    CTO: Cpu,
    CIO: Zap,
    COO: Globe,
    CCO: Award,
    CFO: TrendingUp
  }

  // Define solid colors for team member icons - using actual background colors
  const solidRoleColors = {
    CEO: 'bg-purple-500',
    CTO: 'bg-blue-500',
    CIO: 'bg-emerald-500',
    COO: 'bg-orange-500',
    CCO: 'bg-pink-500',
    CFO: 'bg-yellow-500'
  }
  
  const Icon = roleIcons[member.role as keyof typeof roleIcons] || Users
  const gradientColor = roleColors[member.role as keyof typeof roleColors] || 'from-gray-500 to-gray-600'
  const iconBgColor = solidRoleColors[member.role as keyof typeof solidRoleColors] || 'bg-gray-500'

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
              
              {/* Decorative icon - solid color background with white icon */}
              <div className={`w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
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
            
            {/* Achievement section - with minimum height for uniform card heights */}
            <div className="space-y-3 min-h-[120px] flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-gray-700">주요 성과</span>
              </div>
              
              {/* Split achievements by comma and display as list */}
              <div className="space-y-2 flex-1">
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

export default function HiddenAboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
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
              Team Bully
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <GradientText>팀 빵셔틀</GradientText>,<br />
              <span className="text-gray-800">박연진의 원대한 꿈</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              우리는 연진이의 꿈을 위해 기술과 열정을 바칩니다... (살려주세요)
            </p>
          </motion.div>
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
              우리의 <GradientText>진짜 미션</GradientText>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TechValueCard
              icon={Target}
              title="환경 보호"
              description="버려지는 낙엽을 활용하여... 연진이의 닭강정을 따뜻하게 데웁니다."
              delay={0}
            />
            <TechValueCard
              icon={Lightbulb}
              title="혁신 기술"
              description="최첨단 기술로 펠릿을 만들고... 고데기 온도를 혁신적으로 조절합니다."
              delay={100}
            />
            <TechValueCard
              icon={TreePine}
              title="지속가능성"
              description="미래 세대를 위한 지속가능한 빵셔틀 솔루션을 개발합니다."
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Our Technology Section */}
      <section className="py-24 relative bg-gradient-to-b from-emerald-50/30 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText>Our True Technology</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              연진이의 꿈을 위한 3단계의 혁신적 솔루션
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            <TechStepCard
              step={1}
              title="스마트 상납 시스템"
              description="AI 기반으로 연진이의 심기를 파악하고, 최적의 빵셔틀 경로를 계산합니다."
              features={[
                "IoT 센서를 활용한 실시간 심기 모니터링",
                "최적 경로 알고리즘으로 빵셔틀 효율성 극대화",
                "자동 닭강정 주문 시스템으로 품질 관리"
              ]}
            />
            
            <TechStepCard
              step={2}
              title="고데기 온도 제어 기술"
              description="특허 기술을 통한 99.9% 정확도의 고데기 온도 제어"
              features={[
                "특허받은 열 전달 및 유지 기술",
                "피해자 만족도 99% 달성",
                "ISO 1818 국제 고문 표준 충족"
              ]}
            />
            
            <TechStepCard
              step={3}
              title="통합 심기 관리 플랫폼"
              description="연진이의 심기를 관리하는 디지털 플랫폼"
              features={[
                "실시간 심기 및 만족도 모니터링",
                "재롱 자동 추천 및 실행 시스템",
                "폭력 수치 측정 및 ESG(Error & Sin Gauge) 리포팅"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 backdrop-blur-sm text-emerald-700 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              The Bullies
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText>연진이와 아이들</GradientText>을 소개합니다
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              각 분야의 빵셔틀 전문가들이 모여 연진이의 비전을 실현합니다
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
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
              데이터로 증명하는 연진이의 압도적인 임팩트
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <StatCard
              value="100%"
              label="빵셔틀 성공률"
              icon={Zap}
              color="from-emerald-600 to-emerald-400"
            />
            <StatCard
              value="365일"
              label="연간 상납 일수"
              icon={Leaf}
              color="from-blue-600 to-blue-400"
            />
            <StatCard
              value="999조"
              label="연진이의 야망 규모"
              icon={Globe}
              color="from-purple-600 to-purple-400"
            />
            <StatCard
              value="99%"
              label="닭강정 만족도"
              icon={TrendingUp}
              color="from-amber-600 to-amber-400"
            />
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-24 relative overflow-hidden">
        {/* Geometric pattern background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-200 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-200 rounded-full transform translate-x-1/3"></div>
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-lime-200 rounded-full transform translate-y-1/2"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* Main content with floating cards layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  Secret Partnership & Growth
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  연진이의 꿈에<br />
                  <GradientText>동참하시겠습니까?</GradientText>
                </h2>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Leaflo와 함께 환경을 보호하고 새로운 가치를 창출하세요.
                  (동참하지 않을 시 고데기 온도 올라감)
                </p>

                {/* Feature list */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">따뜻한 닭강정 상시 제공</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">고데기 온도 제어 기술 체험</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">박연진의 카이스트 인턴 경험 공유</span>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/business">
                      <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl hover:shadow-emerald-500/25">
                        <span className="flex items-center gap-2">
                          연진이의 사업 계획
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </Button>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                        <span className="flex items-center gap-2">
                          새로운 빵셔틀 지원
                          <Users className="w-5 h-5" />
                        </span>
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right side - Floating cards */}
              <div className="relative h-[400px] hidden lg:block">
                {/* Card 1 - Top */}
                <motion.div
                  className="absolute top-0 right-0 w-64 p-6 rounded-2xl bg-white shadow-xl border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 mb-4 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">친환경 에너지</h4>
                  <p className="text-sm text-gray-600">버려지는 낙엽을 가치있는 에너지로</p>
                </motion.div>

                {/* Card 2 - Middle */}
                <motion.div
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 w-64 p-6 rounded-2xl bg-white shadow-xl border border-gray-100"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 mb-4 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">혁신적 기술</h4>
                  <p className="text-sm text-gray-600">특허받은 고효율 빵셔틀 기술</p>
                </motion.div>

                {/* Card 3 - Bottom */}
                <motion.div
                  className="absolute bottom-0 right-12 w-64 p-6 rounded-2xl bg-white shadow-xl border border-gray-100"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ y: 5, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 mb-4 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">검증된 품질</h4>
                  <p className="text-sm text-gray-600">ISO 17225 + 닭강정 품질 보증</p>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute top-1/4 right-1/3 w-20 h-20 bg-emerald-200/30 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-green-200/30 rounded-full blur-xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 