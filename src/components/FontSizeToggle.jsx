import { useEffect, useState } from 'react'

function FontSizeToggle() {
  const [size, setSize] = useState(18)
  const clamp = (v) => Math.max(16, Math.min(22, v))
  useEffect(() => {
    document.documentElement.style.fontSize = `${size}px`
  }, [size])
  return (
    <div className="flex items-center gap-1">
      <button aria-label="Decrease font size" onClick={() => setSize((s) => clamp(s - 1))} className="px-2 py-2 rounded-md border border-white/20 hover:bg-white/5">A−</button>
      <button aria-label="Increase font size" onClick={() => setSize((s) => clamp(s + 1))} className="px-2 py-2 rounded-md border border-white/20 hover:bg-white/5">A+</button>
    </div>
  )
}

export default FontSizeToggle
