"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin, Building2, ShoppingCart, TrendingUp } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-emerald-800 mb-6">세상을 바꾸는 혁신에 동참하세요</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leaflo와 함께 지속가능한 미래를 만들어가세요. 환경을 보호하면서 경제적 가치를 창출하는 새로운 기회를
              발견하실 수 있습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center h-full hover:shadow-lg transition-shadow">
                <Building2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-emerald-800 mb-4">비즈니스 및 지자체 문의</h3>
                <p className="text-gray-600 mb-6">
                  대량 구매, 지자체 협력, B2B 파트너십에 관심이 있으시다면 전문 상담을 받아보세요.
                </p>
                <Button
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 text-lg font-semibold rounded-lg"
                >
                  비즈니스 문의하기
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center h-full hover:shadow-lg transition-shadow">
                <ShoppingCart className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-amber-700 mb-4">온라인 스토어</h3>
                <p className="text-gray-600 mb-6">
                  개인 고객을 위한 소포장 제품을 온라인에서 간편하게 주문하실 수 있습니다.
                </p>
                <Button
                  size="lg"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 px-6 text-lg font-semibold rounded-lg"
                >
                  온라인 스토어 바로가기
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center h-full hover:shadow-lg transition-shadow">
                <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-blue-800 mb-4">투자 제안서</h3>
                <p className="text-gray-600 mb-6">
                  Leaflo의 성장 가능성과 투자 기회에 대한 상세한 정보를 확인해보세요.
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-4 px-6 text-lg font-semibold rounded-lg bg-transparent"
                >
                  투자 제안서 확인하기
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-emerald-800 text-center mb-8">연락처 정보</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Mail className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h4 className="font-semibold text-emerald-700 mb-2">이메일</h4>
                <p className="text-gray-600">info@leaflo.co.kr</p>
                <p className="text-gray-600">business@leaflo.co.kr</p>
              </div>

              <div className="text-center">
                <Phone className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h4 className="font-semibold text-emerald-700 mb-2">전화번호</h4>
                <p className="text-gray-600">02-1234-5678</p>
                <p className="text-gray-600">평일 09:00 - 18:00</p>
              </div>

              <div className="text-center">
                <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h4 className="font-semibold text-emerald-700 mb-2">주소</h4>
                <p className="text-gray-600">서울특별시 강남구</p>
                <p className="text-gray-600">테헤란로 123길 45</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
