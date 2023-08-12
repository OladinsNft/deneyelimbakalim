import {
  NAVBAR_BACKGROUND_COLOR,
  NAVBAR_HEIGHT,
  NAVBAR_LINKS,
  NAVBAR_LINK_COLOR,
  NAVBAR_LINK_SELECTED_BADGE_SIZE,
  NAVBAR_LINK_SELECTED_COLOR,
  WALLETCONNECT_BUTTON_COLOR,
} from "../config-global";

import React, { useEffect } from "react";
import { Box, Button, Container, Link } from "@mui/material";
import { useLocation } from "react-router-dom";

import { useSigningClient } from '../contexts/cosmwasm'
import {Unity, useUnityContext}  from "react-unity-webgl";
export default function Navbar() {
  const currentPath = useLocation();

  const {
    walletAddress,
    connectWallet,
    signingClient,
    disconnect,
    getBalances,
  } = useSigningClient()

  useEffect(() => {
    let account = localStorage.getItem("address")
    if (account != null) {
      connectWallet(true)
    }
  }, [])

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0)
      return
    getBalances()
  }, [walletAddress, signingClient])

  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet(false)
    } else {
      disconnect()
    }
  }
  
  
  return (
    
      <Container
        sx={{
          // border: "1px solid red",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: { sm: "flex", xs: "none" },
            height: "100%",
            padding: { sm: "16px 0", xs: "20px 0" },
            img: {
              height: "100%",
            },
          }}
        >
          <img alt="" src="./logo-export.png" />
        </Box>
        <Box
          sx={{
            display: { sm: "none", xs: "flex" },
            height: "100%",
            padding: { sm: "16px 0", xs: "20px 0" },
            img: {
              height: "100%",
            },
          }}
        >
          <img alt="" src="./logo-export.png" />
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: { sm: "row", xs: "column" },
              alignItems: { sm: "center", xs: "start" },
              justifyContent: "space-between",
              padding: "16px 0",
              ".link-item": {
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0 10px 0 20px",
                ".link-selected-badge": {
                  position: "absolute",
                  left: "5px",
                  top: `calc(50% - ${NAVBAR_LINK_SELECTED_BADGE_SIZE / 2}px)`,
                  width: `${NAVBAR_LINK_SELECTED_BADGE_SIZE}px`,
                  aspectRatio: 1,
                  borderRadius: `${NAVBAR_LINK_SELECTED_BADGE_SIZE}px`,
                  padding: "0",
                  background: NAVBAR_LINK_SELECTED_COLOR,
                },
                ".MuiLink-root": {
                  fontSize: { sm: "16px", xs: "14px" },
                  lineHeight: { sm: "16px", xs: "14px" },
                },
              },
            }}
          >
            
            
            
          </Box>
          
          
        </Box>
       
      </Container>
    
    
    
  );
}
