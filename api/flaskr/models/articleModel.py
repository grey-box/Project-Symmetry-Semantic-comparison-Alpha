class ArticleModel:
    def __init__(self, sourceArticle, targetArticle):
        self.sourceArticle = sourceArticle
        self.targetArticle = targetArticle

    def get_target_article(self):
        return self.targetArticle

    def set_target_article(self, targetArticle):
        self.targetArticle = targetArticle

    def get_source_article(self):
        return self.sourceArticle

    def set_source_article(self, sourceArticle):
        self.sourceArticle = sourceArticle

    def __str__(self) -> str:
        return f"ArticleModel(sourceArticle={self.sourceArticle},targetArticle={self.targetArticle})"

    def toJson(self):
        return {
            "sourceArticle": self.sourceArticle,
            "targetArticle": self.targetArticle
        }
