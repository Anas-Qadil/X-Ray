import validator from "validator";

// validate search input
export default function validateSearchInput(data) {
	return (validator.isAlphanumeric(data) || validator.isNumeric(data) || data.length === 0);
}