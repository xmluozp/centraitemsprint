import styled from "styled-components"

const scom = (com) => styled(com)`
	/* css here */
	&>label {
		cursor: pointer;

		padding-top: 5px;
		padding-bottom: 5px;
	}
	.form-check-input {
		top: 6px;
	}
	&:hover {
		background-color: var(--light);
	}
`

export default scom
