import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import DataProvider from "./dataProvider.jsx";
import List from "./list.jsx";

@observer class App extends Component {
	@observable items = [];
	render() {
		return (
			<div className="wrapper">
				<DevTools />
				<div className="container">
					<DataProvider items={this.items} />
					<List items={this.items} />
				</div>
			</div>
		);
	}
}

export default App;