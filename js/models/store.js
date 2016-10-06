import { observable, action } from "mobx";
import _ from "underscore";
import Item from "./item.js";

class Store {
	@observable items = [];
	@action selectItemById(id) {
		this.items.forEach(item => {
			(id===item.id)?item.select():item.deselect();
		});
	}
	@action addRandomEntry() {
		this.items.push(new Item());
	}
	@action removeLastEntry() {
		if (this.items.length>0) {
			const i = _.findLastIndex(this.items,{isRemoving:false});
			if (i>=0) {
				const item = this.items[i];
				item && item.remove(() => {
					const i = _.findIndex(this.items,{id:item.id});
					(i>=0) && this.items.splice(i,1);
				});
			}
		}
	}
	@action changeRandomEntry() {
		if (this.items.length>0) {
			const item = _.sample(this.items);
			item && item.update();
		}
	}
	@action changeSelectedEntry() {
		if (this.items.length>0) {
			const item = _.find(this.items,{isSelected:true});
			item && item.update();
		}
	}
	@action switchRandomEntryState() {
		if (this.items.length>0) {
			const item = _.sample(this.items);
			item && item.switchState();
		}
	}
}

export default Store;