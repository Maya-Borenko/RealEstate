export interface NavigationItem {
  topic: string;
  type: string,
  url: string;
}

export const dropdownItems: NavigationItem[] = [
  {
    topic: "Проверка недвижимости",
    type: 'article',
    url: '/real-estate-verification'
  },
  {
    topic: "Проверка продавца",
    type: 'article',
    url: '/seller-verification'
  },
  {
    topic: "Чек-лист",
    type: 'article',
    url: '/checklist'
  },
  {
    topic: "Приемка-передача недвижимости",
    type: 'article',
    url: '/reception-transmission'
  },
  {
    topic: "Риски при покупке недвижимости",
    type: 'article',
    url: '/risks'
  },
  {
    topic: "",
    type: 'case_law',
    url: '/judicial-practice'
  }
];

export const getUrlByTopic = (topic: string, type: string): string | null => {
  const item = dropdownItems.find(item => {
    if (type === 'article') {
      return item.type === 'article' && item.topic === topic;
    } else if (type === 'case_law') {
      return item.type === 'case_law' && item.type === type;
    }
    return false;
  });

  return item?.url || null;
};
