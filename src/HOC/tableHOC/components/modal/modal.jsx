import React, { useState, useEffect } from "react";
import {useTranslation} from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Btn from "@components/Button";

const Modal = (props) => {
  const { open, rows, onUpdate, setOpen } = props;
  const { t } = useTranslation(['table', 'btn']);
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(rows)
  }, [rows]);

  const onSave = () => {
    onUpdate(items);
    setOpen(false);
  };

  const onCancel = () => setOpen(false);

  const handleChange = (event) => {
    const prepareItems = items.map( item => {
      if(item.id === event.target.name ){
        return {...item, hide: !event.target.checked}
      }
      return item
    });
    setItems(prepareItems);
  };
  return (
    <div>
      <Dialog open={open} maxWidth="md" fullWidth aria-labelledby="form-dialog-title">
				<DialogTitle>
					<Grid container justify="flex-end" spacing={1}>
						<Typography variant="h6" style={{ padding: 5, margin: '0 auto' }} align="center">
              {t('Налаштування відображення таблиці')}
						</Typography>
						<IconButton aria-label="close" onClick={onCancel} size="small" style={{ width: '30px', height: '30px' }}>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					</Grid>
				</DialogTitle>
        <DialogContent>
          {items.map((item) => (
            <Grid item xs={12} >
              <FormControlLabel key={item.id}
                control={
                  <Checkbox
                    checked={!item.hide}
                    disabled={item.notChange}
                    onChange={handleChange}
                    name={item.id}
                    color="primary"
                  />
                }
                label={t(item.label)}
              />
              {item.name}
            </Grid>
          ))}

        </DialogContent>
        <DialogActions>
					<Btn onClick={onCancel}><CancelIcon />{t('btn:Скасувати')}</Btn>
					<Btn onClick={onSave}><SaveIcon />{t('btn:Зберегти')}</Btn>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
