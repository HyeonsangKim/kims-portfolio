'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { FiMail, FiCopy, FiCheck, FiSend, FiAlertCircle } from 'react-icons/fi'
import { useI18n, type Locale } from '@/lib/i18n'

const CONTACT_EMAIL = 'hyeonsang@wigtn.com'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqbblby'

const messages: Record<'sending' | 'sent' | 'send' | 'errorGeneric' | 'errorNetwork', Record<Locale, string>> = {
  sending: { ko: '전송 중...', en: 'Sending...', ja: '送信中...' },
  sent: { ko: '전송 완료! 곧 답변드릴게요', en: "Sent! I'll get back to you soon", ja: '送信完了！すぐに返信します' },
  send: { ko: '메시지 보내기', en: 'Send Message', ja: 'メッセージ送信' },
  errorGeneric: {
    ko: '전송에 실패했습니다. 잠시 후 다시 시도하거나 이메일로 직접 보내주세요.',
    en: 'Failed to send. Please retry or email directly.',
    ja: '送信に失敗しました。再試行するかメールで直接ご連絡ください。',
  },
  errorNetwork: {
    ko: '네트워크 오류. 인터넷 연결을 확인해주세요.',
    en: 'Network error. Please check your connection.',
    ja: 'ネットワークエラー。接続をご確認ください。',
  },
}

export default function Contact() {
  const { locale } = useI18n()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // 이메일 복사 기능
  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 폼 제출 — Formspree로 POST. 실패 시 에러 표시, 재시도 가능
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSending || isSent) return

    setIsSending(true)
    setError(null)

    const subjectMap = {
      ko: `포트폴리오 문의 — ${form.name}`,
      en: `Portfolio inquiry from ${form.name}`,
      ja: `ポートフォリオお問い合わせ — ${form.name}`,
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: subjectMap[locale],
          _replyto: form.email,
        }),
      })

      if (res.ok) {
        setIsSent(true)
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setIsSent(false), 5000)
      } else {
        const data = (await res.json().catch(() => null)) as
          | { errors?: { message?: string }[] }
          | null
        const apiError = data?.errors?.[0]?.message
        setError(apiError ?? messages.errorGeneric[locale])
      }
    } catch {
      setError(messages.errorNetwork[locale])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="relative py-20 px-6 max-w-7xl mx-auto z-10 min-h-[80vh] flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* --- Left: Contact Info --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-gray-400 bg-clip-text text-transparent mb-6">
              Let&apos;s Start a <br /> Conversation.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {locale === 'ko' ? '새로운 프로젝트 논의나 커피챗은 언제나 환영합니다.' : locale === 'ja' ? '新しいプロジェクトやコーヒーチャット、いつでも歓迎です。' : 'Always open for new projects and coffee chats.'}<br />
            </p>
          </div>

          {/* Email Copy Card */}
          <div 
            onClick={copyEmail}
            className="group relative inline-flex items-center gap-4 p-5 pr-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer backdrop-blur-md"
          >
            <div className="p-3 rounded-full bg-purple-500/20 text-purple-300 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <FiMail size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Email Address</span>
              <span className="text-lg font-mono text-white">{CONTACT_EMAIL}</span>
            </div>
            <div className="absolute right-5 text-gray-500 group-hover:text-white transition-colors">
              {copied ? <FiCheck size={20} className="text-green-400" /> : <FiCopy size={20} />}
            </div>
            {/* Copied Tooltip */}
            {copied && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-green-500 text-black px-2 py-1 rounded font-bold"
              >
                Copied!
              </motion.span>
            )}
          </div>

          {/* Social Links (수정됨) */}
          <div className="flex gap-6">
            {[
              { 
                icon: <SiGithub size={24} />, 
                href: "https://github.com/HyeonsangKim",
                label: "GitHub",
                // ✅ GitHub: 진한 회색/검정 배경
                colorClass: "hover:bg-gray-800 hover:border-gray-600" 
              },
              { 
                icon: <SiLinkedin size={24} />, 
                href: "https://www.linkedin.com/in/hyeonsang-kim-5a7a67260/", 
                label: "LinkedIn",
                // ✅ LinkedIn: 브랜드 블루 색상
                colorClass: "hover:bg-[#0077b5] hover:border-[#0077b5]" 
              },
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                // 기존의 hover:bg-purple-600을 제거하고 ${social.colorClass}를 추가했습니다.
                className={`p-4 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:scale-110 hover:border-transparent transition-all duration-300 ${social.colorClass}`}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* --- Right: Contact Form --- */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="relative p-8 md:p-10 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-xl shadow-2xl">
            {/* Form Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">{locale === 'ko' ? '이름' : locale === 'ja' ? 'お名前' : 'Your Name'}</label>
                <input 
                  type="text" 
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">{locale === 'ko' ? '이메일' : locale === 'ja' ? 'メール' : 'Your Email'}</label>
                <input 
                  type="email" 
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">{locale === 'ko' ? '메시지' : locale === 'ja' ? 'メッセージ' : 'Message'}</label>
                <textarea 
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
                >
                  <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSending || isSent}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
                  ${isSent
                    ? "bg-green-500 text-black cursor-default"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white hover:scale-[1.02]"
                  }
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
              >
                {isSending ? (
                  <span className="animate-pulse">{messages.sending[locale]}</span>
                ) : isSent ? (
                  <>
                    <FiCheck size={20} /> {messages.sent[locale]}
                  </>
                ) : (
                  <>
                    <FiSend size={18} /> {messages.send[locale]}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}