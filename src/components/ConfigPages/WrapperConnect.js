import { wrapper } from '@/redux/store'
import React from 'react'

const WrapperConnect = ({children}) => {
  return children
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store)=()=>{
        console.log(store)
    }
   
)

export default WrapperConnect
