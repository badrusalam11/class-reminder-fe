/* eslint-disable no-unused-vars */
import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Image } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import imageLogo from "assets/img/auth/perbanas.png";

import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <Image src={imageLogo} h='120px' my='32px' />
      <HSeparator mb="5px"/>
    </Flex>
  );
}

export default SidebarBrand;
