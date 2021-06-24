import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardMainArticle from '../CardMainArticle';
import CardWikiArticle from '../CardWikiArticle';
import CardOtherArticle from '../CardOherArticles'
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import api from '../../services/Api';
import { GrArticle } from 'react-icons/gr';
import { FaWikipediaW } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        height: 'auto',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(1600),
        },
        paddingTop: 150,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 100
    },
    paper: {
        backgroundColor: '#FEF6F1',
        paddingBottom: 50
    },
    button: {
        root: {
            '& > span': {
                margin: theme.spacing(2),
            },
        }
    },
    titleYourArticle: {
        paddingTop: 20,
        paddingLeft: 20
    },

}));

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

export default function ArticlesComparison(props) {
    const classes = useStyles();
    const [rating, setRating] = React.useState(0)

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleSaveArticle = (event) => {
        const user_id = localStorage.getItem("user_id")
        const body = {
            "title": props.articleComparison.MainArticle.Title,
            "url": props.articleComparison.MainArticle.Url,
            "rating": parseInt(rating),
            "user_id": parseInt(user_id)
        }
        console.log(body)
        api.post('/article/create', body)
            .then(function (response) {
                //---set Authorization header ---
                console.log(response)
                //token store in session storage
            })
            .catch(function (error) {
                console.log("error response :: ", error);
            });
    };

    return (
        <div className={classes.root}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Rate this article</Typography>
                <StyledRating
                    name="customized-color"
                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    precision={1}
                    value={rating}
                    onChange={handleRatingChange}
                    icon={<FavoriteIcon fontSize="inherit" />}
                />
            </Box>
            <div className={classes.button}>
                <Button onClick={handleSaveArticle}>Save article</Button>
            </div>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Paper elevation={5} className={classes.paper}>
                    <div>
                        {
                            props.articleComparison != null ?
                                <div>
                                    <Grid className={classes.titleYourArticle} spacing='2' container direction="row" alignItems="center">
                                        <Grid item>
                                            <GrArticle size={50} />
                                        </Grid>
                                        <Grid item>
                                            <h3>Your article</h3>
                                        </Grid>
                                    </Grid>
                                    <CardMainArticle mainArticle={props.articleComparison.MainArticle} />
                                    <Grid className={classes.titleYourArticle} container direction="row" alignItems="center">
                                        <Grid item>
                                            <FaWikipediaW size={50} />
                                        </Grid>
                                        <Grid item>
                                            <h3>iki</h3>
                                        </Grid>
                                    </Grid>
                                    <CardWikiArticle wikiArticle={props.articleComparison.WikiArticle} />
                                    <Grid className={classes.titleYourArticle} container direction="row" alignItems="center">
                                        <Grid item>
                                            <FcGoogle size={50} />
                                        </Grid>
                                        <Grid item>
                                            <h3>oogle search</h3>
                                        </Grid>
                                    </Grid>
                                    {props.articleComparison.OtherArticlesFound.map((item, i) => <CardOtherArticle otherArticle={item} />)}
                                </div>
                                :
                                <div></div>
                        }
                    </div>
                </Paper>
            </Slide>
        </div >
    );
}