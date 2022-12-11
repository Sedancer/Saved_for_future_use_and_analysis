import React, {useState, useEffect, useCallback} from "react";
import {useTranslation} from "react-i18next";
import { Grid, Tabs, Tab, IconButton } from "@material-ui/core";
import Btn from "@components/Button";
import { Sync } from "@material-ui/icons";
import { Info, Edit, Delete } from "@material-ui/icons";
import UpdateIcon from '@material-ui/icons/Update';
import { AddSync, InfoModal, EditPeriodSync, EditPlannedSync } from "./components";
import { TableHOC } from "@/HOC";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
	ADD_SYNC_NOW,
	ADD_SYNC_PERIOD,
	CLOSE_INFO_SYNC,
	DELETE_SYNC,
	EDIT_SYNC_PERIOD,
	filterOne,
	filterPeriod,
	filterPlanned,
	GET_SYNC,
	ON_INFO_SYNC,
  DELETE_ALL_IMMEDIATE,
  DELETE_ALL_PERIODIC,
  DELETE_ALL_SCHEDULED,
  GET_SYNC_NOW
} from "@redux/audit/actions";
import Table from "@views/table";
import Filters from "@views/filters/filters";
import WrapTablePage from "@views/wrapTablePage/wrapTablePage";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

const TableAuditWithSettings = TableHOC(Table, "audit");
const TableAuditPeriodWithSettings = TableHOC(Table, "auditPeriod");
const TableAuditPlannedWithSettings = TableHOC(Table, "auditPlanned");

const useStyles = makeStyles({
	tabs: {
		'& .MuiTab-root': {
			borderBottom: '1px solid #999',
		},
		'& .Mui-selected': {
			borderTop: '1px solid #999',
			borderLeft: '1px solid #999',
			borderRight: '1px solid #999',
			borderBottom: '1px solid transparent',
			borderRadius: '4px 4px 0 0',
			backgroundColor: '#525d67',
			boxShadow: '0 3px 6px 0 rgba(0, 0, 0, .16)'
		},
	},
	wrapTab: {
		backgroundColor: '#525d67',
		borderBottom: '1px solid #999',
		borderLeft: '1px solid #999',
		borderRight: '1px solid #999',
		boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
		'&>div': {
			border: 'none'
		}
	},
	indicator: {
		display: "none"
	}
});

const Audit = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
  const { t } = useTranslation(['audit', 'btn']);
	const {
		one,
		period,
		planned,
		currentInfo,
		fetching: {
			infoSync
		}
	} = useSelector((state) => state.sync);

	const update = () => dispatch(GET_SYNC());
	useEffect(() => {
		update();
		const interval = setInterval(() => {
			update();
		}, 30000);
		return () => {
			clearInterval(interval);
		};
	}, [dispatch]);

	const [filterListOne, getFiltersFieldsOne] = useState([]);
	const [filterListPeriod, getFiltersFieldsPeriod] = useState([]);
	const [filterListPlanned, getFiltersFieldsPlanned] = useState([]);

	const [dataOne, setDataOne] = useState([]);
	const [dataPeriod, setDataPeriod] = useState([]);
	const [dataPlanned, setDataPlanned] = useState([]);

	const addSyncNow = (form) => dispatch(ADD_SYNC_NOW(form));
	const addSyncPeriod = (form) => dispatch(ADD_SYNC_PERIOD(form));
	const onInfoSync = (id, ovopId, date, periodInDays) => dispatch(ON_INFO_SYNC(id, ovopId, date, periodInDays));
	const onInfoClose = () => dispatch(CLOSE_INFO_SYNC());
	const onDelete = (id) => dispatch(DELETE_SYNC(id));
	const editSyncPeriod = (form) => dispatch(EDIT_SYNC_PERIOD(form));


	const mapper = useCallback((arr, name) => {
		const mayBeEditPeriod = name === "period";
		const mayBeEditPlanned = name ===  "planned";
		return arr.map((p) => ({
			...p,
			actions: (
				<>
					{false && (<IconButton
						aria-label="info"
						onClick={() => onInfoSync(p.auditId, p.ovopId, p.lastAuditTime, p.periodInDays)}
					>
						<Info fontSize="small"/>
					</IconButton>)
					}
					{mayBeEditPeriod && (
						<IconButton aria-label="edit" onClick={() => onEditSync(p.auditId)}>
							<Edit fontSize="small"/>
						</IconButton>
					)}
					{mayBeEditPlanned && (
						<IconButton aria-label="edit" onClick={() => onEditPlanned(p.auditId)}>
							<Edit fontSize="small"/>
						</IconButton>
					)}
					<IconButton aria-label="delete" onClick={() => onDeleteSync(p.auditId)}>
						<Delete fontSize="small"/>
					</IconButton>
				</>
			),
		}));
	});

	useEffect(() => {
		setDataOne(mapper(one,'one'))
		setDataPeriod(mapper(period,'period'));
		setDataPlanned(mapper(planned,'planned'));
	}, [setDataOne, setDataPeriod, setDataPlanned, planned, period, one, filterListOne, filterListPeriod, filterListPlanned]);

	useEffect(() => {
		dispatch(filterOne(filterListOne));
	}, [dispatch,filterListOne, filterOne])

	useEffect(() => {
		dispatch(filterPeriod(filterListPeriod));
	}, [dispatch, filterListPeriod, filterPeriod])


	useEffect(() => {
		dispatch(filterPlanned(filterListPlanned));
	}, [dispatch, filterListPlanned, filterPlanned])


	const [isOpen, setIsOpen] = useState(false);
	const [isEdit, setEdit] = useState(null);
	const [isEditPlanned, setEditPlanned] = useState(null);
	const [tab, setTabs] = useState(0);

	const onEditSync = (id) => {
		const sync = period.find((sync) => sync.auditId === id);
		setEdit(sync);
	};

	const onEditPlanned = (id) => {
		const sync = planned.find((sync) => sync.auditId === id);
		setEditPlanned(sync);
	};

	const onDeleteSync = (id) => {
		const isOk = window.confirm(`${t('Ви впевнені, що хочете видалити синхронізацію')}?`);
		if (isOk) onDelete(id);
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} className={classes.tabs}>
				<Tabs
					classes={{indicator: classes.indicator}}
					variant="fullWidth" textColor="primary" value={tab} onChange={(_, value) => setTabs(value)}>
					<Tab disableRipple disableFocusRipple label={t('Негайні')}/>
					<Tab disableRipple disableFocusRipple label={t('Періодичні')}/>
					<Tab disableRipple disableFocusRipple label={t('Заплановані')}/>
				</Tabs>
				<div className={classes.wrapTab}>
					{tab === 0 && (
						<WrapTablePage
							table={<TableAuditWithSettings data={dataOne} btnBlock={	<><Btn style={{marginRight: 16}} onClick={update}><UpdateIcon/> {t('btn:Оновити')}</Btn>
								<Btn style={{marginRight: 16}} onClick={() => setIsOpen(true)}><AddCircleOutlineIcon /> {t('btn:Додати')}</Btn>
								<Btn onClick={() => (dispatch(DELETE_ALL_IMMEDIATE()))} ><DeleteSweepIcon />{t('Видалити всі')} </Btn>
              </>} />}
							filters={<Filters name="audit" getFiltersFields={getFiltersFieldsOne}/>}
						/>
					)}
					{tab === 1 && (
						<WrapTablePage
							table={<TableAuditPeriodWithSettings data={dataPeriod} btnBlock={	<><Btn style={{marginRight: 16}} onClick={update}><UpdateIcon/> {t('btn:Оновити')}</Btn>
								<Btn style={{marginRight: 16}}  onClick={() => setIsOpen(true)}><AddCircleOutlineIcon /> {t('btn:Додати')}</Btn>
								<Btn onClick={() => (dispatch(DELETE_ALL_PERIODIC()))} ><DeleteSweepIcon /> {t('Видалити всі')}</Btn>
              </>}  />}
							filters={<Filters name="audit" getFiltersFields={getFiltersFieldsPeriod}/>}/>
					)}
					{tab === 2 && (
						<WrapTablePage
							table={<TableAuditPlannedWithSettings data={dataPlanned} btnBlock={	<><Btn style={{marginRight: 16}} onClick={update}><UpdateIcon/> {t('btn:Оновити')}</Btn>
								<Btn style={{marginRight: 16}} onClick={() => setIsOpen(true)}><AddCircleOutlineIcon /> {t('btn:Додати')}</Btn>
                <Btn style={{marginRight: 16}} onClick={() => dispatch(GET_SYNC_NOW()) } ><Sync/> {t('Синхронізувати всі')}</Btn>
								<Btn onClick={() => (dispatch(DELETE_ALL_SCHEDULED()))} ><DeleteSweepIcon /> {t('Видалити всі')}</Btn>
              </>}  />}
							filters={<Filters name="audit" getFiltersFields={getFiltersFieldsPlanned}/>}
						/>
					)}
				</div>
			</Grid>
			<AddSync
				isOpen={isOpen}
				onSubmit={addSyncPeriod}
				onSubmitNow={addSyncNow}
				onClose={() => setIsOpen(false)}
			/>
			{isEdit && <EditPeriodSync isOpen onClose={() => setEdit(null)} onSubmit={editSyncPeriod} sync={isEdit}/>}
			{isEditPlanned && (
				<EditPlannedSync
					isOpen
					onClose={() => setEditPlanned(null)}
					onSubmit={editSyncPeriod}
					sync={isEditPlanned}/>
			)}

			{(infoSync || currentInfo) && (
				<InfoModal loading={infoSync} isOpen onClose={() => onInfoClose()}/>
			)}
		</Grid>
	);
};

export default Audit;
