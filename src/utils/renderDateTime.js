import moment from "moment";

export const renderDateTime = (dateTime, exactly) => {
	if (!dateTime || dateTime === "" || dateTime === "0001-01-01T00:00:00") return "";
	const format = "YYYY-MM-DD HH:mm";
	const formatExactly = "YYYY-MM-DD HH:mm:ss";
	const displayDateTime = moment(dateTime).format(exactly ? formatExactly : format);
	if (displayDateTime === "0001-01-01 00:00") return "";
	return displayDateTime;
};
