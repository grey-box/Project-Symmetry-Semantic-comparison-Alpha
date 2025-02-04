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
import { translateArticle } from '@/services/translateArticle'
import { TranslationFormType } from '@/models/TranslationFormType'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TRANSLATION_LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'arabic', label: 'Arabic' },

]
const texts = [
  {
    editing:"Born in Scranton, Pennsylvania, Biden moved with his family to Delaware in 1953.",
    reference:"Joseph Robinette Biden, Jr, commonly known as Joe Biden (/d͡ʒoʊ ˈbaɪ.dən/a), born November 20, 1942 in Scranton, Pennsylvania, is an American statesman. He settled in Delaware after leaving his hometown with his family in 1953.",
    suggestedContribution: "Canada has 35 million people",
    suggestionType : "change"
  },
  {
    
    editing:"He also oversaw six U.S. Supreme Court confirmation hearings, including the contentious hearings for Robert Bork and Clarence Thomas.",
    reference:"",
    suggestedContribution: "Canada has 35 million people",
    suggestionType : "no change"
  },
  {
    
    editing:"He also oversaw six U.S. Supreme Court confirmation hearings, including the contentious hearings for Robert Bork and Clarence Thomas.",
    reference:"",
    suggestedContribution: "Canada has 35 million people",
    suggestionType : "no change"
  },
  {
    
    editing:"He also oversaw six U.S. Supreme Court confirmation hearings, including the contentious hearings for Robert Bork and Clarence Thomas.",
    reference:"",
    suggestedContribution: "Canada has 35 million people",
    suggestionType : "no change"
  },
  {
    
    editing:"He also oversaw six U.S. Supreme Court confirmation hearings, including the contentious hearings for Robert Bork and Clarence Thomas.",
    reference:"",
    suggestedContribution: "Canada has 35 million people",
    suggestionType : "no change"
  },
  {
    
    editing:"He graduated from the University of Delaware in 1965 before earning his law degree from Syracuse University in 1968.",
    reference:"He studied at the University of Delaware before earning a law degree from Syracuse University in 1968.",
    suggestedContribution: "Canada has 35 million people",
    suggestionType : "change"
  },
  {
    
    editing:"He was elected to the New Castle County Council in 1970 and to the U.S. Senate in 1972.",
    reference:"He was elected to the county council from New Castle in 1970. At age 30, Joe Biden becomes the sixth youngest senator in the country's history, having been elected to the United States Senate in 1972.",
    suggestedContribution: "Canada has 35 million people",
    suggestionType : "change"
  },
  {
    
    editing:"As a senator, Biden drafted and led the effort to pass the Violent Crime Control and Law Enforcement Act and the Violence Against Women Act.",
    reference:"Considered a moderate Democrat, he chairs the Judiciary and Criminal Committee of the upper house of Congress from 1987 to 1995 and also chaired the Senate Foreign Affairs Committee twice between 2001 and 2009.",
    suggestedContribution: "Canada has 35 million people",
    suggestionType : "change"
  },
  {
    
    editing:"He also oversaw six U.S. Supreme Court confirmation hearings, including the contentious hearings for Robert Bork and Clarence Thomas.",
    reference:"",
    suggestedContribution: "Canada has 35 million people",
    suggestionType : "no change"
  },
  {
    
    editing:"He also oversaw six U.S. Supreme Court confirmation hearings, including the contentious hearings for Robert Bork and Clarence Thomas.",
    reference:"",
    suggestedContribution: "Canada has 35 million people",
    suggestionType : "no change"
  },
  {
    
    editing:"",
    reference:"He is the oldest president in U.S. history and the first to have a female vice presiden",
    suggestedContribution: "Canada has 35 million people",
    suggestionType : "addition"
  },
  {
    
    editing:"Biden ran unsuccessfully for the 1988 and 2008 Democratic presidential nominations.",
    reference:"Unsuccessful candidate in the Democratic primaries for the presidential election of 1988 and again in 2008,",
    suggestedContribution: "Canada has 35 million people",
    suggestionType : "change"
  },

]
const TranslationSection = () => {
  const getColorClass = (type: any) => {
    switch (type) {
      case 'change':
        return 'bg-green-100';
      case 'addition':
        return 'bg-red-100';
      default:
        return '';
    }
  };
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
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [setValue, translationTool, APIKey])

  const onLanguageChange = useCallback(async (translateArticleUrl: string) => {
    try {
      setIsLoading(true)
      const response = await translateArticle({ targetArticleUrl: translateArticleUrl })
      console.log(response.data.text)
      setValue('translatedArticleContent', response.data.text)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [setValue])

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
              <Button disabled={isLoading} type="button" variant="outline">Clear Search</Button>
              <Button disabled={isLoading} variant="default" type="submit">Translate</Button>
              <Button disabled className="flex gap-x-2">Compare <ChevronRight size={16} /></Button>
            </div>
          </div>

          <div className="flex justify-between py-2 px-5 mt-2 h-fit">
            <FormField
              control={form.control}
              name="sourceArticleUrl"
              render={({ field }) => (
                <FormItem className="w-2/5 flex items-center gap-x-4">
                  <FormLabel className="shrink-0">Search Article</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Article Title or URL" className="!mt-0" {...field} />
                  </FormControl>
                  <Button disabled={isLoading} variant="default" type="submit">Select</Button> 
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
                  <FormLabel className="shrink-0">Translation Language</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        onLanguageChange(value)
                      }}
                      defaultValue={field.value}
                      disabled={field.disabled || isLoading}
                    >
                      <SelectTrigger className="!mt-0">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          availableTranslationLanguages.map(languageInfo => (
                            <SelectItem
                              value={languageInfo.value}
                              key={languageInfo.label}
                            >
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
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Searched Article</TableHead>
                  <TableHead>Translated Article Comparison </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {texts.map((text) => (
                  <TableRow className={getColorClass(text.suggestionType)} >
                    <TableCell className="font-medium">{text.reference}</TableCell>
                    <TableCell>{text.editing}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
      
          </div>
        
        </form>
      </Form>
    </section>
  )
}

export default TranslationSection
