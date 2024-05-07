import { FetchArticleRequest } from '@/models/FetchArticleRequest'
import { axiosInstance } from '@/services/axios'
import { FetchArticleResponse } from '@/models/enums/FetchArticleResponse'
import { AxiosResponse } from 'axios'

export function fetchArticle(body: FetchArticleRequest): Promise<AxiosResponse<FetchArticleResponse>> {
  return axiosInstance.post<FetchArticleResponse, any, FetchArticleRequest>(
    'translate/sourceArticle',
    body,
  )
}