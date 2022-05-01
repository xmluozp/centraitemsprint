import axios from 'axios'
import { convertXML } from 'simple-xml-to-json'

const SERVER = '/'
const token = ''

const request = axios.create({
	baseURL: SERVER,
	headers: { Authorization: `Bearer ${token}` },
})

export default {
	async getLeft() {
		// const response = await request.get(`/`);
    const res = await request.get(`data.svc/GetOrderNumber`)
    const rawJson = convertXML(res?.data)

    // parse xml to object
    rawJson?.ArrayOfWorkOrder?.children?.map(({ WorkOrder }) => {
      const params = WorkOrder?.children
      const item = {}
      // {WorkOrderNumber, NumberOfWindows}
      params.map((paramObj) => {
        const key = Object.keys(paramObj)?.[0]
        const value = paramObj[key]?.content
        item[key] = value
      })
      returnJson.push(item)
    })  

		// test data
		// const res = await axios.get('/leftitems.json')
		return res?.data
	},

	async getRight(WorkOrderNumber) {
		// real data
		try {
			const res = await request.get(`data.svc/GetWorkItemListFromWorkOrderNumber?WorkOrderNumber=${WorkOrderNumber}`)
			// test data
			// const res = await axios.get('/rightitems.xml')
			const rawJson = convertXML(res?.data)

			const returnJson = []

			// parse xml to object
			rawJson?.ArrayOfWorkItem?.children?.map(({ WorkItem }) => {
				const params = WorkItem?.children
				const item = {}
				params.map((paramObj) => {
					const key = Object.keys(paramObj)?.[0]
					const value = paramObj[key]?.content
					item[key] = value
				})
				returnJson.push(item)
			})

			return returnJson
		} catch (error) {
			console.log(error)
		}
	},
}
