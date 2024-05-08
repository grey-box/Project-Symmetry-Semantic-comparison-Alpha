import { FetchArticleResponse } from '@/models/apis/FetchArticleResponse'

export type TranslateArticleResponse = Pick<FetchArticleResponse, 'sourceArticle'>;