import { CLIENT_NAME } from '@/http/config';

const subsystemType = {
  id: "subsystemType",
  label: "Підсистема",
  hide: true
};
const mscNumber = {
  id: "mscNumber",
  label: "MSC Number",
  hide: true
};
const x1Login = {
  id: "x1Login",
  label: "X1 Логін",
  hide: true
};
const x1Password = {
  id: "x1Password",
  label: "X1 Пароль",
  hide: true
};
const x1Port = {
  id: "x1Port",
  label: "X1 Порт",
  hide: true
};
const x3Port = {
  id: "x3Port",
  label: "X3 Порт",
  hide: true
};
const protectedLogin = {
  id: "protectedLogin",
  label: "protected Логін",
  hide: true
};
const protectedPassword = {
  id: "protectedPassword",
  label: "protected Пароль",
  hide: true
};
const commandMode = {
  id: "commandMode",
  label: "Режим команд",
  hide: true
};
const softwareVersion = {
  id: "softwareVersion",
  label: "Версія ПЗ",
  hide: true
};
const login = {
  id: "login",
  label: "Логін",
};
const description = {
  id: "description",
  label: "Опис",
};
const roles = {
  id: "roles",
  label: "Права",
};
const actionsLarge = {
  id: "actions",
  width: 200,
  label: "Дії",
  notChange: true
};
const actions = {
  id: "actions",
  width: 150,
  label: "Дії",
  notChange: true
};
const actionsShot = {
  id: "actions",
  width: 50,
  label: "Дії",
  notChange: true
};
const mcc = {
  id: "mcc",
  label: "MCC",
};
const mnc = {
  id: "mnc",
  label: "MNC",
};
const lac = {
  id: "lac",
  label: "LAC",
};
const cellId = {
  id: "cellId",
  label: "Cell ID",
};
const type = {
  id: "type",
  label: "Тип"
};
const formatTime = {
  id: "formatTime",
  label: "Час",
};
const time = {
  id: "time",
  label: "Час",
};
const timeStart = {
  id: "timeStart",
  label: "Час початку",
};
const timeNextAuditStart = {
  id: "timeNextAuditStart",
  label: "Час початку наступного аудиту",
};
const timeEnd = {
  id: "timeEnd",
  label: "Час завершення",
};
const nextAuditTime = {
  id: "nextAuditTime",
  label: "next Time",
};
const status = {
  id: "status",
  label: "Статус",
};
const neId = {
  id: "neId",
  label: "NE Id",
};
const x1Ip = {
  id: "x1Ip",
  label: "X1 Ip",
};
const ovopName = {
  id: "ovopName",
  label: "ОВОП",
};
const auditOperationResult = {
  id: "auditOperationResult",
  label: "Р-т аудит",
};
const syncResult = {
  id: "syncResult",
  label: "Р-т синхр.",
};
const targetId = {
  id: "targetId",
  label: "Target Id",
};
const identityType = {
  id: "identityType",
  label: "Тип ознаки",
};
const identityValue = {
  id: "identityValue",
  label: "Ознака спостереження",
};
const auditResult = {
  id: "auditResult",
  label: "Аудит",
};
const alarmType = {
  id: "alarmType",
  label: "Тип аварії",
};
const criticalityType = {
  id: "criticalityType",
  label: "Критичність",
};
const category = {
  id: "category",
  label: "Категорія",
};
const activationTime = {
  id: "activationTime",
  label: "Час активації",
};
const endTime = {
  id: "endTime",
  label: "Час закінчення",
};
const callId = {
  id: "callId",
  label: "Call Id",
};
const neCallId = {
  id: "neCallId",
  label: "NE Call Id",
};
const start = {
  id: "start",
  label: "Початок",
};
const endX2 = {
  id: "endX2",
  label: "Кінець Х2",
};
const endX3 = {
  id: "endX3",
  label: "Кінець Х3",
};
const x2 = {
  id: "x2",
  label: "X2",
};
const x3 = {
  id: "x3",
  label: "X3",
};
const x1SshLogin = {
  id: 'x1SshLogin',
  label: 'X1 Ssh Login',
  hide: true
};
const x1SshPassword = {
  id: 'x1SshPassword',
  label: 'X1 Ssh Password',
  hide: true
};
const x1SshIp = {
  id: 'x1SshIp',
  label: 'X1 Ssh Ip',
};
const x1SshPort = {
  id: 'x1SshPort',
  label: 'X1 Ssh Port',
  hide: true
};
const x1XmlIp = {
  id: 'x1XmlIp',
  label: 'X1 Xml Ip'
};
const x1XmlPort = {
  id: 'x1XmlPort',
  label: 'X1 Xml Port',
  hide: true
};
const targetsCount = {
  id: 'targetsCount',
  label: 'Targets count'
};
const x2Ip = {
  id: 'x2Ip',
  label: 'X2 Ip',
  hide: true
}
const x2Port = {
  id: 'x2Port',
  label: 'X2 Port',
  hide: true
}
const x3Ip = {
  id: 'x3Ip',
  label: 'X3 Ip',
  hide: true
}

const users = [
	login,
	description,
	roles,
	actions,
];
const targetInfo = [
	mcc,
	mnc,
	lac,
	cellId,
];

let commutators = [];
const fieldsCommutators = [
  ovopName,
  neId,
  type,
];
const commutatorsERICSSONCs = [
  ...fieldsCommutators,
  softwareVersion,
  subsystemType,
  commandMode,
  x1Login,
  x1Password,
  protectedLogin,
  protectedPassword,
  x1Ip,
  x1Port,
  x3Port,
  mscNumber,
  targetsCount,
  status,
  actionsLarge
];
const commutatorsERICSSONEps = [
  ...fieldsCommutators,
  x1SshLogin,
  x1SshPassword,
  x1SshIp,
  x1SshPort,
  x1XmlIp,
  x1XmlPort,
  x2Ip,
  x2Port,
  x3Ip,
  x3Port,
  targetsCount,
  status,
  actionsLarge
];

const commutatorsZTE = [
  ...fieldsCommutators,
  x1Login,
  x1Password,
  protectedLogin,
  protectedPassword,
  x1Ip,
  x1Port,
  x3Port,
  targetsCount,
  status,
  actionsLarge
];
const commutatorsHUAWEI = [
  ...fieldsCommutators,
  softwareVersion,
  commandMode,
  x1Login,
  x1Password,
  protectedLogin,
  protectedPassword,
  x1Ip,
  x1Port,
  x3Port,
  mscNumber,
  targetsCount,
  status,
  actionsLarge
];
if (CLIENT_NAME === 'EricssonCs') commutators = commutatorsERICSSONCs;
if (CLIENT_NAME === 'EricssonEps') commutators = commutatorsERICSSONEps;
if (CLIENT_NAME === 'ZteIms') commutators = commutatorsZTE;
if (CLIENT_NAME === 'HuaweiNgnFix') commutators = commutatorsHUAWEI;

const audit = [
  timeStart,
  timeEnd,
	ovopName,
	auditOperationResult,
	syncResult,
	login,
	actions
];
const auditPeriod = [
  timeStart,
  timeEnd,
  timeNextAuditStart,
  ovopName,
  auditOperationResult,
  syncResult,
  login,
  actions
];
const auditPlanned = [
  timeStart,
  timeEnd,
  ovopName,
  auditOperationResult,
  syncResult,
  login,
  actions
];

const auditFull = [
	nextAuditTime,
	time,
	ovopName,
	auditOperationResult,
	syncResult,
	login,
	actions
];

const syncTargets = [
	targetId,
	identityType,
	identityValue,
	auditResult,
	syncResult
];
const alarms = [
	formatTime,
	alarmType,
	criticalityType,
	description,
	ovopName
];
const targets = [
	targetId,
	neId,
	identityType,
	identityValue,
	category,
	activationTime,
	endTime,
	actionsShot
];
const ring = [
	callId,
	neCallId,
	ovopName,
	targetId,
	identityValue,
	start,
	endX2,
	endX3,
	x2,
	x3
];

const lastX1Answer = {
  id: 'lastX1Answer',
  label: 'lastX1Answer'
};

const lastX1Command = {
  id: 'lastX1Command',
  label: 'lastX1Command'
};
const lastX2Message = {
  id: 'lastX2Message',
  label: 'lastX2Message'
};
const lastX3Message = {
  id: 'lastX3Message',
  label: 'lastX3Message'
};

const collapsibleCommutators = [
  lastX1Answer,
  lastX1Command,
  lastX2Message,
  lastX3Message
];


export {
  users,
  targetInfo,
  commutators,
  audit,
  auditPeriod,
  auditPlanned,
  auditFull,
  syncTargets,
  alarms,
  targets,
  ring,
  collapsibleCommutators
};
