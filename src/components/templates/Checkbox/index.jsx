import React, { useRef, useEffect } from 'react'
import cn from 'classnames'

// styles
import style from './style'

/**
 * Checkbox wrapper
 */
export default style(({ id, onChange = () => {}, checked, label = '', style, indeterminate = false, className, disabled, ...rest }) => {
	useEffect(() => {
		inputEl.current.indeterminate = indeterminate
	}, [indeterminate])

	const inputEl = useRef(null)
	return <input id={id} type="checkbox" className="form-check-input" ref={inputEl} onChange={onChange} checked={checked} disabled={disabled} />
})
