"use client"

import { motion } from "framer-motion"
import { Leaf, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-2xl font-bold text-emerald-700 mb-4">
              <Leaf className="w-6 h-6" />
              <span>Leaflo</span>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              낙엽을 에너지로, 폐기물을 자원으로.
              <br />
              지속가능한 미래를 만들어갑니다.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">연락처</h4>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@leaflo.co.kr</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>02-1234-5678</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">소셜 미디어</h4>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-emerald-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-emerald-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-emerald-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-emerald-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">법적 고지</h4>
            <div className="space-y-2 text-gray-600">
              <a href="#" className="block hover:text-emerald-600 transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="block hover:text-emerald-600 transition-colors">
                이용약관
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; 2024 Leaflo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
