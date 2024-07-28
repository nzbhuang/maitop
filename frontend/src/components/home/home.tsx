import { Stack, Image, Box } from '@mantine/core';
import Whahuh from '../../assets/whahuh.jpg'
import classes from './home.module.css'

const Home = () => {
    return (
        <Box className={classes.page}>
            <Stack align="center" justify="center" gap={0}>
                <h1 className={classes.title}>maitop</h1>
                <p className={classes.description}>Simple tracker of your top scores from maimai!</p>
                <Box style={{ height: '20px'}}/>
                <Image
                    className={classes.image}
                    src={Whahuh}
                    radius="sm" 
                />
                <p className={classes.credit}>art drawn by friend and used with permission</p>
            </Stack>
        </Box> 
    )
}

export default Home;