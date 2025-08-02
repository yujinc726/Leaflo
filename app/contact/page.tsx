'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sparkles,
  MessageSquare,
  Building,
  User,
  Globe,
  CheckCircle,
  Clock,
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

// Contact info card with glassmorphism
function ContactCard({ icon: Icon, title, content, delay = 0 }: { 
  icon: any, 
  title: string, 
  content: string, 
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.001 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <Icon className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600">{content}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Partner type card
function PartnerCard({ icon: Icon, title, description, benefits }: { 
  icon: any, 
  title: string, 
  description: string,
  benefits: string[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-300 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
        
        <Icon className="w-16 h-16 text-emerald-600 mb-6 transform group-hover:scale-110 transition-transform" />
        
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// Form input with floating label
function FloatingInput({ label, name, type = "text", required = false }: { 
  label: string, 
  name: string, 
  type?: string, 
  required?: boolean 
}) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div className="relative">
      <Input
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`peer pt-6 pb-2 bg-white/50 backdrop-blur-sm border-2 ${
          focused ? 'border-emerald-500' : 'border-gray-200'
        } rounded-xl transition-all duration-200 focus:ring-0`}
        required={required}
      />
      <label
        htmlFor={name}
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${
          focused || value
            ? 'top-2 text-xs text-emerald-600'
            : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'
        }`}
      >
        {label} {required && '*'}
      </label>
    </div>
  )
}

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic here
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 backdrop-blur-sm text-emerald-700 text-sm font-medium mb-8">
              <MessageSquare className="w-4 h-4" />
              함께 성장하는 파트너
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <GradientText>파트너십</GradientText> 문의
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Leaflo와 함께 지속가능한 미래를 만들어갈
              <br />
              파트너를 기다리고 있습니다
            </p>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-40 left-40 animate-float">
          <Mail className="w-12 h-12 text-emerald-200 opacity-20" />
        </div>
        <div className="absolute bottom-40 right-40 animate-float animation-delay-2000">
          <Phone className="w-12 h-12 text-green-200 opacity-20" />
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              언제든지 <GradientText>연락주세요</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              비즈니스 제안, 투자 문의, 기술 협력 등 모든 문의를 환영합니다
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <ContactCard
              icon={Mail}
              title="이메일"
              content="contact@leaflo.kr"
              delay={0}
            />
            <ContactCard
              icon={Phone}
              title="전화"
              content="02-1234-5678"
              delay={100}
            />
            <ContactCard
              icon={MapPin}
              title="위치"
              content="서울특별시 강남구 테헤란로 123"
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Partner Types Section */}
      <section className="py-24 relative bg-gradient-to-b from-transparent to-emerald-50/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              찾고 있는 <GradientText>파트너</GradientText>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <PartnerCard
              icon={Building}
              title="지자체 파트너"
              description="낙엽 처리 비용을 절감하고 환경을 보호하세요"
              benefits={[
                "처리 비용 70% 절감",
                "탄소중립 목표 달성 지원",
                "주민 만족도 향상",
                "ESG 성과 개선"
              ]}
            />
            
            <PartnerCard
              icon={Globe}
              title="B2B 고객사"
              description="고품질 바이오매스 연료로 에너지 비용을 절감하세요"
              benefits={[
                "목재 펠릿 대비 96% 효율",
                "안정적인 공급망 보장",
                "맞춤형 공급 계약",
                "친환경 인증 지원"
              ]}
            />
            
            <PartnerCard
              icon={Award}
              title="투자자"
              description="840억원 블루오션 시장의 선도 기업에 투자하세요"
              benefits={[
                "검증된 비즈니스 모델",
                "이중 수익 구조",
                "특허 기술 보유",
                "명확한 성장 로드맵"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="relative p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-emerald-100 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-10"></div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    <GradientText>문의하기</GradientText>
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FloatingInput label="이름" name="name" required />
                      <FloatingInput label="회사/기관명" name="company" required />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FloatingInput label="이메일" name="email" type="email" required />
                      <FloatingInput label="연락처" name="phone" type="tel" />
                    </div>
                    
                    <div>
                      <Label htmlFor="type" className="text-sm font-medium text-gray-700 mb-2 block">
                        문의 유형 *
                      </Label>
                      <select
                        name="type"
                        className="w-full p-3 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-emerald-500 transition-colors duration-200"
                        required
                      >
                        <option value="">선택해주세요</option>
                        <option value="partnership">파트너십 문의</option>
                        <option value="investment">투자 문의</option>
                        <option value="b2b">B2B 구매 문의</option>
                        <option value="b2g">지자체 협력 문의</option>
                        <option value="other">기타 문의</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                        문의 내용 *
                      </Label>
                      <Textarea
                        name="message"
                        rows={6}
                        className="w-full p-3 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-emerald-500 transition-colors duration-200 resize-none"
                        placeholder="문의하실 내용을 자세히 작성해주세요"
                        required
                      />
                    </div>
                    
                    <div className="text-center">
                      <Button
                        type="submit"
                        disabled={formSubmitted}
                        className={`px-10 py-4 text-lg font-semibold rounded-2xl transform transition-all duration-300 ${
                          formSubmitted
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700'
                        } text-white shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 group`}
                      >
                        {formSubmitted ? (
                          <>
                            <CheckCircle className="w-5 h-5 mr-2" />
                            전송 완료!
                          </>
                        ) : (
                          <>
                            문의 전송하기
                            <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="relative inline-block p-12 rounded-3xl bg-gradient-to-br from-emerald-600 to-green-700 text-white overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <Clock className="w-16 h-16 mx-auto mb-6 text-white/80" />
                
                <h3 className="text-3xl font-bold mb-4">빠른 응답을 약속드립니다</h3>
                <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                  문의 주신 내용은 영업일 기준 24시간 이내에
                  <br />
                  담당자가 직접 연락드리겠습니다
                </p>
                
                <div className="flex items-center justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>평균 응답 시간: 4시간</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>전담 매니저 배정</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
