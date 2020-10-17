import React, {useState} from "react";
import './BecomeAdmin.css'
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useStateValue} from "../../StateProvider";
import {Button} from "@material-ui/core";
import axios from "../../axios";

function BecomeAdmin() {
    //eslint-disable-next-line
    const [{user},dispatch] = useStateValue()

    const element = useElements();
    const stripe = useStripe();

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')

    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [address,setAddress] = useState('')
    const [zip,setZip] = useState('')

    const [isProcessing,setIsProcessing] = useState(false)
    const [checkoutError,setCheckoutError] = useState('')
    const price = 20;

    const billingDetails = {
        name: `${firstName} ${lastName}`,
        email: user?.email,
        address:{
            line1: address,
            city: city,
            state: state,
            postal_code: zip
        }
    }

    const cardElementOptions = {
        style:{
            base:{
                '::placeholder':{
                    color: 'lightgray'
                },
            },
            invalid:{
                iconColor:'#FF5A5F',
                color: '#ff5a5f'
            },
            complete:{
                iconColor: '#00A699'
            }
        },
        hidePostalCode: true,
    }

    const onSuccessfulCheckout = ()=>{
        console.log('success');
        setCheckoutError('')
    }

    const handlePayment = async (event)=>{
        setIsProcessing(true)

        try {
            const res = await axios.post('/payments/create',{
                total: price * 100
            })

            const clientSecret = res.data.clientSecret;
            const cardElement = element.getElement(CardElement)

            const paymentMethodReq = await stripe.createPaymentMethod({
                type:'card',
                card: cardElement,
                billing_details: billingDetails
            });

            if (paymentMethodReq.error){
                setIsProcessing(false)
                setCheckoutError(paymentMethodReq.error.message)
            }else {

                const {error} = await stripe.confirmCardPayment(clientSecret,{
                    payment_method: paymentMethodReq.paymentMethod.id
                })

                if (error){
                    setCheckoutError(error.message)
                    setIsProcessing(false)
                }else {
                    setIsProcessing(false)
                    onSuccessfulCheckout()
                }
            }

        }catch (e) {
            setCheckoutError(e.message)
            setIsProcessing(false)
        }
    }

    return (
        <div className="become-admin">
            <Header/>
            <Banner title={'Cheque out'} imageUrl={'http://cafeanimesh.weebly.com/files/theme/images/bg-light.jpg?1592320655'}/>

            <div className="become-admin-main">
                <p className="checkout-error">{checkoutError}</p>
                <div className="name">
                    <div className="first-name">
                        <p className="dropdown-label">First name</p>
                        <input className={'text'} type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} />
                    </div>

                    <div className="last-name">
                        <p className="dropdown-label">Last name</p>
                        <input className={'text'} type="text" value={lastName} onChange={e=>setLastName(e.target.value)} />
                    </div>
                </div>

                <p className="dropdown-label">State</p>
                <input className={'text'} type="text" value={state} onChange={e=>setState(e.target.value)}/>

                <p className="dropdown-label">City</p>
                <input className={'text'} type="text" value={city} onChange={e=>setCity(e.target.value)}/>

                <p className="dropdown-label">Address</p>
                <input className={'text'} type="text" value={address} onChange={e=>setAddress(e.target.value)}/>

                <p className="dropdown-label">Zip</p>
                <input className={'text zip'} type="text" value={zip} onChange={e=>setZip(e.target.value)}/>

                <CardElement options={cardElementOptions}/>

                <Button disabled={isProcessing} className={'pay-button'} onClick={handlePayment}>{isProcessing? 'Processing...':`Pay ${price}`}</Button>
            </div>

        </div>
    )
}

export default BecomeAdmin;