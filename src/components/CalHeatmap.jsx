import React, { useMemo } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

function generateSampleValues(days = 60) {
  const today = new Date()
  const values = []
  for (let i = 0; i < days; i++) {
    const d = new Date()
    d.setDate(today.getDate() - i)
    values.push({ date: d.toISOString().slice(0, 10), count: Math.floor(Math.random() * 5) })
  }
  return values
}

export default function CalHeatmap({ values: valuesProp }) {
  const values = useMemo(() => valuesProp || generateSampleValues(), [valuesProp])

  const [remoteValues, setRemoteValues] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [fetchError, setFetchError] = React.useState(null)

  React.useEffect(() => {
    let mounted = true
    setIsLoading(true)
    setFetchError(null)
    fetch('/api/github-contribs?user=anubhavbaghel')
      .then((r) => {
        if (!r.ok) throw new Error(`status:${r.status}`)
        return r.json()
      })
      .then((data) => {
        if (!mounted) return
        setRemoteValues(Array.isArray(data) ? data.map(d => ({ date: d.date, count: d.count })) : null)
      })
      .catch((err) => {
        if (!mounted) return
        setFetchError(String(err.message || err))
      })
      .finally(() => { if (mounted) setIsLoading(false) })
    return () => { mounted = false }
  }, [])

  const finalValues = remoteValues || values

  const start = useMemo(() => {
    const s = new Date()
    s.setMonth(s.getMonth() - 6)
    // align start to beginning of week (Sunday) so grid doesn't show a partial leading column
    s.setDate(s.getDate() - s.getDay())
    return s
  }, [])  

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {isLoading && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', zIndex: 5 }}>
            <div style={{ padding: 8, background: 'rgba(255,255,255,0.85)', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontSize: 13 }}>Loading contributions…</div>
          </div>
        )}
        {fetchError && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', zIndex: 5 }}>
            <div style={{ padding: 8, background: 'rgba(255,230,230,0.95)', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontSize: 13, color: '#800' }}>Error loading contributions</div>
          </div>
        )}

        <CalendarHeatmap
        startDate={start}
        endDate={new Date()}
        values={finalValues}
        gutterSize={3}
        showWeekdayLabels={false}
        classForValue={(value) => {
          // Treat missing values or zero-count days as empty (grey)
          if (!value || typeof value.count === 'undefined') return 'color-empty'
          const v = Number(value.count) || 0
          if (v === 0) return 'color-empty'
          if (v >= 4) return 'color-github-4'
          if (v >= 3) return 'color-github-3'
          if (v >= 2) return 'color-github-2'
          return 'color-github-1'
        }}
        titleForValue={(value) => {
          if (!value || typeof value.count === 'undefined' || Number(value.count) === 0) {
            if (!value) return 'No contributions'
            try {
              const d = new Date(value.date)
              return `${d.toLocaleDateString()} — No contributions`
            } catch (e) {
              return 'No contributions'
            }
          }
          try {
            const d = new Date(value.date)
            const count = Number(value.count)
            return `${count} contribution${count === 1 ? '' : 's'} on ${d.toLocaleDateString()}`
          } catch (e) {
            return `${value.count} contributions`
          }
        }}
        transformDayElement={(rect, value) => {
          // rect is a React element here — clone it and add accessibility props
          if (!rect) return rect
          const count = value && typeof value.count !== 'undefined' ? Number(value.count) : 0
          const dateStr = value && value.date ? (() => { try { return new Date(value.date).toLocaleDateString() } catch (e) { return value.date } })() : ''
          const aria = count > 0 ? `${count} contribution${count === 1 ? '' : 's'} on ${dateStr}` : (dateStr ? `${dateStr} — No contributions` : 'No contributions')
          const existingStyle = rect.props && rect.props.style ? rect.props.style : {}
          return React.cloneElement(rect, {
            tabIndex: 0,
            style: { ...existingStyle, cursor: 'pointer' },
            'aria-label': aria,
            title: rect.props && rect.props.title ? rect.props.title : (aria || undefined),
          })
        }}
      />
      </div>
    </div>
  )
}   