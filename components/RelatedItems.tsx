'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export interface RelatedItem {
  href: string
  title: string
  subtitle: string
  badge?: string
}

export default function RelatedItems({
  items,
  label,
}: {
  items: RelatedItem[]
  label: string
}) {
  if (items.length === 0) return null

  return (
    <div className="mt-20 pt-10 border-t border-white/[0.04]">
      <p className="text-xs text-gray-500 uppercase tracking-widest mb-5">{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <Link
              href={item.href}
              className="block p-4 rounded-xl border border-white/[0.06] hover:border-cyan-400/20 hover:bg-cyan-400/[0.03] transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-400/70 border border-cyan-400/20">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">{item.subtitle}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
