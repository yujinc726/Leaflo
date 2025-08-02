'use client'

import React, { useEffect, useRef, useState } from 'react'
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

// Custom hook for scroll animations
function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return { ref, isVisible }
}

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

// Value proposition card with glassmorphism
function ValueCard({ icon: Icon, title, description, delay = 0 }: { 
  icon: any, 
  title: string, 
  description: string, 
  delay?: number 
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transform transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
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
    </div>
  )
}

// Interactive stat card
function StatCard({ value, label, icon: Icon, color }: { 
  value: string, 
  label: string, 
  icon: any,
  color: string 
}) {
  const { ref, isVisible } = useScrollAnimation()
  const [count, setCount] = useState(0)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''))

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
    <div ref={ref as React.RefObject<HTMLDivElement>}>
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
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 overflow-hidden">
        {/* Hero Section with parallax effect */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <AnimatedBackground />
          
          {/* Floating elements */}
          <FloatingIcon icon={Leaf} delay={0} />
          <div className="absolute top-20 right-20">
            <FloatingIcon icon={Sparkles} delay={2} />
          </div>
          <div className="absolute bottom-20 left-20">
            <FloatingIcon icon={Globe} delay={4} />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 backdrop-blur-sm text-emerald-700 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4 animate-bounce" />
                지속가능한 미래를 만드는 혁신
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                <GradientText>낙엽이 에너지로</GradientText>
                <br />
                <span className="text-gray-800">변화하는 순간</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                Leaflo는 버려지는 낙엽을 고품질 바이오매스 펠릿으로 전환하여
                <br />
                <span className="font-semibold text-gray-800">환경 보호와 경제적 가치</span>를 동시에 실현합니다
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
                <Link href="/business">
                  <Button className="group relative px-8 py-6 text-lg font-semibold rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      비즈니스 모델 보기
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
                
                <Link href="/contact">
                  <Button className="group px-8 py-6 text-lg font-semibold rounded-2xl bg-white/80 backdrop-blur-sm text-emerald-700 border-2 border-emerald-200 hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300">
                    <span className="flex items-center gap-2">
                      파트너십 문의
                      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 rounded-full border-2 border-emerald-400 flex justify-center">
                <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Value Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <GradientText>Leaflo의 혁신적 가치</GradientText>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                우리는 단순히 낙엽을 처리하는 것이 아니라, 새로운 가치를 창출합니다
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <ValueCard
                icon={TrendingUp}
                title="이중 수익 구조"
                description="지자체 위탁사업과 펠릿 판매를 통한 안정적이고 지속가능한 비즈니스 모델"
                delay={0}
              />
              <ValueCard
                icon={Shield}
                title="검증된 품질"
                description="목재 펠릿 대비 96%의 효율성을 자랑하는 고품질 바이오매스 연료"
                delay={200}
              />
              <ValueCard
                icon={Globe}
                title="탄소중립 실현"
                description="연간 30만톤의 낙엽을 자원화하여 탄소배출 감소에 기여"
                delay={400}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <Card3D>
              <div className="relative rounded-3xl bg-gradient-to-br from-emerald-600 via-green-600 to-lime-600 p-16 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <Sparkles className="w-20 h-20 text-white/80 mx-auto mb-6" />
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    지속가능한 미래를 함께 만들어가요
                  </h2>
                  <p className="text-xl text-emerald-100 mb-10 max-w-3xl mx-auto">
                    Leaflo와 함께 환경 보호와 경제적 가치를 동시에 실현하는 여정에 참여하세요
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/about">
                      <Button className="px-8 py-4 text-lg font-semibold rounded-2xl bg-white text-emerald-700 hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                        더 알아보기
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button className="px-8 py-4 text-lg font-semibold rounded-2xl bg-transparent text-white border-2 border-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                        문의하기
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </section>
      </main>
    </>
  )
}

