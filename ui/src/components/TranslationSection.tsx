import { useCallback, useState } from 'react'
import { ChevronRight, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { TranslationFormType } from '@/models/TranslationFormType'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { AppConstants } from '@/constants/AppContants'

const TRANSLATION_LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'arabic', label: 'Arabic' },

]

const TranslationSection = () => {
  const [availableTranslationLanguages, setAvailableTranslationLanguages] = useState<{
    value: string,
    label: string
  }[]>([])
  const form = useForm<TranslationFormType>({
    defaultValues: {
      sourceArticleUrl: '',
      targetArticleLanguage: 'English',
      sourceArticleContent: '',
      translatedArticleContent: '',
    },
  })
  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form

  const onSubmit = useCallback((data: TranslationFormType) => {
    console.log(data)
  }, [])

  const callApiTest = () => {
    const url = 'http://127.0.0.1:5000/test'
    const urlToSend = 'https://fr.wikipedia.org/wiki/Stress_hydrique_(%C3%A9cologie)'
    const data = {
      url: urlToSend,
    }
    fetch(`${AppConstants.BACKEND_BASE_URL}/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from Flask:', data)
      })
      .catch(error => console.log(error))
    console.log('put api call here')
  }

  return (
    <section className="bg-white mt-6 rounded-xl shadow-md">
      <Form {...form}>
        {/*<button onClick={() => callApiTest()}>Test Api call</button>*/}
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <div className="flex items-center justify-between p-4">
            <div className="inline-flex items-center gap-x-2">
              <Info size={16} />
              <span className="text-zinc-700 text-xs">
								Here will be instruction regarding translation.
							</span>
            </div>
            <div className="flex gap-x-2">
              <Button variant="outline">Clear</Button>
              <Button variant="default">Translate</Button>
              <Button disabled className="flex gap-x-2">Compare <ChevronRight size={16} /></Button>
            </div>
          </div>

          <div className="flex justify-between py-2 px-5 mt-2 h-fit">
            <FormField
              control={form.control}
              name="sourceArticleUrl"
              render={({ field }) => (
                <FormItem className="w-2/5 flex items-center gap-x-4">
                  <FormLabel className="shrink-0">Source Article URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a URL" className="!mt-0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={availableTranslationLanguages.length === 0}
              name="targetArticleLanguage"
              render={({ field }) => (
                <FormItem className="w-2/5 flex items-center gap-x-4">
                  <FormLabel className="shrink-0">Target Article Language</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="!mt-0">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          availableTranslationLanguages.map(languageInfo => (
                            <SelectItem value={languageInfo.value}>
                              {languageInfo.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-stretch py-2 border-t h-full">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="sourceArticleContent"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-x-4 border-b mx-2">
                    <FormLabel className="shrink-0 sr-only">Content</FormLabel>
                    <FormControl>
                      <Textarea className="border-0 resize-none" placeholder="Source article" {...field} rows={22} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-sm text-center inline-block w-full my-3">
                Word Count <span className="font-bold">{watch('sourceArticleContent').length}</span>
              </span>
            </div>

            <Separator orientation="vertical" className="border-slate-400 h-auto w-px" />

            <div className="w-1/2">
              <FormField
                control={form.control}
                name="translatedArticleContent"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-x-4 border-b mx-2">
                    <FormLabel className="shrink-0 sr-only">Content</FormLabel>
                    <FormControl>
                      <Textarea className="border-0 resize-none" placeholder="Translated article" {...field}
                                rows={22} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-sm text-center inline-block w-full my-3">
                Word Count <span className="font-bold">{watch('translatedArticleContent').length}</span>
              </span>
            </div>
          </div>
        </form>
      </Form>
      <div>

      </div>
    </section>
  )
}

export default TranslationSection
