import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 50,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function NestedGrid(props) {
    const classes = useStyles();

    const StyledRating = withStyles({
        iconFilled: {
            color: '#ff6d75',
        },
        iconHover: {
            color: '#ff3d47',
        },
    })(Rating);

    function FormRow(props) {
        return (
            <React.Fragment>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {props.article.title}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    <Link href={props.article.url} target='_blank' rel="noopener noreferrer">
                                        Link to the article
                                    </Link>
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <StyledRating
                                        readOnly
                                        name="customized-color"
                                        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                        value={props.article.rating}
                                        icon={<FavoriteIcon fontSize="inherit" />}
                                    />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                {
                    props.articles.map((item, _) => {
                        return <Grid container item xs={12} style={{ width: 1500 }} >
                            <FormRow article={item} />
                        </Grid>
                    })
                }
            </Grid>
        </div>
    );
}