import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import UpdateIcon from '@material-ui/icons/Update';
import Table from "@views/table/targetTable";
import WrapTablePage from "@views/wrapTablePage";
import Filters from "@views/filters";
import {TableHOC} from "@/HOC";
import {useDispatch, useSelector} from "react-redux";
import {GET_CALL_POST} from "@redux/rings/actions";
import Btn from "@components/Button";

const TableWithSettings = TableHOC(Table, "ring");

const Rings = () => {
	const dispatch = useDispatch();
  const { t } = useTranslation(['btn']);
	const { rings, total } = useSelector((state) => state.rings);
	const [filterList, getFiltersFields ] = useState([]);
	const [data, getData ] = useState([]);
  const [params, setParams] = useState({
    page: 0,
    limit: 50,
    sortField: 'callId',
    isAsc: false
  });


  const update = () => dispatch(GET_CALL_POST({filterList, params}));
	useEffect(() => {
		update();
		const interval = setInterval(() => {
			update();
		}, 60000);
		return () => {
			clearInterval(interval);
		};
	}, [dispatch]);

	useEffect( ()=> {
		getData(rings)
	}, [rings])

  useEffect(() => {
    update()
  }, [filterList, params, getFiltersFields, dispatch])

	return (
			<WrapTablePage
				table={<TableWithSettings
          total={total}
          params={params}
          setParams={setParams}
          data={data}
          btnBlock={<Btn onClick={update}><UpdateIcon/> {t('btn:Оновити')}</Btn>}/>}
				filters={<Filters name="ring" getFiltersFields={getFiltersFields} />}
			/>
	)
};

export default Rings;
