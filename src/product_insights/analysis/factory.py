"""LangChain chat model factory."""

from langchain_core.language_models.chat_models import BaseChatModel

from product_insights.config import AnalysisConfig


def create_chat_model(config: AnalysisConfig) -> BaseChatModel:
    """Initialize the configured chat model through its provider integration."""
    
    if config.provider == "fake":
        from langchain_core.language_models.fake_chat_models import FakeMessagesListChatModel
        from langchain_core.messages import AIMessage
        return FakeMessagesListChatModel(responses=[AIMessage(content="{}")])
        
    if config.provider in {"google", "google_genai"}:
        try:
            from langchain_google_genai import ChatGoogleGenerativeAI
        except ImportError:
            raise ImportError("langchain-google-genai is required for the google provider.")
        return ChatGoogleGenerativeAI(
            model=config.model,
            temperature=config.temperature,
            max_retries=3,
            timeout=60.0
        )
        
    if config.provider == "anthropic":
        try:
            from langchain_anthropic import ChatAnthropic
        except ImportError:
            raise ImportError("langchain-anthropic is required for the anthropic provider.")
        return ChatAnthropic(
            model=config.model,
            temperature=config.temperature,
            max_retries=3,
            timeout=60.0
        )
        
    if config.provider == "openai":
        try:
            from langchain_openai import ChatOpenAI
        except ImportError:
            raise ImportError("langchain-openai is required for the openai provider.")
        return ChatOpenAI(
            model=config.model,
            temperature=config.temperature,
            max_retries=3,
            timeout=60.0
        )
        
    if config.provider == "groq":
        try:
            from langchain_groq import ChatGroq
        except ImportError:
            raise ImportError("langchain-groq is required for the groq provider.")
        return ChatGroq(
            model=config.model,
            temperature=config.temperature,
            max_retries=3,
            timeout=60.0
        )
        
    raise ValueError(f"Unsupported model provider: {config.provider}")
