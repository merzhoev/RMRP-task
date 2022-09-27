function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMatrix(row, col) {
  const matrix = [];
  for (let i = 0; i < row; i++) {
    matrix.push([]);
    for (let j = 0; j < col; j++) {
      const randomNumber = getRandomNumber(-100, 100);
      matrix[i].push(randomNumber);
    }
  }

  return matrix;
}

function getMinRowIndex(matrix) {
  let minIndex = 0;
  let minNum = matrix[0][0];

  for (let i = 0; i < matrix.length; i++) {
    const currentRow = matrix[i];
    for (let j = 0; j < matrix[i].length; j++) {
      const currentNum = currentRow[j];
      if (currentNum < minNum) {
        minIndex = i;
        minNum = currentNum;
      }
    }
  }

  return minIndex;
}

function getMinPositiveNum(numbers) {
  const positiveNums = numbers.filter(num => num > 0);
  // если positiveNums будет пуст, в этом случае Math.min(...[]) === Infinity
  const minNum = Math.min(...positiveNums);

  return isFinite(minNum) ? minNum : 'doesn\'t exist';
}

function getCountConsecutives(numbers) {
  let count = 0;

  let positiveCount = 0;
  let negativeCount = 0;

  for (const number of numbers) {
    if (number > 0) {
      negativeCount = 0;
    } else if (number < 0) {
      positiveCount = 0;
    } else {
      // number === 0
      negativeCount = 0;
      positiveCount = 0;
    }

    positiveCount += number > 0;
    negativeCount += number < 0;

    if (positiveCount === 3) {
      count++;
      positiveCount = 0;
    }
    if (negativeCount === 3) {
      count++;
      negativeCount = 0;
    }
  }

  return count;
}

function showTable(matrix, minRowIndex) {
  const rows = [];

  for (let i = 0; i < matrix.length; i++) {
    // 1 условие
    // padEnd нужен, чтобы сохранялся табличный вид
    const charsCount = String(matrix.length).length;
    // число 2 это пробел или звездочка + точка - два элемента, которые обязательно будут
    const rowNum = `${minRowIndex === i ? '*' : ' '}${i + 1}.`.padEnd(charsCount + 2);

    // сделал читаемый (табличный) вид
    // 4 - количество символов максимальной строки '-100'.length === 4
    const numbers = matrix[i].map(num => num.toString().padStart(4)).join(' ');

    // 2 условие
    let minPositiveNum = getMinPositiveNum(matrix[i]);
    minPositiveNum = Number.isInteger(minPositiveNum)
      ? minPositiveNum.toString().padStart(3)
      : minPositiveNum;

    // 3 условие
    const countConsecutives = getCountConsecutives(matrix[i]);

    const rowStr = `${rowNum} ${numbers}; min positive number: ${minPositiveNum}; count consecutives: ${countConsecutives}`;
    rows.push(rowStr);
  }

  const table = rows.join('\n');
  console.log(table);
}

function start() {
  const matrix = getMatrix(10, 10);
  const minRowIndex = getMinRowIndex(matrix);

  showTable(matrix, minRowIndex);
}

start();