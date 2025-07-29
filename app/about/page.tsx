"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { 
  Leaf, 
  Users, 
  Target, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle,
  Zap,
  Settings,
  Award,
  Recycle
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// AnimatedIcon 컴포넌트
function AnimatedIcon({
  icon: Icon,
  title,
  description,
  delay = 0,
}: { icon: any; title: string; description: string; delay?: number }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="text-center"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center">
        <Icon className="w-8 h-8 text-emerald-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}

// TeamMember 컴포넌트
function TeamMember({
  name,
  role,
  department,
  achievement,
  delay = 0,
}: {
  name: string;
  role: string;
  department: string;
  achievement: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"
    >
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center">
          <Users className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-emerald-600 font-semibold mb-2">{role}</p>
        <p className="text-gray-600 text-sm mb-3">{department}</p>
        <p className="text-gray-500 text-xs leading-relaxed">{achievement}</p>
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
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
            <Leaf className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              팀 에테르, 환경에 진심인 사람들이 모였다
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              버려지던 낙엽을 에너지원으로 전환하여 지속가능한 미래를 만들어가는 Leaflo의 이야기를 소개합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">우리의 미션</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              연간 30만톤의 낙엽을 96% 효율의 바이오매스 펠릿으로 전환하여
              <br />
              840억원 규모의 블루오션 시장을 개척합니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            <AnimatedIcon
              icon={Target}
              title="명확한 목표"
              description="2028년까지 연간 10,000톤의 낙엽 펠릿 생산으로 55억원 매출 달성"
              delay={0}
            />
            <AnimatedIcon
              icon={Zap}
              title="혁신적 기술"
              description="ISO 17225 시리즈 기준 96% 효율의 검증된 에테르 펠릿 기술"
              delay={0.1}
            />
            <AnimatedIcon
              icon={TrendingUp}
              title="지속가능한 성장"
              description="이중 수익 구조(Dual-Revenue Engine)를 통한 안정적 수익 창출"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">우리 팀</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              환경에 진심이고, 혁신에 목마른 다양한 전문가들이 모여 Leaflo를 만들어가고 있습니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TeamMember
              name="노민수"
              role="CEO"
              department="연세대학교 대기과학과"
              achievement="성남시청 청년정책협의체 위원 | 한국장학재단 사회리더 대학생 | 환경부 탄소중립서포터즈 5기 팀장"
              delay={0}
            />
            <TeamMember
              name="신상현"
              role="CCO"
              department="환경디자인학과 졸업"
              achievement="건축기사 | 1급 소방안전관리자"
              delay={0.1}
            />
            <TeamMember
              name="고희승"
              role="COO"
              department="연세대학교 컴퓨터과학과 전공"
              achievement="에어캡 게임 기획팀 | 연세대학교 YCC 학술부 임원 | IHEI 워크스테이션 개발팀장"
              delay={0.2}
            />
            <TeamMember
              name="차유진"
              role="COO"
              department="연세대학교 컴퓨터과학과 전공"
              achievement="2021년 공군 행정 업무 자동화 표창장 수상 | 2024년 넥슨 창의플랫폼 최우수상 수상 | 2025년 AGI Agent 해커톤 대회 우수상 수상"
              delay={0.3}
            />
            <TeamMember
              name="김진세"
              role="CTO"
              department="연세대학교 전기전자공학 재학"
              achievement="드론 기반 상공 택배 조달 시스템 Fullstack 개발자 | IoT 기반 자이로컨트롤러 - 마인크래프트 CTO | IoT 기반 물류 운반 안정화 시스템 CTO"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Technology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              검증된 3단계 솔루션으로 낙엽을 고품질 바이오매스 펠릿으로 전환합니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">'깨끗하게' 분류합니다</h3>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  <strong>트럼멜 스크린과 자석 선별기로</strong> 낙엽 외의 자 이물질을 완벽히 제거합니다.
                </p>
                <p className="text-sm leading-relaxed">
                  다단 침전 세척 방식으로 흙, 미세먼지 등 외부(Ash)의 직접적인 원인이 되는 잔류물을 제거합니다.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">'똑똑하게' 섞습니다</h3>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  정제된 원료의 성분과 상태를 <strong>NIR(근적외선) 분석 데이터 기반으로</strong> 실시간 진단합니다.
                </p>
                <p className="text-sm leading-relaxed">
                  진단 결과에 따라 최적의 연소 효율과 성형성을 구현할 수 있는 천연 유래바인더를 가장 이상적인 비율로 자동 블렌딩합니다.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">'단단하게' 만듭니다</h3>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  해머밀로 원료 입자를 균일하게 분쇄한 뒤, <strong>저온 벨트 건조기를 통해</strong> 최소한의 에너지로 함수율을 7~11%까지 정밀하게 조절합니다.
                </p>
                <p className="text-sm leading-relaxed">
                  고온·고압의 <strong>링타이(Ring-die) 펠릿밀에서</strong> 고밀도 펠릿으로 압축하고 카운터플로우 쿨러를 통해 금속 냉각 및 미세 가루 제거를 통해 최종 제품을 완성합니다.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">낙엽펠릿, 이렇게 이동합니다</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              버려지던 낙엽이 에너지원으로 변화하는 전체 과정을 소개합니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <Leaf className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">낙엽 발생원</h3>
              <p className="text-gray-600 leading-relaxed">
                도심 공원, 가로수, 산림에서 자연 발생하는 낙엽을 체계적으로 수집합니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <Settings className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">낙엽 수거</h3>
              <p className="text-gray-600 leading-relaxed">
                지자체와의 위탁계약을 통해 효율적이고 체계적인 낙엽 수거 시스템을 운영합니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">전처리 공장</h3>
              <p className="text-gray-600 leading-relaxed">
                3단계 솔루션을 통해 낙엽을 분류, 세척, 건조하여 고품질 펠릿으로 가공합니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                <Award className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">에테르 펠릿 수요자</h3>
              <p className="text-gray-600 leading-relaxed">
                B2B 산업용 보일러, B2C 생활용 연료, ESG 탄소저감 크레딧 등 다양한 수요처에 공급합니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Leaflo의 임팩트</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              데이터로 입증된 Leaflo의 혁신적 가치와 시장 잠재력
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 효율성 카드 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-3xl shadow-lg border border-emerald-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">96%</div>
                    <div className="w-16 h-1 bg-emerald-200 rounded-full ml-auto">
                      <div className="w-full h-full bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">효율성</h3>
                <p className="text-gray-600 text-sm">목재 펠릿 대비</p>
              </div>
            </motion.div>

            {/* 수거량 카드 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Recycle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 mb-1">30만톤</div>
                    <div className="w-16 h-1 bg-blue-200 rounded-full ml-auto">
                      <div className="w-4/5 h-full bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">수거 가능량</h3>
                <p className="text-gray-600 text-sm">연간 낙엽</p>
              </div>
            </motion.div>

            {/* 시장 규모 카드 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl shadow-lg border border-amber-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-amber-600 mb-1">840억원</div>
                    <div className="w-16 h-1 bg-amber-200 rounded-full ml-auto">
                      <div className="w-5/6 h-full bg-amber-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">시장 규모</h3>
                <p className="text-gray-600 text-sm">블루오션 시장</p>
              </div>
            </motion.div>

            {/* 절감 효과 카드 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl shadow-lg border border-green-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600 mb-1">70%</div>
                    <div className="w-16 h-1 bg-green-200 rounded-full ml-auto">
                      <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">비용 절감</h3>
                <p className="text-gray-600 text-sm">처리비용 절감 효과</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              함께 만들어가는 지속가능한 미래
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Leaflo와 함께 버려지던 낙엽을 에너지원으로 전환하여 환경을 보호하고 새로운 가치를 창출해보세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/business">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg group transition-all duration-200 hover:scale-102 hover:-translate-y-1"
                >
                  비즈니스 모델 보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent transition-all duration-200 hover:scale-102 hover:-translate-y-1"
                >
                  파트너십 문의
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
