const stylelint = require("stylelint");
const assert = require("assert");
const path = require("path");

describe("test rules.test.js", () => {
	it("validate default", async () => {
		const filePath = [path.join(__dirname, "fixures", "index.css")];
		const result = await stylelint.lint({
			configFile: path.join(__dirname, "../index.js"),
			files: filePath,
			fix: true,
		});
		const filesResult = JSON.parse(result.output || "[]");
		filesResult.forEach((fileResult) => {
			// console.log(fileResult);
		});
		console.log(result);
		assert.ok(filesResult.length > 0);
	});
});
