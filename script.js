import { table2022 } from './gradetable.js';
import { table2023 } from './gradetable.js';

const classes = [];
// firstSemGrades = [],
// secondSemGrades = [],
// firstSemPoints = [],
// secondSemPoints = [];
let semPoints = [];
let year = 2022;

$(document).ready(() => {
	getClassRows();
	// getClassType(year);
	// getSemGrades('first');
	// getGradePoint('first');

	// const observer = new MutationObserver(calculate);
	// observe(observer);

	// Changes the year for gpa table when buttons are clicked
	$('#calculate2022').click((year = 2022));
	$('#calculate2023').click((year = 2023));
});

const getClassRows = () => {
	const totalNumRows = Array.from($('.class-number')).length;
	const row = Array.from($('tr.class-row'));
	for (let i = 0; i < totalNumRows; i++) {

		let classRow = {
			id: i + 1,
			element: row[i],
			classType: getClassType(year, i),
			firstSemGrade: 0,
			firstSemPoint: 0,
			secondSemGrade: 0,
			secondSemPoint: 0,
			totalPoint: firstSemPoint + secondSemPoint
		};

		classes.push(classRow);
	}
};

const getClassType = (year, index) => {
	// let classTypeArray = Array.from($('.class-type-input'));
	// classTypeArray.forEach((classType) => {
		
	let classTypeInput = Array.from($('.class-type-input'))[index];
	let classType;
	if (year == 2022) {
		switch (classTypeInput.value) {
			case 'Basic':
				classType = table2022.setOne;
				break;
			case 'Regular':
				classType = table2022.setTwo;
				break;
			case 'Dual Credit':
				classType = table2022.setThree;
				break;
			case 'Honors' || 'Pre-AP' || 'AP':
				classType = table2022.setFour;
				break;
			case 'Int-H' || 'IB':
				classType = table2022.setFive;
				break;
			default:
				classType = 'N/A';
				break;
		}
	} else if (year == 2023) {
		switch (classType.value) {
			case 'Basic':
				classType = table2023.levelOne;
				break;
			case 'Regular':
				classType = table2023.levelTwo;
				break;
			case 'Int-H' || 'Honors' || 'Pre-AP':
				classType = table2023.levelThree;
				break;
			case 'AP' || 'Dual Credit':
				classType = table2023.levelFour;
				break;
			case 'IB' || 'AMS':
				classType = table2023.levelFive;
				break;
			default:
				classType = 'N/A';
				break;
		}
	}
	return classType;

	// });
	// console.log(`Class Types::`);
	// console.log(classes);
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

	if ((semester = 'first'))
		console.log(`First Semester Grades:: ${firstSemGrades}`);
	else console.log(`First Semester Grades:: ${secondSemGrades}`);
};

const getGradePoint = (semester) => {
	if (semester == 'first') {
		semPoints = Array.from($("td[data-sem-points='first']"));
		console.log(semPoints);
		for (let i = 0; i < semPoints.length; i++) {
			$(semPoints[i]).text(
				iterateThroughTable(classes[i], firstSemGrades[i])
			);
		}
	} else semPoints = Array.from($("td[data-sem-points='second']"));
};

const iterateThroughTable = (classType, grade) => {
	let gradePoint = 0;

	if (between(grade, 97, 100)) gradePoint = classType.Aplus;
	if (between(grade, 94, 96)) gradePoint = classType.A;
	if (between(grade, 90, 93)) gradePoint = classType.Aminus;
	if (between(grade, 89, 87)) gradePoint = classType.Bplus;
	if (between(grade, 84, 86)) gradePoint = classType.B;
	if (between(grade, 80, 83)) gradePoint = classType.Bminus;
	if (between(grade, 77, 79)) gradePoint = classType.Cplus;
	if (between(grade, 74, 76)) gradePoint = classType.C;
	if (between(grade, 70, 73)) gradePoint = classType.Cminus;
	if (between(grade, 0, 69)) gradePoint = classType.F;

	return gradePoint;
};

const between = (number, min, max) => {
	return number >= min && number <= max;
};

const calculate = () => {
	// TODO function for getting GPA point from table (gradePoint)
	// TODO Get all total points from each row and sum them up
	// TODO Get all numbers of classes that has GPA credit
	// TODO Calculate gpa
};

const config = { attributes: true };

// Adds class-type-inputs as targets for the MutationObserver API
const observe = (observer) => {
	let classTypeArray = Array.from($('.class-type-input'));
	classTypeArray.forEach((classType) => {
		observer.observe(classType, config);
	});
};
