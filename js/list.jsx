import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import Row from "./presentational/row.jsx";

@observer class List extends Component {
	selectItem(item) {
		this.props.store.selectItemById(item.id);
	}
	render() {
		return (
			<div className="ldt-list">
				<div className="ldt-entry -header">
					<div className="ldt-row">
						<div className="ldt-row__cell -name">Changelist / Build</div>
						<div className="ldt-row__cell -owner">Owner</div>
						<div className="ldt-row__cell -time">Time Started</div>
						<div className="ldt-row__cell -state">State</div>
						<div className="ldt-row__cell -percent -metrics">Metrics</div>
						<div className="ldt-row__cell -percent -build">Build</div>
						<div className="ldt-row__cell -percent -unit-test">Unit Test</div>
						<div className="ldt-row__cell -percent -functional-test">Functional Test</div>
					</div>
				</div>
				<div className="ldt-list__rows">
					{this.props.store.items.map(item=>(
						<Row key={item.id} item={item} click={e=>this.selectItem(item)} />
					))}
				</div>
			</div>
		);
	}
}

export default List;