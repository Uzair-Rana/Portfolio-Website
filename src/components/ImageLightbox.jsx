import { m as M } from 'framer-motion'

function ImageLightbox({ src, alt, open, onClose }) {
  if (!open) return null
  return (
    <M.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lightbox-overlay" onClick={onClose}>
      <M.img initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.25 }} src={src} alt={alt} className="lightbox-content" onClick={(e) => e.stopPropagation()} />
    </M.div>
  )
}

export default ImageLightbox
