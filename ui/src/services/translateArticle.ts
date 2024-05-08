import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/services/axios'
import { TranslateArticleRequest } from '@/models/apis/TranslateArticleRequest'
import { TranslateArticleResponse } from '@/models/apis/TranslateArticleResponse'

export function translateArticle(body: TranslateArticleRequest): Promise<AxiosResponse<TranslateArticleResponse>> {
  return axiosInstance.post<TranslateArticleResponse, any, TranslateArticleRequest>(
    'translate/targetArticle',
    body,
  )
}