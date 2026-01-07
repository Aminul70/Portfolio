import React, { useEffect, useState, createContext, useContext } from 'react';
import { PortfolioContent } from '../types/content';
import { getContent, saveContent, resetContent as resetContentStore } from './contentStore';
interface ContentContextType {
  content: PortfolioContent;
  updateContent: (updates: Partial<PortfolioContent>) => void;
  resetContent: () => void;
}
const ContentContext = createContext<ContentContextType | undefined>(undefined);
export function ContentProvider({
  children
}: {
  children: ReactNode;
}) {
  const [content, setContent] = useState<PortfolioContent>(() => getContent());
  useEffect(() => {
    setContent(getContent());
  }, []);
  const updateContent = (updates: Partial<PortfolioContent>) => {
    const newContent = {
      ...content,
      ...updates
    };
    setContent(newContent);
    saveContent(newContent);
  };
  const reset = () => {
    const defaultContent = getContent();
    setContent(defaultContent);
    resetContentStore();
  };
  const contextValue = {
    content,
    updateContent,
    resetContent: reset
  };
  return <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>;
}
export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
}