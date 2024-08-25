// SwipableBox.js
import React, { useState } from 'react';
import { Flex, Text, Button, Center,  Icon, } from '@chakra-ui/react';
import { useSwipeable } from 'react-swipeable';
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
// import { whiten } from '@chakra-ui/theme-tools';
// import { callApi } from '../../../api';

import {
    MdEmail,
  } from "react-icons/md";

export default function SwipableBox (props) {
const{blastInfo, resendBlast}= props
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
  });

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : blastInfo.length - 1));
    } else if (direction === 'right') {
      setCurrentIndex((prevIndex) => (prevIndex < blastInfo.length - 1 ? prevIndex + 1 : 0));
    }
  };

  const extractFirstTenWords = (inputText) => {
    const words = inputText.split(' ');
    var firstTenWords = words.slice(0, 10).join(' ');
    if (words.length>10) {        
        firstTenWords = firstTenWords+"..."
    }
    return firstTenWords;
  };

  const renderBoxes = () => {
    console.log(blastInfo)
    return blastInfo.slice(currentIndex, currentIndex + 2).map((item) => (
        <MiniStatistics
            startContent={
              <IconBox
                w='50px'
                h='100px'
                bg="white"
                icon={
                  <Icon w='32px' as={MdEmail} h='32px'/>
                }
                />
            }
            gap='20px'
            name={item.created_at_str}
            value={extractFirstTenWords(item.message)}
            button={true}
            functionButton={()=>resendBlast(item.message)}

          />
    //   <Box key={item.id} width="50%" p="2">
    //     <Box width="100%" height="100px" bg="white" color="black" textAlign="center">
    //       <Text fontSize="sm">{item.created_at_str}</Text>
    //       <Text fontSize="md">{item.message}</Text>
    //     </Box>
    //   </Box>
    ));
  };

  return (
    <Flex flexDirection="column">          
    <Text fontSize="24px">Previous Blast</Text>

    <Flex flexDirection="row" gap='20px' alignItems="center" {...handlers} mt="10px">
      {renderBoxes()}
    </Flex>
    <Center mt="10px">
        <Button bg="blue" color="white" onClick={() => handleSwipe('left')} marginRight="2">
            {'<'}
        </Button>
        <Button bg="blue" color="white" onClick={() => handleSwipe('right')}>
            {'>'}
        </Button>
        
    </Center>

    </Flex>
  );
};

// export default SwipableBox;
