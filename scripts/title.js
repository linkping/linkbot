import axios from 'axios'

const titleRegex = /<title(?: [^>]+)?>([^<]+)<\/title>/i

const getTitle = async (url) => {
  const res = await axios.get(url)
  const match = titleRegex.exec(res.data)
  return match && match[1]
}

export default getTitle
