import { FetchArticleRequest } from '@/models/apis/FetchArticleRequest'
import { axiosInstance } from '@/services/axios'
import { FetchArticleResponse } from '@/models/apis/FetchArticleResponse'
import { AxiosResponse } from 'axios'

export function fetchArticle(body: FetchArticleRequest): Promise<AxiosResponse<FetchArticleResponse>> {
  return axiosInstance.post<FetchArticleResponse, any, FetchArticleRequest>(
    'translate/sourceArticle',
    body,
  )
}