import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import _ from "underscore";
import Item from "./item.jsx";

@observer class DataProvider extends Component {
	addRandomEntry() {
		this.props.items.push(new Item());
	}
	removeLastEntry() {
		if (this.props.items.length>0) {
			const i = _.findLastIndex(this.props.items,{isRemoving:false});
			if (i>=0) {
				const item = this.props.items[i];
				item && item.remove(() => {
					const i = _.findIndex(this.props.items,{id:item.id});
					(i>=0) && this.props.items.splice(i,1);
				});
			}
		}
	}
	changeRandomEntry() {
		if (this.props.items.length>0) {
			const item = _.sample(this.props.items);
			item && item.update();
		}
	}
	changeSelectedEntry() {
		if (this.props.items.length>0) {
			const item = _.find(this.props.items,{isSelected:true});
			item && item.update();
		}
	}
	switchRandomEntryState() {
		if (this.props.items.length>0) {
			const item = _.sample(this.props.items);
			item && item.switchState();
		}
	}
	render() {
		return (
			<div className="ldt-controls">
				<button className="btn btn-default" onClick={e=>this.addRandomEntry()}>Add Random Entry</button>
				{" "}
				<button className="btn btn-default" onClick={e=>this.removeLastEntry()}>Remove Last Entry</button>
				{" "}
				<button className="btn btn-default" onClick={e=>this.changeRandomEntry()}>Change Random Entry</button>
				{" "}
				<button className="btn btn-default" onClick={e=>this.changeSelectedEntry()}>Change Selected Entry</button>
				{" "}
				<button className="btn btn-default" onClick={e=>this.switchRandomEntryState()}>Switch Random Entry State</button>
			</div>
		);
	}
}

export default DataProvider;