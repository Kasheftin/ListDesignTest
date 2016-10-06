import React, { Component } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";

@observer class RectGraph extends Component {
	render() {
		const {f} = this.props;
		const perc = f.successCnt+f.failCnt>0?Math.floor(f.successCnt/(f.successCnt+f.failCnt)*100):0;
		return (
			<div className="ldt-rgraph">
				<div className={classNames("ldt-rgraph-inner",{"-success":f.isOk,"-fail":!f.isOk})} style={{width:perc+"%"}}></div>
			</div>
		);
	}
}

export default RectGraph;