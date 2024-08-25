/* eslint-disable import/no-anonymous-default-export */

import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Box, SimpleGrid, Card, Image, Button, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// import { Routes } from "../../routes";
// const image = "../assets/img/illustrations/404.svg";
const image = "https://cdn5.vectorstock.com/i/1000x1000/73/49/404-error-page-not-found-miss-paper-with-white-vector-20577349.jpg";
console.log("ke render ga?")

export default () => {
  return (
   
        <Container>
          <SimpleGrid>
            <Box className="text-center d-flex align-items-center justify-content-center">
              <div>
              <Image src={image} className="img-fluid w-75" />

                <h1 className="text-primary mt-5">
                  Page not <span className="fw-bolder">found</span>
                </h1>
                <p className="lead my-4">
                  Oops! Looks like you followed a bad link. If you think this is a
                  problem with us, please tell us.
            </p>
                <Button to={"/"}>
                  {/* <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" /> */}
                  Go back home
                </Button>
              </div>
            </Box>
          </SimpleGrid>
        </Container>
  );
};
