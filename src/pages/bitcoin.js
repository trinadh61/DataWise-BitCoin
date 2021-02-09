import React, {useState, useEffect} from 'react';
import {Row, Col, Container, Card,} from 'react-bootstrap';
import '../styles/pages/bitcoin.css';
import PageLoader from './pageLoader';

export default function Bitcoin()
{
    const [bitcoinPrice, setBitcoinPrice] = useState(0);
    const [lastUpdated, setLastUpdated] = useState('');
    const [exchageData, setExchageData] = useState([]);
    const [loader, setloader] = useState(false)
    useEffect(()=>{
        setloader(true)
        // fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        fetch('https://api.exchangeratesapi.io/latest')
        .then(res => res.json())
        .then((result)=> {
            setExchageData(result.rates)
            console.log(result.rates);
        },
        (erro) =>{
            console.log(erro);
        })
        setloader(false);
    },[])
    useEffect(()=>{
        setloader(true);
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(res => res.json())
        .then((result)=> {
            setBitcoinPrice(result.bpi.EUR.rate_float)
            setLastUpdated(result.time.updated)
            var localtime = new Date(result.time.updated);
            console.log(result);
            console.log(localtime);
            setLastUpdated(localtime.toString())

            console.log(lastUpdated)
            console.log(result.bpi.EUR);
        },
        (erro) =>{
            console.log(erro);
        })
        setloader(false)
    },[])

    return(
        <Container>
            <Row>
                <div className = 'bitcoinpricetag'>
                B<u>itcoin Price</u>
                </div>
            </Row>
            {loader? <PageLoader/>:
            <Row>
            {Object.keys(exchageData).map((data,i) => 
            BitcoinpriceCard(i,(exchageData[data] * bitcoinPrice).toPrecision(8), data, lastUpdated.substr(15,6))

            )
            }
            </Row>
}        
            </Container>
    )
}  

export function BitcoinpriceCard(i,rate, counCode, updated)
{
    return(
        <Col key = {i} className = 'col-sm-12 col-lg-4'> <Card className = 'bitcoinValuecard'> <div > Price: {counCode} {rate} </div> <div className = 'bitCoinValueUpadated'> Last Updated: {updated} </div> </Card></Col>

    )
}