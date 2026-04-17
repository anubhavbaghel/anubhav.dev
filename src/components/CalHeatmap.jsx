import React, { useMemo } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

function generateSampleValues(days = 365) {
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

  React.useEffect(() => {
    let mounted = true
    fetch('/api/github-contribs?user=anubhavbaghel')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        // transform to {date, count}
        setRemoteValues(Array.isArray(data) ? data.map(d => ({ date: d.date, count: d.count })) : null)
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  const finalValues = remoteValues || values

  const start = useMemo(() => {
    const s = new Date()
    s.setFullYear(s.getFullYear() - 1)
    return s
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CalendarHeatmap
        startDate={start}
        endDate={new Date()}
        values={finalValues}
        gutterSize={3}
        showWeekdayLabels={false}
        classForValue={(value) => {
          if (!value) return 'color-empty'
          const v = value.count
          if (v >= 4) return 'color-github-4'
          if (v >= 3) return 'color-github-3'
          if (v >= 2) return 'color-github-2'
          return 'color-github-1'
        }}
      />
    </div>
  )
}
