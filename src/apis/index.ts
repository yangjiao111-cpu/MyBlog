import { http } from '@/utils/http'

/**
 * 言溪 API 返回数据类型
 */
export interface HitokotoResponse {
  text: string
}

/**
 * 获取随机二次元语录
 * 调用 api.btstu.cn/yan 言溪 API，响应极快
 */
export async function getHitokoto(): Promise<HitokotoResponse> {
  return http.get<HitokotoResponse>('http://api.btstu.cn/yan/api.php', {
    charset: 'utf-8',
    encode: 'json'
  })
}
