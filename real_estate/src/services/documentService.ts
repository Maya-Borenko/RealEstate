import api from '@/services/api'

interface Document {
  document_id: number
  documentType: String
  title: String
  content: String
  description: String
  topic: String
  createdAt: String

}

export const DocumentService = {
  async fetchDocument(id: String): Promise<Document> {
    try {
      const response = await api.get(`/documents/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async fetchSearchDocument(query: String): Promise<Document> {
    try {
      const response = await api.get(`/documents/search/?query=${query}`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  async fetchMultipleDocuments(): Promise<Document[]> {
    try {
      const response = await api.get('/documents')
      return response.data
    } catch (error) {
      throw error
    }
  },
  async fetchDocumentsTopic(topic: String): Promise<Document> {
    try {
      const response = await api.get(`/documents/topic/${topic}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export interface DocumentsImages {
  document: string;
  image: string;
}

export const documentIcons: DocumentsImages[] = [
  {
    document: "ДВОЙНАЯ ПРОДАЖА",
    image: '/images/«ДВОЙНАЯ ПРОДАЖА» квартир.png'
  },
  {
    document: "Чек-лист для покупки недвижимости",
    image: '/images/Чек-лист для покупки недвижимости.png'
  },
  {
    document: "Защита прав покупателя недвижимости: основные риски и способы решения проблем",
    image: '/images/ProtectionRightsRisks.png'
  },
  {
    document: "Как проверить юридическую чистоту недвижимости",
    image: 'https://res.cloudinary.com/dyd80tbqm/image/upload/v1753188255/kak_proverit_urid_chistotu_gsvwit.png'
  },
  {
    document: "ПЕРЕХОД ДОЛГОВ К НОВЫМ ВЛАДЕЛЬЦАМ",
    image: 'images/ПЕРЕХОД ДОЛГОВ К НОВЫМ ВЛАДЕЛЬЦАМ.png'
  },
  {
    document: "Прием-передача недвижимости: как всё сделать правильно",
    image: 'images/Прием-передача недвижимости как всё сделать правильно.png'
  }
];

export const getImage = (document: string): string | '' => {
  const item = documentIcons.find(item => item.document === document);
  return item?.image || '';
};