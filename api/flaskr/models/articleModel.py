class ArticleModel:
    def __init__(self, articleUrl, originalArticle):
        self.articleUrl=articleUrl
        self.originalArticle=originalArticle

    def get_article_url(self):
        return self.articleUrl

    def set_article_url(self, articleUrl):
        self.articleUrl = articleUrl
    
    def get_original_article(self):
        return self.originalArticle

    def set_original_article(self, originalArticle):
        self.originalArticle = originalArticle
    
    def __str__(self):
        return f"Article URL: {self.articleUrl}\nOriginal Article: {self.originalArticle}"
