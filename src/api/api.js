import axios from 'axios'
import { convertXML } from 'simple-xml-to-json'

const SERVER = 'data.svc'
const token = ''

const request = axios.create({
	baseURL: SERVER,
	headers: { Authorization: `Bearer ${token}` },
})

export default {
	async getLeft() {
		// const response = await request.get(`/`);

    // test data
		const res = await axios.get('/leftitems.json')
		return res?.data
	},

	async getRight(WorkOrderNumber) {

    // real data
		try {
			const response = await request.get(`/GetWorkItemListFromWorkOrderNumber?WorkOrderNumber=${WorkOrderNumber}`)
			console.log(response)
		} catch (error) {
			console.log(error)
		}

    // test data
		const res = await axios.get('/rightitems.xml')
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
	},
}
