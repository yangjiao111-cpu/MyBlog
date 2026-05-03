import { http } from '@/utils/http'

/**
 * Ecylt Hitokoto API 返回数据格式
 */
export interface HitokotoResponse {
  id: number
  content: string
  source: string
  category: string
}

/**
 * 获取随机二次元语录
 * 调用 hitokoto-api.ecylt.com 一言 API
 */
export async function getHitokoto(): Promise<HitokotoResponse> {
  return http.get<HitokotoResponse>('https://hitokoto-api.ecylt.com/api/hitokoto')
}
