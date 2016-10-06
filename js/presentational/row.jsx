import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import moment from "moment";
import classNames from "classnames";
import RectGraph from "./rectGraph.jsx";
import RectCoverageGraph from "./rectCoverageGraph.jsx";
import PieChart from "./pieChart.jsx";
import ArrowSymbol from "./arrowSymbol.jsx";

@observer class Row extends Component {
	openPopup(type) {
		alert(type);
	}
	render() {
		const {item} = this.props;
		return (
			<div className={classNames("ldt-entry","-"+item.state,{"-creating":item.isCreating,"-updating":item.isUpdating,"-removing":item.isRemoving,"-clickable":!item.isSelected,"-selected":item.isSelected})} onClick={this.props.click}>
				<div className="ldt-row">
					<div className="ldt-row__cell -name">
						<span className={classNames("ldt-row__cell-icon","-"+item.state,"-"+item.type)} />
						{item.name}
					</div>
					<div className="ldt-row__cell -owner">{item.owner}</div>
					<div className="ldt-row__cell -time">{moment(item.started_at).format("M/D/YYYY hh:mma")}</div>
					<div className="ldt-row__cell -state">{item.state}</div>
					<div className="ldt-row__cell -percent -metrics">
						<RectGraph f={item.stat.m} />
					</div>
					<div className="ldt-row__cell -percent -build">
						<RectGraph f={item.stat.b} />
					</div>
					<div className="ldt-row__cell -percent -unit-test">
						<RectGraph f={item.stat.u} />
					</div>
					<div className="ldt-row__cell -percent -functional-test">
						<RectGraph f={item.stat.f} />
					</div>
				</div>
				{item.isSelected?(
					<div className={classNames("ldt-item",{"-creating":item.isSelectCreating,"-removing":item.isSelectRemoving})}>
						<a href="#" className={classNames("ldt-item__sq",{"-success":item.stat.m.isOk,"-fail":!item.stat.m.isOk})} onClick={e=>this.openPopup("Metrics")}>
							<div className="ldt-item__sq-title">Metrics</div>
							<div className="ldt-item__sq-metrics">
								<ArrowSymbol f={item.stat.m} arrow="-green -up" description="Test" />
								<ArrowSymbol f={item.stat.m} arrow="-green -up" description="Maintainability" />
								<ArrowSymbol f={item.stat.m} arrow="-yellow -right" description="Security" />
								<ArrowSymbol f={item.stat.m} arrow="-yellow -right" description="Workmanship" />
							</div>
						</a>
						<div className={classNames("ldt-item__sq",{"-success":item.stat.b.isOk,"-fail":!item.stat.b.isOk})}>
							<div className="ldt-item__sq-title">Build</div>
							<div className="ldt-item__sq-build">
								<a href="#" className="ldt-item__sq-build-entry" onClick={e=>this.openPopup("Debug build")}>Debug</a>
								<a href="#" className="ldt-item__sq-build-entry" onClick={e=>this.openPopup("Release build")}>Release</a>
							</div>
							<div className="ldt-item__sq-build-bottom">{moment(item.started_at).format("hh:mma M/D/YYYY")}</div>
						</div>
						<a href="#" className={classNames("ldt-item__sq",{"-success":item.stat.u.isOk,"-fail":!item.stat.u.isOk})} onClick={e=>this.openPopup("Unit Test")}>
							<div className="ldt-item__sq-title">Unit Test</div>
							<PieChart f={item.stat.u} />
							<RectCoverageGraph f={item.stat.u} />
						</a>
						<a href="#" className={classNames("ldt-item__sq",{"-success":item.stat.f.isOk,"-fail":!item.stat.f.isOk})} onClick={e=>this.openPopup("Functional Test")}>
							<div className="ldt-item__sq-title">Functional Test</div>
							<PieChart f={item.stat.f} />
							<RectCoverageGraph f={item.stat.f} />
						</a>
						<div className="ldt-item__sq -text">
							<div className="ldt-item__sq-result">
								<div className="ldt-item__sq-result-note">Result:</div>
								<div className="ldt-item__sq-result-row1">{item.result1}</div>
								<div className="ldt-item__sq-result-row2">{item.result2}</div>
								<div className="ldt-item__sq-result-sub">
									<button className="btn btn-primary ldt-item__sq-result-sub-button" onClick={e=>this.openPopup("Result btn clicked")}>{item.resultBtn}</button>
								</div>
							</div>
						</div>
					</div>
				):""}
			</div>
		);
	}
}

export default Row;