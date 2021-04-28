'use strict';

module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-css-modules',
    'stylelint-config-prettier',
		'stylelint-config-rational-order'
	],
	plugins: [
		'stylelint-order',
		'stylelint-declaration-block-no-ignored-properties'
	],
	rules: {
		'no-descending-specificity': null,
		'plugin/declaration-block-no-ignored-properties': true
	}
};
