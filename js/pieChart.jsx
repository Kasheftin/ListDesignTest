import React, { Component } from "react";
import { observable, reaction, computed, transaction } from "mobx";
import { observer } from "mobx-react";
import classNames from "classnames";
import Chart from "chart.js";
import raf from "raf";

@observer class PieChart extends Component {
	@observable successCnt = 0;
	@observable failCnt = 0;
	@observable perc = 0;
	calcPerc(v1,v2) {
		return (v1+v2>0)?Math.round(v1/(v1+v2)*100):0;
	}
	constructor(props) {
		super(props);
		this.percReaction = reaction(
			() => [this.props.f.successCnt,this.props.f.failCnt],
			stat => {
				this.animateTo(stat[0],stat[1]);
			},
			true
		);
	}
	animateTo(successCnt,failCnt) {
		this._animTimeout && raf.cancel(this._animTimeout);
		const perc = this.calcPerc(successCnt,failCnt);
		const animStart = (new Date).getTime();
		const startSuccessCnt = this.successCnt;
		const startFailCnt = this.failCnt;
		const startPerc = this.perc;
		const duration = 500;
		const run = () => {
			let d = ((new Date).getTime()-animStart)/duration;
			d = Math.max(0,Math.min(1,d));
			d = d<0.5?2*d*d:-1+(4-2*d)*d;
			transaction(() => {
				this.successCnt = Math.round(startSuccessCnt+(successCnt-startSuccessCnt)*d);
				this.failCnt = Math.round(startFailCnt+(failCnt-startFailCnt)*d);
				this.perc = Math.round(startPerc+(perc-startPerc)*d);
				this.updatePie();
			});
			if (d<1) this._animTimeout = raf(run);
		}
		run();
	}
	updatePie() {
		if (!this.pieChart) return;
		this.pieChart.data.labels = [this.successCnt,this.failCnt];
		this.pieChart.data.datasets[0].data = [this.perc,100-this.perc];
		this.pieChart.update();
	}
	componentDidMount() {
		this.pieChart = new Chart(this.pieDomNode,{
			type: "pie",
			data: {
				labels: [
					this.successCnt,
					this.failCnt
				],
				datasets: [{
					data: [this.perc,100-this.perc],
					backgroundColor: [
						"#72ac4d",
						"#eb7d3b"
					],
					hoverBackgroundColor: [
						"#72ac4d",
						"#eb7d3b"
					]
				}]
			},
			options: {
				legend: {
					display: false
				},
				tooltipTemplate: (d)=>d.label
			}
		});
	}
	render() {
		return (
			<div className="ldt-piechart">
				<div className="ldt-piechart__pie">
					<canvas className="ldt-piechart__pie-canvas" width="100" height="100" ref={(domNode)=>{this.pieDomNode=domNode;}} />
				</div>
				<div className="ldt-piechart__description">
					<div className="ldt-piechart__description-perc">{this.perc+"%"}</div>
					<div className="ldt-piechart__description-sub">tests passed</div>
				</div>
			</div>
		);
	}
}

export default PieChart;