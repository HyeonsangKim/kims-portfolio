'use client'
import { useState } from 'react'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { FiMail, FiCopy, FiCheck, FiSend, FiGlobe } from 'react-icons/fi'
import { useI18n, type Locale } from '@/lib/i18n'

const CONTACT_EMAIL = 'hyeonsang@wigtn.com'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqbblby'

const msg: Record<string, Record<Locale, string>> = {
  sending: { ko: '전송 중...', en: 'Sending...', ja: '送信中...' },
  sent: { ko: '전송 완료!', en: 'Sent!', ja: '送信完了！' },
  send: { ko: '메시지 보내기', en: 'Send Message', ja: 'メッセージ送信' },
  error: { ko: '전송 실패. 이메일로 직접 보내주세요.', en: 'Failed. Please email directly.', ja: '送信失敗。メールで直接ご連絡ください。' },
}

export default function Contact() {
  const { locale } = useI18n()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending' || status === 'sent') return
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message, _replyto: form.email }),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2 glitch-hover">Contact</h2>
            <p className="text-sm text-gray-500">
              {locale === 'ko' ? '새로운 프로젝트 논의나 커피챗은 언제나 환영합니다.' : locale === 'ja' ? '新しいプロジェクトやコーヒーチャット、いつでも歓迎です。' : 'Always open for new projects and coffee chats.'}
            </p>
          </div>

          {/* Email */}
          <button
            onClick={copyEmail}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.12] transition-all text-left group w-fit"
          >
            <FiMail className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0" />
            <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">{CONTACT_EMAIL}</span>
            <span className="text-gray-600 group-hover:text-gray-400 transition-colors shrink-0">
              {copied ? <FiCheck className="w-3.5 h-3.5 text-green-400" /> : <FiCopy className="w-3.5 h-3.5" />}
            </span>
          </button>

          {/* Links */}
          <div className="flex flex-col gap-2.5">
            {[
              { icon: <SiGithub className="w-4 h-4" />, href: 'https://github.com/HyeonsangKim', label: 'GitHub' },
              { icon: <SiLinkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/hyeonsang-kim-5a7a67260/', label: 'LinkedIn' },
              { icon: <FiGlobe className="w-4 h-4" />, href: 'https://wigtn.com', label: 'wigtn.com' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors w-fit"
              >
                {s.icon}
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">{locale === 'ko' ? '이름' : locale === 'ja' ? 'お名前' : 'Name'}</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/[0.15] transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">{locale === 'ko' ? '이메일' : locale === 'ja' ? 'メール' : 'Email'}</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/[0.15] transition-colors"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">{locale === 'ko' ? '메시지' : locale === 'ja' ? 'メッセージ' : 'Message'}</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/[0.15] transition-colors resize-none"
              placeholder="Hello, I'd like to talk about..."
            />
          </div>
          {status === 'error' && <p className="text-xs text-red-400">{msg.error[locale]}</p>}
          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white/[0.06] border border-white/[0.06] text-white text-sm font-medium hover:bg-white/[0.1] disabled:opacity-50 transition-colors"
          >
            <FiSend className="w-3.5 h-3.5" />
            {status === 'sending' ? msg.sending[locale] : status === 'sent' ? msg.sent[locale] : msg.send[locale]}
          </button>
        </form>
    </div>
  )
}
