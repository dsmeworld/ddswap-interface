import { Currency, ETHER, Token } from 'ddswap-sdk'
import React, { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
import ConfluxLogo from '../../assets/images/conflux-logo.png'
import HtLogo from '../../assets/images/ht-logo.png'
import BnbLogo from '../../assets/images/bnb-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'



//通过chainid切换token-info的地址
const getTokenLogoURL = (address: string,chainId: number | undefined) =>{
  
  if(chainId === 1 ){
    return  `https://assets.dsme.space/token-info/ethereum/${address}/logo.png`
  }else if(chainId === 1030 ){
    return  `https://assets.dsme.space/token-info/conflux_espace/${address}/logo.png`
  }else if(chainId === 128 ){
    return  `https://assets.dsme.space/token-info/heco/${address}/logo.png`
  }else if(chainId === 56){
    return  `https://assets.dsme.space/token-info/binance/${address}/logo.png`
  }else if(chainId === 71){
    return  `https://assets.dsme.space/token-info/conflux_espace_test/${address}/logo.png`
  }

  return  `https://assets.dsme.space/token-info/ethereum/${address}/logo.png`
}


const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`


const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  
  
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  //获取chainid
  const {chainId} = useWeb3React()

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address,chainId)]
      }

      return [getTokenLogoURL(currency.address,chainId)]
    }
    return []
  }, [currency, uriLocations,chainId])

  //通过chainid切换coinlogo
  if (currency === ETHER) {
    if(chainId === 1 ){
      return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
    }else if(chainId === 1030 ){
      return <StyledEthereumLogo src={ConfluxLogo} size={size} style={style} />
    }else if(chainId === 128 ){
      return <StyledEthereumLogo src={HtLogo} size={size} style={style} />
    }else if(chainId === 56){
      return <StyledEthereumLogo src={BnbLogo} size={size} style={style} />
    }else if(chainId === 71){
      return <StyledEthereumLogo src={ConfluxLogo} size={size} style={style} />
    }
    else{
      return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
    }
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}


export function CurrencyETH(){
    //获取chainid 
    const {chainId} = useWeb3React()

    //通过chainid切换coinlogo
    if(chainId === 1 ){
      return <>ETH</>
    }else if(chainId === 1030 ){
      return <>CFX</>
    }else if(chainId === 128 ){
      return <>HT</>
    }else if(chainId === 56){
      return <>BNB</>
    }else if(chainId === 71){
      return <>CFX</>
    }
    else{
      return <>ETH</>
    }
}