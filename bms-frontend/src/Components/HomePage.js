import React from 'react';
import {Card, CardContent, CardMedia, Container, Grid, Typography} from '@mui/material';

import BookImage from "../Public/book-and-glasses-svgrepo-com.svg"

const sections = [{
    title: 'Welcome to the Book Management System',
    paragraph: 'This comprehensive system allows you to manage your book collection with ease. Add, edit, and delete books, categorize them, and track their availability.',
}, {
    title: 'Seamless Organization',
    paragraph: 'Create custom categories to organize your books by genre, author, publication date, or any other criteria that suits your needs. Find the books you need quickly and effortlessly.',
}, {
    title: 'Intuitive Interface', paragraph: 'The user-friendly interface makes managing your books a breeze. Navigate easily using the clear design and intuitive controls.',
}, {
    title: 'Advanced Search',
    paragraph: 'Utilize powerful search features to locate specific books by title, author, keyword, or any other relevant attribute. Find the exact book you’re looking for in seconds.',
}, {
    title: 'Always Accessible', paragraph: '(Optional: Add functionality details here, e.g., "Access your book collection from any device, anywhere, anytime.")',
}, {
    title: 'Get Started Today!', paragraph: 'Create your free account and discover the power of a well-organized book collection. Start your journey towards better book management now!',
},];

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
