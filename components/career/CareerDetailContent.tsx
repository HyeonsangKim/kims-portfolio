'use client'

import type { ComponentType } from 'react'
import {
  FiCompass, FiAlertTriangle, FiCpu, FiGitBranch, FiFlag,
  FiPlayCircle, FiTrendingUp, FiTarget, FiZap, FiLayers,
} from 'react-icons/fi'
import {
  Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'
import type { Locale } from '@/lib/i18n'
import type {
  CareerReportKey, CareerStoryBlockSlot, CareerStoryBlockV1,
  CareerReport, SlotVisuals,
} from '@/data/career-reports'
import OdiyaArchitectureDiagram from './diagrams/OdiyaArchitectureDiagram'
import MohaniArchitectureDiagram from './diagrams/MohaniArchitectureDiagram'
import KoccaArchitectureDiagram from './diagrams/KoccaArchitectureDiagram'
import PurpleArchitectureDiagram from './diagrams/PurpleArchitectureDiagram'
import AigoseoArchitectureDiagram from './diagrams/AigoseoArchitectureDiagram'
import OemArchitectureDiagram from './diagrams/OemArchitectureDiagram'

const careerIconMap: Record<CareerStoryBlockSlot, ComponentType<{ className?: string }>> = {
  context: FiCompass, problem: FiAlertTriangle, hypothesis: FiCpu,
  alternatives: FiGitBranch, decision: FiFlag, execution: FiPlayCircle, result: FiTrendingUp,
}
const projectIconMap: Record<CareerStoryBlockSlot, ComponentType<{ className?: string }>> = {
  context: FiCompass, problem: FiTarget, hypothesis: FiZap,
  alternatives: FiGitBranch, decision: FiLayers, execution: FiPlayCircle, result: FiTrendingUp,
}

export default function CareerDetailContent({
  reportKey,
  storyBlock,
  legacy,
  slotOrder,
  slotLabels,
  isProject,
  locale,
  heroDiagramKey,
}: {
  reportKey: CareerReportKey
  storyBlock?: CareerStoryBlockV1
  legacy?: CareerReport
  slotOrder: readonly CareerStoryBlockSlot[]
  slotLabels: Record<CareerStoryBlockSlot, Record<Locale, string>>
  isProject: boolean
  locale: Locale
  heroDiagramKey?: string
}) {
  const iconMap = isProject ? projectIconMap : careerIconMap

  if (storyBlock) {
    return (
      <div className="space-y-14">
        {slotOrder.map((slot) => {
          const text = storyBlock[slot]?.[locale]
          if (!text) return null
          const Icon = iconMap[slot]
          const visuals = storyBlock.visuals?.[slot]
          return (
            <section key={slot} id={`slot-${slot}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-cyan-400/10 text-cyan-400">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <h2 className="text-lg font-semibold text-white">{slotLabels[slot][locale]}</h2>
              </div>
              <p className="text-[15px] text-gray-300 leading-relaxed whitespace-pre-line">{text}</p>

              {visuals?.bullets && visuals.bullets[locale]?.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {visuals.bullets[locale].map((item, i) => (
                    <li key={i} className="flex items-baseline gap-3 text-sm text-gray-300 leading-relaxed">
                      <span className="shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-cyan-400/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {visuals?.metrics && visuals.metrics.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {visuals.metrics.map((m, i) => (
                    <div key={i} className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">
                      <div className="text-xl font-bold text-cyan-400">{m.value}</div>
                      <div className="mt-1 text-[12px] text-gray-400 leading-snug">{m.label[locale]}</div>
                    </div>
                  ))}
                </div>
              )}

              {visuals?.table && (
                <div className="mt-6 overflow-x-auto rounded-xl border border-white/[0.06]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-cyan-400/[0.04]">
                        {visuals.table.columns.map((col, i) => (
                          <th key={i} className="text-left px-4 py-2.5 font-medium text-cyan-400/80 border-b border-cyan-400/10">
                            {col[locale]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visuals.table.rows.map((row, i) => {
                        const selected = visuals.table?.selectedRow === i
                        return (
                          <tr key={i} className={`border-b border-white/[0.04] last:border-0 ${selected ? 'bg-cyan-400/[0.05]' : ''}`}>
                            {row.map((cell, j) => (
                              <td key={j} className={`px-4 py-3 ${selected ? 'text-cyan-400 font-medium' : 'text-gray-400'}`}>
                                {j === 0 && selected ? `★ ${cell[locale]}` : cell[locale]}
                              </td>
                            ))}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {visuals?.image && (
                <figure className="mt-6 rounded-xl border border-white/[0.06] overflow-hidden">
                  <img src={visuals.image.src} alt={visuals.image.alt[locale]} className="w-full h-auto" loading="lazy" />
                  {visuals.image.caption && (
                    <figcaption className="px-4 py-3 text-xs text-gray-500 border-t border-white/[0.06]">{visuals.image.caption[locale]}</figcaption>
                  )}
                </figure>
              )}

              {visuals?.diagramKey && visuals.diagramKey !== heroDiagramKey && (
                <div className="mt-6 rounded-xl border border-white/[0.06] p-4 overflow-x-auto">
                  {visuals.diagramKey === 'odiya' && <OdiyaArchitectureDiagram />}
                  {visuals.diagramKey === 'mohani' && <MohaniArchitectureDiagram />}
                  {visuals.diagramKey === 'kocca' && <KoccaArchitectureDiagram />}
                  {visuals.diagramKey === 'purple' && <PurpleArchitectureDiagram />}
                  {visuals.diagramKey === 'aigoseo' && <AigoseoArchitectureDiagram />}
                  {visuals.diagramKey === 'oem' && <OemArchitectureDiagram />}
                </div>
              )}

              {visuals?.chart && <ChartCard chart={visuals.chart} locale={locale} />}
            </section>
          )
        })}
      </div>
    )
  }

  if (legacy) {
    return (
      <div className="space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">About</h2>
          <p className="text-[15px] text-gray-300 leading-relaxed">{legacy.about[locale]}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">My Role</h2>
          <p className="text-[15px] text-gray-300 leading-relaxed">{legacy.role[locale]}</p>
        </section>
        {legacy.highlights[locale]?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Highlights</h2>
            <ul className="space-y-2">
              {legacy.highlights[locale].map((h, i) => (
                <li key={i} className="flex items-baseline gap-3 text-sm text-gray-300">
                  <span className="shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-cyan-400/50" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    )
  }

  return null
}

function ChartCard({ chart, locale }: { chart: NonNullable<SlotVisuals['chart']>; locale: Locale }) {
  const maxValue = Math.max(...chart.data.map((d) => d.value))
  const data = chart.data.map((d, i) => ({
    label: d.label[locale],
    value: d.value,
    isAfter: i === chart.data.length - 1,
  }))

  return (
    <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 10 }} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="2 6" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, Math.ceil(maxValue * 1.1)]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#0f0f1a', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 8, fontSize: 12, color: '#e5e7eb' }}
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              labelStyle={{ color: '#9ca3af' }}
              itemStyle={{ color: '#22d3ee' }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} label={{ position: 'top', fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.isAfter ? '#22d3ee' : 'rgba(255,255,255,0.08)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {chart.caption && <p className="mt-3 text-xs text-gray-500">{chart.caption[locale]}</p>}
    </div>
  )
}
