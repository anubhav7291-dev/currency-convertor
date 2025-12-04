import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {InputBox} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to,setTo] = useState("inr")
  const [convertedAmount,setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = ()=>{
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = ()=>{
    setConvertedAmount(amount*currencyInfo[to])
  }

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-black"
            // style={{
            //     backgroundImage: `url('https://png.pngtree.com/background/20230416/original/pngtree-website-blue-gradient-background-picture-image_2443540.jpg')`,
            // }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();  
                            convert()                         
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                // type='text'
                                label="From"
                                amount={amount}
                                onAmountChange={(amount)=>{setAmount(amount)}}
                                onCurrencyChange={(currency)=>{setFrom(currency)}}
                                currencyOptions = {options}
                                selectCurrency = {from}
                                // amountDisable = 'false'
                                // currencyDisable = 'false'
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 cursor-pointer hover:bg-blue-900"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                onCurrencyChange={(currency)=>{setTo(currency)}}
                                currencyOptions = {options}
                                selectCurrency = {to}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-900">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App