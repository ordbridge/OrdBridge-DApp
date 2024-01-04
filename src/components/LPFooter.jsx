import React from 'react';
import Text from './Text';
import Telegram from '../assets/Telegram.png';
import Twitter from '../assets/Twitter.png';
import Discord from '../assets/Discord.png';

const LpFooter = () => {
 return (
   <div className="flex flex-col justify-center items-center text-white gap-4 py-20 md:px-5">
     <Text
       className="text-3xl text-blue-200 pr-12 cursor-pointer !mb-0"
       size="txtPlusJakartaSansRomanBold36"
     >
            <span className="text-purple-700 font-syne text-left font-bold">
              Ord
            </span>
       <span className="text-white-A700 font-syne text-left font-normal">
              Bridge
            </span>
     </Text>
     <p className="text-center">A crosschain bridge to move BRC-20 to any chain.</p>
     <div className="flex gap-10 font-grostek flex-wrap " >
       <a href="" className="text-[#E4DCFF] text-[16px] text-nowrap" >Gitbook Docs</a>
       <a href="" className="text-[#E4DCFF] text-[16px] text-nowrap" >How does bridge work?</a>
       <a href="" className="text-[#E4DCFF] text-[16px] text-nowrap" >What is BRC-20</a>
       <a href="" className="text-[#E4DCFF] text-[16px] text-nowrap" >Bridge BRC-20 tokens</a>
     </div>
     <div className="lp-footer-break" />
     <p className="text-[24px]" >Contact at <a href="mailto:tech@ordibridge.io" >tech@ordibridge.io</a></p>
     <div className="flex gap-10 ">
       <img src={Telegram} alt=""/>
       <img src={Twitter}  alt=""/>
       <img src={Discord}  alt=""/>
     </div>
   </div>
 );
};

export default LpFooter;