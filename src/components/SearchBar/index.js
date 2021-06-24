import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import api from '../../services/Api';
import { Button } from 'react-bootstrap';
import './style.scss';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        left: 500,
        padding: '4px 10px',
        display: 'flex',
        alignItems: 'center',
        width: 500,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 8,
        paddingRight: 10
    },
    divider: {
        height: 28,
        margin: 4,
    },
    loading: {
        width: 500
    }
}));

export default function CustomizedInputBase(props) {
    const [url, setUrl] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const classes = useStyles();

    const handleSubmit = e => {
        e.preventDefault();
        const body = { url: url }
        setLoading(true)
        api.post('/article/check', body)
            .then(function (response) {
                setLoading(false)
                props.functionCallFromParent(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log("error response :: ", error);
            });
    }

    const handleChange = u => {
        setUrl(u.target.value)
    };

    return (
        <div>
            <Paper component="form" className={classes.root}>
                <IconButton className={classes.iconButton} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder="Check your article"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={handleChange}
                />
                <Button onClick={handleSubmit.bind(this)} className={classes.iconButton} aria-label="search" >
                    <SearchIcon />
                </Button>
            </Paper>
            {loading ? <LinearProgress className={classes.loading} /> : <div></div>}
        </div>

    );
}