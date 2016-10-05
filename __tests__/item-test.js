import Item from "../js/item.js";

jest.useFakeTimers();

beforeEach(() => {
  jasmine.addMatchers(require("jasmine-object-matchers-jest")["2.0"])
});

describe("Item",() => {
	it("creates new item that is either firewall or build",() => {
		const item = new Item();
		expect(item).toContainKeys(["id","name","type","state","owner","started_at"]);
		expect(item.type=="firewall"||item.type=="build").toBe(true);
	});
	it("switches item's state",() => {
		const item = new Item();
		if (item.state=="accepted"||item.state=="succeed") {
			item.switchState();
			expect(item.state=="rejected"||item.state=="fail").toBe(true);
		}
		else {
			item.switchState();
			expect(item.state=="accepted"||item.state=="succeed").toBe(true);
		}
	});
	it("selects and deselects item, deselect works with timeout",() => {
		const item = new Item();
		item.select();
		expect(item.isSelected).toBe(true);
		item.deselect();
		expect(item.isSelected).toBe(true);
		jest.runAllTimers();
		expect(item.isSelected).toBe(false);
	});
	it("updates item with triggering isUpdating flag to true for a half of a second (for css animation)",() => {
		const item = new Item();
		expect(item.isCreating).toBe(true);
		jest.runAllTimers();
		expect(item.isCreating).toBe(false);
		expect(item.isUpdating).toBe(false);
		item.update();
		expect(item.isUpdating).toBe(true);
		jest.runAllTimers();
		expect(item.isUpdating).toBe(false);
	});
});