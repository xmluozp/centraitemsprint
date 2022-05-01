import React, { useState, useRef, useEffect } from 'react'
import _ from 'lodash'
import cn from 'classnames'

import Checkbox from '../Checkbox'
import api from '../../../api/api'

// styles
import style from './style'

const PrintList = ({ className }) => {
	const ref = useRef(null)

	const [leftItems, setLeftItems] = useState([])
	const [rightItems, setRightItems] = useState([])
	const [selectedLeft, setSelectedLeft] = useState('')
	const [checked, setChecked] = useState({})
	const [printed, setPrinted] = useState({})

	const ifCheckAll = () => rightItems?.every(({ Item }) => checked?.[selectedLeft]?.[Item] === true)
	const ifCheckSome = () => !ifCheckAll() && rightItems?.some(({ Item }) => checked?.[selectedLeft]?.[Item] === true)
	const ifCheck = (Item) => checked?.[selectedLeft]?.[Item] === true

	useEffect(() => {
		init()
	}, [])

	const handleItemSelect = (num) => {
		setSelectedLeft(num)
	}

	const handleCheckAll = () => {
		setChecked((prev) => {
			const v = _.cloneDeep(prev)
			if (ifCheckAll()) {
				rightItems?.map(({ Item }) => {
					_.set(v, `${selectedLeft}.${Item}`, false)
				})
			} else {
				rightItems?.map(({ Item }) => {
					_.set(v, `${selectedLeft}.${Item}`, true)
				})
			}
			return v
		})
	}

	const handleCheck = (Item) => {
		setChecked((prev) => {
			const v = _.cloneDeep(prev)
			if (!_.get(v, `${selectedLeft}.${Item}`)) {
				_.set(v, `${selectedLeft}.${Item}`, true)
			} else {
				_.set(v, `${selectedLeft}.${Item}`, false)
			}
			return v
		})
	}

	const init = async () => {
		const resLeft = await api.getLeft()
		const resRight = await api.getRight()
		setLeftItems(resLeft)
		setRightItems(resRight)
	}

	const doPrint = async () => {
		const wantToPrint = checked
		setPrinted(checked)
		alert('send print')
	}

	return (
		<div className={cn(className, 'container-fluid', 'no-gutters', 'p-0', 'm-0')}>
			{/* <div className={cn('header')}>Header</div> */}
			<div className={cn('main', 'row', 'no-gutters', 'p-0', 'm-0')}>
				<div className={cn('leftItems', 'col-3')}>
					<div className={cn('titleRow')}>Work Orders List</div>
					<div className={cn('itemRow')}>
						<ul>
							{leftItems?.map((number, i) => {
								const active = selectedLeft === number ? 'active' : ''               
								return (
									<li className={cn('btn-toolbar justify-content-between', active)} key={number + '' + i} onClick={() => handleItemSelect(number)}>
										<span>
											<b>#</b> {number}
										</span>
										<span>1/30</span>
									</li>
								)
							})}
						</ul>
					</div>
					<div className={cn('countRow')}>
						<div className="ml-2">{leftItems.length} entries</div>
					</div>
				</div>
				<div className={cn('rightItems', 'col-9 m-0 p-0')}>
					{!!selectedLeft && (
						<>
							<div className={cn('titleRow')}>Work Items List</div>
							<div className={cn('tableRow')}>
								<table className="table table-hover table-striped p-0 m-0">
									<thead>
										<tr>
											<td>
												<Checkbox onChange={handleCheckAll} indeterminate={ifCheckSome()} checked={ifCheckAll()} />
											</td>
											<td>11</td>
											<td>Item</td>
											<td>System Code</td>
											<td>Description</td>
											<td>Quality</td>
                      <td></td>
										</tr>
									</thead>
									<tbody>
										{rightItems?.map(({ Description, Item, Quantity, Status, System_1 }, i) => {
                      const printedTag = printed?.[selectedLeft]?.[Item] === true ? 'printed' : ''
    									return (
												<tr key={Item + '' + i} onClick={() => handleCheck(Item)}>
													<td>
														<input type="checkbox" className="form-check-input" checked={ifCheck(Item)} />
													</td>
													<td>{Description}</td>
													<td>{Item}</td>
													<td>{Quantity}</td>
													<td>{Status}</td>
													<td>{System_1}</td>
                          <td>{printedTag}</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
							<div className={cn('btn-toolbar justify-content-between', 'buttonRow')}>
								<div className="ml-2">{rightItems.length} entries</div>
								<div>
									<button className="btn btn-secondary me-1" onClick={() => setPrinted({})}>
										Clear Printed List
									</button>
									<button className="btn btn-primary" onClick={doPrint}>
										Print Selected
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default style(PrintList)
