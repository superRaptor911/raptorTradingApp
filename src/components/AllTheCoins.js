import {useEffect , useRef, useState} from "react";
import useFetch from "../components/useFetch";
import {serverAddress, sortBy} from '../components/Utility';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Chart from "react-google-charts";

const useStyles = makeStyles({
  title : {
    textAlign: 'center',
  },
  papertext: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    padding: 15,
    width: 'max-content',
    paddingLeft: 20,
    paddingRight: 20,
  },
  paperItem : {
    display: "block",
  },
  paperMargin: {
    marginLeft: 40,
  },
  pieChart: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  item: {
    marginTop: 40,
  }

});


function genCoinsTable(data) {
  
}


const AllTheCoins = ({data}) => {
  const classes = useStyles();
  const [currentStatus, setCurrentStatus] = useState("LOADING ...");

  useEffect(() => {
      if (data.result) {
        setCurrentStatus("");
      }
      else {
        // Error from server
        setCurrentStatus(data.error.err);
      }

  }, [data]);

  return (
    <div>
      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>
    </div>
  );
}

export default AllTheCoins
