import { table2022 } from './gradetable.js';
import { table2023 } from './gradetable.js';

const classes = [];
let semPoints = [];
let year = 2022;

$(document).ready(() => {
	getClassRows(Array.from($('.class-number')).length);
	// console.log(classes);

	// const observer = new MutationObserver(calculate);
	// observe(observer);

	// Changes the year for gpa table when buttons are clicked
	$('#calculate2022').click((year = 2022));
	$('#calculate2023').click((year = 2023));
});

const getClassRows = (totalNumRows) => {
	const row = Array.from($('tr.class-row'));
	for (let i = 0; i < totalNumRows; i++) {
		let classRow = {
			id: i + 1,
			element: row[i],
			classType: getClassType(year, i),
			firstSemGrade: getSemGrade('first', i),
			firstSemPoint: 0,
			secondSemGrade: getSemGrade('second', i),
			secondSemPoint: 0,
			totalPoints: null,
		};

		classRow.firstSemPoint = getGradePoint(
			'first',
			i,
			classRow.classType,
			classRow.firstSemGrade
		);
		classRow.totalPoints = getClassTotalPoint(classRow.firstSemPoint, classRow.secondSemPoint, i);

		console.log(classRow);
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

const getSemGrade = (semester, index) => {
	let semGrade = [];
	if (semester == 'first')
		semGrade = Array.from($("input[data-which-semester='first']"))[index]
			.value;
	else if (semester == 'second')
		semGrade = Array.from(
			$("input[data-which-semester='second']")[index].value
		);

	// semGrade.forEach((grade) => {
	// 	let gradeValue = grade.value;
	// 	if (gradeValue == '') gradeValue = 0;
	// 	else gradeValue = parseFloat(gradeValue);
	// 	if (semester == 'first') firstSemGrades.push(gradeValue);
	// 	else secondSemGrades.push(gradeValue);
	// });

	if (semGrade == '') semGrade = 0;
	else semGrade = parseFloat(semGrade);
	return semGrade;
};

const getGradePoint = (semester, index, type, grade) => {
	if (semester == 'first')
		semPoints = Array.from($("td[data-sem-points='first']"))[index];
	else semPoints = Array.from($("td[data-sem-points='second']"))[index];

	$(semPoints).text(iterateThroughTable(type, grade).toFixed(3));

	return iterateThroughTable(type, grade);
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

const getClassTotalPoint = (firstSemGrade, secondSemGrade, index) => {
	const total = firstSemGrade + secondSemGrade;

	const totalCell = Array.from($('td.total'))[index];
	totalCell.text(total.toFixed(3));

	return total;
};

const config = { attributes: true };

// Adds class-type-inputs as targets for the MutationObserver API
const observe = (observer) => {
	let classTypeArray = Array.from($('.class-type-input'));
	classTypeArray.forEach((classType) => {
		observer.observe(classType, config);
	});
};
