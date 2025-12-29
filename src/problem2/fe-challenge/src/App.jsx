import { useEffect, useState } from 'react'

function App() {
  const [currency, setCurrency] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromCurr, setFromCurr] = useState("");
  const [toCurr, setToCurr] = useState("");
  const [fromAmount, setFromAmount] = useState(0);

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
  
  console.log('currency', currency)
  return (
    <div className='w-full h-[100vh] bg-blue-300 flex justify-center items-center'>
      <form action="submit" className='bg-white rounded-2xl p-5 shadow-2xl'>
        <h5 className='mb-5'>Swap</h5>
        
        <div className='flex items-center rounded-md bg-white/5 outline p-3 relative my-2'>
          <label id="input-amount" className='absolute bottom-9 bg-gray-100 rounded rounded-xl px-2'>from</label>
          <input id="input-amount" className='block outline-none flex-1'/>
          <select className='outline-none'>
            {currency.map(item => (
              <option>
                {item.currency}
              </option>
            ))}
          </select>
        </div>

        <label id="output-amount">Amount to receive</label>
        <input id="output-amount" />

        <button>CONFIRM SWAP</button>
      </form>
    </div>
  )
}

export default App
