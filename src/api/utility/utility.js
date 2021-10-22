import axios from 'axios'

// 今日头条数据
export function headLineData() {
  return axios.get('/headline/api/news/feed/v51/')
}
