import React from 'react'
import Reveal from './Reveal.jsx'

// Static tile grid linking out to the real profile. For a live auto-updating
// feed, connect the Instagram Basic Display / Graph API with a business
// account access token and swap these tiles for fetched media.
const tiles = [1, 2, 3, 4, 5, 6]

export default function InstagramFeed() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <Reveal>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="eyebrow">Follow along</p>
            <h2 className="text-3xl mt-1">@hastmelap_ on Instagram</h2>
          </div>
          <a
            href="https://www.instagram.com/hastmelap_"
            target="_blank"
            rel="noreferrer"
            className="btn-primary !px-5 !py-2.5 text-sm hover:scale-105 transition-transform"
          >
            Follow on Instagram
          </a>
        </div>
      </Reveal>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {tiles.map((t, i) => (
          <Reveal key={t} delay={i * 70} direction="scale">
            <a
              href="https://www.instagram.com/hastmelap_"
              target="_blank"
              rel="noreferrer"
              className="block aspect-square bg-maroon/10 border border-gold/20 relative overflow-hidden group"
            >
              <img
                src={`https://placehold.co/300x300/6E1E36/E4C978?text=IG+${t}`}
                alt="Hastmelap Instagram post"
                className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-500"
              />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
