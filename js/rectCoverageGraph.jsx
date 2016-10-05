import React, { Component } from "react";
import { observable, reaction } from "mobx";
import { observer } from "mobx-react";
import classNames from "classnames";

@observer class RectCoverageGraph extends Component {
	@observable perc = 0;
	constructor(props) {
		super(props);
		this.percReaction = reaction(
			() => [this.props.f.covered],
			stat => {
				this.animateTo(stat[0]);
			},
			true
		);
	}
	animateTo(perc) {
		this._animTimeout && cancelAnimationFrame(this._animTimeout);
		const animStart = (new Date).getTime();
		const startPerc = this.perc;
		const duration = 500;
		const run = () => {
			let d = ((new Date).getTime()-animStart)/duration;
			d = Math.max(0,Math.min(1,d));
			d = d<0.5?2*d*d:-1+(4-2*d)*d;
			this.perc = Math.round(startPerc+(perc-startPerc)*d);
			if (d<1) this._animTimeout = requestAnimationFrame(run);
		}
		run();
	}
	render() {
		return (
			<div className="ldt-rgraph -coverage">
				<div className="ldt-rgraph-inner -success" style={{width:this.perc+"%"}}></div>
				<div className="ldt-rgraph__description">
					<div className="ldt-rgraph__description-perc">{this.perc+"%"}</div>
					<div className="ldt-rgraph__description-sub">code covered</div>
				</div>
			</div>
		);
	}
}

export default RectCoverageGraph;