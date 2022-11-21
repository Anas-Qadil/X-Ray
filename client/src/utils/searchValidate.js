import validator from "validator";

// validate search input
export default function validateSearchInput(data) {
	let checker = true;
	let i = 0;
	while (i < data.length) {
		if (data[i] === '\\' || data[i] === '\'' || data[i] === '"' || data[i] === '$' || data[i] === '^' || data[i] === '|' || data[i] === '?' || data[i] === '*' || data[i] === '+' || data[i] === '(' || data[i] === ')' || data[i] === '[' || data[i] === ']' || data[i] === '{' || data[i] === '}' || data[i] === '!' || data[i] === '#' || data[i] === '%' || data[i] === '&' || data[i] === '=' || data[i] === '~' || data[i] === '`' || data[i] === ':' || data[i] === ';' || data[i] === ',' || data[i] === '<' || data[i] === '>' || data[i] === '/') {
			checker = false;
		}
		i++;
	}
	return (checker);
}