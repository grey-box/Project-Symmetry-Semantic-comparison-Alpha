class RequestModel:
    def __init__(
        self,
        sourceArticleUrl: str,
        targetArticleLanguage: str,
        translationTool: str,
        deepLApiKey: str,
    ):
        self._sourceArticleUrl = sourceArticleUrl
        self._targetArticleLanguage = targetArticleLanguage
        self._translationTool = translationTool
        self._deepLApiKey = deepLApiKey

    def get_sourceArticleUrl(self) -> str:
        return self._sourceArticleUrl

    def set_sourceArticleUrl(self, value: str):
        self._sourceArticleUrl = value

    def get_targetArticleLanguage(self) -> str:
        return self._targetArticleLanguage

    def set_targetArticleLanguage(self, value: str):
        self._targetArticleLanguage = value

    def get_translationTool(self) -> str:
        return self._translationTool

    def set_translationTool(self, value: str):
        self._translationTool = value

    def get_deepLApiKey(self) -> str:
        return self._deepLApiKey

    def set_deepLApiKey(self, value: str):
        self._deepLApiKey = value

    def __str__(self) -> str:
        return f"RequestModel(sourceArticleUrl={self._sourceArticleUrl}, targetArticleLanguage={self._targetArticleLanguage}, translationTool={self._translationTool}, deepLApiKey={self._deepLApiKey})"

