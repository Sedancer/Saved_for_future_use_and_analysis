import React, {useState, useEffect, useCallback} from "react";
import UpdateIcon from '@material-ui/icons/Update';
import {IconButton} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {Info} from "@material-ui/icons";
import {InfoModal} from "./components";
import {TableHOC} from "@/HOC";
import Table from "@views/table";
import WrapTablePage from "@views/wrapTablePage";
import Filters from "@views/filters";
import {useDispatch, useSelector} from "react-redux";
import {filterTargets, GET_TARGETS} from "@redux/targets/actions";
import Btn from "@components/Button";

const TableWithSettings = TableHOC(Table, "targets");

const Targets = () => {
	const dispatch = useDispatch();
  const { t } = useTranslation(['btn']);
	const {targets} = useSelector((state) => state.targets);
	const [filterList, getFiltersFields] = useState([]);
	const [data, getData] = useState([]);

	const [isOpen, getOpen] = useState(false);
	const handlerGetInfo = ({id, neId}) => () => {
			setFullInfo({id, neId})
			getOpen(true);
		};

	const update = () => dispatch(GET_TARGETS(filterList));
	useEffect(() => {
		update();
		const interval = setInterval(() => {
			update();
		}, 1000000);
		return () => {
			clearInterval(interval);
		};
	}, [dispatch]);

	useEffect(() => {
		getData(mapper(targets))
	}, [targets])

	useEffect(() => {
		dispatch(filterTargets(filterList));
	}, [filterList, getFiltersFields, dispatch])

	const [fullInfo, setFullInfo] = useState(null);
	const onCloseModal = () => getOpen(false);

	const mapper = useCallback((arr) => {
		return arr.map((t) => ({
			...t,
			actions: (
				<div>
					<IconButton
						onClick={handlerGetInfo({id: t.targetId, neId: t.neId})}
					>
						<Info fontSize="small"/>
					</IconButton>
				</div>
			)
		}))
	});

	return (
		<>
			<WrapTablePage
				table={<TableWithSettings data={data} btnBlock={<Btn onClick={update}><UpdateIcon/> {t('btn:Оновити')}</Btn>}/>}
				filters={<Filters name="object" getFiltersFields={getFiltersFields}/>}
			/>
			{isOpen && <InfoModal onClose={onCloseModal} isOpen properties={fullInfo}/>}
		</>
	);
}

export default Targets;
