import {filter, isEmpty} from "lodash";
import moment from "moment";

// Для фильтрации таблиц
export default function filterDataFromField(data, filterList) {
	if (isEmpty(filterList)) return data;
	let localData = data;
	filterList.forEach(
		// eslint-disable-next-line array-callback-return
		(item) => {
			const {
				name, value: {
					value,
					type,
					strictly,
				} = {}
			} = item;

			if (type === "dateTimePicker") {
				if (moment(value).isValid()) {
					localData = filter(localData, (line) => {
						if (name === "startTime") {
							return moment(line.time).valueOf() < moment(value).valueOf()
						}
						if (name === "endTime") {
							return moment(line.time).valueOf() > moment(value).valueOf()
						}
					})
				}
			}

			if (type === "text") {
				if (!value || !value.trim()) return;
				localData = filter(localData, (line) => {
					if (!(name in line)) {
						console.log(`Не знайдено: ${name} поле для фильтрації`);
						return false
					}
					return (line[name].toString().indexOf(value) !== -1)
				})
			}

			if (type === "strictly") {
        console.log('value', value);
				if (!value ) return;
				localData = filter(localData, (line) => {
					if (!(name in line)) {
						console.log(`Не знайдено: ${name} поле для фильтрації`);
						return true
					}
          console.log('1', line[name] === value);
          console.log('2', line[name].toString() === value);
          console.log('3', line[name].toString() === `${value}`);
          console.log('4', line[name].toString() === (value));

					if (strictly) return (line[name].toString() === `${value}`)
					return (line[name].toString().indexOf(value) !== -1)
				})

			}

			if (name === "status") {
				if(isEmpty(value)) return true;
				if (value.value === "allXRight") {
					localData = filter(localData,
						({x1Status, x2Status, x3Status}) => x1Status && x2Status && x3Status
					);
				}
				if (value.value === "errorOnly") {
					localData = filter(localData,
						({synchronizationStatus, x1Status, x2Status, x3Status}) => (
							!(synchronizationStatus && x1Status && x2Status && x3Status))
					);
				}
			}

			if (type === "autocomplete" && name !== "status") {
				if(isEmpty(value)) return true;
				localData = filter(localData, (line) => {
					if (!(name in line)) {
						console.log(`Не знайдено: ${name} поле для фильтрації`);
						return false
					}
					return (line[name] === value?.value)
				})
			}
		}
	)
	return localData;
};
