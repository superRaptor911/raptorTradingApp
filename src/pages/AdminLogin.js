import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'
import {useState} from 'react';
import {setCookie} from '../components/Utility';
import {useHistory} from 'react-router';


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  container: {
    marginTop: 100,
    margin: 'auto',
    width: '90%',
    maxWidth: 600
  },

  button: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

})

const AdminLogin = () => {
  const classes = useStyles()
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = () => {
    setCookie('hash', password);
    history.push("/");
  }

  return (
    <div className={classes.container}>
      {/* Email */}
      <TextField className={classes.field}
        onChange={(e) => setPassword(e.target.value)}
        label="Admin Pass" 
        variant="outlined" 
        color="secondary" 
        fullWidth
        required
      />

        {/* Submit Button */}
        <Button className={classes.button}
          type="submit" 
          color="primary" 
          variant="contained"
          onClick= {handleSubmit}
        >
          Submit
        </Button>

    </div>
  );
}

export default AdminLogin
