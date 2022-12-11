import React from 'react';
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
		'@keyframes opacityChange': {
		'0%': {
			opacity: 0
		},
		'60%': {
			opacity: 1
		},
		'100%': {
			opacity: 0
		},
	},
	container: {
		margin: 'auto',
		position: 'fixed',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0.4)',
		zIndex: 1000000
	},
	loader: {
			display: "flex",
		justifyContent: "space-around",
		margin: 16,
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: 20,
		fontSize: 18,
		color: '#ffe300',
		background: "linear-gradient(130deg, rgba(255,255,255,0.94) 0%, rgba(160,160,160,0.9) 70%, rgba(200,200,200,0.9) 100%)",
		width: 320,
		height: 148,
		"& span" : {
			display: "block",
			width: 20,
			height: 20,
			borderRadius: "100%",
			backgroundColor: "#525d67",
			margin: "35px 0px",
			opacity: 0,
			"&:nth-child(1)": {
				animationName: '$opacityChange',
				animationDuration: '1s',
				animationDelay: '1s',
				animationTimingFunction: 'ease-in-out',
				animationIterationCount: 'infinite',
			},
			"&:nth-child(2)": {
				animationName: '$opacityChange',
				animationDuration: '1s',
				animationDelay: '0.33s',
				animationTimingFunction: 'ease-in-out',
				animationIterationCount: 'infinite',
			},
			"&:nth-child(3)": {
				animationName: '$opacityChange',
				animationDuration: '1s',
				animationDelay: '0.66s',
				animationTimingFunction: 'ease-in-out',
				animationIterationCount: 'infinite',
			},
		}
},
	text: {
		textAlign: 'center',
		fontSize: '1.4em',
		color: '#282828',
		bottom: '1em',
		left: 0,
		right: 0,
		position: 'absolute',
	},
});

export default function Loader() {
  const { t } = useTranslation('dictionary');
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<div className={classes.loader}>
				<span></span><span></span><span></span>
				<div className={classes.text}>{t('завантаження')}</div>
			</div>
		</div>
	);
}
