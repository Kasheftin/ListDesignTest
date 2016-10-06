import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

import List from "./list.jsx";
import Store from "./models/store.js";
import ControlPanel from"./presentational/controlPanel.jsx";

@observer class App extends Component {
	constructor(props) {
		super(props);
		this.store = new Store();
	}
	render() {
		return (
			<div className="wrapper">
				<DevTools />
				<div className="container">
					<ControlPanel store={this.store} />
					<List store={this.store} />
				</div>
			</div>
		);
	}
}

export default App;