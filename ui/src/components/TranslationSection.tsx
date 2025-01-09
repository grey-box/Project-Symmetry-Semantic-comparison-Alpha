import { useForm } from 'react-hook-form'
import { ChevronRight, Info } from 'lucide-react'
import { useCallback, useState, useEffect } from 'react'
// import React, { useState, useEffect } from 'react';

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
  const [texts, setTexts] = useState([
    {
      editing: "",
      reference: "",
      suggestedContribution: "",
      suggestionType: ""
    }
  ]);

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
  /*
  // Function to fetch languages from the API
  const fetchLanguages = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1:8000/get_languages');
      if (!response.ok) {
        throw new Error('Failed to fetch languages');
      }

      const data = await response.json();
      const languages = data.languages;  // Assuming the response contains a 'languages' field
      alert(languages)
      const languageOptions = languages.map((lang: string) => ({
        value: lang.toLowerCase(),
        label: lang,
      }));

      setAvailableTranslationLanguages(languageOptions);
    } catch (error) {
      console.error('Error fetching languages:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch languages when the component mounts
  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);
  */
  /*
  const onSubmit = useCallback(async (data: TranslationFormType) => {
    console.log("Translate button is hit")
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
  */
  const onSubmit = useCallback(async (data: TranslationFormType) => {
    console.log("Translate button is hit");
    try {
      setIsLoading(true);
      // Fetch source article from the API
      // alert(data.sourceArticleUrl)
      // alert(`URL : http://127.0.0.1:8000/get_article?url=${data.sourceArticleUrl}`)
      const response = await fetch(`http://127.0.0.1:8000/get_article?url=${data.sourceArticleUrl}`);
      console.log(response);
      // alert(data.sourceArticleUrl)
      
      // Check if the response is ok
      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }
  
      const responseData = await response.json();
      // alert(`Response text: ${responseData.article}`);
      setValue('sourceArticleContent', responseData.article);
      // setValue('sourceArticleContent', responseData.sourceArticle.text);
      // Add the fetched article to the texts array
      setTexts(prevTexts => [
        ...prevTexts,
        {
          editing: responseData.article,  // you can change this to something else if necessary
          reference: responseData.article, // adjust based on your data structure
          suggestedContribution: '',
          suggestionType: 'change',  // Set the type based on your needs (e.g., 'change', 'addition')
        },
      ]);
  
      // Assuming the response contains article languages in a similar format
      // setAvailableTranslationLanguages(
      //   Object.entries(response.data.articleLanguages).map(([key, value]) => ({
      //     value,
      //     label: key,
      //   })))
      // Update available languages after fetching the article
      const languages = responseData.languages; // Assuming the response includes the available languages
      const languageOptions = languages.map((lang: string) => ({
      value: lang.toLowerCase(),
      label: lang,
      }));
      setAvailableTranslationLanguages(languageOptions);
  
    } catch (error) {
      console.log(error);
      // alert("Error fetching article. Please try again.");
      alert(error)
    } finally {
      setIsLoading(false);
    }
  }, [setValue]);
  

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
              <Button 
                disabled={isLoading} 
                type="button" 
                variant="outline" 
                onClick={() => { 
                  console.log("Clear button clicked")
                  setTexts([]) // Clear the texts state
                  form.setValue('sourceArticleContent', '')
                  form.setValue('translatedArticleContent', '')
                }}
              >
                Clear
              </Button>
              <Button disabled={isLoading} variant="default" type="submit">Submit</Button>
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
              name="targetArticleLanguage"
              render={({ field }) => (
                <FormItem className="w-2/5 flex items-center gap-x-4">
                  <FormLabel className="shrink-0">Target Article Language</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                      disabled={isLoading || availableTranslationLanguages.length === 0}
                    >
                      <SelectTrigger className="!mt-0">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTranslationLanguages.map(language => (
                          <SelectItem value={language.value} key={language.value}>
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            {texts.map((text, index) => (
              <div key={index} className={getColorClass(text.suggestionType)}>
                <p className="font-medium">{text.reference}</p>
              </div>
            ))}
          </div>
        
        </form>
      </Form>
    </section>
  )
}

export default TranslationSection
