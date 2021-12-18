const classes = [],
	firstSemGrades = [],
	secondSemGrades = [],
	firstSemPoints = [],
	secondSemPoints = [],
	semGrades = [firstSemGrades, secondSemGrades],
	semPoints = [firstSemPoints, secondSemPoints];

$(document).ready(() => {
	getClassType();
});

$('.calculate-btn:first-child()').click(() => {
	console.log('i was clicked so im telling you that');
});

const getClassType = () => {
	let classTypeArray = Array.from($('.class-type-input'));
	classTypeArray.forEach((element) => {
		classes.push(element.value);
	});
	console.log(classes);
};

//TODO Use MutationObserver API to detect input changes