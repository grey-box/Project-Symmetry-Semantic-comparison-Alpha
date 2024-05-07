import { useForm } from 'react-hook-form'
import { ChevronRight, Info } from 'lucide-react'
import { useCallback, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { SelectData } from '@/models/SelectData'
import { fetchArticle } from '@/services/fetchArticle'
import { useAppContext } from '@/context/AppContext'
import { TranslationFormType } from '@/models/TranslationFormType'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const TRANSLATION_LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'arabic', label: 'Arabic' },

]

const TranslationSection = () => {
  const [availableTranslationLanguages, setAvailableTranslationLanguages] = useState<SelectData<string>[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<TranslationFormType>({
    defaultValues: {
      sourceArticleUrl: '',
      targetArticleLanguage: 'English',
      sourceArticleContent: '',
      translatedArticleContent: '',
    },
  })
  const { translationTool, APIKey } = useAppContext()
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = form

  const onSubmit = useCallback(async (data: TranslationFormType) => {
    try {
      setIsLoading(true)
      const response = await fetchArticle({
        translationTool,
        deepLApiKey: APIKey,
        sourceArticleUrl: data.sourceArticleUrl,
        targetLanguage: '',
      })
      setValue('sourceArticleContent', response.data.sourceArticle.text)
      setAvailableTranslationLanguages(
        Object.entries(response.data.articleLanguages).map(([key, value]) => ({
          value,
          label: key,
        })))
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }, [setValue, translationTool, APIKey])

  const onLanguageChange = useCallback(() => {

  }, [])

  return (
    <section className="bg-white mt-6 rounded-xl shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between p-4">
            <div className="inline-flex items-center gap-x-2">
              <Info size={16} />
              <span className="text-zinc-700 text-xs">
								Here will be instruction regarding translation.
							</span>
            </div>
            <div className="flex gap-x-2">
              <Button disabled={isLoading} variant="outline">Clear</Button>
              <Button disabled={isLoading} variant="default">Translate</Button>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={field.disabled || isLoading}
                    >
                      <SelectTrigger className="!mt-0">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          availableTranslationLanguages.map(languageInfo => (
                            <SelectItem value={languageInfo.value} key={languageInfo.label}>
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
                      <Textarea className="border-0 resize-none" readOnly placeholder="Source article" {...field}
                                rows={22} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-sm text-center inline-block w-full my-3">
                Word Count <span className="font-bold">{watch('sourceArticleContent').split(' ').length}</span>
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
                      <Textarea
                        className="border-0 resize-none"
                        readOnly
                        placeholder="Translated article"
                        {...field}
                        rows={22} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-sm text-center inline-block w-full my-3">
                Word Count <span className="font-bold">{watch('translatedArticleContent').split(' ').length}</span>
              </span>
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default TranslationSection
