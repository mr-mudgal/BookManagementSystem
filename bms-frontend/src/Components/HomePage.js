import React from 'react';
import {Card, CardContent, CardMedia, Container, Grid, Typography} from '@mui/material';

import BookImage from "../Public/book-and-glasses-svgrepo-com.svg"

const sections = [
    {
        title: 'Welcome to the Book Management System',
        paragraph: 'This comprehensive system allows you to manage your book collection with ease. Add, Edit, Delete, Search are the some functionality it provides.',
    },
    {
        title: 'How to Add Book?',
        paragraph: 'To Add a New Book go the Create New Book tab in the navigation menu, if you are using mobile then click on the three lines at top-right and then click Create New Book' +
            ' button. It will ask for details like Title, Author, Year and Content of the book. Note: Title of the book is unique. All fields are required through front-end validation.',
    },
    {
        title: 'How to see All Books?',
        paragraph: 'To see All Books go the All Books tab in the navigation menu, if you are using mobile then click on the three lines at top-right and then click All Books button. This will open' +
            ' a new page where you can see a table listing all the books present. This table has sorting / filtering functionality also, which can be found just above the table header.'
    },
    {
        title: 'How to Edit a Book?',
        paragraph: 'When you are on All Books page, there on the last column named Actions you will find a button named Edit. Click on that and new popup will appear. On this popup, it would have' +
            ' prefilled book entries, change the entry you want and click submit. It will ask for confirmation before making the change, on clicking Confirm the book would be modified.',
    },
    {
        title: 'How to Delete a Book?',
        paragraph: 'When you are on All Books page, there on the last column named Actions you will find a button named Edit. It will ask confirmation before deletion, post confirmation the book' +
            ' would be deleted.',
    },
    {
        title: 'Have a Nice Day!',
        paragraph: 'I hope you liked my small project built on React.JS. The backend for this project is built on Node.JS, Express.JS. I used MongoDB as my Database. You can check my other' +
            ' interesting projects on my GitHub. To visit, click on the GitHub logo in the navigation bar at the top. Thank You, for exploring this project!',
    }
];

const BMSHomePage = ({classes}) => {
    return (
        <div className={classes?.root}>

            <Container className={classes?.contentContainer} sx={{width: "100%"}}>
                <Grid container spacing={3} mt={5}>
                    {sections.map((section) => (
                        <Grid item key={section.title} xs={12} md={6}>
                            <Card className={classes?.sectionCard} sx={{background: "#228b2288", height: 600, border: "5px solid #228b22"}}>
                                <CardMedia
                                    component="img"
                                    image={BookImage}
                                    alt={'section.title'}
                                    height="300"
                                />
                                <CardContent className={classes?.sectionCardContent} sx={{borderTop: "5px solid #228b22", background: "#eeeeee", height: 300}}>
                                    <Typography variant="h5" gutterBottom>
                                        {section.title}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {section.paragraph}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>))}
                </Grid>
            </Container>
        </div>
    )
}

export default BMSHomePage
