import React, { Component } from "react";
import { observer } from "mobx-react";

@observer class ControlPanel extends Component {
	render() {
		return (
			<div className="ldt-controls">
				<button className="btn btn-default" onClick={e=>this.props.store.addRandomEntry()}>Add Random Entry</button>
				{" "}
				<button className="btn btn-default" onClick={e=>this.props.store.removeLastEntry()}>Remove Last Entry</button>
				{" "}
				<button className="btn btn-default" onClick={e=>this.props.store.changeRandomEntry()}>Change Random Entry</button>
				{" "}
				<button className="btn btn-default" onClick={e=>this.props.store.changeSelectedEntry()}>Change Selected Entry</button>
				{" "}
				<button className="btn btn-default" onClick={e=>this.props.store.switchRandomEntryState()}>Switch Random Entry State</button>
			</div>
		);
	}
}

export default ControlPanel;