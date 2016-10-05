import { observable, computed, action, reaction, transaction } from "mobx";
import _ from "underscore";

class Item {
	types = ["firewall","build"];
	states = {
		firewall: ["accepted","rejected"],
		build: ["succeed","fail"]
	};
	names = {
		firewall: [""],
		build: ["Tenrox-R1_","Tenrox-R2_"]
	};
	owners = ["jtuck","samy"];

	id = Math.random();
	statFields = ["m","b","u","f"];
	anim = 500;
	@observable type;
	@observable owner;
	@observable started_at;
	@observable state;
	@observable name;
	@observable isCreating = false;
	@observable isUpdating = false;
	@observable isRemoving = false;
	@observable isSelected = false;
	@observable isSelectCreating = false;
	@observable isSelectRemoving = false;
	@observable stat;
	@observable result1;
	@observable result2;
	@observable resultBtn;

	constructor(callback) {
		this.isCreating = true;

		const stats = {};
		this.statFields.forEach(f => {
			stats[f] = {successCnt:observable(0),failCnt:observable(0),isOk:observable(false),covered:observable(0)};
		});
		this.stat = observable(stats);

		this.substituteRandomData();
		this._creatingTimeout && clearTimeout(this._creatingTimeout);
		this._creatingTimeout = _.delay(() => {
			this.isCreating = false;
			callback && callback();
		},this.anim);
	}

	@action update(callback) {
		this.isUpdating = true;
		this.substituteRandomData();
		this._updatingTimeout && clearTimeout(this._updatingTimeout);
		this._updatingTimeout = _.delay(() => {
			this.isUpdating = false;
			callback && callback();
		},this.anim);
	}

	@action remove(callback) {
		this.isRemoving = true;
		this._removingTimeout && clearTimeout(this._removingTimeout);
		this._removingTimeout = _.delay(callback,this.anim);
	}

	@action switchState(callback) {
		this.isUpdating = true;
		this.state = _.sample(_.without(this.states[this.type],this.state));
		this._updatingTimeout && clearTimeout(this._updatingTimeout);
		this._updatingTimeout = _.delay(() => {
			this.isUpdating = false;
			callback && callback();
		},this.anim);
	}

	@action select(callback) {
		if (this.isSelected) return;
		this.isSelectCreating = true;
		this.isSelected = true;
		this._selectCreatingTimeout && clearTimeout(this._selectCreatingTimeout);
		this._selectCreatingTimeout = _.delay(() => {
			this.isSelectCreating = false;
			callback && callback;
		},this.anim);
	}

	@action deselect(callback) {
		if (!this.isSelected) return;
		this.isSelectRemoving = true;
		this._selectRemovingTimeout && clearTimeout(this._selectRemovingTimeout);
		this._selectRemovingTimeout = _.delay(() => {
			this.isSelected = false;
			this.isSelectRemoving = false;
			callback && callback();
		},this.anim);
	}

	@action substituteRandomData() {
		this.type = _.sample(this.types);
		this.owner = _.sample(this.owners);
		this.started_at = Math.floor(Math.random()*(new Date).getTime());
		this.state = _.sample(this.states[this.type]);
		this.name = _.sample(this.names[this.type])+Math.floor(Math.random()*10000);

		this.result1 = this.state=="accepted"||this.state=="succeed"?"Change Accepted":"Change Rejected";
		this.result2 = this.state=="accepted"||this.state=="succeed"?"Auto-Merged":"Metrics Reduction";
		this.resultBtn = this.state=="accepted"||this.state=="succeed"?"Merged Build":"Find Issues";

		this.statFields.forEach(f => {
			transaction(() => {
				this.stat[f].successCnt = 0;
				this.stat[f].failCnt = 0;
				this.stat[f].covered = 0;
			});
		});

		_.delay(() => {
			this.statFields.forEach(f => {
				transaction(() => {
					this.stat[f].successCnt = Math.round(Math.random()*10000);
					this.stat[f].failCnt = Math.round(Math.random()*10000);
					this.stat[f].covered = Math.round(Math.random()*100);
					this.stat[f].isOk = this.stat[f].successCnt+this.stat[f].failCnt>0?(Math.random()<this.stat[f].successCnt/(this.stat[f].successCnt+this.stat[f].failCnt)):0;
				});
			});
		},this.anim);
	}
}

export default Item;