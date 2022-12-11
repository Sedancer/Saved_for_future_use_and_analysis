import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import {isEmpty} from "lodash";
import {Stats} from "./components";
import {GET_HI} from "@redux/hiChannels/actions";
import {GET_COMMUTATORS, GET_STATUSES} from "@/store/commutators/actions";
import {renderDateTime} from "@/utils/renderDateTime";

const Main = () => {
	const dispatch = useDispatch();
  const { t } = useTranslation('main');
	const {commutators: commutatorsProp, hi: hiProps } = useSelector((state) => state);

	useEffect(() => {
		dispatch(GET_COMMUTATORS());
		dispatch(GET_HI());

		const interval = setInterval(() => {
			dispatch(GET_STATUSES());
			dispatch(GET_HI());
		}, 100000);
		return () => {
			clearInterval(interval);
		};
	}, [dispatch]);

	if (isEmpty(commutatorsProp) || isEmpty(hiProps)) return null;

	const { mainInfo, commutators: commutatorsArr = [], statuses } = commutatorsProp || {};
	const {
		x1Status,
		x2Status,
		x3Status,
		// x1Commands,
		// x1Answers,
		x2Messages,
		x3Messages,
		// lastX1Command,
		// lastX1Answer,
		lastX2Message,
		lastX3Message,
		// x1OvopId,
		// x1OvopIdAnswer,
		x2OvopId,
		x3OvopId,
		syncError,
		lostX1,
    lostX2,
		lostX3,
	} = mainInfo || {};

	const { hi = {} } = hiProps || {};
	const {
		hi1McAddress,
		hi2McAddress,
		hi3McAddress,
		hi1StatusChanged,
		hi2StatusChanged,
		hi3StatusChanged,
		hi1CommandsReceived,
		hi1AnswersSent,
		hi1MessagesSent,
		hi1AcksReceived,
		hi1LastCommandReceived,
		hi1LastAnswerSent,
		hi1LastMessageSent,
		hi1LastAckReceived,
		hi2MessagesInBuffer,
		hi2MessagesSent,
		hi2AcksReceived,
		hi2LastMessageReceived,
		hi2LastMessageSent,
		hi3MessagesReceived,
		hi3LastMessageSent,
		isHi1Connected,
		isHi2Connected,
		isHi3Connected,
	} = hi || {};

  const hi1 = {
    mcIpAddress: hi1McAddress,
    changedAt: renderDateTime(hi1StatusChanged),
    commandsReceived: hi1CommandsReceived,
    answersSent: hi1AnswersSent,
    messagesSentHi: hi1MessagesSent,
    acksReceived: hi1AcksReceived,
    lastCommandAt: renderDateTime(hi1LastCommandReceived),
    lastAnswersAt: renderDateTime(hi1LastAnswerSent),
    lastMessageAt: renderDateTime(hi1LastMessageSent),
    lastAckAt: renderDateTime(hi1LastAckReceived),
    status: isHi1Connected
  };

  const hi2 = {
    mcIpAddress: hi2McAddress,
    changedAt: renderDateTime(hi2StatusChanged),
    messagesInBuffer: hi2MessagesInBuffer,
    messagesSentHi2: hi2MessagesSent,
    acksReceivedHi2: hi2AcksReceived,
    lastReceivedAt: renderDateTime(hi2LastMessageReceived),
    lastSentAt: renderDateTime(hi2LastMessageSent),
    status: isHi2Connected
  };
  const hi3 = {
    mcIpAddress: hi3McAddress,
    changedAt: renderDateTime(hi3StatusChanged),
    hi3MessagesReceived: hi3MessagesReceived,
    hi3LastMessageSent: renderDateTime(hi3LastMessageSent),
    status: isHi3Connected
  };

  const x1 = {
    status: x1Status,
    connectionLost: `${lostX1} ${t('з')} ${statuses.length}`,
    syncError: `${syncError} ${t('з')} ${statuses.length}`,
  };
  const x2 = {
    status: x2Status,
    messagesSentx: x2Messages,
    lastMessageTimex: renderDateTime(lastX2Message),
    lastMessageFromx: commutatorsArr.find((c) => c.ovopId === x2OvopId) ? commutatorsArr.find((c) => c.ovopId === x2OvopId).ovopName : "",
    connectionLost: `${lostX2} ${t('з')} ${statuses.length}`,
  };
  const x3 = {
    status: x3Status,
    messagesSentx: x3Messages,
    lastMessageTimex: renderDateTime(lastX3Message),
    lastMessageFromx: commutatorsArr.find((c) => c.ovopId === x3OvopId) ? commutatorsArr.find((c) => c.ovopId === x3OvopId).ovopName : "",
    connectionLost: `${lostX3} ${t('з')} ${statuses.length}`,
  };

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6} md={4}>
				<Stats label={t("HI1 Channel")} { ...hi1 }/>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Stats label={t("HI2 Channel")} { ...hi2 }/>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Stats label={t("HI3 Channel")} { ...hi3 }/>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Stats label={t("X1 Channels")} { ...x1} />
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Stats label={t("X2 Channels")} { ...x2} />
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Stats label={t("X3 Channels")} { ...x3} />
			</Grid>
		</Grid>
	);
};

export default Main;
