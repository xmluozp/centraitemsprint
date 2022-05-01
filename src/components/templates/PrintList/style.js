import styled from 'styled-components'

const scom = (com) => styled(com)`
	/* css here */
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	height: 100%;
	.header {
		height: 50px;
		border-bottom: 1px solid var(--bs-gray-300);
	}

	.main {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		height: 0px;

		.titleRow {
			height: 50px;
			line-height: 50px;
			border-bottom: 1px solid var(--bs-gray-300);
			font-size: 1.1rem;
			text-align: center;
		}

		.leftItems {
			display: flex;
			flex-direction: column;
			height: 100%;
			padding: 0px;
			margin: 0px;
			border-right: 4px solid var(--bs-gray-300);

			.itemRow {
				overflow-y: scroll;
				height: 0px;
				display: flex;
				flex-grow: 1;
				border-bottom: 1px solid var(--bs-gray-300);
				ul {
					padding: 0px;
					margin: 0px;
					width: 100%;
					li {
						padding: 0px 20px;
						margin: 0px;
						text-align: left;
						border-bottom: 1px solid var(--bs-gray-300);
						line-height: 35px;
						cursor: pointer;

						&:hover {
							background-color: var(--bs-gray-100);
						}
					}

					li.active {
						background-color: var(--bs-info);
					}
				}
			}

			.countRow {
				height: 40px;
				line-height: 40px;
				padding: 5px;
				padding-left:20px;
				box-sizing: content-box;
			}
		}

		.rightItems {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			.tableRow {
				display: flex;
				overflow-y: scroll;
				height: 100px;
				flex-grow: 1;
				border-bottom: 1px solid var(--bs-gray-300);

				tr {
					cursor: pointer;
				}
			}
			.buttonRow {
				height: 40px;
				line-height: 40px;
				padding: 5px;
				padding-left:10px;
				box-sizing: content-box;
			}
		}
	}
`
export default scom
