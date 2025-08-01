'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  ArrowRight, 
  Sparkles, 
  Leaf, 
  BarChart3, 
  Users,
  CheckCircle,
  Globe,
  Zap,
  TrendingUp,
  Shield
} from 'lucide-react'
import Link from 'next/link'

// Animated background component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-40 left-40 w-80 h-80 bg-lime-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>
  )
}

// 3D Card component with tilt effect
function Card3D({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    
    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      ref={cardRef}
      className={`relative transform-gpu transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

// Floating animation component
function FloatingIcon({ icon: Icon, delay = 0 }: { icon: any, delay?: number }) {
  return (
    <div 
      className="absolute animate-float"
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon className="w-12 h-12 text-emerald-200 opacity-20" />
    </div>
  )
}

// Gradient text component
function GradientText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}

// Value proposition card with glassmorphism - updated with framer-motion
function ValueCard({ icon: Icon, title, description, delay = 0 }: { 
  icon: any, 
  title: string, 
  description: string, 
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.001 }}
      viewport={{ once: true }}
    >
      <Card3D>
        <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>
      </Card3D>
    </motion.div>
  )
}

// Interactive stat card - updated with framer-motion
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
        viewport={{ once: true }}
      >
        <Card3D>
          <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${color} shadow-2xl overflow-hidden group`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
            
            <Icon className="w-12 h-12 text-white/80 mb-4" />
            
            <div className="relative z-10">
              <div className="text-5xl font-bold text-white mb-2">
                {isVisible ? value.replace(/[0-9]+/, count.toString()) : '0'}
              </div>
              <p className="text-white/80 text-lg">{label}</p>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
              <div 
                className="h-full bg-white/40 transition-all duration-2000 ease-out"
                style={{ width: isVisible ? '100%' : '0%' }}
              ></div>
            </div>
          </div>
        </Card3D>
      </motion.div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 backdrop-blur-sm text-emerald-700 text-sm font-medium mb-8"
          >
              <Sparkles className="w-4 h-4 animate-pulse" />
              지속가능한 미래를 만드는 혁신
          </motion.div>

          <motion.h1
              initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-8xl font-bold leading-tight mb-8"
          >
              낙엽이 <GradientText>에너지</GradientText>가 되는
            <br />
              <GradientText>혁신</GradientText>적 솔루션
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
              버려지던 낙엽을 고효율 바이오매스 펠릿으로 전환하여
            <br />
              지속가능한 미래를 만들어가는 <strong>Leaflo</strong>입니다
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200">
                <Link href="/about" className="flex items-center gap-2">
                  회사 소개 보기
                  <ArrowRight className="w-5 h-5" />
                </Link>
                </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transform hover:scale-105 transition-all duration-200">
                <Link href="/contact" className="flex items-center gap-2">
                  파트너십 문의
                  <Users className="w-5 h-5" />
            </Link>
                </Button>
              </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <div className="w-6 h-10 rounded-full border-2 border-emerald-400 flex justify-center">
            <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20">
          <FloatingIcon icon={Leaf} delay={0} />
        </div>
        <div className="absolute top-40 right-32">
          <FloatingIcon icon={Sparkles} delay={1} />
        </div>
        <div className="absolute bottom-40 left-32">
          <FloatingIcon icon={Globe} delay={2} />
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-24 relative bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <GradientText>Leaflo</GradientText>의 혁신적 가치
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              지속가능한 미래를 위한 세 가지 핵심 가치
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ValueCard
              icon={Leaf}
              title="환경 친화적"
              description="버려지던 낙엽을 재활용하여 환경 부담을 줄이고 탄소 중립에 기여합니다."
              delay={0}
            />
            <ValueCard
              icon={Zap}
              title="고효율 에너지"
              description="96% 효율의 고품질 바이오매스 펠릿으로 안정적인 에너지를 제공합니다."
              delay={100}
            />
            <ValueCard
              icon={TrendingUp}
              title="경제적 효과"
              description="지자체 처리비용 70% 절감과 함께 새로운 수익 모델을 창출합니다."
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        {/* Animated wave background */}
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <motion.path
              fill="url(#wave-gradient)"
              fillOpacity="0.3"
              initial={{ d: "M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,213.3C672,203,768,181,864,181.3C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
              animate={{ 
                d: [
                  "M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,213.3C672,203,768,181,864,181.3C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,192L48,181.3C96,171,192,149,288,149.3C384,149,480,171,576,181.3C672,192,768,192,864,170.7C960,149,1056,107,1152,96C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,213.3C672,203,768,181,864,181.3C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
            </defs>
          </svg>
          </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Glassmorphism card */}
            <div className="relative p-12 rounded-3xl bg-white/80 backdrop-blur-md border border-white/50 shadow-2xl overflow-hidden">
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl"
                animate={{ 
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"
                animate={{ 
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              <div className="relative z-10 text-center">
                {/* Animated icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-3xl bg-gradient-to-br from-emerald-400 to-green-600 shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  지속가능한 미래를 <GradientText>함께</GradientText> 만들어가요
                </h2>
                
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Leaflo와 함께 환경을 보호하고 새로운 에너지 혁신을 경험해보세요.
                  우리의 여정에 동참해 주세요.
                </p>
                
                {/* Buttons with new style */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/about">
                      <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl hover:shadow-emerald-500/25 transition-all duration-300">
                        <span className="flex items-center gap-3">
                          회사 소개 보기
                          <ArrowRight className="w-5 h-5" />
                        </span>
                </Button>
                    </Link>
              </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/contact">
                      <Button size="lg" className="text-lg px-10 py-6 bg-white text-emerald-600 border-2 border-emerald-200 hover:bg-emerald-50 shadow-xl transition-all duration-300">
                        <span className="flex items-center gap-3">
                          파트너십 시작하기
                          <Users className="w-5 h-5" />
                        </span>
                      </Button>
            </Link>
                  </motion.div>
                </div>
                
                {/* Trust indicators */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>특허 기술 보유</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-emerald-500" />
                      <span>ISO 17225 인증</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-emerald-500" />
                      <span>탄소중립 기여</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

