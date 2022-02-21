import React, {useState, useEffect} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import {Button, IconButton, Paper, TextField, Typography} from '@mui/material';
import Switch from '@mui/material/Switch';
import {createUseStyles} from 'react-jss';
import {useStore} from '../../../store';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {StopLoss} from '../../../types';
import {genTextualContract, checkIfRuleChanged} from './helper';
import Visibility from '../../Visibility';

interface RuleItemProps {
  rule: StopLoss;
  updateRule: (rule: StopLoss) => void;
  handleDelete: (id: string) => void;
}

const useStyles = createUseStyles({
  itemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
});

const RuleItem = ({rule, updateRule, handleDelete}: RuleItemProps) => {
  const classes = useStyles();
  const [isEnabled, setisEnabled] = useState(false);
  const [coinId, setCoinId] = useState('dogeinr');
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [condition, setCondition] = useState('LESS');
  const [transType, setTransType] = useState('SELL');
  const [isModified, setIsModified] = useState(false);
  const [textual, setTextual] = useState('');

  const coins = useStore(state => state.coins);

  useEffect(() => {
    if (rule) {
      setCoinId(rule.coinId);
      setCount(rule.count);
      setPrice(rule.price);
      setTransType(rule.transType);
      setisEnabled(rule.isEnabled);
      setCondition(rule.condition);
    }
  }, [rule]);

  useEffect(() => {
    setTextual(genTextualContract(coinId, price, count, transType, condition));
    setIsModified(
      checkIfRuleChanged(
        rule,
        isEnabled,
        coinId,
        price,
        count,
        transType,
        condition,
      ),
    );
  }, [isEnabled, coinId, price, count, transType, condition]);

  const handleUpdatePress = () => {
    rule.isEnabled = isEnabled;
    rule.coinId = coinId;
    rule.price = price;
    rule.count = count;
    rule.transType = transType;
    rule.condition = condition;
    updateRule(rule);
    setIsModified(false);
  };

  const handleCheck = (event: {
    target: {checked: boolean | ((prevState: boolean) => boolean)};
  }) => {
    setisEnabled(event.target.checked);
  };

  return (
    <Accordion sx={{backgroundColor: 'secondary.light', marginBottom: 1}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Alert
          severity={rule.isEnabled ? 'success' : 'error'}
          style={{width: '100%'}}>
          {textual}
        </Alert>
      </AccordionSummary>
      <AccordionDetails>
        <Paper sx={{marginBottom: 2, marginTop: 1, padding: 1}}>
          <IconButton
            style={{color: 'red'}}
            onClick={() => handleDelete(rule._id)}>
            <DeleteIcon />
          </IconButton>
          <div className={classes.itemContainer}>
            <Typography style={{color: 'blue'}}>Enabled</Typography>
            <Switch checked={isEnabled} onChange={handleCheck} />
          </div>

          <div className={classes.itemContainer}>
            <Typography>Coin</Typography>
            <Select
              value={coinId}
              label="Coin"
              onChange={e => setCoinId(e.target.value)}
              sx={{width: '60%', margin: 1, marginLeft: 'auto'}}>
              {coins &&
                coins.map(item => (
                  <MenuItem value={item.id} key={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </div>

          <div className={classes.itemContainer}>
            <Typography>Type</Typography>
            <Select
              value={transType}
              label="Type"
              onChange={e => setTransType(e.target.value)}
              sx={{width: '60%', margin: 1, marginLeft: 'auto'}}>
              <MenuItem value="SELL"> SELL </MenuItem>
              <MenuItem value="BUY"> BUY </MenuItem>
            </Select>
          </div>

          <div className={classes.itemContainer}>
            <Typography>Condition</Typography>
            <Select
              value={condition}
              label="Type"
              onChange={e => setCondition(e.target.value)}
              sx={{width: '60%', margin: 1, marginLeft: 'auto'}}>
              <MenuItem value="LESS"> LESS </MenuItem>
              <MenuItem value="GREATER"> GREATER </MenuItem>
            </Select>
          </div>

          <div className={classes.itemContainer}>
            <Typography>Coin count</Typography>
            <TextField
              label="Count"
              variant="outlined"
              type="number"
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              sx={{marginLeft: 'auto'}}
            />
          </div>

          <div className={classes.itemContainer}>
            <Typography>{transType} Price</Typography>
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              sx={{marginLeft: 'auto'}}
            />
          </div>
          <Visibility hide={!isModified}>
            <Button
              style={{textAlign: 'center', width: '100%', marginTop: 10}}
              onClick={handleUpdatePress}>
              Update
            </Button>
          </Visibility>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};

export default RuleItem;
