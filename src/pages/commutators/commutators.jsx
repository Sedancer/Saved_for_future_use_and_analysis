import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {find, isEmpty} from "lodash";
import Tooltip from '@material-ui/core/Tooltip';
import {IconButton, Chip, ButtonGroup, Button} from "@material-ui/core";
import {Delete, Edit, Info, SystemUpdateAlt, DoneAll, GridOn, HorizontalSplit} from "@material-ui/icons";
import {AddCommutator, EditCommutator, InfoCommutator, DopInfo} from "./components";
import {TableHOC} from "@/HOC";
import Table from "@views/table";
import WrapTablePage from "@views/wrapTablePage";
import Filters from "@views/filters";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_COMMUTATOR, DOP_INFO, filterCommutators, GET_MESSAGES, SYNC} from "@redux/commutators/actions";
import {templateJsonFile} from "@/utils/templateJsonFile";
import { GET_COMMUTATORS } from "@/store/commutators/actions";
import AddBoxIcon from '@material-ui/icons/AddBox';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import { CLIENT_NAME } from '@/http/config';
import {
  RECONECT,
  openCommutators,
  changeOpenCommutator
} from "@redux/commutators/actions";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
const TableWithSettings = TableHOC(Table, "commutators");

const useStyles = makeStyles({
  actions: {
    '& .MuiButtonBase-root': {
      marginLeft: '-10px',
      position: 'relative',
      '&:hover' : {
        zIndex: 1,
      }
    }
  }
});

const KEY = 'ovopName';
const Commutators = () => {
	const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation(['commutators', 'btn']);
	const {
	  full: fullCommutators,
    current,
    dopInfo,
    openedListCommutators
	} = useSelector((state) => state.commutators);
	const update = () => dispatch(GET_COMMUTATORS());
	useEffect(() => {
		update();
		const interval = setInterval(() => {
			update();
		}, 60000);
		return () => {
			clearInterval(interval);
		};
	}, [dispatch]);
	const [filterList, getFiltersFields] = useState([]);
	const [data, setData] = useState(fullCommutators);
	const [isAddCommutator, setIsAddCommutator] = useState(false);
	const [view, setView] = useState(null);
	const [editC, setEditC] = useState(null);
	const onSync = id => dispatch(SYNC(id));
	const info = id => dispatch(DOP_INFO(id));
	const getMessages = id => dispatch(GET_MESSAGES(id));
	const deleteCommutator = id => dispatch(DELETE_COMMUTATOR(id));
	const reConnect = id => dispatch(RECONECT(id));
	const isOpenAllCommutators = !isEmpty(openedListCommutators);

	const downloadJSONFile = (id) => {
		const element = document.createElement("a");
		const commutator = find( data, ({ovopId}) => ovopId === id);
		//TODO: Здесь все значени commutator чисел в строки
		const template = templateJsonFile(commutator);
		const file = new Blob([JSON.stringify(template)], {type: 'application/json'});
		element.href = URL.createObjectURL(file);
		element.download = `commutator_${commutator.ovopName}.json`;
		document.body.appendChild(element);
		element.click();
	};
  const mapper = (fullC) => (
    fullC.map((commutator) => {
      let fields = [
        {
          label: `X1 ${t('команд')}: ${commutator?.x1Commands}`,
          title: `X1 ${t('відповідей')}: ${commutator?.x1Answers}`,
          value: `Last: ${moment(commutator?.lastX1Command).format("YYYY-MM-DD HH:mm")}`,
          date: `Last: ${moment(commutator?.lastX1Answer).format("YYYY-MM-DD HH:mm")}`
        },
        {
          label: `X2 повідомлень: ${commutator?.x2Messages}`,
          title: undefined,
          value: `Last: ${moment(commutator?.lastX2Message).format("YYYY-MM-DD HH:mm")}`,
          date: undefined
        }
      ];
      if (CLIENT_NAME === 'EricssonEps') {
        fields = [
          {
            label: `X1 SSH ${t('команд')}: ${commutator?.x1SshStatus?.x1Commands}`,
            title: `X1 SSH ${t('відповідей')}: ${commutator?.x1SshStatus?.x1Answers}`,
            value: `Last: ${moment(commutator?.x1SshStatus?.lastX1Command).format("YYYY-MM-DD HH:mm")}`,
            date: `Last: ${moment(commutator?.x1SshStatus?.lastX1Answer).format("YYYY-MM-DD HH:mm")}`
          },
          {
            label: `X1 SSH ping ${t('команд')}: ${commutator?.x1SshStatus?.x1PingCommands}`,
            title: `X1 SSH ping ${t('відповідей')}: ${commutator?.x1SshStatus?.x1PingAnswers}`,
            value: `Last: ${moment(commutator?.x1SshStatus?.lastX1PingCommand).format("YYYY-MM-DD HH:mm")}`,
            date: `Last: ${moment(commutator?.x1SshStatus?.lastX1PingAnswer).format("YYYY-MM-DD HH:mm")}`
          },
          {
            label: `X1 TCP ${t('команд')}: ${commutator?.x1TcpStatus?.x1Commands}`,
            title: `X1 TCP ${t('відповідей')}: ${commutator?.x1TcpStatus?.x1Answers}`,
            value: `Last: ${moment(commutator?.x1TcpStatus?.lastX1Command).format("YYYY-MM-DD HH:mm")}`,
            date: `Last: ${moment(commutator?.x1TcpStatus?.lastX1Answer).format("YYYY-MM-DD HH:mm")}`
          },
          {
            label: `X1 TCP ping ${t('команд')}: ${commutator?.x1TcpStatus?.x1PingCommands}`,
            title: `X1 TCP ping ${t('відповідей')}: ${commutator?.x1TcpStatus?.x1PingAnswers}`,
            value: `Last: ${moment(commutator?.x1TcpStatus?.lastX1PingCommand).format("YYYY-MM-DD HH:mm")}`,
            date: `Last: ${moment(commutator?.x1TcpStatus?.lastX1PingAnswer).format("YYYY-MM-DD HH:mm")}`
          },
          {
            label: `X1 HLR/HSS ${t('команд')}: ${commutator?.x1HlrStatus?.x1Commands}`,
            title: `X1 HLR/HSS ${t('відповідей')}: ${commutator?.x1HlrStatus?.x1Answers}`,
            value: `Last: ${moment(commutator?.x1HlrStatus?.lastX1Command).format("YYYY-MM-DD HH:mm")}`,
            date: `Last: ${moment(commutator?.x1HlrStatus?.lastX1Answer).format("YYYY-MM-DD HH:mm")}`
          },
          {
            label: `X2 messages: ${commutator?.x2Status?.x2MessagesReceived}`,
            title: `X2 replies: ${commutator?.x2Status?.x2RepliesSent}`,
            value: `Last: ${moment(commutator?.x2Status?.lastX2MessageReceived).format("YYYY-MM-DD HH:mm")}`,
            date: `Last: ${moment(commutator?.x2Status?.lastX2ReplySent).format("YYYY-MM-DD HH:mm")}`
          },
          {
            label: `X2 keepalives received: ${commutator?.x2Status?.keepalivesReceived}`,
            title: `X2 keepalives sent: ${commutator?.x2Status?.keepalivesSent}`,
            value: `Last: ${moment(commutator?.x2Status?.lastKeepaliveReceived).format("YYYY-MM-DD HH:mm")}`,
            date: `Last: ${moment(commutator?.x2Status?.lastKeepaliveSent).format("YYYY-MM-DD HH:mm")}`
          },
        ];
      };

      return ({
        ...commutator,
        isCollapsible: openedListCommutators.includes(commutator.ovopName),
        key: commutator[KEY],
        info: [
          ...fields,
          {
            label: `X3 ${t('повідомлень')}: ${commutator?.x3Messages}`,
            title: undefined,
            value: `Last: ${moment(commutator?.lastX3Message).format("YYYY-MM-DD HH:mm")}`,
            date: undefined
          },
        ],
        status: (
          <>
            <Chip style={{borderColor: commutator.sync ? "#ddd" : "red", margin: "0 3px"}} variant="outlined" label="sync"/>
            {CLIENT_NAME !== 'EricssonEps' && (
              <Chip style={{borderColor: commutator.x1 ? "#ddd" : "red", margin: "0 3px"}} variant="outlined" label="x1"/>
            )}
            {CLIENT_NAME === 'EricssonEps' && (
              <>
                <Chip style={{borderColor: commutator?.x1SshStatus?.x1Status ? "#ddd" : "red", margin: "0 3px"}} variant="outlined" label="x1 SSH"/>
                <Chip style={{borderColor: commutator?.x1TcpStatus?.x1Status ? "#ddd" : "red", margin: "0 3px"}} variant="outlined" label="x1 TCP"/>
              </>
            )}
            <Chip style={{borderColor: commutator.x2 ? "#ddd" : "red", margin: "0 3px"}} variant="outlined" label="x2"/>
            <Chip style={{borderColor: commutator.x3 ? "#ddd" : "red", margin: "0 3px"}} variant="outlined" label="x3"/>
          </>
        ),
        actions: (
          <div className={classes.actions}>
            <Tooltip title="save config">
              <IconButton aria-label="download" onClick={() => downloadJSONFile(commutator.ovopId)}>
                <SystemUpdateAlt fontSize="small"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="x1&x2 info">
              <IconButton aria-label="info" onClick={() => getMessages(commutator.ovopId)}>
                <Info fontSize="small"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="edit">
              <IconButton aria-label="edit" onClick={() => onEdit(commutator.ovopId)}>
                <Edit fontSize="small"/>
              </IconButton>
            </Tooltip>
            {CLIENT_NAME !== 'HuaweiNgnFix' && (
              <Tooltip title="x1 reconnect">
                <IconButton aria-label="reConnect" onClick={() => onReConnect(commutator.ovopId)}>
                  <SyncAltIcon fontSize="small"/>
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="remove">
              <IconButton aria-label="delete" onClick={() => onDelete(commutator.ovopId)}>
                <Delete fontSize="small"/>
              </IconButton>
            </Tooltip>
          </div>
        )
      });
    }));

	useEffect(() => {
		setData(mapper(fullCommutators))
	}, [fullCommutators, filterList, openedListCommutators])

	useEffect(() => {
		dispatch(filterCommutators(filterList));
	}, [filterList, getFiltersFields])

	const onEdit = (id) => {
		setEditC(fullCommutators.find((c) => c.ovopId === id));
	};

  const onReConnect = (id) => {
    const isOk = window.confirm(`${t("Ви впевнені")}?`)
    if (isOk) reConnect(id);
  };

	const onDelete = (id) => {
		const isOk = window.confirm(`${t("Ви впевнені")}?`);
		if (isOk) deleteCommutator(id);
	};
  const changeSelectCommutator = (name) => dispatch(changeOpenCommutator(name));

  const selectAllCommutator = () => dispatch(openCommutators(!isOpenAllCommutators));

  const changeView = () => {
    const val = view ? null : 'tile';
    setView(val);
  }

	const onClickSetAddCommutator =  () => setIsAddCommutator(true);
	return (
		<div>
			<WrapTablePage
				table={
				  <TableWithSettings
            type='collapsible'
            fullCommutators={fullCommutators}
            collapsibleFn={changeSelectCommutator}
            isFilter
            data={data}
            view={view}
            btnBlock={
              <ButtonGroup variant="outlined">
                {view && (
                  <Button onClick={changeView} variant="outlined" startIcon={<HorizontalSplit/>}>
                    {t('btn:Таблиця')}
                  </Button>
                )}
                {!view && (
                  <Button onClick={changeView} variant="outlined" startIcon={<GridOn/>}>
                    {t('btn:Плитка')}
                  </Button>
                )}
                <Button onClick={selectAllCommutator} variant="outlined" startIcon={<DoneAll/>}>
                  {isOpenAllCommutators
                    ? t('Закрити всі')
                    : t('Відкрити всі')
                    }
                </Button>
                <Button onClick={onClickSetAddCommutator} variant="outlined" startIcon={<AddBoxIcon/>}>
                  {t('btn:Додати')}
                </Button>
              </ButtonGroup>
            }
          />
				}
				filters={<Filters name="commutators" getFiltersFields={getFiltersFields}/>}
			/>
			{current && (
				<InfoCommutator
					isOpen={Boolean(current)}
					dopInfo={info}
					onSync={onSync}
					commutator={current}
					onClose={() => getMessages(null)}
				/>
			)}
			{dopInfo && (
				<DopInfo isOpen={Boolean(dopInfo)} dopInfo={dopInfo} onClose={() => info(null)}/>
			)}
			{editC && <EditCommutator isOpen onClose={() => setEditC(null)} commutator={editC}/>}
			<AddCommutator isOpen={isAddCommutator} onClose={() => setIsAddCommutator(false)}/>
		</div>
	);
};

export default Commutators;
