import React, {useState, useEffect, useCallback} from "react";
import UpdateIcon from '@material-ui/icons/Update';
import {IconButton} from "@material-ui/core";
import {Info} from "@material-ui/icons";
import {useTranslation} from "react-i18next";
import {InfoModal} from "./components";
import {TableHOC} from "@/HOC";
import Table from "@views/table/targetTable";
import WrapTablePage from "@views/wrapTablePage";
import Filters from "@views/filters";
import {useDispatch, useSelector} from "react-redux";
import {GET_TARGETS_POST} from "@redux/targets/actions";
import Btn from "@components/Button";

const TableWithSettings = TableHOC(Table, "targets");

const Targets = () => {
	const dispatch = useDispatch();
  const { t } = useTranslation(['btn']);
  const {targets, total} = useSelector((state) => state.targets);
  const [filterList, getFiltersFields] = useState([]);
  const [data, getData] = useState([]);
  const [params, setParams] = useState({
    page: 0,
    limit: 50,
    sortField: 'targetId',
    isAsc: false
  });


	const [isOpen, getOpen] = useState(false);
	const handlerGetInfo = ({id, neId}) => () => {
			setFullInfo({id, neId})
			getOpen(true);
		};

	const update = () => dispatch(GET_TARGETS_POST({filterList, params}));
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
    update()
	}, [filterList, params, getFiltersFields, dispatch])

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
				table={<TableWithSettings
          total={total}
          params={params}
          setParams={setParams}
          data={data} btnBlock={<Btn onClick={update}><UpdateIcon/> {t('btn:Оновити')}</Btn>}/>}
				filters={<Filters name="object" getFiltersFields={getFiltersFields}/>}
			/>
			{isOpen && <InfoModal onClose={onCloseModal} isOpen properties={fullInfo}/>}
		</>
	);
}

export default Targets;
