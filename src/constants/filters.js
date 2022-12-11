import {
	statuses,
  auditRTSelect,
	identityTypeSelect,
  audit,
  synchronizationRTSelect,
  alarmTypeSelect,
  criticalityTypeSelect,
  categorySelect,
	commutatorsSelect,
	commutatorNameSelect
}
from
"./selectors.js"

const commutatorName = {
	name: "ovopName",
	title: "ОВОП",
	type: "text",
};

const targetId = {
	name: "targetId",
	title: "Target Id",
	type: "strictly",
	strictly: true
};

const identityValue = {
  name: "identityValue",
  title: "Ознака",
  type: "text",
};

const callId = {
  name: "callId",
  title: "Call Id",
  type: "number",
};

const startTime = {
  name: "startTime",
  title: "З",
  type: "dateTimePicker"
};

const endTime = {
  name: "endTime",
  title: "По",
  type: "dateTimePicker"
};

const description = {
  name: "description",
  title: "Опис",
  type: "text",
};

const neId = {
	name: "neId",
	title: "NE Id",
	type: "strictly",
	strictly: true
};

const x1Ip = {
  name: "x1Ip",
  title: "IP адреса ( X1 )",
  type: "text",
};

const currentCallsFiltersList = [
	commutatorsSelect,
  targetId,
  identityValue,
  callId,
  startTime,
  endTime
];
const alarmsFiltersList = [
  description,
	commutatorNameSelect,
  alarmTypeSelect,
  criticalityTypeSelect,
  startTime,
  endTime
];
const objectFiltersList = [
	targetId,
  neId,
	identityTypeSelect,
	identityValue,
  categorySelect,
  startTime,
  endTime
];

const auditsFiltersList = [
	commutatorsSelect,
  auditRTSelect,
  synchronizationRTSelect,
  startTime,
  endTime
];

const auditsInfoFiltersList = [
	targetId,
	identityTypeSelect,
	identityValue,
	audit,
	synchronizationRTSelect,
];

const commutatorsFiltersList = [
	commutatorName,
  neId,
  x1Ip,
	statuses
];

export {
  currentCallsFiltersList,
	auditsInfoFiltersList,
  alarmsFiltersList,
  objectFiltersList,
  auditsFiltersList,
  commutatorsFiltersList,
};
