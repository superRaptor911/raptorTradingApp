/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import Alert from '@mui/material/Alert';
import {Button, Paper, TextField, Typography} from '@mui/material';
import Switch from '@mui/material/Switch';
import {createUseStyles} from 'react-jss';
import {useStore} from '../../../store';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const useStyles = createUseStyles({
  itemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
});

const genTextualContract = (coinId, price, count, transType) => {
  const str = `${transType} ${count} ${coinId} when price ${
    transType === 'SELL' ? 'drops below' : 'exceeds above'
  } ${price}`;

  return str;
};

const checkIfChanged = (rule, enabled, coinId, price, count, transType) => {
  const isChanged = !(
    rule.enabled == enabled &&
    rule.coinId == coinId &&
    rule.price == price &&
    rule.count == count &&
    rule.transType == transType
  );

  return isChanged;
};

const RuleItem = ({rule, updateRule}) => {
  const classes = useStyles();
  const [enabled, setEnabled] = useState(false);
  const [coinId, setCoinId] = useState('dogeinr');
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [transType, setTransType] = useState('SELL');
  const [isModified, setIsModified] = useState(null);
  const [textual, setTextual] = useState('');

  const coins = useStore(state => state.coins);

  useEffect(() => {
    if (rule) {
      setCoinId(rule.coinId);
      setCount(rule.count);
      setPrice(rule.price);
      setTransType(rule.transType);
      setEnabled(rule.enabled);
    }
  }, [rule]);

  useEffect(() => {
    setTextual(genTextualContract(coinId, price, count, transType));
    setIsModified(
      checkIfChanged(rule, enabled, coinId, price, count, transType),
    );
  }, [coinId, price, count, transType]);

  const handleUpdatePress = () => {
    rule.enabled = enabled;
    rule.coinId = coinId;
    rule.price = price;
    rule.count = count;
    rule.transType = transType;
    updateRule(rule);
    setIsModified(false);
  };

  return (
    <Paper sx={{marginBottom: 2, marginTop: 1, padding: 1}}>
      <div className={classes.itemContainer}>
        <Typography>Enabled</Typography>
        <Switch />
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
        <Typography>Coin count</Typography>
        <TextField
          label="Count"
          variant="outlined"
          type="number"
          value={count}
          onChange={e => setCount(e.target.value)}
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
          onChange={e => setPrice(e.target.value)}
          sx={{marginLeft: 'auto'}}
        />
      </div>
      <Alert severity="info">{textual}</Alert>
      {isModified && (
        <Button
          style={{textAlign: 'center', width: '100%', marginTop: 10}}
          onClick={handleUpdatePress}>
          Update
        </Button>
      )}
    </Paper>
  );
};

export default RuleItem;
