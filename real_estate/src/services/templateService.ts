import api from '@/services/api'

export const TemplateService = {
  async downloadTemplate(id: string): Promise<void> {
    try {
      const response = await fetch(`${api.defaults.baseURL}/documents/${id}/file`, {
        method: 'GET',
        headers: {},
        mode: 'cors'
      })

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const contentDisposition = response.headers.get('Content-Disposition')
      const fileName = contentDisposition?.split('filename=')[1]?.replace(/["']/g, '') || 'template.docx'

      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.error('Ошибка при скачивании шаблона:', error)
      throw error
    }
  }
}
