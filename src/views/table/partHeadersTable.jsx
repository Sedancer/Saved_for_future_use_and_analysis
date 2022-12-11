import React from "react";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
		td: {
			fontSize: 15,
			fontWeight: "bold",
			paddingLeft: 10,
			paddingRight: 15,
			display: "flex",
			letterSpacing: "1px"
		}
  });

function HeadersTable({order, orderBy, rows, onRequestSort, type}) {
	const classes = useStyles();
  const { t } = useTranslation('table');
  const createSortHandler = func => property => event => func(event, property);
  const firstSortHandler = createSortHandler(onRequestSort);
  return (
    <TableHead style={{backgroundColor: '#596671'}}>
      <TableRow>
        {type === 'collapsible' && <TableCell />}
        {rows.map(
          row => (
            <TableCell key={row.id} padding="none" style={{width: row.width, height: 50}}>
              <TableSortLabel
								className={classes.td}
                active={orderBy === row.id}
                direction={order}
                style={{justifyContent: ((row.label === "Дії") ? 'flex-end' : 'flex-start')}}
                onClick={firstSortHandler(row.id)}
              >
                {t(row.label)}
              </TableSortLabel>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

export default React.memo(HeadersTable);
