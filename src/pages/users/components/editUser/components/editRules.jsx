import React, { useState, useEffect } from "react";
import {useTranslation} from "react-i18next";
import { Dialog, DialogContent, TextField, DialogTitle, Grid, Button } from "@material-ui/core";
import { GET_CLAIM_NAME, POSSIBLE_CLAIMS } from "@/utils/claims";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {filter, isEmpty} from "lodash";


const EditUserRules = ({ onSubmit, description, roles, login, isOpen, onClose }) => {
  const [possibleRules, setPossibleRules] = useState([]);
  const [newRoles, setRoles] = useState(roles);

  const [newDescription, setDescription] = useState();
  useEffect(() => {
    setPossibleRules(POSSIBLE_CLAIMS().map((
      item => ({
        name: item,
        checked: roles.includes(item),
        title: GET_CLAIM_NAME(item)
      }))));
    setDescription(description);
  }, [description, roles]);

  const setLocalDescription = (event) => {
    setDescription(event.target.value)
  };

  const editOneRole = (event) => {
    const newVR = possibleRules.map(item => {
      if (item.name === event.target.name) return {...item, checked: event.target.checked}
      return item
    })
    setPossibleRules(newVR);
    const filterRoles = filter(newVR, ({checked}) => checked);
    if (isEmpty(filterRoles)) return setRoles([]);
    const arrSrtRoles = filterRoles.map(({name}) => name);
    setRoles(arrSrtRoles);
  };
  const mayBePossibleRulesIsEmpty = !isEmpty(possibleRules);
  const { t } = useTranslation(['users', 'btn']);
  const { t:rulesT } = useTranslation('rules');
    return (
        <Dialog
            open={isOpen}
            fullWidth
            maxWidth="md"
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{`${t('Редагування прав та опису користувача')}: ${login}`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item container xs={12}>
                      {mayBePossibleRulesIsEmpty && possibleRules.map((item) => (
                          <FormControlLabel
                            key={item.name}
                            control={
                              <Checkbox
                                checked={item.checked}
                                onChange={(e)=>editOneRole(e)}
                                name={item.name}
                                color="primary"
                              />
                            }
                            label={rulesT(item.title)}
                          />
                      ))}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-static"
                            label={t('Опис')}
                            fullWidth
                            value={newDescription}
                            onChange={(e)=> setLocalDescription(e)}
                            multiline
                            rows="4"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "right " }}>
                        <Button variant="outlined" size="small" style={{ margin: 2 }} onClick={() => onClose()}>
                          {t('btn:Скасувати')}
                        </Button>
                        <Button variant="outlined" size="small" style={{ margin: 2 }} onClick={() => onSubmit(newRoles, newDescription)}>
                          {t('btn:Змiнити')}
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserRules;
