class ArticleModel:
    def __init__(self, sourceArticle, targetArticle, articleLanguages):
        self.sourceArticle = sourceArticle
        self.targetArticle = targetArticle
        self.articleLanguages = articleLanguages

    def get_target_article(self):
        return self.targetArticle

    def set_target_article(self, targetArticle):
        self.targetArticle = targetArticle

    def get_source_article(self):
        return self.sourceArticle

    def set_source_article(self, sourceArticle):
        self.sourceArticle = sourceArticle

    def get_article_languages(self):
        return self.articleLanguages

    def set_article_languages(self, articleLanguages):
        self.articleLanguages = articleLanguages

    def __str__(self) -> str:
        return f"ArticleModel(sourceArticle={self.sourceArticle},targetArticle={self.targetArticle},articleLanguages={self.articleLanguages})"

    def toJson(self):
        return {
            "sourceArticle": self.sourceArticle,
            "targetArticle": self.targetArticle,
            "articleLanguages": self.articleLanguages,
        }
