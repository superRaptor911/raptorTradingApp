import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia';

const UserCard = ({username, image}) => {
  return (
    <Card elevation={1}>
      <CardMedia
        component="img"
        alt={username}
        src={image}
        width="120" 
        height="160"
        title={username}
      />
      <CardHeader
        title={username}
      />
    </Card>
  );
}

export default UserCard
