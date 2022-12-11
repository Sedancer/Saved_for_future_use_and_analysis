export const desc = (a, b, orderBy) => {
    if (a[orderBy] > b[orderBy]) {
        return 1;
    } else if (a[orderBy] === b[orderBy]) {
        return 0;
    } else {
        return -1;
    }
};

export function stableSort(array, first, second) {
	// TODO: Оптимизация, проверка на пустору и на то что єто масив
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = first(a[0], b[0]);
        if (order !== 0) return order;
        const subOrder = second(a[0], b[0]);
        if (subOrder !== 0) return subOrder;

        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}
export const getSorting = (order, orderBy) => (order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy));