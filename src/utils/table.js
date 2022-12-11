const getDictionaryName = (id, d) => {
	let dictionary = d.find(dic => dic.id === id);
	if (dictionary && dictionary.name) {
		return dictionary.name;
	}
	return '';
};
const getFio = (family, name, middle) => {
	try {
		return `${family} ${name[0].toUpperCase()}. ${middle[0].toUpperCase()}.`;
	} catch (e) {
		return '';
	}
};

export const FORMATTER_ARRAY_TO_TABLE = (array, departments, regions) => {
	return array.map(el => {
		return {
			...el,
			region: getDictionaryName(el.region, regions),
			department: getDictionaryName(el.department, departments),
			familyName: getFio(el.familyName, el.name, el.middleName)
		};
	});
};
