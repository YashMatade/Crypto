import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FadingLoader from '../FadingLoader';

function CoinsTable() {
    const [cryptoData, setCryptoData] = useState([]);
    const [searchTerm, setSerchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    function Load() {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(((res) => {
            console.log(res.data);
            setCryptoData(res.data);
            setIsLoading(true);

        }), ((err) => {
            console.log(err.data);
        }))
    };
    useEffect(() => {
        Load();

    }, []);
    // function ChangedValue() {
    //     if (changedValue < 0) {
    //         setColorChange("red");
    //     } else {
    //         setColorChange("green");
    //     }
    // }


    if (isLoading) {
        return <>
            <div className="container">
                <h1 className='text-center'>Cryptocurrency Prices by Market Cap </h1>
                <input className='p-2 bg-dark text-white form-control' type="search" placeholder='Search For a Crypto Currency..' onChange={(e) => { setSerchTerm(e.target.value) }} />

                <table className='table table-bordered text-center text-dark mt-3 ' >
                    <tr className='bg-warning' style={{ height: "50px", pointerEvents: "cursor" }}>
                        <th><strong className='text-start'>Coin</strong></th>
                        <th><strong>Price</strong></th>
                        <th><strong>24h change</strong></th>
                        <th><strong>Market Cap</strong></th>
                    </tr>
                    {
                        cryptoData.filter((data) => {
                            if (searchTerm === "") {
                                return data
                            }
                            else if (data.id.includes(searchTerm.toLowerCase())) {
                                return data
                            }
                        }).map((data) => {
                            return <>
                                <tr className='text-white ' style={{ height: "80px" }}>
                                    <td className='text-start'><img src={data.image} alt="" style={{ height: "60px" }} /><strong>&nbsp;&nbsp;{data.name}</strong></td>

                                    {
                                        data.price_change_percentage_24h < 0 ? (
                                            <td><p className='text-danger'>₹{data.current_price.toFixed(2)}</p></td>

                                        ) : (
                                            <td><p className='text-success'>₹{data.current_price.toFixed(2)}</p></td>

                                        )
                                    }


                                    {
                                        data.price_change_percentage_24h < 0 ? (
                                            <td ><p className='text-danger'><b><i class="fa-solid fa-caret-down"></i> {data.price_change_percentage_24h.toFixed(2)}%</b></p></td>
                                        ) : (
                                            <td ><p className='text-success'><b><i class="fa-sharp fa-solid fa-caret-up"></i> {data.price_change_percentage_24h.toFixed(2)}%</b></p></td>
                                        )
                                    }


                                    <td><p>  {

                                        Math.abs(Number(data.market_cap)) >= 1.0e+9

                                            ? Math.abs(Number(data.market_cap)) / 1.0e+9 + "B"

                                            : Math.abs(Number(data.market_cap)) >= 1.0e+6

                                                ? Math.abs(Number(data.market_cap)) / 1.0e+6 + "M"

                                                : Math.abs(Number(data.market_cap)) >= 1.0e+3

                                                    ? Math.abs(Number(data.market_cap)) / 1.0e+3 + "K"

                                                    : Math.abs(Number(data.market_cap))
                                    }</p></td>
                                </tr>
                            </>
                        })
                    };



                </table>
            </div>
        </>
    }
    else {
        return <div><FadingLoader /></div>
    }




}

export default CoinsTable;