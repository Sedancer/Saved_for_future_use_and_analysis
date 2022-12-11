import React from "react";
import {useTranslation} from "react-i18next";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import clsx from "clsx";
import {makeStyles, useTheme} from "@material-ui/core/styles";

const useStyles = makeStyles({
	'@keyframes opacity_text': {
		'0%': {
			opacity: 1
		},
		'50%': {
			opacity: 0.7
		},
		'100%': {
			opacity: 1
		},
	},
	card: {
		minWidth: 250,
		backgroundColor: "#525d67",
		overflow: "hidden",
		borderRadius: 2,
		position: "relative",
		"&::before": {
			right: "6px",
			top: "6px",
			bottom: "6px",
			left: "6px",
			position: "absolute",
			display: "block",
			content: '""',
			border: "1px dotted #ccc",
		},
		'& .MuiListItemSecondaryAction-root': {
			right: 0
		}
	},
	error: {
		boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
		borderColor: "red !important",
		"&::after": {
			fontSize: "12px",
			position: "absolute",
			zIndex: 2,
			right: "-40px",
			letterSpacing: "1.2px",
			top: "15px",
			display: "block",
			transform: 'rotate(45deg)',
			color: "#fff",
			backgroundColor: "#af4f4f",
			padding: "5px 46px",
			content: '"error"',
			animationName: '$opacity_text',
			animationDuration: '5s',
			animationTimingFunction: 'linear',
			animationIterationCount: '1',
		}
	},
	success: {
		boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
		borderColor: "green !important",
	},
	listItem: {
		padding: 0,
	},
	listItemText: {
		borderBottom: "0.5px dotted #808080",
		paddingRight: '120px',
		"& span": {
			lineHeight: "1 !important",
		},
	},
	title: {
		color: "#fff",
		textAlign: "left",
		borderBottom: "1px solid #ccc",
		fontSize: "18px",
	},
});

const getLabelFromProperty = (prop) => {
	try {
		const dict = {
			syncError: "Помилки синхронізації",
			connectionLost: "Втрачено зв'язок",
			messagesSent: "Команд відправлено",
			lastMessageTime: "Остання команда",
			lastMessageFrom: "Остання команда на",
			x1Answers: "Відповідей отримано",
			lastX1Answer: "Остання відповідь",
			lastAnswerFrom: "Остання відповідь з",
			messagesSentx: "Отримано повідомлень",
			lastMessageTimex: "Останнє отримано",
			lastMessageFromx: "Останнє отримано від",
			mcIpAddress: "Адреса МЦ",
			changedAt: "Зміна статусу",
			commandsReceived: "Команд отримано",
			answersSent: "Відповідей надіслано",
			messagesSentHi: "Повідомлень надіслано",
			acksReceived: "Ack отримано",
			lastCommandAt: "Остання команда",
			lastAnswersAt: "Остання відповідь",
			lastMessageAt: "Останнє повідомлення",
			lastAckAt: "Останній ack",
			messagesInBuffer: "У буфері",
			messagesSentHi2: "Відправлено",
			acksReceivedHi2: "Отримано",
			lastReceivedAt: "Останнє отримано",
			lastSentAt: "Останнє відправлено",
			hi3MessagesReceived: "Отримано",
			hi3LastMessageSent: "Останнє відправлено",
		};
		return dict[prop];
	} catch (err) {
		return prop;
	}
};

const HiChannel = (props) => {
	const theme = useTheme();
  const { t } = useTranslation('main');
	const classes = useStyles(theme);
	const {label, link, status, ...data} = props;
	return (
		<Card className={clsx(classes.card, status ? classes.success : classes.error)} style={{height: "100%"}}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					{props.label}
				</Typography>
				<List>
					{Object.entries(data).map(([key, value]) => {
					  const primaryText = t(getLabelFromProperty(key));
					  return (
						<ListItem className={classes.listItem} key={key}>
							<ListItemText
                className={clsx(classes.listItemText, "MuiListItemText-dense")}
								primary={`${primaryText}:`}
              />
							<ListItemSecondaryAction>{value}</ListItemSecondaryAction>
						</ListItem>
					)})}
				</List>
			</CardContent>
		</Card>
	);
};

export default HiChannel;
