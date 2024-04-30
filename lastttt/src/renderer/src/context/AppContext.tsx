import { createContext, ReactNode, useContext } from 'react'
import { TranslationTool } from '@/models/enums/TranslationTool'

type AppContextType = {
  translationTool: TranslationTool;
  APIKey: string;
  sourceArticleURL: string;
  targetArticleLanguage: string;
};

const APP_CONTEXT_DEFAULT_VALUES: AppContextType = {
  translationTool: TranslationTool.DEEPL,
  APIKey: '',
  sourceArticleURL: '',
  targetArticleLanguage: 'English'
}
export const AppContext = createContext<AppContextType>(
  APP_CONTEXT_DEFAULT_VALUES
)

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider = (props: AppContextProviderProps) => {
  const { children } = props

  return (
    <AppContext.Provider
      value={{
        APIKey: '',
        sourceArticleURL: '',
        targetArticleLanguage: '',
        translationTool: TranslationTool.GOOGLE
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
