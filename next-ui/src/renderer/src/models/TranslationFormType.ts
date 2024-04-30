import {TranslationTool} from "@/models/enums/TranslationTool.ts";

export type TranslationFormType = {
	translationTool: TranslationTool;
	apiKey: string;
	sourceArticleUrl: string;
	targetArticleLanguage: string;
	sourceArticleContent: string;
	translatedArticleContent: string;
}