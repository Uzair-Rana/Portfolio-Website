import { m as M } from 'framer-motion'

const images = [
  { src: '/images/coding-workspace.jpg', alt: 'Coding workspace' },
  { src: '/images/terminal-editor.jpg', alt: 'Terminal and editor' },
  { src: '/images/frontend-ui.jpg', alt: 'Frontend UI design' },
]

function Gallery() {
  return (
    <section
      id="gallery"
      className="container-padding mx-auto max-w-6xl mt-16 section-bg"
      style={{ backgroundImage: "url('/images/gallery-bg.jpg')" }}
    >
      <h2 className="text-4xl leading-tight font-bold mb-6 heading-gradient">📸 Gallery</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <M.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, rotateY: 3 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="rounded-xl overflow-hidden border border-black/5 dark:border-white/10 glass-card card-hover"
          >
            <img src={img.src} alt={img.alt} className="w-full h-48 object-cover" loading="lazy" />
          </M.div>
        ))}
      </div>
    </section>
  )
}

export default Gallery
