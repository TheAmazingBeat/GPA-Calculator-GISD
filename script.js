import { gpa2022 } from "./gradetable.js";
import { gpa2023 } from "./gradetable.js";

const classes = [],
	firstSemGrades = [],
	secondSemGrades = [],
	firstSemPoints = [],
	secondSemPoints = [],
	semGrades = [firstSemGrades, secondSemGrades],
	semPoints = [firstSemPoints, secondSemPoints];



$(document).ready(() => {
	getClassType();
	getSemGrades('first');
	console.log(gpa2022);
});

$('.calculate-btn:first-child()').click(() => {
	console.log('i was clicked so im telling you that');
});

const getClassType = () => {
	let classTypeArray = Array.from($('.class-type-input'));
	classTypeArray.forEach((classType) => {
		classes.push(classType.value);
	});
	console.log(classes);
};

const getSemGrades = (semester) => {
	let semGrade = [];
	if (semester == 'first')
		semGrade = Array.from($("input[data-which-semester='first']"));
	else semGrade = Array.from($("input[data-which-semester='second']"));

	semGrade.forEach((grade) => {
		let gradeValue = grade.value;
		if (gradeValue == '') gradeValue = 0;
		else gradeValue = parseFloat(gradeValue);
		if (semester == 'first') firstSemGrades.push(gradeValue);
		else secondSemGrades.push(gradeValue);
	});
	console.log(firstSemGrades);
};

//TODO Use MutationObserver API to detect input changes
