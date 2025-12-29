import { useEffect, useState } from 'react'

function App() {
  const [currency, setCurrency] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromAmount, setFromAmount] = useState(0);
  const [fromCurr, setFromCurr] = useState("USD");
  const [fromCurrIcon, setFromCurrIcon] = useState("USD");

  const [toAmount, setToAmount] = useState(0);
  const [toCurr, setToCurr] = useState("LUNA");
  const [toCurrIcon, setToCurrIcon] = useState("LUNA");

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

  const handleSwap = () => {
    const temp = fromCurr;
    setFromCurr(toCurr)
    setToCurr(temp)
  }

  const handleFromIcon = (currency) =>{
    setFromCurrIcon(currency);
    setFromCurr(currency)
    console.log(fromCurrIcon)
  }
  const handleToIcon = (currency) =>{
    setToCurrIcon(currency);
    setToCurr(currency)
    console.log(fromCurrIcon)
  }

  
  return (
    <div className='w-full h-[100vh] bg-blue-300 flex justify-center items-center'>
      <form action="submit" className='bg-white rounded-2xl p-5 shadow-2xl'>
        <h5 className='mb-5'>Swap</h5>
        
        <div className='flex items-center rounded-md bg-white/5 outline p-3 relative my-2'>
          <label id="from-amount" className='absolute bottom-9 bg-gray-100 rounded rounded-xl px-2'>from</label>
          <input id="from-amount" type='number' value={fromAmount} className='block outline-none flex-1'/>
          <img src={`/src/tokens/${fromCurrIcon}.svg`} alt="" className='h-7 w-7' />
          <select className='outline-none' value={fromCurr} onChange={(e) => handleFromIcon(e.target.value)}>
            {currency.map(item => (
              <option value={item.currency}>
                  {item.currency}
              </option>
            ))}
          </select>
        </div>

        <div className='flex items-center rounded-md bg-white/5 outline p-3 relative mt-5'>
          <label id="to-amount" className='absolute bottom-9 bg-gray-100 rounded rounded-xl px-2'>to</label>
          <input id="to-amount" type='number' className='block outline-none flex-1'/>
          <img src={`/src/tokens/${toCurrIcon}.svg`} alt="" className='h-7 w-7' />
          <select className='outline-none' value={toCurr} onChange={(e) => handleToIcon(e.target.value)}>
            {currency.map(item => (
              <option value={item.currency}>
                  {item.currency}
              </option>
            ))}
          </select>
        </div>

        <button>CONFIRM SWAP</button>
      </form>
    </div>
  )
}

export default App
