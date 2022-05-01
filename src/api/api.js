import axios from "axios";
import { convertXML } from 'simple-xml-to-json'

const SERVER = "/";

const request = axios.create({
  baseURL: SERVER,
  headers: {},
});

export default {

  async getLeft() {
    // const response = await request.get(`/`);
    const res = await axios.get("/leftitems.json")
    return res?.data

  },
  async getRight() {
    // const response = await request.get(`/`);
    const res = await axios.get("/rightitems.xml")
    const rawJson = convertXML(res?.data)

    const returnJson = []

    // parse xml to object
    rawJson?.ArrayOfWorkItem?.children?.map(({WorkItem}) => {
      const params = WorkItem?.children
      const item = {}
      params.map(paramObj => {
        const key = Object.keys(paramObj)?.[0]
        const value = paramObj[key]?.content
        item[key] = value
      })
      returnJson.push(item)
    })

    return returnJson
  }
}