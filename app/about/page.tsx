"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Leaf, DollarSign, Lightbulb, TreePine, Recycle, Factory, Users, Award, Target } from "lucide-react"

// Simple Animated Icon Component
function AnimatedIcon({ icon: Icon, delay = 0 }: { icon: any; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="w-16 h-16 mx-auto mb-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
        className="w-full h-full bg-emerald-100 rounded-2xl flex items-center justify-center"
      >
        <Icon className="w-8 h-8 text-emerald-600" />
      </motion.div>
    </div>
  )
}

// Team Member Card Component
function TeamMemberCard({ member, delay = 0 }: { member: any; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="p-6 bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
        {/* Profile Image */}
        <motion.div
          className="w-20 h-20 mx-auto mb-4 relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-xl font-bold text-white">{member.name[0]}</span>
          </div>
        </motion.div>

        <h3 className="text-lg font-bold text-gray-800 mb-1">{member.name}</h3>
        <p className="text-emerald-600 font-semibold mb-3">{member.position}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {member.skills.map((skill: string, index: number) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: delay + 0.1 * index }}
              className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-lg font-medium"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

export default function AboutPage() {
  const teamValues = [
    {
      title: "환경 전문성",
      description: "환경공학, 바이오매스 에너지 분야의 풍부한 전문 지식과 경험을 보유한 전문가들로 구성되어 있습니다.",
      skills: ["환경공학", "바이오매스", "에너지변환", "친환경기술"],
    },
    {
      title: "사업 운영",
      description: "효율적인 생산 시스템 구축과 운영 관리, 품질 관리를 통해 안정적인 제품 공급을 보장합니다.",
      skills: ["운영관리", "품질관리", "생산최적화", "공급망관리"],
    },
    {
      title: "시장 개발",
      description: "B2B, B2C, B2G 시장에서의 마케팅 전략 수립과 고객 관계 관리를 담당하고 있습니다.",
      skills: ["시장분석", "브랜드전략", "고객관계관리", "사업개발"],
    },
    {
      title: "기술 혁신",
      description: "지속적인 연구개발을 통해 낙엽 처리 기술과 펠릿 제조 공정을 개선하고 있습니다.",
      skills: ["R&D", "공정개선", "특허개발", "기술혁신"],
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Leaf className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Leaflo는 <span className="text-emerald-600">무엇인가요?</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              낙엽 폐기물 문제에 대한 친환경 솔루션을 제공하는 혁신적인 스타트업입니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-800">우리의 미션</h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Leaflo는 낙엽 폐기물 문제에 대한 친환경 솔루션을 제공하는 혁신적인 스타트업입니다. 우리는 버려지는
                낙엽으로 고효율 바이오매스 팰릿을 생산하여 순환 경제와 지속 가능한 미래에 기여합니다.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                매년 수많은 낙엽이 단순 소각되거나 매립되면서 환경 오염의 원인이 되고 있습니다. Leaflo는 이러한 문제를
                해결하고 동시에 경제적 가치를 창출하는 혁신적인 기술을 보유하고 있습니다.
              </p>

              {/* Simple Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">3가지</div>
                  <div className="text-gray-600 text-sm">수익 모델</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600 mb-1">90%</div>
                  <div className="text-gray-600 text-sm">비용 절감</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gray-50 p-6 rounded-2xl">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Leaflo 생산 과정"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Award className="w-6 h-6 text-emerald-600" />
              <h2 className="text-4xl font-bold text-gray-800">Leaflo의 핵심 가치</h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 text-center bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <AnimatedIcon icon={Leaf} delay={0.2} />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">친환경 기술</h3>
                <p className="text-gray-600 leading-relaxed">
                  100% 천연 낙엽을 활용한 친환경 에너지 솔루션으로 환경 보호에 기여합니다.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 text-center bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <AnimatedIcon icon={DollarSign} delay={0.4} />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">비용 효율성</h3>
                <p className="text-gray-600 leading-relaxed">
                  기존 연료 대비 경제적이고 효율적인 에너지원을 제공하여 비용을 절감합니다.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 text-center bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <AnimatedIcon icon={Lightbulb} delay={0.6} />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">혁신적인 솔루션</h3>
                <p className="text-gray-600 leading-relaxed">
                  폐기물을 자원으로 전환하는 순환경제 모델을 통해 지속가능한 미래를 만듭니다.
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Users className="w-6 h-6 text-emerald-600" />
              <h2 className="text-4xl font-bold text-gray-800">전문가 팀</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              다양한 분야의 전문가들이 모여 Leaflo의 혁신적인 비전을 현실로 만들어가고 있습니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {teamValues.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="p-6 bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl h-full">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">{area.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{area.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill: string, skillIndex: number) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-lg font-medium"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Leaflo 생산 과정</h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: TreePine, title: "1. 낙엽 수집", desc: "지자체와 협력하여 낙엽을 효율적으로 수집합니다." },
                { icon: Recycle, title: "2. 전처리", desc: "수집된 낙엽을 세척하고 건조하여 가공 준비를 합니다." },
                {
                  icon: Factory,
                  title: "3. 팰릿 제조",
                  desc: "혁신적인 기술로 고효율 바이오매스 팰릿을 생산합니다.",
                },
                { icon: DollarSign, title: "4. 판매 및 유통", desc: "B2B, B2C, B2G 시장에 최적화된 제품을 공급합니다." },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <step.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
