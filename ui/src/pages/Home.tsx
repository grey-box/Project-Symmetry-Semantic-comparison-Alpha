import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Phase } from '@/models/Phase'
import { Separator } from '@/components/ui/separator'
import TranslationSection from '@/components/TranslationSection'

const Home = () => {
  const [phase, setPhase] = useState(Phase.TRANSLATION)

  return (
    <section>


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
