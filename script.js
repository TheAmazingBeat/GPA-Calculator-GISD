import { table2022 } from './gradetable.js';
import { table2023 } from './gradetable.js';

let classes = [];
let year = 2022;
let numOfClassRows = Array.from($('.class-number')).length;

$(document).ready(() => {
	getClassRows(numOfClassRows);

	// detect if the class-type-input has changes
	let typeInputs = Array.from($('.class-type-input'));
	detectChanges(typeInputs, numOfClassRows);
	// detect if the sem-grade-input has changes
	let gradeInputs = Array.from($('.sem-grade-input'));
	detectChanges(gradeInputs, numOfClassRows);

	calculateGPA();

	// Changes the year for gpa table when buttons are clicked
	$('#calculate2022').click((year = 2022));
	$('#calculate2023').click((year = 2023));
});

// Onchange event listener
const detectChanges = (array, length) => {
	array.forEach((element) => {
		$(element).blur(() => {
			getClassRows(length);
			calculateGPA();
		});
	});
};

const getClassRows = (totalNumRows) => {
	classes = [];
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
		classRow.secondSemPoint = getGradePoint(
			'second',
			i,
			classRow.classType,
			classRow.secondSemGrade
		);
		classRow.totalPoints = getClassTotalPoint(classRow.firstSemPoint, classRow.secondSemPoint, i);

		classes.push(classRow);
	}

	// console.log(classes);
};

// Returns the class type in the class row
const getClassType = (year, index) => {
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
			case 'Honors':
				classType = table2022.setFour;
				break;
			case 'Pre-AP':
				classType = table2022.setFour;
				break;
			case 'AP':
				classType = table2022.setFour;
				break;
			case 'Int-H':
				classType = table2022.setFive;
				break;
			case 'IB':
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
			case 'Int-H':
				classType = table2023.levelThree;
				break;
			case 'Honors':
				classType = table2023.levelThree;
				break;
			case 'Pre-AP':
				classType = table2023.levelThree;
				break;
			case 'AP':
				classType = table2023.levelFour;
				break;
			case 'Dual Credit':
				classType = table2023.levelFour;
				break;
			case 'IB':
				classType = table2023.levelFive;
				break;
			case 'AMS':
				classType = table2023.levelFive;
				break;
			default:
				classType = 'N/A';
				break;
		}
	}
	return classType;
};

// Returns the semester grade in the class ro
const getSemGrade = (semester, index) => {
	let semGrade = [];
	let grade = 0;
	if (semester == 'first') semGrade = Array.from($("input[data-which-semester='first']"))[index];
	else if (semester == 'second')
		semGrade = Array.from($("input[data-which-semester='second']"))[index];

	if (semGrade.value == '') {
		grade = 'empty';
	} else {
		grade = semGrade.value;
	}
	return grade;
};

// Gets the grade points for the class row
const getGradePoint = (semester, index, type, grade) => {
	let semPoints = [];
	if (semester == 'first') semPoints = Array.from($("td[data-sem-points='first']"));
	else semPoints = Array.from($("td[data-sem-points='second']"));

	if (type == 'N/A') {
		$(semPoints[index]).text('0.000');
		return 0.0;
	} else {
		$(semPoints[index]).text(iterateThroughTable(type, grade));
		return iterateThroughTable(type, grade);
	}
};

// Find the grade point according to gradetable.js
const iterateThroughTable = (classType, grade) => {
	let gradePoint = 0;

	if (classType == 'N/A') gradePoint = 0;
	if (between(grade, 97, 100)) gradePoint = (classType.Aplus)/2;
	if (between(grade, 94, 96)) gradePoint = (classType.A)/2;
	if (between(grade, 90, 93)) gradePoint = (classType.Aminus)/2;
	if (between(grade, 89, 87)) gradePoint = (classType.Bplus)/2;
	if (between(grade, 84, 86)) gradePoint = (classType.B)/2;
	if (between(grade, 80, 83)) gradePoint = (classType.Bminus)/2;
	if (between(grade, 77, 79)) gradePoint = (classType.Cplus)/2;
	if (between(grade, 74, 76)) gradePoint = (classType.C)/2;
	if (between(grade, 70, 73)) gradePoint = (classType.Cminus)/2;
	if (between(grade, 0, 69)) gradePoint = (classType.F)/2;

	return gradePoint.toFixed(3);
};

// Returns true if number is in between min and max
const between = (number, min, max) => {
	return number >= min && number <= max;
};

// Gets the total grade points for the class row
const getClassTotalPoint = (firstSemGrade, secondSemGrade, index) => {
	if (firstSemGrade == 'empty') firstSemGrade = 0;
	if ((secondSemGrade == 'empty')) secondSemGrade = 0;
	const total = (parseFloat(firstSemGrade) + parseFloat(secondSemGrade)).toFixed(3);

	const totalCell = Array.from($('.total'));
	$(totalCell[index]).text(total);

	return total;
};

const getTotalGradePoints = () => {
	let total = 0;

	classes.forEach((object) => {
		total += parseFloat(object.totalPoints);
	});

	return total;
};

// Counts 0.5 points for every class in the semester
const getTotalCourses = () => {
	let total = 0;

	classes.forEach((object) => {
		if (object.classType != 'N/A') {
			if (object.firstSemGrade != 'empty') total += 0.5;
			if (object.secondSemGrade != 'empty') total += 0.5;
		}
	});

	return total;
};

const calculateGPA = () => {
	let gpa = 0;
	// const cell = $('#GPA');
	let points = getTotalGradePoints();
	let courses = getTotalCourses();
	gpa = points / courses;
	manipulateFooter(points, courses, gpa);
	// $(cell).text(gpa.toFixed(3));
	return gpa;
};

// Change values client-side
const manipulateFooter = (points, courses, gpa) => {
	const totalPoints = $('#totalGradePoints');
	const totalCourses = $('#totalCourses');
	const gpaCell = $('#GPA');
	$(totalPoints).text(points.toFixed(3));
	$(totalCourses).text(courses.toFixed(3));
	$(gpaCell).text(gpa.toFixed(3));
};
