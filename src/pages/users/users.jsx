import React, { useState, useEffect } from "react";
import {useTranslation} from "react-i18next";
import { IconButton, Chip } from "@material-ui/core";
import Btn from "@components/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { AddUser, EditUser } from "./components";
import { Edit, Delete } from "@material-ui/icons";
import { TableHOC } from "@/HOC";
import { makeStyles } from "@material-ui/core/styles";
import { GET_CLAIM_NAME } from "@/utils/claims";
import WrapTablePage from "@views/wrapTablePage";
import Table from '@views/table';
import {GET_USERS} from "@redux/users/actions";
import {useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const TableWithSettings = TableHOC(Table, "users");

const Users = (props) => {
    const classes = useStyles();
    const { t } = useTranslation(['users', 'btn']);
    const { t:rulesT } = useTranslation('rules');
    const [isUserCreate, setIsUserCreate] = useState(false);
    const [usersFilters, setUsersFilters] = useState([]);
    const [userEdit, setUserEdit] = useState(null);

    const onEdit = (id) => {
        const user = props.users.find((user) => user.userId === id);
        setUserEdit(user);
    };
    const updateUser = (update) => {
        setUserEdit(null);
        props.editUser(update);
    };
    const onDelete = (id) => {
        const user = props.users.find((user) => user.userId === id);
        const isDelete = window.confirm(`${t('Ви впевнені що хочете видалити користувача')} ${user.login}?`);
        if (isDelete) props.deleteUser(id);
    };
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(GET_USERS());
		const interval = setInterval(() => {
			dispatch(GET_USERS());
		}, 1000000);
		return () => {
			clearInterval(interval);
		};
	}, [dispatch]);


	useEffect(() => {
        setUsersFilters(
            props.users.map((user) => {
                return {
                    ...user,
                    roles: user.roles.map((claim) => (
                        <Chip key={claim} style={{ margin: 1 }} size="small" label={rulesT(GET_CLAIM_NAME(claim))} className={classes.chip} />
                    )),
                    actions: (
                        <div style={{ maxWidth: 150 }}>
                            <IconButton onClick={() => onEdit(user.userId)}>
                                <Edit fontSize="small"/>
                            </IconButton>
                            <IconButton onClick={() => onDelete(user.userId)}>
                                <Delete fontSize="small"/>
                            </IconButton>
                        </div>
                    ),
                };
            })
        );
    }, [props.users]);
    return (
        <div>
            <WrapTablePage
							table={
								<TableWithSettings
									data={usersFilters}
									btnBlock={<Btn onClick={() => setIsUserCreate(true)}><PersonAddIcon/> {t('btn:Додати')}</Btn>}
								/>}
						/>
            <AddUser
                loading={props.isLoadCheck}
                isLoginFree={props.isLoginFree}
                check={props.check}
                onClose={() => setIsUserCreate(false)}
                isOpen={isUserCreate}
                onSubmit={props.addUser}
            />
            {userEdit && (
                <EditUser
                    onClose={() => setUserEdit(null)}
                    onEditRules={props.editUser}
                    editUserPassword={props.editUserPassword}
                    isOpen={userEdit}
                    onSubmit={(update) => updateUser(update)}
                    user={userEdit}
                />
            )}
        </div>
    );
};

export default Users;
