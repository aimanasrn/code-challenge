import { useEffect, useState } from 'react'
import { IoMdSwap } from "react-icons/io";
import Swal from 'sweetalert2';

function App() {
  const [currency, setCurrency] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromAmount, setFromAmount] = useState(0);
  const [fromCurr, setFromCurr] = useState("USD");
  const [fromCurrIcon, setFromCurrIcon] = useState("USD");

  const [toAmount, setToAmount] = useState(0);
  const [toCurr, setToCurr] = useState("LUNA");
  const [toCurrIcon, setToCurrIcon] = useState("LUNA");

  const [valdiateErr, toValidateErr] = useState(false)

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
    .then(res => res.json())
    .then((data) => {
      setCurrency(data)
      setLoading(false)
    })
    .catch(err => {
      console.log(err);
    });
  }, [])



  const handleFromCurrency = (fromCurrency, fromAmount, toCurrency) =>{
    setFromCurr(fromCurrency)

    convertAmount(fromCurrency, fromAmount, toCurrency)
    console.log(fromCurrIcon)
  }
  const handleToCurrency = (toCurrency, fromAmount, fromCurrency) =>{
    setToCurr(toCurrency)

    convertAmount(fromCurrency, fromAmount, toCurrency)
    console.log(fromCurr, fromAmount, currency)
  }

  const handleFromAmount = (fromAmount, fromCurrency, toCurrency) => {
    setFromAmount(fromAmount);

    // validate error
    if(fromAmount <= 0)
      toValidateErr(true)
    else
      toValidateErr(false)

    convertAmount(fromCurrency,fromAmount, toCurrency)
  }

  const convertAmount = (fromCurrency, amount, toCurrency) => {
    const getFromPrice = currency.find(item => item.currency === fromCurrency)
    const amountFromInUSD = getFromPrice.price * Number(amount);

    const getToPrice = currency.find(item => item.currency === toCurrency)
    const amountConvert = amountFromInUSD / getToPrice.price
    setToAmount(amountConvert.toFixed(2));
  }

    const handleSwap = () => {
    const tempCurr = fromCurr;
    setFromCurr(toCurr)
    setToCurr(tempCurr)

    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);

    // convertAmount(fromCurr, fromAmount, toCurr)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    Swal.fire({
      title: "Confirmation",
      text: "Are you sure to swap currency?",
      icon: "question"
    }).then(() => {
      Swal.fire({
        title: "Successfull!",
        text: "Your currency successfull submited",
        icon: "success"
      })
    })
  }

  
  return (
    <div className='w-full h-[100vh] bg-blue-300 flex justify-center items-center'>
      <form action="submit" className='bg-white rounded-2xl p-5 shadow-2xl '>
        <h5 className='mb-5 font-bold text-4xl' onClick={handleSwap}>Swap Currency</h5>
        <div className='flex relative'>
          <div className={`flex items-center rounded-md bg-white/5 outline ${valdiateErr ? 'outline-red-500' : 'outline-gray-300'}  p-3 relative my-2`}>
            <label id="from-amount" className='absolute bottom-9 bg-gray-100 rounded rounded-xl px-2'>from</label>
            <input id="from-amount" type='number' value={fromAmount}  onChange={(e) => handleFromAmount(e.target.value, fromCurr, toCurr)} className='block outline-none flex-1'/>
            <img src={`/src/tokens/${fromCurr}.svg`} alt="" className='h-7 w-7' />
            <select className='outline-none' value={fromCurr} onChange={(e) => handleFromCurrency(e.target.value, fromAmount, toCurr)}>
              {currency.map(item => (
                <option key={item.lenght} value={item.currency}>
                    {item.currency}
                </option>
              ))}
            </select>
          </div>
          <span onClick={handleSwap} className='flex items-center px-2'><IoMdSwap className='text-white text-4xl bg-blue-500 rounded-2xl p-1 hover:bg-blue-700 transition hover:duration-300'/></span>    
          <div className='flex items-center rounded-md bg-white/5 outline outline-gray-300 p-3 relative my-2'>
            <label id="to-amount" className='absolute bottom-9 bg-gray-100 rounded rounded-xl px-2'>to</label>
            <input id="to-amount" type='number' className='block outline-none flex-1' value={toAmount} readOnly/>
            <img src={`/src/tokens/${toCurr}.svg`} alt="" className='h-7 w-7' />
            <select className='outline-none' value={toCurr} onChange={(e) => handleToCurrency(e.target.value, fromAmount, fromCurr)}>
              {currency.map(item => (
                <option value={item.currency}>
                    {item.currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex">
          <p className='text-red-500'>
          {valdiateErr && (
            "Amount must be greater than 0"
          )}
          </p>
        </div>
        <div className='flex justify-end mt-3'>
          <button type='submit' className='bg-blue-100 p-3 rounded-3xl justify-end font-medium hover:bg-blue-500 hover:text-white transition hover:duration-300' onClick={handleSubmit}>CONFIRM SWAP</button>
        </div>  
      </form>
    </div>
  )
}

export default App
