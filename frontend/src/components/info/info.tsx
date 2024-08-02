import { Anchor, Box, List, ListItem, Text } from '@mantine/core';
import React from 'react';
import classes from './info.module.css'

const Info: React.FC = () => {
    return (
        <Box className={classes.page}>
            <Text className={classes.title}>maitop info</Text>
            <br />
            <Text className={classes.header}>Created by:</Text>
            <List>
                <ListItem>
                    <Anchor href="https://github.com/nzbhuang">nzbhuang (Github)</Anchor>
                </ListItem>
                <ListItem>maimai friend code: 9071782750411</ListItem>
            </List>
            <br />
            <Text className={classes.header}>Credits to:</Text>
            <List>
                <ListItem>
                    <Anchor href="https://twitter.com/itbenom">nom (Twitter)</Anchor> for the derakkuma home page art (huge thanks!!)
                </ListItem>
                <ListItem>
                    <Anchor href="https://twitter.com/maiLv_Chihooooo">maimai譜面定数ちほー🏖☀️ (Twitter)</Anchor> for providing a spreadsheet with chart data
                </ListItem>
            </List>
            <br />
            <Text className={classes.header}>Other Info:</Text>
            <List>
                <ListItem>maitop is not connected with maimai</ListItem>
                <ListItem>
                    <Anchor href="https://x.com/estPiNEAPPLE/status/1787506490691277052">oh my gah, raputa !!!</Anchor>
                </ListItem>
                <ListItem>made with care for MSA 2024 submission</ListItem>
            </List>
        </Box>
    )
}

export default Info;