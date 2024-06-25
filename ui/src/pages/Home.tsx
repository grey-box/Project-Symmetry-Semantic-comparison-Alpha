import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Phase } from '@/models/Phase'
import { Separator } from '@/components/ui/separator'
import TranslationSection from '@/components/TranslationSection'

const Home = () => {
  const [phase, setPhase] = useState(Phase.TRANSLATION)

  return (
    <section>
      <div className="px-7 flex gap-x-3 items-center">
        <div className="flex gap-x-3">
					<span className={cn('text-white flex items-center justify-center size-[22px] rounded-full', {
            'bg-black': phase === Phase.TRANSLATION,
            'bg-slate-400': phase !== Phase.TRANSLATION,
          })}>
						1
					</span>
          <div className={cn({
            'text-black': phase === Phase.TRANSLATION,
            'text-slate-400': phase !== Phase.TRANSLATION,
          })}>Translation
          </div>
        </div>
        <Separator className="bg-slate-300 shrink h-px" />
        <div className="flex gap-x-3 shrink-0">
					<span className={cn('text-white flex items-center justify-center size-[22px] rounded-full', {
            'bg-black': phase === Phase.AI_COMPARISON,
            'bg-slate-400': phase !== Phase.AI_COMPARISON,
          })}>
						2
					</span>
          <div className={cn({
            'text-black': phase === Phase.AI_COMPARISON,
            'text-slate-400': phase !== Phase.AI_COMPARISON,
          })}>AI Comparison
          </div>
        </div>
      </div>

      {
        phase === Phase.TRANSLATION ?
          <TranslationSection />
          :
          <div>Comparison Section</div>
      }
    </section>
  )
}

export default Home
